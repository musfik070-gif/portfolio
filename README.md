# Md. Musfiqur Rahman | Portfolio
A responsive developer portfolio built with plain HTML, CSS and JavaScript, with no framework and no build step.
## Live demo
[https://musfik070-gif.github.io/portfolio/](https://musfik070-gif.github.io/portfolio/)
## Features
- Responsive navbar with a mobile menu.
- Light/dark theme toggle.
- Hero section with designation, photo, View Resume, Download Resume, and social buttons.
- About Me, category-based Skills, and Education sections.
- Project cards with View Details links.
- Dedicated project detail page with tech stack, description, live link, GitHub link, challenges, and future improvements.
- Research and Contact sections.
- Contact includes email and phone; WhatsApp appears only when added.
- Footer with social links.
- Sections with no data, such as Experience and Certificates, stay hidden automatically.
## Tech stack
- HTML5
- CSS3
- Vanilla JavaScript
- Google Fonts: DM Serif Display and Manrope
## Project structure
```text
.
├── index.html       # Main portfolio page
├── project.html     # Project detail page
├── css/style.css    # Layout, theme, and component styles
├── js/data.js       # Portfolio content
├── js/main.js       # Main page rendering and interactions
├── js/project.js    # Project detail page rendering
└── assets/          # Images, resume, and favicon
```
## Run locally
1. Open the folder in VS Code.
2. Use the Live Server extension, or run `python -m http.server 8000`.
3. Open `http://localhost:8000` in a browser.
The `project.html` page works best through a local server.
## Edit content
All content lives in `js/data.js`: profile, about, links, contact, skills, projects, education, publications, experience, and certificates.
Add a skill as a plain string in a category's `items` list:
```js
{ category: "Frontend", items: ["React", "Next.js", "Vite"] }
```
A project entry needs a unique `slug`, plus `image`, `live`, `source`, `challenges`, and `improvements`.
## Deploy
- GitHub Pages: use Settings > Pages, select the `main` branch and root.
- Vercel/Netlify: use no build command and set the root as the output directory.
## Contact
- Email: [musfik070@gmail.com](mailto:musfik070@gmail.com)
- GitHub: [musfik070-gif](https://github.com/musfik070-gif)
- LinkedIn: [Md. Musfiqur Rahman](https://www.linkedin.com/in/md-musfiqur-rahman7/)
