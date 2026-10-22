(function () {
  'use strict';
  const data = window.PORTFOLIO;
  const root = document.documentElement;
  const project = (data.projects || []).find((item) => item.slug === new URLSearchParams(location.search).get('id'));
  const h = (tag, attrs, ...kids) => {
    const node = document.createElement(tag);
    Object.keys(attrs || {}).forEach((key) => { if (attrs[key] !== '') node.setAttribute(key, attrs[key]); });
    kids.flat().filter((kid) => kid !== null && kid !== undefined && kid !== '').forEach((kid) => node.appendChild(typeof kid === 'object' ? kid : document.createTextNode(String(kid))));
    return node;
  };
  const link = (label, url, attrs) => url ? h('a', Object.assign({ href: url }, attrs || {}), label) : null;
  const socialIcon = (label) => {
    const path = label === 'GitHub'
      ? 'M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.84c.85 0 1.7.11 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z'
      : 'M6.5 3A3.5 3.5 0 0 0 3 6.5v11A3.5 3.5 0 0 0 6.5 21h11a3.5 3.5 0 0 0 3.5-3.5v-11A3.5 3.5 0 0 0 17.5 3h-11ZM7 8.2A1.2 1.2 0 1 1 7 5.8a1.2 1.2 0 0 1 0 2.4ZM5.9 18V9.5h2.2V18H5.9Zm3.5 0V9.5h2.1v1.16h.03c.3-.57 1.04-1.38 2.53-1.38 2.71 0 3.21 1.78 3.21 4.1V18h-2.2v-4.1c0-.98-1.36-2.23-1.36-2.23-1.36 0-1.57 1.06-1.57 2.16V18H9.4Z';
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'social-icon');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    iconPath.setAttribute('d', path);
    svg.appendChild(iconPath);
    return svg;
  };
  document.getElementById('brand').textContent = data.profile.name;
  const nav = document.getElementById('nav');
  [['Home', 'top'], ['About', 'about'], ['Skills', 'skills'], ['Education', 'education'], ['Projects', 'projects'], ['Contact', 'contact']]
    .forEach(([label, id]) => nav.appendChild(h('a', { href: 'index.html#' + id }, label)));
  const content = document.getElementById('project-content');
  if (!project) {
    content.appendChild(h('section', { class: 'section project-not-found' }, h('h1', { class: 'section-title' }, 'Project not found'),
      h('p', { class: 'entry-text' }, 'That project could not be found.'), link('Back to projects', 'index.html#projects', { class: 'button button-solid' })));
  } else {
    document.title = project.title + ' | ' + data.profile.name;
    content.appendChild(h('section', { class: 'section project-detail' },
      h('a', { class: 'back-link', href: 'index.html#projects' }, '← Back to projects'),
      h('h1', { class: 'hero-name' }, project.title),
      project.image ? h('img', { class: 'detail-image', src: project.image, alt: 'Screenshot of ' + project.title }) : null,
      h('p', { class: 'project-description detail-description' }, project.description),
      h('h3', { class: 'skill-group-title' }, 'Technology stack'),
      h('ul', { class: 'project-tags' }, project.tech.map((item) => h('li', {}, item))),
      h('div', { class: 'project-actions detail-actions' }, link('Live project', project.live, { class: 'project-button project-button-primary', target: '_blank', rel: 'noopener noreferrer' }), link('GitHub repository (client)', project.source, { class: 'project-button project-button-secondary', target: '_blank', rel: 'noopener noreferrer' })),
      h('div', { class: 'detail-grid' },
        h('div', {}, h('h2', { class: 'section-title' }, 'Challenges faced'), h('ul', { class: 'detail-list' }, (project.challenges || []).map((item) => h('li', {}, item)))),
        h('div', {}, h('h2', { class: 'section-title' }, 'Potential improvements / future plans'), h('ul', { class: 'detail-list' }, (project.improvements || []).map((item) => h('li', {}, item)))))));
  }
  const footer = document.getElementById('footer');
  footer.appendChild(h('p', { class: 'meta' }, '© ' + new Date().getFullYear() + ' ' + data.profile.name));
  (data.links || []).forEach((item) => footer.appendChild(h('a', { href: item.url, class: 'social-button', 'aria-label': item.label, target: '_blank', rel: 'noopener noreferrer' }, socialIcon(item.label), h('span', {}, item.label))));
  footer.appendChild(link('Back to top', 'index.html#top', { class: 'back-to-top' }));
  const toggle = document.getElementById('theme-toggle');
  function syncTheme() { toggle.textContent = root.getAttribute('data-theme') === 'dark' ? 'Light mode' : 'Dark mode'; }
  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next); try { localStorage.setItem('theme', next); } catch (e) {} syncTheme();
  });
  const header = document.getElementById('site-header');
  const menu = document.getElementById('menu-toggle');
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', open); nav.classList.toggle('is-open', open); header.classList.toggle('menu-open', open); });
  nav.addEventListener('click', () => { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); header.classList.remove('menu-open'); });
  syncTheme();
})();
