(function () {
  const BASE = getBasePath();

  const NAV = [
    { id: "home", href: `${BASE}index.html`, key: "nav.home" },
    {
      id: "about",
      href: `${BASE}about/mission.html`,
      key: "nav.about",
      children: [
        { href: `${BASE}about/mission.html`, key: "about.mission" },
        { href: `${BASE}about/people.html`, key: "about.people" },
        { href: `${BASE}about/annual-report.html`, key: "about.annualReport" },
      ],
    },
    {
      id: "research",
      href: `${BASE}research/capital-market.html`,
      key: "nav.research",
      children: [
        {
          href: `${BASE}research/capital-market.html`,
          key: "research.capitalMarket",
          children: [
            {
              href: `${BASE}research/capital-market.html#database`,
              key: "research.database",
            },
            {
              href: `${BASE}research/capital-market.html#interviews`,
              key: "research.interviews",
            },
            {
              href: `${BASE}research/capital-market.html#reports`,
              key: "research.reports",
            },
          ],
        },
        {
          href: `${BASE}research/law-market-economy.html`,
          key: "research.lawMarket",
        },
        {
          href: `${BASE}research/markets-ethics.html`,
          key: "research.ethics",
        },
      ],
    },
    {
      id: "events",
      href: `${BASE}events/lectures.html`,
      key: "nav.events",
      children: [
        { href: `${BASE}events/lectures.html`, key: "events.lectures" },
        { href: `${BASE}events/symposia.html`, key: "events.symposia" },
        { href: `${BASE}events/student-events.html`, key: "events.student" },
      ],
    },
    {
      id: "opportunities",
      href: `${BASE}opportunities/grants.html`,
      key: "nav.opportunities",
      children: [
        {
          href: `${BASE}opportunities/grants.html`,
          key: "opportunities.grants",
        },
        {
          href: `${BASE}opportunities/student-research.html`,
          key: "opportunities.studentResearch",
        },
        {
          href: `${BASE}opportunities/hiring.html`,
          key: "opportunities.hiring",
        },
      ],
    },
  ];

  function getBasePath() {
    const path = window.location.pathname;
    if (
      path.includes("/about/") ||
      path.includes("/research/") ||
      path.includes("/events/") ||
      path.includes("/opportunities/")
    ) {
      return "../";
    }
    return "";
  }

  function renderNavItem(item, lang, activeSection) {
    const label = KDLI.t(lang, item.key);
    const isActive = activeSection === item.id;
    const hasChildren = item.children && item.children.length > 0;

    if (!hasChildren) {
      return `<li class="nav-item${isActive ? " is-active" : ""}">
        <a href="${item.href}">${label}</a>
      </li>`;
    }

    const sub = item.children
      .map((child) => {
        const childLabel = KDLI.t(lang, child.key);
        if (child.children) {
          const nested = child.children
            .map(
              (c) =>
                `<li><a href="${c.href}">${KDLI.t(lang, c.key)}</a></li>`
            )
            .join("");
          return `<li class="nav-submenu-group">
            <a href="${child.href}" class="nav-submenu-title">${childLabel}</a>
            <ul class="nav-submenu-nested">${nested}</ul>
          </li>`;
        }
        return `<li><a href="${child.href}">${childLabel}</a></li>`;
      })
      .join("");

    return `<li class="nav-item has-dropdown${isActive ? " is-active" : ""}">
      <a href="${item.href}" class="nav-parent">${label}</a>
      <ul class="nav-dropdown">${sub}</ul>
    </li>`;
  }

  function renderHeader(activeSection, lang) {
    const navItems = NAV.map((item) =>
      renderNavItem(item, lang, activeSection)
    ).join("");

    return `<header class="site-header">
      <div class="header-inner">
        <a href="${BASE}index.html" class="brand">
          <img class="brand-logo" src="${BASE}logo.png" alt="${KDLI.t(lang, "universityName")}" width="180" height="48" />
          <span class="brand-text">
            <span class="brand-name" data-i18n="siteName"></span>
            <span class="brand-affiliation" data-i18n="universityName"></span>
            <span class="brand-tagline" data-i18n="tagline"></span>
          </span>
        </a>
        <button class="nav-toggle" id="nav-toggle" aria-label="Menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
        <nav class="main-nav" id="main-nav" aria-label="Main">
          <ul class="nav-list">${navItems}</ul>
          <button type="button" class="lang-btn" id="lang-toggle" aria-label="Switch language">${KDLI.t(lang, "langToggle")}</button>
        </nav>
      </div>
    </header>`;
  }

  function renderFooter() {
    return `<footer class="site-footer">
      <div class="footer-inner">
        <section class="footer-contact" id="contact">
          <h2 data-i18n="contact.title"></h2>
          <dl class="contact-list">
            <div>
              <dt data-i18n="contact.addressLabel"></dt>
              <dd data-i18n="contact.address"></dd>
            </div>
            <div>
              <dt data-i18n="contact.emailLabel"></dt>
              <dd><a href="mailto:ilms@dukekunshan.edu.cn">ilms@dukekunshan.edu.cn</a></dd>
            </div>
          </dl>
        </section>
        <p class="footer-copy" data-i18n="footer.rights"></p>
      </div>
    </footer>`;
  }

  function initMobileNav() {
    const toggle = document.getElementById("nav-toggle");
    const nav = document.getElementById("main-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function refreshChrome() {
    const headerSlot = document.getElementById("site-header");
    const footerSlot = document.getElementById("site-footer");
    const active = document.body.dataset.nav || "home";
    const lang = KDLI.getLang();

    if (headerSlot) headerSlot.innerHTML = renderHeader(active, lang);
    if (footerSlot) footerSlot.innerHTML = renderFooter();

    KDLI.applyTranslations(lang);
    initMobileNav();
  }

  document.addEventListener("DOMContentLoaded", refreshChrome);
  document.addEventListener("langchange", refreshChrome);
})();
