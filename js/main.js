(function () {
  'use strict';
  const data = window.PORTFOLIO;
  const root = document.documentElement;
  if (!data) return;

  function add(parent, kid) {
    if (kid === null || kid === undefined || kid === false || kid === '') return;
    if (Array.isArray(kid)) { kid.forEach((item) => add(parent, item)); return; }
    parent.appendChild(typeof kid === 'object' ? kid : document.createTextNode(String(kid)));
  }
  function h(tag, attrs, ...kids) {
    const node = document.createElement(tag);
    Object.keys(attrs || {}).forEach((key) => {
      const value = attrs[key];
      if (value !== null && value !== undefined && value !== false && value !== '') node.setAttribute(key, value);
    });
    kids.forEach((kid) => add(node, kid));
    return node;
  }
  function link(label, url, extra) {
    if (!url) return null;
    const external = /^https?:/i.test(url);
    return h('a', Object.assign({ href: url, target: external ? '_blank' : null, rel: external ? 'noopener noreferrer' : null }, extra), label);
  }
  function socialIcon(label) {
    const path = label === 'GitHub'
      ? 'M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.84c.85 0 1.7.11 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z'
      : 'M6.5 3A3.5 3.5 0 0 0 3 6.5v11A3.5 3.5 0 0 0 6.5 21h11a3.5 3.5 0 0 0 3.5-3.5v-11A3.5 3.5 0 0 0 17.5 3h-11ZM7 8.2A1.2 1.2 0 1 1 7 5.8a1.2 1.2 0 0 1 0 2.4ZM5.9 18V9.5h2.2V18H5.9Zm3.5 0V9.5h2.1v1.16h.03c.3-.57 1.04-1.38 2.53-1.38 2.71 0 3.21 1.78 3.21 4.1V18h-2.2v-4.1c0-.98-.02-2.23-1.36-2.23-1.36 0-1.57 1.06-1.57 2.16V18H9.4Z';
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'social-icon');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    iconPath.setAttribute('d', path);
    svg.appendChild(iconPath);
    return svg;
  }
  function socialButtons(links, className) {
    return h('div', { class: className || 'social-links' }, (links || []).map((item) =>
      h('a', { href: item.url, target: '_blank', rel: 'noopener noreferrer', class: 'social-button', 'aria-label': item.label, title: item.label },
        socialIcon(item.label), h('span', {}, item.label))));
  }
  const hasItems = (list) => Array.isArray(list) && list.length > 0;
  function renderProjects(items) {
    return h('div', { class: 'project-grid' }, items.map((p) => {
      const buttons = [
        link('View Details', 'project.html?id=' + encodeURIComponent(p.slug), { class: 'project-button project-button-primary' }),
        link('Live site', p.live, { class: 'project-button project-button-secondary', 'aria-label': 'Live site of ' + p.title })
      ].filter(Boolean);
      return h('article', { class: 'project-card' },
        p.image ? h('img', { class: 'project-cover', src: p.image, alt: p.imageAlt || 'Screenshot of ' + p.title }) :
          h('div', { class: 'project-cover project-cover-fallback', 'aria-hidden': 'true' }, p.title.charAt(0)),
        h('div', { class: 'project-card-content' },
          h('div', { class: 'project-title-row' }, h('h3', { class: 'entry-title' }, p.title)),
          h('p', { class: 'project-description' }, p.description),
          h('ul', { class: 'project-tags', 'aria-label': 'Technologies used' }, p.tech.map((item) => h('li', {}, item))),
          h('div', { class: 'project-actions' }, buttons)));
    }));
  }
  function renderSkills(groups) {
    return h('div', { class: 'skills' }, groups.map((group) => {
      const items = group.items.map((item) => typeof item === 'string' ? item : item.name);
      const countLabel = items.length === 1 ? '1 skill' : items.length + ' skills';
      return h('div', { class: 'skill-group' },
        h('div', { class: 'skill-group-head' },
          h('h3', { class: 'skill-group-title' }, group.category),
          h('span', { class: 'meta' }, countLabel)),
        h('ul', { class: 'skill-group-tags', 'aria-label': group.category + ' skills' },
          items.map((item) => h('li', { class: 'skill-tag' }, item))));
    }));
  }
  function renderAbout(about) {
    return h('div', { class: 'about-layout' },
      h('div', { class: 'about-copy' }, (about.paragraphs || []).map((text) => h('p', { class: 'entry-text' }, text))),
      h('div', { class: 'about-interests' }, h('h3', { class: 'skill-group-title' }, 'What I enjoy'),
        h('ul', { class: 'interest-list' }, (about.interests || []).map((item) => h('li', {}, item)))));
  }
  function renderEducation(items) {
    return h('div', { class: 'education-grid' }, items.map((e) => h('article', { class: 'entry education-entry' },
      h('p', { class: 'meta' }, e.period), h('h3', { class: 'entry-title' }, e.degree),
      h('p', { class: 'entry-text' }, e.school), h('p', { class: 'meta' }, e.detail))));
  }
  function renderExperience(items) {
    return items.map((item) => h('article', { class: 'entry' },
      h('div', { class: 'entry-head' }, h('h3', { class: 'entry-title' }, item.role), h('span', { class: 'meta' }, item.period)),
      h('p', { class: 'entry-text' }, item.company),
      h('ul', { class: 'detail-list' }, (item.bullets || []).map((bullet) => h('li', {}, bullet)))));
  }
  function renderEntries(items, type) {
    return items.map((item) => h('article', { class: 'entry' },
      h('div', { class: 'entry-head' }, h('h3', { class: 'entry-title' }, type === 'certificate' ? item.title : item.title),
        h('span', { class: 'meta' }, type === 'certificate' ? item.date : item.year)),
      h('p', { class: 'entry-text' }, type === 'certificate' ? item.issuer : item.venue),
      item.note ? h('p', { class: 'meta' }, item.note) : null,
      item.link ? h('p', { class: 'entry-links' }, link('Read paper', item.link)) : null));
  }
  function renderContact(c, profile) {
    return h('div', { class: 'contact-layout' }, h('p', { class: 'entry-text contact-note' }, c.note),
      h('div', { class: 'contact-side' }, h('div', { class: 'contact-actions' },
        c.email ? link('Email me', 'mailto:' + c.email, { class: 'contact-button contact-primary' }) : null,
        c.phone ? link('Phone: ' + c.phone.replace('+880', '0'), 'tel:' + c.phone, { class: 'contact-button contact-secondary', 'aria-label': 'Call ' + c.phone.replace('+880', '0') }) : null,
        c.whatsapp ? link('WhatsApp', 'https://wa.me/' + c.whatsapp.replace(/\D/g, ''), { class: 'contact-button contact-secondary' }) : null),
        h('p', { class: 'meta contact-location' }, profile.location)));
  }
  const sections = [
    { id: 'about', title: 'About', show: !!data.about, body: () => renderAbout(data.about) },
    { id: 'skills', title: 'Skills', show: hasItems(data.skills), body: () => renderSkills(data.skills) },
    { id: 'education', title: 'Education', show: hasItems(data.education), body: () => renderEducation(data.education) },
    { id: 'experience', title: 'Experience', show: hasItems(data.experience), body: () => renderExperience(data.experience) },
    { id: 'projects', title: 'Projects', show: hasItems(data.projects), body: () => renderProjects(data.projects) },
    { id: 'publications', title: 'Research', show: hasItems(data.publications), body: () => renderEntries(data.publications, 'publication') },
    { id: 'certificates', title: 'Certificates', show: hasItems(data.certificates), body: () => renderEntries(data.certificates, 'certificate') },
    { id: 'contact', title: 'Contact', show: !!data.contact, body: () => renderContact(data.contact, data.profile) }
  ].filter((section) => section.show);
  const profile = data.profile || {};
  document.title = [profile.name, profile.role].filter(Boolean).join(' | ');
  const brand = document.getElementById('brand');
  brand.textContent = profile.name || 'Portfolio';
  const nav = document.getElementById('nav');
  add(nav, h('a', { href: '#top', 'data-section': 'top' }, 'Home'));
  sections.forEach((section) => add(nav, h('a', { href: '#' + section.id, 'data-section': section.id }, section.title)));
  const hero = document.getElementById('top');
  const resumeMessage = !profile.resume ? h('span', { class: 'meta' }, 'Resume will be available soon.') : null;
  const resumeLinks = profile.resume ? [
    link('View Resume', profile.resume, { class: 'button button-outline', target: '_blank', rel: 'noopener noreferrer' }),
    link('Download Resume', profile.resume, { class: 'button button-outline', download: true })
  ] : [];
  const heroContent = h('div', { class: 'hero-content' },
    h('h1', { class: 'hero-name' }, profile.name),
    h('p', { class: 'hero-role' }, profile.role),
    h('div', { class: 'hero-summary' }, (profile.summary || []).map((text) => h('p', { class: 'hero-text' }, text))),
    h('div', { class: 'hero-links' },
      data.contact.email ? link('Email me', 'mailto:' + data.contact.email, { class: 'button button-solid' }) : null,
      resumeLinks, resumeMessage, socialButtons(data.links, 'hero-social-links')));
  add(hero, h('div', { class: 'hero-layout' },
    profile.photo ? h('img', { class: 'hero-photo', src: profile.photo, alt: 'Photo of ' + profile.name }) : null,
    heroContent));
  const container = document.getElementById('sections');
  sections.forEach((section) => add(container, h('section', { class: 'section', id: section.id, 'aria-labelledby': section.id + '-heading' },
    h('h2', { class: 'section-title', id: section.id + '-heading' }, section.title), h('div', { class: 'section-body' }, section.body()))));
  const footer = document.getElementById('footer');
  add(footer, h('p', { class: 'meta' }, '© ' + new Date().getFullYear() + ' ' + profile.name));
  add(footer, socialButtons(data.links, 'footer-social-links'));
  add(footer, link('Back to top', '#top', { class: 'back-to-top' }));

  const toggle = document.getElementById('theme-toggle');
  function syncToggle() {
    const dark = root.getAttribute('data-theme') === 'dark';
    toggle.textContent = dark ? 'Light mode' : 'Dark mode';
    toggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  }
  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    syncToggle();
  });
  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  function setMenu(open) { menuToggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open); header.classList.toggle('menu-open', open); }
  menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', () => setMenu(false));
  window.addEventListener('scroll', () => header.classList.toggle('is-scrolled', window.scrollY > 8), { passive: true });
  const navLinks = [...nav.querySelectorAll('a[data-section]')];
  const observed = [document.getElementById('top'), ...sections.map((section) => document.getElementById(section.id))];
  new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((item) => item.classList.toggle('is-active', item.dataset.section === entry.target.id));
  }), { rootMargin: '-30% 0px -60% 0px', threshold: 0 }).observe(observed[0]);
  observed.slice(1).forEach((element) => window.IntersectionObserver && new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) navLinks.forEach((item) => item.classList.toggle('is-active', item.dataset.section === entry.target.id));
  }), { rootMargin: '-30% 0px -60% 0px' }).observe(element));
  syncToggle();
})();
