# itsyid.com — Project Reference

> **For AI assistants:** This README is the primary memory document. Read it fully before starting any session. Update it at the end of every session.

---

## About Yiding Ma
- Full name: Yiding Ma (Chinese: 马亦丁)
- Born: 2008 in Kiel, Germany
- GitHub username: Yidingdong
- Alias: Itsyid
- Languages: German (native-level), English, Chinese
- Currently: 12th grade (gymnasiale Oberstufe), Abitur expected 07/2026
- Leistungskurse: Mathematik, Wirtschaft, Physik. Current GPA: ~1.1 (target 1.0)
- Live site: **itsyid.com** (GitHub Pages, served from `master` branch)
- Dev branch: `main`

---

## Deployment Workflow

Two-branch setup:
- `main` — development branch (work here)
- `master` — production / GitHub Pages (always sync from main after commits)

Sync command pattern:
```
git add -A && git commit -m "..." && git push origin main
git checkout master && git checkout main -- <files> && git commit -m "..." && git push origin master && git checkout main
```

Never push markdown files (README.md, TODO.md) to `master` — they are dev-only.

---

## Site Structure

| Page | File | Status |
|------|------|--------|
| Home | `index.html` | Design done; content mostly placeholder |
| Timeline | `timeline.html` | Implemented; all detail views still placeholder |
| Blog | `blog.html` | Sticky note design done; 1 placeholder post |
| Ideas | `ideas.html` | Pinboard done; 3 placeholder notes |
| 404 | `404.html` | Done |

Extra files: `robots.txt`, `sitemap.xml`, `favicon.svg`

---

## Features (current state)

### All pages
- Sticky top header: name + DE/EN/ZH language switcher + dark/light toggle
- **Mobile (<=480px):** slim single-row header; navbar collapses behind hamburger (☰) button; smooth grid-template-rows animation
- Navbar: Start / Zeitstrahl / Blog / Ideen (active page highlighted)
- Footer: GitHub Invertocat SVG icon + mayiding@gmx.de
- Dark mode: `html.dark-mode` class; persisted in localStorage; flash prevented by inline `<script>` before CSS in every `<head>`
- Language: `data-de`/`data-en`/`data-zh` attrs; `script.js` uses `innerHTML` (allows HTML links in values); default German
- SEO: `robots.txt`, `sitemap.xml`, JSON-LD Person schema (index.html), Open Graph tags (all pages), canonical URLs, noindex on 404
- Favicon: `favicon.svg` — dark square, "YM" in Times New Roman

