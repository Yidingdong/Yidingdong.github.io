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
- Leistungskurse: Mathematik, Wirtschaft, Physik
- GPA: targeting 1.0 overall (half-year scores so far: 1.1, 0.9, 1.1; targeting 0.9 in current half-year → overall 1.0)
- Live site: **itsyid.com** (GitHub Pages, served from `master` branch)
- Dev branch: `main`

---

## Deployment Workflow

Two-branch setup:
- `main` — development branch (all work and commits go here)
- `master` — production / GitHub Pages (live site at itsyid.com)

> **⚠ IMPORTANT: When the user says "push", they mean push to `master` so the live site is updated.**
> This always involves two steps: commit+push to `main`, then sync to `master`.

Full sync command:
```powershell
# Step 1 – commit to main
git add -A
git commit -m "..."
git push origin main

# Step 2 – sync HTML/CSS/JS to master (NO markdown files!)
git checkout master
git checkout main -- index.html style.css script.js timeline.html timeline.js blog.html ideas.html 404.html sitemap.xml robots.txt favicon.svg
git commit -m "sync: ..."
git push origin master
git checkout main
```

**Never push `README.md` or `TODO.md` to `master`** — they are dev-only and must never appear on the live site.

---

## Site Structure

| Page | File | Status |
|------|------|--------|
| Home | `index.html` | Design done; some content still placeholder |
| Timeline | `timeline.html` | Implemented; most detail views still placeholder |
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

### index.html — Sections (in order)

1. **Greeting** — "Hallo, willkommen auf meiner Website."

2. **Was mich gerade beschäftigt / What's currently on my mind**
   - 3 items: Beschäftigt mich gerade · Gerade am Lernen · Am Lesen/Am Schauen
   - "Beschäftigt mich gerade" = "Wie ich leben will · was ich arbeiten will · was ich studieren will"
   - `<p class="currently-updated">` shows "Stand: März 2026" (multilingual)

3. **Aktuelle Beschäftigung & Projekte / Current Occupation & Projects**
   - `.active-list` with 5 `.active-item` entries (`.active-name` + `.active-desc`):
     1. 12. Klasse · KKSt (Leistungskurse, Abitur Juli 2026)
     2. FIRST Tech Challenge (Java robot control)
     3. YEEP · Cellios (3D simulator)
     4. Nachhilfelehrer · Hui-Education e.V.
     5. Diese Website

4. **Eine Woche in meinem Leben / A week in my life**
   - Hourly time grid (`.wc-time-grid`): 08:00–21:00, 8px per 15 min
   - 8 columns: time label + Mo Di Mi Do Fr Sa So
   - Blocks placed via exact `grid-row` / `grid-column` from real calendar data
   - Colors: `.wc-school` (blue-tinted) · `.wc-tutor` (orange-tinted)
   - Biweekly Tuesday afternoon blocks dimmed at 50% opacity
   - Legend + horizontal scroll on narrow screens

5. **Meine Fähigkeiten / My Skills** — heading only, intentionally empty (not yet decided)

### timeline.html
- 4 accordion groups: Kindheit / Grundschule / Gymnasium / gymnasiale Oberstufe
- **Order: anti-chronological** — JS reverses group order and items-within-groups at load time
- Filter bar: Alle / Bildungsweg / Erfolge / Persönliches / Projekte / Ehrenamt / Berufserfahrung
- When filtering: empty groups show "Keine Einträge für diesen Filter." (multilingual); page scrolls to first group with matches
- Tag badges on each entry (language-aware)
- Clicking entry opens detail view (CSS :target); back button returns
- **Detail views with real content:** #HTML, #Frühstudium (intro only)
- **Detail views with stubs (structure exists, personal text still `[Platzhalter]`):** #Nachhilfe, #ETA
- **Detail views fully placeholder:** all others — see TODO.md
- KKSt2 card preview text: "Meine letzten zwei Jahre am KKSt. Leistungskurse Mathematik, Wirtschaft, Physik."
- Abitur GPA: 1,0 (fixed)

### blog.html / ideas.html
- Sticky notes, warm beige (light) / dark brown (dark mode)
- Blog: cards link to `posts/` subfolder; tag filter
- Ideas: click note to expand (span 2 cols); click again to collapse

---

## Responsive Breakpoints

| Range | Behaviour |
|-------|-----------|
| <=480px (phone) | 15px font, slim 1-row header, hamburger nav, stacked label/value pairs (padding-top grouping), 1-col ideas |
| 481–768px (tablet) | 16px font, stacked header, nav visible, stacked label/value pairs, 2-col ideas |
| 769–1024px (iPad) | container 720px, 3-col ideas |
| 1025–1440px (desktop) | container 860px |
| >=1441px (wide/curved) | container 1000px, 18px font, 4-col ideas |

**Mobile label/value grouping:** `display: block` on items, `padding-top` before each item (`:first-child` gets 0), `gap: 0` on list. This makes all whitespace appear *before* the label, visually bonding label to its value.

---

## CSS Architecture Notes
- `--bg-color: #f5f0e8`, warm parchment palette
- `.home-section--minor` opacity is 1.0
- `.active-name` = bold, `.active-desc` = secondary color (used in "Aktuelle Beschäftigung & Projekte")
- Week calendar grid row formula: `row = 2 + ((HH - 8) * 60 + MM) / 15`
  - `.wc-time-grid`: `grid-template-rows: 2rem repeat(53, 8px)` — 08:00–21:00 in 15-min steps
  - `.wc-school` = blue-tinted blocks · `.wc-tutor` = orange-tinted blocks · `.wc-cell--dim` = 55% opacity
- `.navbar` base: wrapped in `@media (min-width: 481px) { display: block }` — prevents cascade override of mobile grid-collapse
- `.navbar-inner` inside: `display: flex` with links
- Mobile navbar: `grid-template-rows: 0fr → 1fr` transition (pixel-perfect, unlike max-height)

---

## Technical Rules
- All text must be Yiding's exact wording. Placeholders: `[Platzhalter]` / `[Placeholder]` / `[占位符]`
- `script.js` uses `element.innerHTML` (not textContent) — data attrs can contain links
- Dark mode flash prevention: inline script in every `<head>` before the CSS `<link>`
- Files: UTF-8. PowerShell: use `-Encoding UTF8`
- **Never push `README.md` / `TODO.md` to `master`** — dev-only files

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
| 2026-03 | Navbar base `.navbar` wrapped in `@media (min-width: 481px)` — was overriding mobile collapse |
| 2026-03 | Aktuelles: all 5 rows filled; `currently-updated` paragraph added ("Stand: März 2026") |
| 2026-03 | SEO: `<h1>` gets static "Yiding Ma" text (JS overwrites on load, but ensures Googlebot sees it) |

---

## Open Items (summary)

See TODO.md for detailed placeholder tracker.

**Content (Yiding to provide):**
- [ ] Language popup stories — 3 languages x 3 translations
- [ ] 15 timeline detail views
- [ ] Missing Hector-Chess timeline entry (Kindheit)
- [ ] Blog posts
- [ ] Ideas content (3 notes)
- [ ] Soft skills

**Technical / manual:**
- [ ] Avatar / Strichmännchen when ready
- [ ] Publish Cellios / HTML-AG materials before linking from detail views