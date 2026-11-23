/* ==========================================================================
   games.js — 게임 카드 / 게임 목록 / 게임 상세 / 게임별 개인정보처리방침 렌더링
   - 페이지 종류는 <body data-page="..."> 로 구분합니다.
       games         → /games/
       game          → /games/<slug>/            (body data-slug="<slug>")
       game-privacy  → /games/<slug>/privacy/    (body data-slug="<slug>")
   - 데이터: window.GAMES (data/games.js)
   ========================================================================== */
(function () {
  "use strict";
  var A = window.App, t = A.t, L = A.L, esc = A.esc, SITE = A.SITE;
  var GAMES = window.GAMES || [];

  function findGame(slug) {
    for (var i = 0; i < GAMES.length; i++) if (GAMES[i].slug === slug) return GAMES[i];
    return null;
  }
  function arr(v) { return (Array.isArray(v) ? v : []).map(L).filter(Boolean); }
  function contactOf(g) { return (g.privacy && g.privacy.contact) || g.supportEmail || SITE.email || ""; }

  /* ---------- 게임 카드 (메인·목록 공통) ---------- */
  A.gameCard = function (g) {
    var media = g.cover
      ? '<img src="' + esc(g.cover) + '" alt="" loading="lazy">'
      : esc(L(g.title));
    return '<a class="card" href="/games/' + esc(g.slug) + '/">' +
      '<div class="card-media">' + media + "</div>" +
      '<div class="card-top"><h3>' + esc(L(g.title)) + "</h3>" + A.statusBadge(g.status) + "</div>" +
      "<p>" + esc(L(g.tagline)) + "</p>" +
      (g.platforms && g.platforms.length ? '<div class="card-foot"><ul class="tags">' + g.platforms.map(function (p) { return '<li class="tag">' + esc(p) + "</li>"; }).join("") + "</ul></div>" : "") +
      "</a>";
  };

  function notFound(root) {
    root.innerHTML = '<div class="container notfound"><p class="code">404</p><h1>' + esc(t("games.notFound")) + '</h1><p><a class="btn" href="/games/">' + esc(t("games.listTitle")) + "</a></p></div>";
  }

  /* ---------- /games/ ---------- */
  function renderList(root) {
    var list = GAMES.filter(function (g) { return g.listed !== false; });
    root.innerHTML =
      '<div class="container page-head">' +
      '<p class="breadcrumb"><a href="/">' + esc(L(SITE.name)) + "</a> / " + esc(t("nav.games")) + "</p>" +
      '<h1 class="page-title">' + esc(t("games.listTitle")) + "</h1>" +
      '<p class="page-lead">' + esc(t("games.listLead")) + "</p></div>" +
      '<div class="container page-body">' +
      (list.length
        ? '<div class="grid grid-3">' + list.map(A.gameCard).join("") + "</div>"
        : '<div class="empty">' + A.statusBadge("soon") + '<p style="margin:10px 0 0">' + esc(t("games.empty")) + "</p></div>") +
      "</div>";
  }

  /* ---------- /games/<slug>/ ---------- */
  function renderDetail(root, g) {
    var links = g.links || {};
    var buttons = [];
    if (links.play) buttons.push(A.linkBtn(links.play, t("games.play"), { primary: true, icon: "external" }));
    if (links.download) buttons.push(A.linkBtn(links.download, t("games.download"), { icon: "external" }));
    (links.stores || []).forEach(function (s) { if (s && s.url) buttons.push(A.linkBtn(s.url, L(s.name), { icon: "external" })); });

    var desc = arr(g.description);
    var features = arr(g.features);
    var shots = (g.screenshots || []).filter(Boolean);
    var contact = g.supportEmail || SITE.email;

    root.innerHTML =
      '<div class="container page-head">' +
      '<p class="breadcrumb"><a href="/">' + esc(L(SITE.name)) + '</a> / <a href="/games/">' + esc(t("nav.games")) + "</a> / " + esc(L(g.title)) + "</p>" +
      '<div class="page-meta">' + A.statusBadge(g.status) +
      (g.genre ? '<span class="tag">' + esc(L(g.genre)) + "</span>" : "") +
      (g.platforms || []).map(function (p) { return '<span class="tag">' + esc(p) + "</span>"; }).join("") +
      "</div>" +
      '<h1 class="page-title">' + esc(L(g.title)) + "</h1>" +
      '<p class="page-lead">' + esc(L(g.tagline)) + "</p></div>" +

      '<div class="container page-body"><div class="prose">' +
      (buttons.length ? '<div class="link-row">' + buttons.join("") + "</div>" : A.todo("플레이/다운로드/스토어 링크 (data/games.js links)")) +

      "<h2>" + esc(t("games.screenshots")) + "</h2>" +
      '<div class="shots">' +
      (shots.length
        ? shots.map(function (s, i) { return '<div class="shot"><img src="' + esc(s) + '" alt="' + esc(L(g.title)) + " " + (i + 1) + '" loading="lazy"></div>'; }).join("")
        : '<div class="shot">' + esc(t("games.shotPlaceholder")) + '</div><div class="shot">' + esc(t("games.shotPlaceholder")) + "</div>") +
      "</div>" +

      "<h2>" + esc(t("games.about")) + "</h2>" +
      (desc.length ? desc.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") : "<p>" + A.todo("게임 소개 (data/games.js description)") + "</p>") +

      (features.length ? "<h2>" + esc(t("games.features")) + "</h2><ul>" + features.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ul>" : "") +

      "<h2>" + esc(t("games.support")) + "</h2>" +
      "<p>" + (contact ? '<a href="mailto:' + esc(contact) + '">' + esc(contact) + "</a>" : A.todo("문의 이메일")) + "</p>" +
      '<p><a href="/games/' + esc(g.slug) + '/privacy/">' + esc(t("games.privacy")) + "</a></p>" +
      "</div></div>";
  }

  /* ---------- /games/<slug>/privacy/ ----------
     법률 검토 전 초안입니다. (페이지에는 표시하지 않음)
     스토어 제출 전 실제 수집 항목·SDK 기준으로 내용을 확인하세요. */
  function renderPrivacy(root, g) {
    var p = g.privacy || {};
    var name = L(g.title);
    var operator = L(p.operator);
    var contact = contactOf(g);

    function list(items, label) {
      items = arr(items);
      return items.length ? "<ul>" + items.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" : "<p>" + A.todo(label) + "</p>";
    }
    function para(v, label) { return "<p>" + A.orTodo(v, label) + "</p>"; }

    var collected = (p.collected || []).filter(function (c) { return c && L(c.item); });
    var third = (p.thirdParties || []).filter(function (c) { return c && L(c.name); });

    root.innerHTML =
      '<div class="container page-head">' +
      '<p class="breadcrumb"><a href="/">' + esc(L(SITE.name)) + '</a> / <a href="/games/">' + esc(t("nav.games")) + '</a> / <a href="/games/' + esc(g.slug) + '/">' + esc(name) + "</a> / " + esc(t("games.privacy")) + "</p>" +
      '<h1 class="page-title">' + esc(name) + " " + esc(t("games.privacy")) + "</h1>" +
      '<p class="page-lead">시행일: ' + A.orTodo(p.effectiveDate, "시행일") + "</p></div>" +

      '<div class="container page-body"><div class="prose">' +
      "<h2>1. 총칙</h2>" +
      "<p>" + (operator ? esc(operator) : A.todo("운영자명") + "운영자") + "(이하 \"운영자\")는 「" + esc(name) + "」(이하 \"게임\") 이용자의 개인정보를 소중히 다루며, 「개인정보 보호법」 등 관련 법령을 준수합니다. 이 방침은 게임이 어떤 정보를 어떤 목적으로 수집·이용하는지 안내합니다.</p>" +

      "<h2>2. 수집하는 개인정보 항목 및 수집 방법</h2>" +
      (collected.length
        ? "<table><thead><tr><th>항목</th><th>수집 방법</th></tr></thead><tbody>" +
          collected.map(function (c) { return "<tr><td>" + esc(L(c.item)) + "</td><td>" + esc(L(c.method)) + "</td></tr>"; }).join("") + "</tbody></table>"
        : "<p>" + A.todo("수집 항목 (data/games.js privacy.collected)") + "</p>") +

      "<h2>3. 개인정보의 이용 목적</h2>" + list(p.purposes, "이용 목적 (privacy.purposes)") +

      "<h2>4. 보유 및 이용 기간</h2>" + para(p.retention, "보관 기간 (privacy.retention)") +

      "<h2>5. 제3자 제공 및 처리 위탁</h2>" +
      (third.length
        ? "<p>게임은 아래 외부 서비스(SDK)를 사용하며, 각 서비스는 자체 개인정보처리방침에 따라 정보를 처리합니다.</p>" +
          "<table><thead><tr><th>제공받는 자</th><th>목적</th><th>항목</th><th>방침</th></tr></thead><tbody>" +
          third.map(function (c) {
            return "<tr><td>" + esc(L(c.name)) + "</td><td>" + esc(L(c.purpose)) + "</td><td>" + esc(L(c.items)) + "</td><td>" +
              (c.policy ? '<a href="' + esc(c.policy) + '" target="_blank" rel="noopener">링크</a>' : "") + "</td></tr>";
          }).join("") + "</tbody></table>"
        : "<p>" + A.todo("제3자 제공·SDK 목록 (privacy.thirdParties) — 없으면 '제공하지 않음' 문구로 교체") + "</p>") +

      "<h2>6. 이용자의 권리와 삭제 요청</h2>" +
      "<p>이용자는 언제든지 자신의 개인정보 열람·정정·삭제·처리 정지를 요청할 수 있습니다. 요청은 아래 문의처로 보내 주시면 지체 없이 처리합니다.</p>" +
      (L(p.deletion) ? "<p>" + esc(L(p.deletion)) + "</p>" : "<p>" + A.todo("삭제 요청 방법·처리 기한 (privacy.deletion)") + "</p>") +

      "<h2>7. 아동의 개인정보</h2>" + para(p.children, "아동 개인정보 정책 (privacy.children)") +

      "<h2>8. 방침의 변경</h2>" +
      "<p>이 방침이 바뀌는 경우 이 페이지를 통해 시행일과 함께 알립니다.</p>" +

      "<h2>9. 문의처</h2>" +
      "<p>" + (contact ? '<a href="mailto:' + esc(contact) + '">' + esc(contact) + "</a>" : A.todo("문의 이메일 (privacy.contact / supportEmail / site.js email)")) + "</p>" +
      "</div></div>";
  }

  A.onRender(function () {
    var page = A.page("page");
    var root = document.getElementById("page");
    if (!root || ["games", "game", "game-privacy"].indexOf(page) < 0) return;
    if (page === "games") return renderList(root);
    var g = findGame(A.page("slug"));
    if (!g) return notFound(root);
    if (page === "game") renderDetail(root, g);
    else renderPrivacy(root, g);
  });
})();
