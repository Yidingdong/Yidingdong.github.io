# Yidingdong.github.io — Project Reference

> **For AI assistants:** This README is the primary memory document. At the end of every session update it to reflect decisions, fixes, and what is next. Any new AI session should be able to read this and immediately understand the full project state.

---

## About Yiding Ma
- Full name: Yiding Ma (Chinese: 马亦丁)
- Born: 2008 in Kiel, Germany
- GitHub username: Yidingdong
- Languages: German (native-level), English, Chinese
- Currently: 12th grade (gymnasiale Oberstufe), Abitur expected 07/2026
- Leistungskurse: Mathematik, Wirtschaft, Physik. Current GPA: ~1.1 (target 1.0)
- Hosted at: Yidingdong.github.io

---

## Site Structure

| Page | File | Status |
|------|------|--------|
| Home | `index.html` | Design done; content mostly placeholder |
| Timeline | `timeline.html` | Implemented; most detail views still placeholder |
| Blog | `blog.html` | Sticky note design done; 1 placeholder post |
| Ideas | `ideas.html` | Sticky note pinboard done; 3 placeholder notes |
| 404 | `404.html` | Done |

---

## Features (current state)

### All pages
- Header: name, DE/EN/ZH language switcher, dark/light mode toggle
- Navbar: Start / Zeitstrahl / Blog / Ideen
- Footer: GitHub Invertocat icon (links to Yidingdong) + email placeholder
- Dark mode: class on `<html>`, persisted in localStorage; flash prevented by inline `<script>` in each `<head>`
- Language: data-de/data-en/data-zh attributes; script.js uses innerHTML (allows links in values); default German

### index.html
- Section 1: multilingual greeting – DE "Hallo, willkommen auf meiner Website." / EN "Hello, welcome to my website." / ZH "你好，欢迎来到我的网站。"
- Section 2: Aktuelles / Currently / 目前 — 5 rows (all placeholder)
- Section 3: Lebenslauf auf einen Blick / CV at a glance / 简历简介 — School, Graduation, Advanced courses, Scholarships (linked), Volunteering, Languages
  - Languages row: each language name is a clickable button chip; clicking opens a small popup modal with the language name + how-I-learned story (all placeholder)
- Section 4: Fähigkeiten / Skills — Java, Docker, CI/CD, Prompt Engineering, HTML & CSS (each linked to timeline entry)

### timeline.html
- 4 accordion groups (all open by default): Kindheit / Grundschule / Gymnasium / gymnasiale Oberstufe
- Filter bar: Alle / Bildungsweg / Erfolge / Persönliches / Projekte / Ehrenamt / Berufserfahrung
- Tag badges on each entry (language-aware, match filter IDs)
- Clicking entry opens detail view (CSS :target); back button returns
- Group titles: DE gymnasiale Oberstufe / EN Senior Years / ZH 高中

### blog.html
- Sticky notes, warm beige tones (light) / dark brown (dark mode)
- Each note is a clickable card linking to its own post page (placeholder URL `posts/platzhalter.html`)
- Tag filter: Persönliches / Ethik / Politik / Technik / Sonstiges

### ideas.html
- Sticky note pinboard grid
- Clicking a note expands it (spans 2 columns); clicking again or clicking another collapses it
- ZH nav/heading: 主意 (not 灵感)

---

## Workflow Rules

### Content rules
- **All content must be Yiding's exact wording.** Never generate filler copy.
- Placeholders: `[Platzhalter]` (DE), `[Placeholder]` (EN), `[占位符]` (ZH) — never verbose "fill in by Yiding Ma" style.
- When a field is empty, add `[Platzhalter]` and log it in TODO.md. Never silently leave blank.
- When Yiding provides text via voice, use it verbatim. Voice mishearings happen — interpret in context.

### Technical rules
- All text nodes use data-de/data-en/data-zh. Default visible text = German.
- Files UTF-8. PowerShell: always use `[System.IO.File]::WriteAllText(path, content, UTF8)` or `-Encoding UTF8`.
- script.js uses `element.innerHTML` (not textContent) so data attributes can contain HTML links.
- Dark mode: `html.dark-mode` class. Inline prevention script in every `<head>`.

