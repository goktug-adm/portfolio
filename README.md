# Göktuğ Arda Gök — Mechatronics Portfolio

A static portfolio that showcases 15 selected engineering projects — graduation
work, a defense-industry internship, machine-learning coursework, PLC
automation labs, CAD assemblies and an entrepreneurship business plan.

**Live:** https://goktug-adm.github.io/portfolio/

## Highlights

- **Spherical Parallel Manipulator** (graduation project) — vision-based drift
  compensation with AprilTag markers and a custom ray–sphere intersection
  algorithm, integrated into the Simulink control loop over UDP.
- **Drone Swarm Simulation** (Altınay Savunma internship) — Artificial Potential
  Field motion with a custom Danger-Zone escape rule, prototyped in MATLAB and
  ported to ROS 2 / RViz.
- **IMDB Sentiment Classification** (CS 412) — three-way comparison of
  Multinomial NB, Linear SVM and Bi-LSTM. Linear SVM won at macro F1 = 0.9036.
- **Beckhoff / TwinCAT PLC labs**, a **2-DOF cascaded controller**, a **6-DOF
  quadrotor**, a full **V12 SolidWorks assembly**, and more.

## File structure

```
portfolio/
├── index.html         ← grid + filter chips (cards)
├── project.html       ← detail page, driven by ?slug=…
├── picker.html        ← image picker (editing tool)
├── projects.js        ← all project metadata + section copy
├── selections.js      ← per-project picked images
├── image-index.js     ← list of every figure / page render available
├── styles.css         ← single stylesheet
├── images/<slug>/     ← full-page renders (page-N.jpg)
├── figures/<slug>/    ← embedded figures from the PDFs (fig-…jpg)
├── pdfs/              ← original PDF reports
└── README.md
```

`index.html` and `project.html` both consume the same `window.PROJECTS` array
in `projects.js`, so adding a project means adding one object — no template
duplication.

## How to edit

### Edit text (titles, summaries, sections)

Open **`projects.js`**. Each project is one object with these fields:

```js
{
  slug: "spherical-graduation",      // URL slug, do not change after release
  title: "…",                        // shown on card + detail page
  course: "ENS 491-492 · Graduation Project",
  date:  "2026",
  badge: "Graduation Project",
  badgeClass: "badge--robotics",     // colours the pill (see styles.css)
  categories: ["robotics","controls"], // for the filter chips on index
  featured: true,                    // makes the card span 2 columns
  pdf: "pdfs/<filename>.pdf",        // download link
  collaborators: "Ömür Kaan Sarı",
  supervisor:    "Volkan Patoğlu",
  summary: "Card summary (1–2 sentences).",
  tags: ["AprilTag", "Simulink", …],
  sections: [                        // detail-page body
    { h: "Section heading", b: "<p>HTML body…</p>" },
    …
  ]
}
```

Save, commit, push — the live site updates within 30–60 seconds via
GitHub Pages.

### Pick which images appear

1. Open **`picker.html`** in your browser (locally, by double-clicking, or via
   the live site).
2. Each project shows every available image — **custom** (your own photos),
   **figures** (extracted from inside the PDF) and **page** renders. Click to
   tick/untick.
3. Click **⬇ Download selections.js** at the top.
4. Replace the `selections.js` file in this repo with the downloaded one.
5. Commit & push.

Detail-page priority: `selections.js` → custom + figures → page renders. So if
you don't pick anything, you still get sensible defaults.

### Add your own photos to a project

**Easiest — direct upload from picker (one-time GitHub setup):**

1. Open **`picker.html`**, click **⚙** top-right, then
   [create a Personal Access Token](https://github.com/settings/tokens/new?scopes=public_repo&description=Portfolio%20picker)
   with the `public_repo` scope. Paste, **Save**. Token lives only in your
   browser's `localStorage`.
2. Scroll to a project, **drag & drop** images onto its drop zone (or click to
   pick files). Each upload shows a live tile, then commits straight to
   `custom/<slug>/` on GitHub. `image-index.js` is updated automatically.
3. Tick the new tiles and click **⬆ Push selections to GitHub** — done.
4. Site rebuilds in 30–60 seconds.

**Manual fallback (no token):**

1. Drop `.jpg` / `.png` / `.webp` files into `custom/<project-slug>/`.
2. Run `regen-index.ps1` to refresh `image-index.js`:
   ```powershell
   powershell -ExecutionPolicy Bypass -File ./regen-index.ps1
   ```
3. Open `picker.html`, tick the new tiles, **⬇ Download selections.js**, drop
   it back into the repo.
4. `git add . && git commit -m "..." && git push`.

If you skip the picker entirely, custom images automatically take priority
over the auto-extracted figures — they show up on the detail page and as the
card cover on the home grid.

### Re-extract images from a new PDF

The originals live in `pdfs/`. Re-run extraction whenever you change them:

```powershell
# from the portfolio/ folder, with Poppler on PATH
pdftoppm -r 110 -jpeg -f 1 -l 12 pdfs/MyReport.pdf images/<slug>/page
pdfimages -j -p pdfs/MyReport.pdf figures/<slug>/fig
```

Then regenerate `image-index.js` (or just open `picker.html` after refreshing —
the index is generated from the file system).

## Stack

- Plain HTML / CSS / vanilla JS — no build step, no framework
- Page thumbnails rendered with [Poppler](https://poppler.freedesktop.org/)'s
  `pdftoppm`; figures with `pdfimages -j`
- Hosted on GitHub Pages

## Contact

[goktugardagok0987@gmail.com](mailto:goktugardagok0987@gmail.com) · Sabancı
University, Mechatronics Engineering
