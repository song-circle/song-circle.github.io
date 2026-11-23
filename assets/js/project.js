/* ==========================================================================
   project.js — /projects/<slug>/ 상세 페이지 렌더링
   <body data-page="project" data-slug="<slug>"> 이고, 데이터는 data/projects.js
   ========================================================================== */
(function () {
  "use strict";
  var A = window.App, t = A.t, L = A.L, esc = A.esc, SITE = A.SITE;

  A.onRender(function () {
    var root = document.getElementById("page");
    if (!root || A.page("page") !== "project") return;
    var slug = A.page("slug");
    var p = (window.PROJECTS || []).filter(function (x) { return x.slug === slug; })[0];
    if (!p) {
      root.innerHTML = '<div class="container notfound"><p class="code">404</p><h1>' + esc(t("notFound.title")) + '</h1><p><a class="btn" href="/#projects">' + esc(t("nav.projects")) + "</a></p></div>";
      return;
    }

    var buttons = [
      A.linkBtn(p.download, t("projects.download"), { primary: true, icon: "external" }),
      A.linkBtn(p.github, "GitHub", { icon: "github", todo: "GitHub 링크" }),
      A.linkBtn(p.video, t("projects.video"), { icon: "youtube", todo: "영상 링크" })
    ].join("");

    var sections = (p.sections || []).map(function (s) {
      var items = (s.items || []).map(L).filter(Boolean);
      var body = items.length
        ? "<ul>" + items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul>"
        : "<p>" + A.orTodo(s.body, L(s.heading)) + "</p>";
      return "<h2>" + esc(L(s.heading)) + "</h2>" + body;
    }).join("");

    root.innerHTML =
      '<div class="container page-head">' +
      '<p class="breadcrumb"><a href="/">' + esc(L(SITE.name)) + '</a> / <a href="/#projects">' + esc(t("nav.projects")) + "</a> / " + esc(L(p.title)) + "</p>" +
      '<div class="page-meta">' + A.statusBadge(p.status) +
      (p.tags || []).map(function (x) { return '<span class="tag">' + esc(x) + "</span>"; }).join("") + "</div>" +
      '<h1 class="page-title">' + esc(L(p.title)) + "</h1>" +
      '<p class="page-lead">' + esc(L(p.summary)) + "</p></div>" +
      '<div class="container page-body"><div class="prose">' +
      '<div class="link-row">' + buttons + "</div>" +
      sections +
      "</div></div>";
  });
})();
