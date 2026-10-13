/* ==========================================================================
   Builds the page from js/data.js. You normally don't need to edit this file.
   ========================================================================== */
(function () {
  'use strict';

  const data = window.PORTFOLIO;
  const root = document.documentElement;

  if (!data) {
    document.getElementById('sections').textContent =
      'Could not find js/data.js. Check that the file exists and the script tag in index.html is correct.';
    return;
  }

  /* ---------- Small helpers ---------- */

  // Appends strings, nodes and arrays of them; skips null / false / empty.
  function add(parent, kid) {
    if (kid === null || kid === undefined || kid === false || kid === '') return;
    if (Array.isArray(kid)) { kid.forEach((k) => add(parent, k)); return; }
    parent.appendChild(typeof kid === 'object' ? kid : document.createTextNode(String(kid)));
  }

  // h('a', { href: '#' }, 'text', childNode) -> <a href="#">text<childNode/></a>
  function h(tag, attrs, ...kids) {
    const node = document.createElement(tag);
    Object.keys(attrs || {}).forEach((key) => {
      const value = attrs[key];
      if (value === null || value === undefined || value === false || value === '') return;
      node.setAttribute(key, value);
    });
    kids.forEach((kid) => add(node, kid));
    return node;
  }

  function link(label, url, extra) {
    if (!url) return null;
    const external = /^https?:/i.test(url);
    return h('a', Object.assign({
      href: url,
      target: external ? '_blank' : null,
      rel: external ? 'noopener noreferrer' : null
    }, extra), label);
  }

  const hasItems = (list) => Array.isArray(list) && list.length > 0;

  /* ---------- Section renderers ---------- */

  function renderProjects(items) {
    return h('div', { class: 'project-grid' }, items.map((p) => {
          const cover = p.image
            ? h('img', { class: 'project-cover', src: p.image, alt: p.imageAlt || 'Screenshot of ' + p.title })
            : h('div', { class: 'project-cover project-cover-fallback', 'aria-hidden': 'true' }, (p.title || '?').charAt(0));
          const buttons = [
            link('Live site', p.live, { class: 'project-button project-button-primary', 'aria-label': 'Live site of ' + p.title }),
            link('Source code', p.source, { class: 'project-button project-button-secondary', 'aria-label': 'Source code of ' + p.title })
          ].filter(Boolean);

          return h('article', { class: 'project-card' },
            cover,
            h('div', { class: 'project-card-content' },
              h('div', { class: 'project-title-row' },
                h('h3', { class: 'entry-title' }, p.title),
                p.status ? h('span', { class: 'project-status' }, p.status) : null),
              p.description ? h('p', { class: 'project-description' }, p.description) : null,
              hasItems(p.tech)
                ? h('ul', { class: 'project-tags', 'aria-label': 'Technologies used' },
                    p.tech.map((technology) => h('li', {}, technology)))
                : null,
              buttons.length
                ? h('div', { class: 'project-actions' + (buttons.length === 1 ? ' single-action' : '') }, buttons)
                : null));
        }));
  }

  function renderSkills(groups) {
    return h('div', { class: 'skills' },
      groups.map((g) =>
        h('div', { class: 'skill-group' },
          h('h3', { class: 'skill-group-title' }, g.category),
          h('div', { class: 'skill-group-tags' },
            (g.items || []).map((item) => h('span', { class: 'skill-tag' }, item)))))
    );
  }

  function renderCertificates(items) {
    return items.map((c) =>
      h('article', { class: 'entry' },
        h('div', { class: 'entry-head' },
          h('h3', { class: 'entry-title' }, c.title),
          c.date ? h('span', { class: 'meta' }, c.date) : null),
        c.issuer ? h('p', { class: 'entry-text' }, c.issuer) : null,
        c.link
          ? h('p', { class: 'entry-links' },
              link('View credential', c.link, { 'aria-label': 'View credential for ' + c.title }))
          : null)
    );
  }

  function renderPublications(items) {
    return h('div', { class: 'research-grid' }, items.map((p) =>
      h('article', { class: 'entry research-entry' },
        p.year ? h('p', { class: 'meta' }, p.year) : null,
        h('h3', { class: 'entry-title' }, p.title),
        p.venue ? h('p', { class: 'entry-text' }, p.venue) : null,
        p.note ? h('p', { class: 'meta' }, p.note) : null,
        p.link
          ? h('p', { class: 'entry-links' },
              link('Read paper', p.link, { 'aria-label': 'Read ' + p.title }))
          : null)
    ));
  }

  function renderEducation(items) {
    return h('div', { class: 'education-grid' }, items.map((e) =>
      h('article', { class: 'entry education-entry' },
        e.period ? h('p', { class: 'meta' }, e.period) : null,
        h('h3', { class: 'entry-title' }, e.degree),
        e.school ? h('p', { class: 'entry-text' }, e.school) : null,
        e.detail ? h('p', { class: 'meta' }, e.detail) : null)
    ));
  }

  function renderContact(c, profile, links) {
    return h('div', { class: 'contact-layout' },
      c.note ? h('p', { class: 'entry-text contact-note' }, c.note) : null,
      h('div', { class: 'contact-side' },
        h('div', { class: 'contact-actions' },
          c.email ? link('Email me', 'mailto:' + c.email, { class: 'contact-button contact-primary' }) : null,
          (links || []).map((l) => link(l.label, l.url, { class: 'contact-button contact-secondary' }))),
        profile.location ? h('p', { class: 'meta contact-location' }, profile.location) : null));
  }

  /* ---------- Page sections in display order ---------- */

  const sections = [
    { id: 'projects',     title: 'Projects',     show: hasItems(data.projects),     body: () => renderProjects(data.projects) },
    { id: 'skills',       title: 'Skills',       show: hasItems(data.skills),       body: () => renderSkills(data.skills) },
    { id: 'certificates', title: 'Certificates', show: hasItems(data.certificates), body: () => renderCertificates(data.certificates) },
    { id: 'publications', title: 'Research',    show: hasItems(data.publications), body: () => renderPublications(data.publications) },
    { id: 'education',    title: 'Education',    show: hasItems(data.education),    body: () => renderEducation(data.education) },
    { id: 'contact',      title: 'Contact',      show: !!data.contact,              body: () => renderContact(data.contact || {}, data.profile || {}, data.links) }
  ].filter((s) => s.show);

  /* ---------- Build the page ---------- */

  const profile = data.profile || {};

  document.title = [profile.name, profile.role].filter(Boolean).join(' | ');

  // Header
  const brand = document.getElementById('brand');
  brand.textContent = profile.name || 'Portfolio';

  const nav = document.getElementById('nav');
  sections.forEach((s) => add(nav, h('a', { href: '#' + s.id, 'data-section': s.id }, s.title)));

  // Hero
  const hero = document.getElementById('top');
  const heroSummary = h('div', { class: 'hero-summary' },
    (profile.summary || []).map((text) => h('p', { class: 'hero-text' }, text)));
  const heroContent = h('div', { class: 'hero-content' },
    h('h1', { class: 'hero-name' }, profile.name),
    profile.role ? h('p', { class: 'hero-role' }, profile.role) : null,
    heroSummary,
    h('div', { class: 'hero-links' },
      data.contact && data.contact.email
        ? link('Email me', 'mailto:' + data.contact.email, { class: 'button button-solid' })
        : null,
      profile.resume
        ? link('Download resume', profile.resume, { class: 'button button-outline', download: true })
        : null,
      (data.links || []).map((l) => link(l.label, l.url))));

  const heroPhoto = profile.photo
    ? h('img', { class: 'hero-photo', src: profile.photo, alt: 'Photo of ' + (profile.name || 'me'), width: 320, height: 400 })
    : null;

  add(hero, h('div', { class: 'hero-layout' }, heroPhoto, heroContent));

  // Sections
  const container = document.getElementById('sections');
  sections.forEach((s) => {
    const headingId = s.id + '-heading';
    add(container,
      h('section', { class: 'section', id: s.id, 'aria-labelledby': headingId },
        h('h2', { class: 'section-title', id: headingId }, s.title),
        h('div', { class: 'section-body' }, s.body())));
  });

  // Footer
  add(document.getElementById('footer'),
    h('p', { class: 'meta' }, '\u00A9 ' + new Date().getFullYear() + ' ' + (profile.name || '')));

  /* ---------- Theme toggle ---------- */

  const toggle = document.getElementById('theme-toggle');

  function syncToggle() {
    const dark = root.getAttribute('data-theme') === 'dark';
    toggle.textContent = dark ? 'Light mode' : 'Dark mode';
    toggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#0f1114' : '#fcfcfd');
  }

  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) { /* private mode: ignore */ }
    syncToggle();
  });

  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');

  function setMenu(open) {
    menuToggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    header.classList.toggle('menu-open', open);
  }

  menuToggle.addEventListener('click', () => {
    setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', () => setMenu(false));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });
  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) setMenu(false);
  });
  window.addEventListener('scroll', () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }, { passive: true });

  const navLinks = [...nav.querySelectorAll('a[data-section]')];
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((navLink) => {
        const active = navLink.dataset.section === entry.target.id;
        navLink.classList.toggle('is-active', active);
        if (active) navLink.setAttribute('aria-current', 'page');
        else navLink.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });
  sections.forEach((s) => sectionObserver.observe(document.getElementById(s.id)));

  syncToggle();
})();
