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

## Project structure

```
portfolio/
├── index.html        # cards grid + filter chips
├── project.html      # single-project detail page (driven by ?slug=)
├── projects.js       # all project metadata + section copy
├── styles.css        # one stylesheet for both pages
├── images/           # rendered page thumbnails per project
│   └── <slug>/page-001.jpg ... page-006.jpg
├── pdfs/             # original PDF reports
└── README.md
```

`index.html` and `project.html` both consume the same `window.PROJECTS` array
in `projects.js`, so adding a project means adding one object — no template
duplication.

## Stack

- Plain HTML / CSS / vanilla JS (no build step, no framework)
- Page thumbnails rendered with [Poppler](https://poppler.freedesktop.org/)'s
  `pdftoppm`
- Hosted on GitHub Pages

## Contact

[goktugardagok0987@gmail.com](mailto:goktugardagok0987@gmail.com) · Sabancı
University, Mechatronics Engineering
