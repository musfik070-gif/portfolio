# Portfolio

Plain HTML, CSS আর JavaScript দিয়ে বানানো একটা minimal portfolio। কোনো `npm install` বা build step লাগে না।

তোমার সব content থাকে **একটা ফাইলে: `js/data.js`**। নতুন skill, certificate বা project যোগ করতে শুধু ওই ফাইলটা edit করলেই হয়।

## ফোল্ডার

```
portfolio/
├── index.html        পেজের কাঠামো + title/description (SEO)
├── css/style.css     রং, font, layout
├── js/data.js        তোমার সব content (এটাই সবচেয়ে বেশি edit করবে)
├── js/main.js        data.js থেকে পেজ বানায় (সাধারণত ছোঁয়া লাগে না)
└── assets/           তোমার ছবি, resume PDF, favicon
```

## VS Code-এ চালানো

1. Zip unzip করে VS Code-এ **File > Open Folder** দিয়ে `portfolio` ফোল্ডারটা খোলো।
2. Extensions থেকে **Live Server** (Ritwick Dey) install করো।
3. `index.html`-এ right click করে **Open with Live Server** চাপো। Browser-এ site খুলবে, আর কোনো ফাইল save করলেই নিজে থেকে refresh হবে।

Live Server না চাইলে `index.html` ফাইলে double click করলেও চলবে।

> Font গুলো Google Fonts থেকে আসে, তাই internet না থাকলে fallback font দেখাবে। এতে কোনো সমস্যা নেই।

## প্রথমে যা বদলাতে হবে

`js/data.js` খুলে এগুলো ঠিক করো:

- `contact.email`: এখন `your.email@example.com` দেওয়া আছে, তোমার আসল email বসাও।
- `profile.summary`: নিজের ভাষায় intro লেখো।
- `profile.photo` আর `profile.resume`: ফাইল `assets/` ফোল্ডারে রেখে path দাও (যেমন `"assets/me.jpg"`)। ফাঁকা `""` রাখলে ওই অংশ লুকিয়ে থাকবে।
- Education-এ HSC আর SSC-র `school` ঘরে college/school-এর নাম দিতে পারো।

আর `index.html`-এর `<title>`, `description` আর `og:` লাইনগুলোও নিজের নাম/role অনুযায়ী বদলে নিও। Google আর WhatsApp/LinkedIn preview ওগুলো পড়ে।

## নতুন কিছু যোগ করা

### নতুন skill

`skills` অংশে সঠিক group-এর `items` list-এ নাম বসাও। কমা দিতে ভুলো না।

```js
{ category: "Frontend",
  items: ["React", "Next.js", "TypeScript"] },   // "TypeScript" যোগ হলো
```

নতুন group চাইলে একটা `{ category: "...", items: [...] }` block copy করে `skills` list-এ বসাও।

### নতুন certificate

`certificates: [],` লাইনটা খুঁজে `[ ]`-এর ভেতরে এভাবে বসাও:

```js
certificates: [
  { title: "Certificate name", issuer: "Who issued it", date: "2026", link: "https://credential-link" }
],
```

একাধিক হলে প্রতিটা block-এর পরে কমা দাও। যতক্ষণ এই list ফাঁকা, ততক্ষণ Certificates section আর menu-র link দুটোই লুকানো থাকে। প্রথম certificate বসালেই দেখা যাবে।

### নতুন project

`projects` list-এর ভেতরে একটা block copy করে নতুনটা সবার উপরে বসাও (সবচেয়ে নতুন আগে):

```js
{
  title: "Project name",
  description: "এক-দুই বাক্যে project কী করে, আর তুমি কী করেছো।",
  tech: ["React", "Node.js"],
  live: "https://live-site-link",       // না থাকলে ""
  source: "https://github.com/...",     // না থাকলে ""
  year: "2026"                          // না চাইলে ""
},
```

### Publication বা Education

একই নিয়ম। `publications` আর `education` list-এ block copy করে বসাও।

## রং আর font বদলানো

`css/style.css`-এর একদম উপরে `:root` block-এ রঙের নামগুলো আছে:

```css
--bg: #fcfcfd;      /* পেজের background */
--ink: #16181d;     /* মূল লেখা */
--muted: #596070;   /* হালকা লেখা */
--line: #e3e5ea;    /* দাগ/border */
--accent: #1d6b5e;  /* link-এর রং */
```

শুধু `--accent` বদলালেই পুরো site-এর link-এর রং বদলে যায়। Dark mode-এর রং একটু নিচে `:root[data-theme="dark"]` block-এ আছে।

## Online-এ তোলা (বিনামূল্যে)

**GitHub Pages**

1. GitHub-এ নতুন repository বানাও (যেমন `portfolio`) আর এই ফোল্ডারের সব ফাইল push করো।
2. Repository-র **Settings > Pages**-এ গিয়ে Source হিসেবে `main` branch আর `/ (root)` বেছে নাও।
3. কয়েক মিনিট পর `https://তোমার-username.github.io/portfolio/` এ site পাবে।

**Vercel বা Netlify:** repository import করো। Framework হিসেবে "Other" বা "None" দাও, build command ফাঁকা রাখো।

## সতর্কতা

- Phone number বা বাসার ঠিকানা public portfolio-তে না দেওয়াই ভালো। Email আর LinkedIn যথেষ্ট।
- কখনো `.env` ফাইল GitHub-এ push করো না। এই ফোল্ডারের `.gitignore` ওটা আটকে দেবে।
