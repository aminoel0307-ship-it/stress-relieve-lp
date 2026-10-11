/**
 * LINE message copy helper (English version)
 *
 * Copies a fixed message so the team can tell the inquiry came from the
 * English landing page. The LINE URL itself comes from ../js/config.js
 * (shared with the Japanese page) and is not changed here.
 */
(function () {
  "use strict";

  var LINE_MESSAGE = "Stress Relieve International";

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      try {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.top = "-1000px";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        var ok = document.execCommand("copy");
        document.body.removeChild(ta);
        ok ? resolve() : reject(new Error("execCommand copy failed"));
      } catch (e) {
        reject(e);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var toast = document.querySelector(".copy-toast");
    var toastTimer = null;

    function showToast(message) {
      if (!toast) return;
      toast.textContent = message;
      toast.classList.add("is-visible");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () {
        toast.classList.remove("is-visible");
      }, 3200);
    }

    // 「相談内容をコピーする」ボタン
    document.querySelectorAll(".js-copy-line-message").forEach(function (btn) {
      btn.addEventListener("click", function () {
        copyText(LINE_MESSAGE)
          .then(function () {
            showToast("Copied! Open LINE and paste the message.");
          })
          .catch(function () {
            showToast("Couldn't copy. Press and hold the text above to copy it.");
          });
      });
    });

    // LINE系CTA（公式LINEで質問する／LINEで質問）タップ時も、遷移を妨げずに自動コピー
    document.querySelectorAll(".js-cta-line").forEach(function (link) {
      link.addEventListener("click", function () {
        copyText(LINE_MESSAGE)
          .then(function () {
            showToast("Copied! Open LINE and paste the message.");
          })
          .catch(function () {
            /* コピーに失敗してもLINEへの遷移自体は妨げない */
          });
      });
    });
  });
})();
