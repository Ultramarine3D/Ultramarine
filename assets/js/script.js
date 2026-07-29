(function () {
  'use strict';

  const translations = {
    en: {
      'nav.gallery': 'Gallery',
      'nav.docs': 'Documentation',
      'nav.about': 'About',
      'hero.eyebrow': 'Open 3D Printing',
      'hero.title': 'A printer built in the open.',
      'hero.lede': 'Ultramarine3D is a community-driven FFF 3D printer project — transparent hardware, approachable firmware, and honest documentation.',
      'hero.ctaGallery': 'See the build',
      'hero.ctaDocs': 'Read the docs',
      'gallery.title': 'Gallery',
      'gallery.sub': 'Renders, prototypes, and work-in-progress.',
      'gallery.item1': 'FFF Printer — concept',
      'gallery.item2': 'CoreXY v8.2 — frame',
      'gallery.item3': 'EVA toolhead',
      'gallery.coming': 'Coming soon',
      'docs.title': 'Documentation',
      'docs.sub': 'Download the project documents below.',
      'docs.doc1.title': 'Project Documentation',
      'docs.doc1.desc': 'Full project overview — FFF 3D printer design, parts, and rationale.',
      'docs.doc2.title': 'User Manual',
      'docs.doc2.desc': 'Assembly and operation guide — coming soon.',
      'docs.doc2.meta': 'To be added',
      'docs.download': 'Download',
      'docs.soon': 'Soon',
      'about.title': 'About the project',
      'about.p1': 'Ultramarine3D is an independent hardware project focused on building a reliable, approachable FFF 3D printer. Everything — from CAD and STLs to firmware and manuals — lives in one open repository.',
      'about.p2': 'The aim is simple: clear documentation, reproducible parts, and no hidden magic.',
      'about.fact1.k': 'Kinematics',
      'about.fact1.v': 'CoreXY',
      'about.fact2.k': 'Type',
      'about.fact2.v': 'FFF / FDM',
      'about.fact3.k': 'License',
      'about.fact3.v': 'Open source',
      'about.fact4.k': 'Status',
      'about.fact4.v': 'In development',
      'footer.built': 'Built with plain HTML, CSS, and JS — hosted on GitHub Pages.'
    },
    sk: {
      'nav.gallery': 'Galéria',
      'nav.docs': 'Dokumentácia',
      'nav.about': 'O projekte',
      'hero.eyebrow': 'Otvorená 3D tlač',
      'hero.title': 'Tlačiareň postavená otvorene.',
      'hero.lede': 'Ultramarine3D je komunitný projekt FFF 3D tlačiarne — transparentný hardvér, prístupný firmvér a poctivá dokumentácia.',
      'hero.ctaGallery': 'Pozrieť stavbu',
      'hero.ctaDocs': 'Čítať dokumentáciu',
      'gallery.title': 'Galéria',
      'gallery.sub': 'Vizualizácie, prototypy a rozpracované diely.',
      'gallery.item1': 'FFF Tlačiareň — koncept',
      'gallery.item2': 'CoreXY v8.2 — rám',
      'gallery.item3': 'EVA tlačová hlava',
      'gallery.coming': 'Čoskoro',
      'docs.title': 'Dokumentácia',
      'docs.sub': 'Stiahnite si projektové dokumenty nižšie.',
      'docs.doc1.title': 'Projektová dokumentácia',
      'docs.doc1.desc': 'Kompletný prehľad projektu — návrh FFF 3D tlačiarne, diely a zdôvodnenie.',
      'docs.doc2.title': 'Používateľský manuál',
      'docs.doc2.desc': 'Návod na stavbu a obsluhu — pripravujeme.',
      'docs.doc2.meta': 'Bude doplnené',
      'docs.download': 'Stiahnuť',
      'docs.soon': 'Čoskoro',
      'about.title': 'O projekte',
      'about.p1': 'Ultramarine3D je nezávislý hardvérový projekt zameraný na spoľahlivú a prístupnú FFF 3D tlačiareň. Všetko — od CAD a STL súborov po firmvér a manuály — žije v jednom otvorenom repozitári.',
      'about.p2': 'Cieľ je jednoduchý: zrozumiteľná dokumentácia, reprodukovateľné diely a žiadne skryté triky.',
      'about.fact1.k': 'Kinematika',
      'about.fact1.v': 'CoreXY',
      'about.fact2.k': 'Typ',
      'about.fact2.v': 'FFF / FDM',
      'about.fact3.k': 'Licencia',
      'about.fact3.v': 'Open source',
      'about.fact4.k': 'Stav',
      'about.fact4.v': 'Vo vývoji',
      'footer.built': 'Postavené čistým HTML, CSS a JS — hostené na GitHub Pages.'
    }
  };

  const STORAGE_LANG = 'um3d.lang';
  const STORAGE_THEME = 'um3d.theme';

  function detectInitialLang() {
    const saved = localStorage.getItem(STORAGE_LANG);
    if (saved === 'en' || saved === 'sk') return saved;
    const nav = (navigator.language || 'en').toLowerCase();
    return nav.startsWith('sk') || nav.startsWith('cs') ? 'sk' : 'en';
  }

  function detectInitialTheme() {
    const saved = localStorage.getItem(STORAGE_THEME);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyLang(lang) {
    const dict = translations[lang] || translations.en;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] != null) el.textContent = dict[key];
    });
    const label = document.getElementById('lang-label');
    if (label) label.textContent = lang === 'sk' ? 'EN' : 'SK';
    const btn = document.getElementById('lang-toggle');
    if (btn) btn.setAttribute('aria-label', lang === 'sk' ? 'Prepnúť na angličtinu' : 'Switch to Slovak');
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Lang
    let lang = detectInitialLang();
    applyLang(lang);
    const langBtn = document.getElementById('lang-toggle');
    langBtn.addEventListener('click', () => {
      lang = lang === 'sk' ? 'en' : 'sk';
      localStorage.setItem(STORAGE_LANG, lang);
      applyLang(lang);
    });

    // Theme
    let theme = detectInitialTheme();
    applyTheme(theme);
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_THEME, theme);
      applyTheme(theme);
    });

    // Year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();
