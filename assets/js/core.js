/* ==========================================================================
   core.js — 모든 페이지 공통
   - 언어(i18n) 처리, 헤더/푸터 렌더링, 공통 헬퍼
   - 페이지 스크립트는 App.onRender(fn)으로 렌더 함수를 등록합니다.
     언어가 바뀌면 등록된 함수가 다시 실행됩니다.
   ========================================================================== */
(function () {
  "use strict";

  var SITE = window.SITE || {};
  var I18N = window.I18N || { ko: {} };
  var LANGS = ["ko", "en"];
  var renderers = [];

  // 로컬 확인 중일 때만 TODO 표시를 보여줍니다. (배포 사이트에서는 숨김)
  var isDev = /^(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])$/.test(location.hostname) || location.protocol === "file:";
  if (isDev) document.documentElement.classList.add("is-dev");

  /* ---------- 언어 ---------- */
  function detectLang() {
    var q = new URLSearchParams(location.search).get("lang");
    if (LANGS.indexOf(q) >= 0) return q;
    try {
      var saved = localStorage.getItem("lang");
      if (LANGS.indexOf(saved) >= 0) return saved;
    } catch (e) { /* storage 차단 환경 */ }
    return "ko";
  }
  var lang = detectLang();

  function setLang(next) {
    if (LANGS.indexOf(next) < 0) return;
    lang = next;
    try { localStorage.setItem("lang", next); } catch (e) { /* 무시 */ }
    renderAll();
  }

  // UI 문구: 현재 언어 → ko → 키 순서로 대체
  function t(key) {
    var cur = I18N[lang] || {};
    if (cur[key] != null) return cur[key];
    if (I18N.ko && I18N.ko[key] != null) return I18N.ko[key];
    return key;
  }

  // 데이터 값: 문자열이면 그대로, {ko, en} 객체면 현재 언어 → ko 순서
  function L(v) {
    if (v == null) return "";
    if (typeof v === "string" || typeof v === "number") return String(v);
    if (Array.isArray(v)) return v;
    if (v[lang] != null && v[lang] !== "") return v[lang];
    return v.ko != null ? v.ko : "";
  }

  /* ---------- HTML 헬퍼 ---------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  // 값이 비어 있으면 로컬에서만 보이는 TODO 표시를 돌려줍니다.
  function todo(label) {
    return '<span class="todo">TODO: ' + esc(label) + "</span>";
  }
  function orTodo(value, label) {
    var v = L(value);
    return v ? esc(v) : todo(label);
  }

  var ICONS = {
    github: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>',
    youtube: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z"/></svg>',
    mail: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    arrow: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    external: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>'
  };

  var MARK = '<svg class="brand-mark" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="16" cy="16" r="4" fill="var(--accent)"/></svg>';

  function statusBadge(status) {
    var map = { dev: "badge-dev", released: "badge-released", soon: "badge-soon" };
    var cls = map[status] || "badge-soon";
    return '<span class="badge ' + cls + '">' + esc(t("status." + (map[status] ? status : "soon"))) + "</span>";
  }

  // 외부 링크 버튼 (URL이 비어 있으면 로컬에서만 TODO 표시)
  function linkBtn(url, label, opts) {
    opts = opts || {};
    if (!url) return opts.todo ? todo(opts.todo) : "";
    var ext = /^https?:/.test(url);
    return '<a class="btn btn-sm' + (opts.primary ? " btn-primary" : "") + '" href="' + esc(url) + '"' +
      (ext ? ' target="_blank" rel="noopener"' : "") + ">" + (opts.icon ? ICONS[opts.icon] : "") + esc(label) + "</a>";
  }

  /* ---------- 최근 업데이트 (GitHub 마지막 커밋) ----------
     github URL(저장소 또는 /tree/<branch>/<폴더>)의 마지막 커밋이 RECENT_DAYS 안이면 배지를 돌려줍니다.
     GitHub API 호출 제한(IP당 시간당 60회) 때문에 결과를 브라우저에 6시간 저장합니다. */
  var RECENT_DAYS = 30, CACHE_MS = 6 * 3600 * 1000, memo = {};
  function parseRepo(url) {
    var m = /^https:\/\/github\.com\/([^/]+)\/([^/#?]+)(?:\/tree\/[^/]+\/(.+))?/.exec(url || "");
    return m ? { owner: m[1], repo: m[2], path: m[3] || "" } : null;
  }
  function lastCommit(url, cb) {
    var r = parseRepo(url);
    if (!r) return;
    var key = "lc:" + r.owner + "/" + r.repo + "/" + r.path;
    if (memo[key] !== undefined) return cb(memo[key]);
    try {
      var c = JSON.parse(localStorage.getItem(key) || "null");
      if (c && Date.now() - c.t < CACHE_MS) { memo[key] = c.d; return cb(c.d); }
    } catch (e) { /* 무시 */ }
    fetch("https://api.github.com/repos/" + r.owner + "/" + r.repo + "/commits?per_page=1" + (r.path ? "&path=" + encodeURIComponent(r.path) : ""))
      .then(function (res) { if (!res.ok) throw new Error(res.status); return res.json(); })
      .then(function (list) {
        var d = list && list[0] && list[0].commit && list[0].commit.committer ? list[0].commit.committer.date : null;
        memo[key] = d;
        try { localStorage.setItem(key, JSON.stringify({ t: Date.now(), d: d })); } catch (e) { /* 무시 */ }
        cb(d);
      })
      .catch(function () { memo[key] = null; });
  }
  // 대상 요소 안에 "최근 업데이트" 배지를 붙임 (30일 넘으면 아무것도 안 함)
  function recentBadge(url, target) {
    if (!url || !target) return;
    lastCommit(url, function (iso) {
      if (!iso || !target.isConnected || target.querySelector(".badge-recent")) return;
      var days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
      if (days < 0 || days > RECENT_DAYS) return;
      var when = days === 0 ? t("updated.today") : t("updated.daysAgo").replace("{n}", days);
      var b = document.createElement("span");
      b.className = "badge badge-recent";
      b.title = new Date(iso).toLocaleDateString(lang === "ko" ? "ko-KR" : "en-US");
      b.textContent = t("updated.recent") + " · " + when;
      target.appendChild(b);
    });
  }

  /* ---------- 헤더 / 푸터 ---------- */
  function renderHeader() {
    var el = document.getElementById("site-header");
    if (!el) return;
    var items = [
      ["/#services", "nav.services"],
      ["/#career", "nav.career"],
      ["/#projects", "nav.projects"],
      ["/games/", "nav.games"],
      ["/#youtube", "nav.youtube"],
      ["/#contact", "nav.contact"]
    ];
    el.className = "site-header";
    el.innerHTML =
      '<a class="skip-link" href="#main">' + esc(t("nav.skip")) + "</a>" +
      '<div class="container">' +
      '<a class="brand" href="/">' + MARK + "<span>" + esc(L(SITE.name)) + "</span></a>" +
      '<div class="header-actions">' +
      '<nav class="site-nav" id="site-nav" aria-label="Main"><ul>' +
      items.map(function (i) { return '<li><a href="' + i[0] + '">' + esc(t(i[1])) + "</a></li>"; }).join("") +
      "</ul></nav>" +
      '<button type="button" class="lang-toggle" id="lang-toggle" aria-label="' + esc(t("meta.switchLabel")) + '">' + esc(t("meta.switchTo")) + "</button>" +
      '<button type="button" class="nav-toggle" id="nav-toggle" aria-controls="site-nav" aria-expanded="false">' + esc(t("nav.menu")) + "</button>" +
      "</div></div>";

    var nav = document.getElementById("site-nav");
    var toggle = document.getElementById("nav-toggle");
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
    });
    document.getElementById("lang-toggle").addEventListener("click", function () {
      setLang(lang === "ko" ? "en" : "ko");
    });
  }

  function renderFooter() {
    var el = document.getElementById("site-footer");
    if (!el) return;
    var year = new Date().getFullYear();
    var since = SITE.copyrightSince || year;
    var links = [];
    if (SITE.email) links.push('<a href="mailto:' + esc(SITE.email) + '">' + esc(SITE.email) + "</a>");
    else links.push(todo("site.js email"));
    if (SITE.links && SITE.links.github) links.push('<a href="' + esc(SITE.links.github) + '" target="_blank" rel="noopener">GitHub</a>');
    if (SITE.links && SITE.links.youtube) links.push('<a href="' + esc(SITE.links.youtube) + '" target="_blank" rel="noopener">YouTube</a>');
    else links.push(todo("site.js links.youtube"));
    links.push('<a href="/resume/">' + esc(t("footer.resume")) + "</a>");
    links.push('<a href="/games/">' + esc(t("footer.games")) + "</a>");
    links.push('<a href="/privacy/">' + esc(t("footer.privacy")) + "</a>");

    el.className = "site-footer";
    el.innerHTML =
      '<div class="container footer-grid">' +
      '<ul class="footer-links">' + links.map(function (l) { return "<li>" + l + "</li>"; }).join("") + "</ul>" +
      "<div>© " + (since < year ? since + "–" : "") + year + " " + esc(SITE.copyrightName || L(SITE.name)) + "</div>" +
      "</div>";
  }

  // data-i18n="키" 요소의 텍스트를 교체
  function applyStatic() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (n) {
      n.textContent = t(n.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (n) {
      n.setAttribute("placeholder", t(n.getAttribute("data-i18n-placeholder")));
    });
  }

  function renderAll() {
    renderHeader();
    renderFooter();
    renderers.forEach(function (fn) {
      try { fn(); } catch (e) { console.error(e); }
    });
    applyStatic();
  }

  window.App = {
    SITE: SITE,
    isDev: isDev,
    get lang() { return lang; },
    setLang: setLang,
    t: t,
    L: L,
    esc: esc,
    todo: todo,
    orTodo: orTodo,
    icons: ICONS,
    statusBadge: statusBadge,
    linkBtn: linkBtn,
    recentBadge: recentBadge,
    onRender: function (fn) { renderers.push(fn); },
    // 페이지 body의 data-* 값 읽기
    page: function (key) { return document.body.getAttribute("data-" + key); }
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", renderAll);
  else renderAll();
})();