### index.html
- Greeting: DE "Hallo, willkommen auf meiner Website."
- Section 2: Aktuelles — 5 rows (all [Platzhalter])
- Section 3: Lebenslauf auf einen Blick — School, Graduation, Leistungskurse, Stipendien (linked to #HLRS #ETA #YEEP), Ehrenamt, Languages
  - Languages row: each chip opens a modal popup (all 3 texts still placeholder)
- Section 4: Fähigkeiten — Java, Docker, CI/CD, Prompt Engineering, HTML & CSS (each arrow-linked to timeline entry)

### timeline.html
- 4 accordion groups: Kindheit / Grundschule / Gymnasium / gymnasiale Oberstufe
- **Order: anti-chronological** — JS reverses group order and items-within-groups at load time
- Filter bar: Alle / Bildungsweg / Erfolge / Persönliches / Projekte / Ehrenamt / Berufserfahrung
- When filtering: empty groups show "Keine Einträge für diesen Filter." (multilingual); page scrolls to first group with matches
- Tag badges on each entry (language-aware)
- Clicking entry opens detail view (CSS :target); back button returns

### blog.html / ideas.html
- Sticky notes, warm beige (light) / dark brown (dark mode)
- Blog: cards link to `posts/` subfolder; tag filter
- Ideas: click note to expand (span 2 cols); click again to collapse

---

## Responsive Breakpoints

| Range | Behaviour |
|-------|-----------|
| <=480px (phone) | 15px font, slim 1-row header, hamburger nav, stacked CV rows, 1-col ideas |
| 481–768px (tablet) | 16px font, stacked header, nav visible, 2-col ideas |
| 769–1024px (iPad) | container 720px, 3-col ideas |
| 1025–1440px (desktop) | container 860px |
| >=1441px (wide/curved) | container 1000px, 18px font, 4-col ideas |

---

## CSS Architecture Notes
- `--bg-color: #f2f2f0`, `--text-secondary: #505050` (darkened for contrast)
- `.home-section--minor` opacity is 1.0 (was 0.8)
- `.minicv-row dt` and `dd` both use `--text-primary`
- `.currently-label` uses `--text-primary` + `font-weight: 600`
- `.navbar` base: `display: block`; `.navbar-inner` inside: `display: flex` with links
- Mobile navbar: `grid-template-rows: 0fr → 1fr` transition (pixel-perfect, unlike max-height)

---

## Technical Rules
- All text must be Yiding's exact wording. Placeholders: `[Platzhalter]` / `[Placeholder]` / `[占位符]`
- `script.js` uses `element.innerHTML` (not textContent) — data attrs can contain links
- Dark mode flash prevention: inline script in every `<head>` before the CSS `<link>`
- Files: UTF-8. PowerShell: use `-Encoding UTF8`
- Never push README.md / TODO.md to `master`

---

## Decisions Log

| Date | Decision |
|------|----------|
| early | 4-page structure: index, timeline, blog, ideas |
| early | Default language: German |
| early | Navbar order: Start → Zeitstrahl → Blog → Ideen |
| 2026-03 | Font: Times New Roman, 17px base |
| 2026-03 | Dark mode flash fix: html.dark-mode + inline script per page |
| 2026-03 | Index: (1) greeting, (2) Aktuelles, (3) mini-CV, (4) Skills |
| 2026-03 | Skills each link to originating timeline entry |
| 2026-03 | Blog + Ideas: sticky notes (warm beige / dark brown) |
| 2026-03 | Blog cards: full card links to posts/ subfolder |
| 2026-03 | GitHub footer: Invertocat SVG, no text |
| 2026-03 | Timeline group 4 EN: "Senior Years" |
| 2026-03 | Filter tags: Bildungsweg, Erfolge, Persönliches, Projekte, Ehrenamt, Berufserfahrung |
| 2026-03 | Languages row: individual chips, each opens a modal popup |
| 2026-03 | script.js uses innerHTML so data attrs can carry anchor links |
| 2026-03 | Hector split: Chess (Kindheit, not yet in HTML) + Enigma (Grundschule, present) |
| 2026-03 | Email: mayiding@gmx.de in all footers |
| 2026-03 | Favicon: favicon.svg (YM initials, dark square) |
| 2026-03 | SEO: robots.txt, sitemap.xml, JSON-LD Person schema, Open Graph, canonical URLs |
| 2026-03 | Site live at itsyid.com; master = Pages branch, main = dev |
| 2026-03 | Timeline: anti-chronological (JS-reversed), empty-group placeholder, scroll-to-first |
| 2026-03 | Text contrast: --text-secondary #505050, section opacity 1.0, CV labels/values primary |
| 2026-03 | Mobile nav: slim 1-row header, hamburger, grid-template-rows animation |

---

## Open Items (summary)

See TODO.md for detailed placeholder tracker.

**Content (Yiding to provide):**
- [ ] "Aktuelles" section — 5 items
- [ ] Language popup stories — 3 languages x 3 translations
- [ ] 15 timeline detail views
- [ ] Missing Hector-Chess timeline entry (Kindheit)
- [ ] Blog posts
- [ ] Ideas content (3 notes)
- [ ] Soft skills

**Technical / manual:**
- [ ] Google Search Console: verify itsyid.com + submit sitemap
- [ ] Bing Webmaster Tools: import from GSC
- [ ] GitHub bio: add itsyid.com as backlink
- [ ] Avatar / Strichmännchen when ready
- [ ] Publish Cellios / HTML-AG materials before linking from detail views