### Documentation rules
- Update README + TODO at end of every session.
- Log decisions in the Decisions table below.

---

## File Overview

| File | Purpose |
|------|---------|
| `index.html` | Landing page |
| `timeline.html` | Timeline with accordion groups and tag filter |
| `blog.html` | Blog sticky notes |
| `ideas.html` | Ideas pinboard |
| `404.html` | 404 page for GitHub Pages |
| `style.css` | All shared styles |
| `script.js` | Theme toggle + language switcher (shared) |
| `timeline.js` | Accordion + tag filter + scroll animation |
| `TODO.md` | Placeholder tracker |
| `README.md` | AI memory / project reference |

---

## Decisions Log

| Date | Decision |
|------|----------|
| early | 4-page structure: index, timeline, blog, ideas |
| early | Default language: German |
| early | Navbar order: Start → Zeitstrahl → Blog → Ideen |
| 2026-03 | Font: Times New Roman, 17px base |
| 2026-03 | Dark mode flash fix: html.dark-mode + inline script per page |
| 2026-03 | Index structure: (1) greeting, (2) Aktuelles, (3) mini-CV at a glance, (4) Skills |
| 2026-03 | Skills each link to originating timeline entry |
| 2026-03 | Mini-CV graduation split into Abschluss + Leistungskurse rows |
| 2026-03 | Blog + Ideas redesigned as sticky notes (warm beige / dark brown) |
| 2026-03 | Ideas sticky notes: click to expand in-place (grid-column span 2) |
| 2026-03 | Blog post cards: full card is a link to own page (posts/ subfolder) |
| 2026-03 | GitHub link in footer: Invertocat SVG icon, no text |
| 2026-03 | Timeline group 4 EN label changed from "Teenagers" → "Senior Years" |
| 2026-03 | Filter tags renamed: Bildung→Bildungsweg, Leistungen→Erfolge, Karriere→Berufserfahrung |
| 2026-03 | Placeholder format simplified to [Platzhalter] (no verbose name attribution) |
| 2026-03 | Languages row: individual language-name chips, each opens a modal popup |
| 2026-03 | Ideas ZH name: 主意 (not 灵感) |
| 2026-03 | Greeting updated: DE "…Website" (not "…Seite"), EN "…website" (not "…page") |
| 2026-03 | script.js uses innerHTML so data attrs can carry anchor links |
| 2026-03 | Stipendien/Scholarships linked to timeline entries (#HLRS, #ETA, #YEEP) |
| 2026-03 | Ehrenamt row now lists both Nachhilfelehrer AND HTML-AG Leitung |
| 2026-03 | 404.html created for GitHub Pages |
| 2026-03 | HTML-AG: co-led with classmate; ~20 students grades 5–7; Yiding wrote curriculum + PPTs |
| 2026-03 | Hector split: Chess (Kindheit) + Enigma (Grundschule); Chess entry still missing from HTML |

---

## Open Features & Next Steps

- [ ] **Push to GitHub Pages** — `git add . && git commit -m "..." && git push`
- [ ] **Fill "Currently" section** — 5 items (exact wording from Yiding)
- [ ] **Language stories** — 3 popup texts (how DE/EN/ZH were learned)
- [ ] **Tag assignment** — reassign which tags each timeline entry gets (questionnaire given in earlier session)
- [ ] **Add Hector-Chess entry** to Kindheit group
- [ ] **Detail views** — fill in over time (see TODO.md)
- [x] **Email** — mayiding@gmx.de in all footers
- [x] **Favicon** — favicon.svg (YM initials, dark background)
- [x] **Meta descriptions** — added to all 5 pages
- [ ] **Blog posts** — write when ready (posts/ subfolder pattern)
- [ ] **Soft skills** — leadership, teaching, entrepreneurship, pitching (index.html skills section)
- [ ] **Avatar** — Strichmännchen by Yiding, when ready
- [ ] **Publish Cellios / HTML-AG materials** — before linking from timeline detail views