# Strum & Soul — Project Structure & Developer Guide

## Directory Structure

```
strum-and-soul/
│
├── index.html                  ← Homepage
│
├── pages/                      ← All inner pages
│   ├── _template.html          ← COPY THIS to create any new page
│   ├── courses.html
│   ├── faculty.html
│   ├── shop.html
│   ├── contact.html
│   ├── faq.html
│   ├── repair.html
│   ├── privacy.html
│   └── terms.html
│
├── css/
│   ├── global.css              ← Design tokens, reset, shared utilities
│   ├── header.css              ← Nav & logo styles (every page)
│   ├── footer.css              ← Footer styles (every page)
│   └── pages/
│       ├── index.css           ← Homepage-only styles
│       ├── courses.css
│       ├── faculty.css
│       ├── shop.css
│       ├── contact.css
│       └── faq.css
│
├── js/
│   ├── main.js                 ← Nav, reveal, counters, scroll (every page)
│   └── pages/
│       ├── index.js            ← Homepage-only JS (FAQ, tabs, form)
│       ├── courses.js
│       └── shop.js
│
├── components/
│   ├── header.html             ← Header HTML snippet (reference copy)
│   └── footer.html             ← Footer HTML snippet (reference copy)
│
└── images/                     ← Local images (if not using Unsplash CDN)
```

---

## How to Add a New Page

1. **Duplicate** `pages/_template.html` → rename it (e.g. `pages/courses.html`)
2. **Create CSS** `css/pages/courses.css` — only styles unique to that page
3. **Create JS** `js/pages/courses.js` — only interactions unique to that page
4. Update the `<link>` and `<script>` paths in the new HTML file
5. Add `class="active"` to the matching `.nav-a` link in the header block

---

## CSS Load Order (every page)

```html
<link rel="stylesheet" href="../css/global.css">   <!-- tokens, resets, buttons, reveals -->
<link rel="stylesheet" href="../css/header.css">   <!-- nav & logo -->
<link rel="stylesheet" href="../css/footer.css">   <!-- footer -->
<link rel="stylesheet" href="../css/pages/XX.css"> <!-- THIS page only -->
```

- `index.html` uses `href="/css/..."` (root-relative)
- `pages/*.html` uses `href="../css/..."` (one level up)

---

## JS Load Order (every page)

```html
<script src="../js/main.js"         defer></script>  <!-- always -->
<script src="../js/pages/PAGENAME.js" defer></script> <!-- this page only -->
```

---

## Design Tokens (in global.css :root)

| Token         | Value          | Usage                        |
|---------------|----------------|------------------------------|
| `--bg`        | `#FBF6EF`      | Main page background         |
| `--bg2`       | `#F4EBD8`      | Alternate section background |
| `--bg3`       | `#EDE0C8`      | Deeper warm tone             |
| `--text`      | `#1A0A02`      | Primary text / dark button   |
| `--text2`     | `#6B4530`      | Body text / descriptions     |
| `--text3`     | `#9C7A5E`      | Muted labels                 |
| `--accent`    | `#C0441A`      | Brand red-orange             |
| `--accent2`   | `#E8941A`      | Warm amber highlight         |
| `--accent-lt` | `rgba(192,68,26,0.09)` | Tinted backgrounds  |
| `--border`    | `#E2CEAD`      | Card / input borders         |
| `--border-lt` | `#EDD9BC`      | Lighter dividers             |
| `--ff-d`      | Cormorant Garamond | Display / headings       |
| `--ff-b`      | Outfit          | Body / UI text              |
| `--tr`        | `0.32s cubic-bezier(.4,0,.2,1)` | Standard transition |

---

## Shared Utility Classes (from global.css)

### Layout
- `.wrap` — max-width container (1160px, 92vw on mobile)
- `.section-py` — 6rem vertical padding
- `.section-py-sm` — 4rem vertical padding

### Typography
- `.section-h2` — standard section heading (Cormorant, clamp size)
- `.section-sub` — muted subtitle paragraph
- `.label-row` — small uppercase eyebrow label with left bar

### Buttons
- `.btn .btn-dark` — dark filled button
- `.btn .btn-outline` — bordered button
- `.btn .btn-accent` — gradient brand button

### Animations
- `.reveal` — fade up on scroll
- `.reveal-l` — slide in from left
- `.reveal-r` — slide in from right
- `.d1`–`.d5` — stagger delays (0.1s–0.5s)
- Add `.in` class via JS (handled by `main.js` IntersectionObserver)

### Badges
- `.course-level.level-beginner`
- `.course-level.level-intermediate`
- `.course-level.level-advanced`

### Forms
- `.form-wrap`, `.form-row`, `.form-g`, `.form-g.full`
- `.form-lbl`, `.form-inp`, `.form-ta`, `.form-sel`
- `.submit-btn`, `.success-msg`, `.success-msg.show`

---

## Page-Specific Pattern

Each page only puts *unique* styles/JS in its own file.
Shared patterns (cards, buttons, stats strip, CTA band) always come from `global.css`.

---

## Notes

- **Web3Forms key**: Replace `YOUR_WEB3FORMS_KEY` in the contact form's hidden input.
- **WhatsApp number**: Update `919876543210` everywhere if number changes.
- **Fonts**: The Google Fonts `<link>` must appear in every page's `<head>` before the CSS files.
- **No build tool required** — pure HTML/CSS/JS, just open in a browser or serve with any static host (Netlify, Vercel, GitHub Pages).
