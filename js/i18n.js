(function () {
  const STORAGE_KEY = "kdli-lang";

  function getLang() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "zh") return stored;
    const browser = navigator.language || "";
    return browser.toLowerCase().startsWith("zh") ? "zh" : "en";
  }

  function setLang(lang) {
    if (lang !== "en" && lang !== "zh") return;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    applyTranslations(lang);
    document.dispatchEvent(
      new CustomEvent("langchange", { detail: { lang } })
    );
  }

  function t(lang, key) {
    const keys = key.split(".");
    let value = TRANSLATIONS[lang];
    for (const k of keys) {
      if (value == null) return key;
      value = value[k];
    }
    return value ?? key;
  }

  function applyTranslations(lang) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = t(lang, key);
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = value;
      } else {
        el.textContent = value;
      }
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      el.innerHTML = t(lang, key);
    });

    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      const spec = el.getAttribute("data-i18n-attr");
      const [attr, key] = spec.split(":");
      el.setAttribute(attr, t(lang, key));
    });

    const toggle = document.getElementById("lang-toggle");
    if (toggle) toggle.textContent = t(lang, "langToggle");

    document.title = buildTitle(lang);
  }

  function buildTitle(lang) {
    const pageTitle = document.body.dataset.pageTitle;
    const site = t(lang, "siteName");
    return pageTitle ? `${t(lang, pageTitle)} | ${site}` : site;
  }

  function setupLangToggle() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("#lang-toggle");
      if (!btn) return;
      e.preventDefault();
      setLang(getLang() === "zh" ? "en" : "zh");
    });
  }

  window.KDLI = { getLang, setLang, t, applyTranslations };

  document.addEventListener("DOMContentLoaded", () => {
    const lang = getLang();
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    setupLangToggle();
  });
})();
