# final-project-html-scss-js
A responsive front‑end web application for an events platform. It includes a landing page and an events page with filtering by **date**, **type** (online/offline), **distance**, and **category** — using mock data.

## ✨ Features
- Responsive layout (mobile → desktop)
- Two pages: **Home** and **Events near New York, NY**
- Client‑side filters: date, type, distance, category
- Simple, framework‑free stack (HTML, SCSS, JavaScript)
- Click the logo to return to the home page
- “Join Meetup” button navigates to the Events page

## 🧰 Tech Stack
- **HTML5**
- **SCSS** (modular structure with variables, mixins, sections)
- **JavaScript (ES6+)** for rendering and filtering mock events

## 📁 Project Structure
```
MEETUPPROJECT/
├── assets/
│   ├── icons/
│   └── images/
├── partials/
│   ├── footer.html
│   └── nav.html
├── scripts/
│   └── script.js
├── styles/
│   ├── components/
│   │   ├── _footer.scss
│   │   └── _nav.scss
│   ├── mixins/_mixin.scss
│   ├── sections/
│   │   ├── _events.scss
│   │   └── _mainPage.scss
│   ├── variables/
│   │   ├── _colors.scss
│   │   ├── _spacing.scss
│   │   └── _typography.scss
│   ├── _global.scss
│   ├── _reset.scss
│   ├── main.scss
│   ├── main.css
│   └── main.css.map
├── events.html
└── index.html
```

## 🚀 Getting Started

### 1) Clone
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 2) Open locally
This is a static website. The easiest way to run it is with any local web server:

**Option A — VS Code Live Server**
- Install the “Live Server” extension
- Right‑click `index.html` → **Open with Live Server**

**Option B — Node http-server**
```bash
npm i -g http-server
http-server .
# open the printed URL (e.g., http://127.0.0.1:8080)
```

> Google Fonts: the project uses **Roboto** (loaded via `<link>`).

## Mock Data
Events live in `scripts/script.js` as an array `eventsStore` with fields:
`title`, `description`, `date`, `image`, `type`, `attendees`, `category`, `distance`.

## Building SCSS (optional)
If you edit `.scss` files, compile them into `styles/main.css`:

```bash
# Using Dart Sass
npm i -D sass
npx sass styles/main.scss styles/main.css --watch
```

## Deploy (GitHub Pages)
1. Push to the `main` branch.
2. In **Settings → Pages**, set **Source** to `main` / **root**.
3. Your site will be available at:
```
https://<your-username>.github.io/<repo-name>/
```

## Screenshots
_Add screenshots of `index.html` and `events.html` here._

## 🗺Roadmap
- Accessibility polishing (focus states, ARIA)
- Empty‑state UI for filters
- More categories and real API integration

## License
MIT — feel free to use and modify.
