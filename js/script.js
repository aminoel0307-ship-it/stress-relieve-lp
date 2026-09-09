(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var cfg = window.SITE_CONFIG || {};
    var lineUrl = cfg.lineUrl || "#";

    function applyLinks(selector, url) {
      document.querySelectorAll(selector).forEach(function (link) {
        link.setAttribute("href", url);
        if (/^https?:\/\//.test(url)) {
          link.setAttribute("target", "_blank");
          link.setAttribute("rel", "noopener noreferrer");
        }
      });
    }
    // 相談・お問い合わせ系CTAはすべて公式LINEに統一
    applyLinks(".js-cta-consult, .js-cta-line", lineUrl);

    // フッター年号
    var yearEl = document.getElementById("js-year");
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }

    // 控えめなスクロールイン演出（prefers-reduced-motion時は即表示）
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var targets = document.querySelectorAll(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    targets.forEach(function (el) { observer.observe(el); });
  });
})();
