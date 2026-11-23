/* ==========================================================================
   home.js — 메인 페이지 렌더링
   데이터: window.SERVICES / CAREER / SKILLS / PROJECTS / GAMES / VIDEOS (data/*.js)
   ========================================================================== */
(function () {
  "use strict";
  var A = window.App, t = A.t, L = A.L, esc = A.esc, SITE = A.SITE;

  function $(id) { return document.getElementById(id); }
  function tags(list) {
    if (!list || !list.length) return "";
    return '<ul class="tags">' + list.map(function (x) { return '<li class="tag">' + esc(x) + "</li>"; }).join("") + "</ul>";
  }

  /* ---------- Hero ---------- */
  function renderHero() {
    $("hero-name").textContent = L(SITE.name);
    var gh = $("hero-github");
    if (SITE.links && SITE.links.github) { gh.href = SITE.links.github; gh.innerHTML = A.icons.github + "<span>" + esc(t("hero.ctaGithub")) + "</span>"; }
    else gh.hidden = true;
  }

  /* ---------- 서비스 ---------- */
  function renderServices() {
    $("services-list").innerHTML = (window.SERVICES || []).map(function (s, i) {
      return '<article class="card">' +
        '<div class="card-num">' + String(i + 1).padStart(2, "0") + "</div>" +
        "<h3>" + esc(t("services." + s.id + ".title")) + "</h3>" +
        "<p>" + esc(t("services." + s.id + ".desc")) + "</p>" +
        '<div class="card-foot">' + tags(s.tags) + "</div>" +
        "</article>";
    }).join("");
  }

  /* ---------- 경력 ---------- */
  function careerList(points) {
    points = (points || []).map(L).filter(Boolean);
    return points.length ? "<ul>" + points.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul>" : "";
  }

  function renderCareer() {
    $("career-list").innerHTML = (window.CAREER || []).map(function (c) {
      var meta = (L(c.period) ? "<span>" + esc(L(c.period)) + "</span>" : A.todo("기간")) +
        (c.current ? '<span class="badge badge-released">' + esc(t("career.current")) + "</span>" : "");
      var org = (L(c.company) ? "<strong>" + esc(L(c.company)) + "</strong>" : A.todo("회사명")) +
        (L(c.role) ? " · " + esc(L(c.role)) : " " + A.todo("직무")) +
        (L(c.domain) ? '<span class="tl-domain">' + esc(L(c.domain)) + "</span>" : "");
      var projects = (c.projects || []).map(function (pj) {
        return '<div class="tl-proj"><h4>' + esc(L(pj.name)) +
          (L(pj.role) ? ' <span class="tl-proj-role">' + esc(L(pj.role)) + "</span>" : "") + "</h4>" +
          careerList(pj.points) + "</div>";
      }).join("");
      return '<li class="tl-item' + (c.current ? " current" : "") + '">' +
        '<div class="tl-meta">' + meta + "</div>" +
        '<h3 class="tl-title">' + esc(L(c.title)) + "</h3>" +
        '<p class="tl-org">' + org + "</p>" +
        '<div class="tl-body">' + careerList(c.points) + projects +
        ((c.stack && c.stack.length) ? tags(c.stack) : A.todo("사용 기술")) +
        "</div></li>";
    }).join("");

    var edu = window.EDUCATION || [];
    $("education-list").innerHTML = edu.length
      ? '<h3 class="edu-title">' + esc(t("career.education")) + "</h3>" +
        edu.map(function (e) {
          return '<p class="edu-item"><span class="tl-meta">' + esc(L(e.period)) + "</span> <strong>" + esc(L(e.school)) + "</strong> " +
            esc([L(e.major), L(e.status)].filter(Boolean).join(" · ")) + "</p>";
        }).join("")
      : "";
  }

  /* ---------- 기술 스택 ---------- */
  function renderSkills() {
    $("skills-list").innerHTML = (window.SKILLS || []).map(function (s) {
      return '<div class="skill"><div class="skill-name">' + esc(s.name) + '</div><div class="skill-use">' +
        A.orTodo(s.use, s.name + " 사용처") + "</div></div>";
    }).join("");
  }

  /* ---------- 프로젝트 ---------- */
  function renderProjects() {
    $("projects-list").innerHTML = (window.PROJECTS || []).filter(function (p) { return !p.hidden; }).map(function (p) {
      var foot = [];
      if (p.detail) foot.push('<a class="btn btn-sm btn-primary" href="/projects/' + esc(p.slug) + '/">' + esc(t("projects.detail")) + A.icons.arrow + "</a>");
      foot.push(A.linkBtn(p.github, "GitHub", { icon: "github", todo: "GitHub 링크" }));
      foot.push(A.linkBtn(p.download, t("projects.download"), { icon: "external" }));
      foot.push(A.linkBtn(p.video, t("projects.video"), { icon: "youtube" }));
      var media = p.image
        ? '<div class="card-media card-media-shot"><img src="' + esc(p.image) + '" alt="' + esc(L(p.title)) + ' 화면" loading="lazy"></div>'
        : "";
      return '<article class="card">' + media +
        '<div class="card-top"><h3>' + esc(L(p.title)) + '</h3><span class="badges" data-recent="' + esc(p.github || "") + '">' + A.statusBadge(p.status) + "</span></div>" +
        "<p>" + esc(L(p.summary)) + "</p>" +
        tags(p.tags) +
        '<div class="card-foot">' + foot.join("") + "</div>" +
        "</article>";
    }).join("");
  }

  function renderRecent() {
    document.querySelectorAll("#projects-list [data-recent]").forEach(function (el) {
      A.recentBadge(el.getAttribute("data-recent"), el);
    });
  }

  /* ---------- 게임 미리보기 ---------- */
  function renderGames() {
    var list = (window.GAMES || []).filter(function (g) { return g.listed !== false; }).slice(0, 3);
    $("games-list").innerHTML = list.length
      ? list.map(A.gameCard).join("")
      : '<div class="empty" style="grid-column:1/-1">' + A.statusBadge("soon") + "<p style=\"margin:10px 0 0\">" + esc(t("games.empty")) + "</p></div>";
  }

  /* ---------- 유튜브 ---------- */
  function renderVideos() {
    // 가로 본편을 먼저(최신순), 그다음 Shorts(최신순)
    var vids = (window.VIDEOS || []).slice().sort(function (a, b) {
      if (!!a.short !== !!b.short) return a.short ? 1 : -1;
      return (b.date || "").localeCompare(a.date || "");
    }).slice(0, 3);
    $("videos-list").innerHTML = vids.length
      ? vids.map(function (v) {
          var url = "https://www.youtube.com/watch?v=" + encodeURIComponent(v.id);
          var thumb = "https://i.ytimg.com/vi/" + encodeURIComponent(v.id) + "/hqdefault.jpg";
          return '<a class="card" href="' + url + '" target="_blank" rel="noopener">' +
            '<div class="card-media"><img src="' + thumb + '" alt="" loading="lazy" width="480" height="360"></div>' +
            "<h3>" + esc(L(v.title)) + "</h3>" +
            (v.date ? '<p class="card-num" style="margin:0">' + esc(v.date) + "</p>" : "") +
            "</a>";
        }).join("")
      : A.todo("data/videos.js 에 영상 추가");

    var channels = SITE.youtubeChannels || [];
    $("youtube-channel").innerHTML = '<div class="grid grid-2">' + channels.map(function (c) {
      if (!c.url) return A.todo("data/site.js youtubeChannels: " + c.name + " URL");
      return '<a class="card channel" href="' + esc(c.url) + '" target="_blank" rel="noopener">' +
        '<div class="card-top"><h3>' + esc(L(c.name)) + "</h3>" + A.icons.youtube + "</div>" +
        "<p>" + esc(L(c.desc)) + "</p>" +
        '<div class="card-foot"><span class="btn btn-sm">' + esc(t("youtube.channel")) + A.icons.arrow + "</span></div></a>";
    }).join("") + "</div>";
  }

  /* ---------- 연락처 ---------- */
  function renderContact() {
    $("contact-email").innerHTML = SITE.email
      ? '<a href="mailto:' + esc(SITE.email) + '">' + esc(SITE.email) + "</a>"
      : esc(t("contact.emailPending")) + " " + A.todo("data/site.js email");
  }

  A.onRender(function () {
    renderHero();
    renderServices();
    renderCareer();
    renderSkills();
    renderProjects();
    renderRecent();
    renderGames();
    renderVideos();
    renderContact();
  });

  /* ---------- 연락처 탭 (한 번만 연결) ---------- */
  var tabs = [$("tab-outsourcing"), $("tab-recruit")];
  function selectTab(id, focus) {
    tabs.forEach(function (tab) {
      var on = tab.getAttribute("aria-controls") === id;
      tab.setAttribute("aria-selected", String(on));
      tab.tabIndex = on ? 0 : -1;
      $(tab.getAttribute("aria-controls")).hidden = !on;
      if (on && focus) tab.focus();
    });
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () { selectTab(tab.getAttribute("aria-controls")); });
    tab.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      var next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
      selectTab(next.getAttribute("aria-controls"), true);
    });
  });
  // Hero 버튼(#contact-outsourcing / #contact-recruit) → 해당 탭 열고 이동
  function syncHash() {
    var h = location.hash.slice(1);
    if (h === "contact-outsourcing" || h === "contact-recruit") {
      selectTab(h);
      $("contact").scrollIntoView();
    }
  }
  window.addEventListener("hashchange", syncHash);
  // 같은 해시를 다시 눌러도 hashchange가 안 일어나므로 클릭도 처리
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href="#contact-outsourcing"], a[href="#contact-recruit"]');
    if (a && a.getAttribute("href") === location.hash) { e.preventDefault(); syncHash(); }
  });
  syncHash();
  // 이미지·폰트 로드로 위치가 바뀌므로 로드 후 한 번 더 맞춤
  window.addEventListener("load", syncHash);

  /* ---------- 폼 전송 ---------- */
  // 엔드포인트(Formspree 등)가 있으면 fetch로 전송, 없으면 메일 앱(mailto)으로 대체
  document.querySelectorAll("form[data-form]").forEach(function (form) {
    var kind = form.getAttribute("data-form");
    var status = form.querySelector(".form-status");
    var button = form.querySelector('button[type="submit"]');

    function show(msg, cls) { status.textContent = msg; status.className = "form-status full " + (cls || ""); }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var endpoint = SITE.forms && SITE.forms[kind];
      var data = new FormData(form);
      if (data.get("_gotcha")) return; // 스팸 봇

      if (endpoint) {
        button.disabled = true;
        show(t("contact.sending"));
        fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
          .then(function (res) {
            if (!res.ok) throw new Error(res.status);
            form.reset();
            show(t("contact.sent"), "ok");
          })
          .catch(function () { show(t("contact.failed") + (SITE.email ? " (" + SITE.email + ")" : ""), "err"); })
          .then(function () { button.disabled = false; });
        return;
      }

      if (SITE.email) {
        var lines = [];
        form.querySelectorAll("input[name], select[name], textarea[name]").forEach(function (el) {
          if (el.name.charAt(0) === "_" || !el.value) return;
          var label = form.querySelector('label[for="' + el.id + '"]');
          var text = el.tagName === "SELECT" ? el.options[el.selectedIndex].text : el.value;
          lines.push((label ? label.textContent.trim() : el.name) + ": " + text);
        });
        location.href = "mailto:" + SITE.email +
          "?subject=" + encodeURIComponent(data.get("_subject") || "") +
          "&body=" + encodeURIComponent(lines.join("\n"));
        show(t("contact.mailtoNote"));
        return;
      }

      show(t("contact.unavailable"), "err");
    });
  });
})();
