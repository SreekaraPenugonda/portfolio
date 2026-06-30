# Project Atlas

> More than a portfolio. A software engineering product that proves capability.

---

## Overview

Project Atlas is a production-grade engineering portfolio platform built with Next.js 16, TypeScript, and Tailwind CSS. It serves as both a showcase of engineering projects and a demonstration of software engineering best practices — from architecture and performance to accessibility and design.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## Documentation

```
docs/
├── specs/
│   ├── 01-software-requirements-specification.md   # Complete SRS
│   ├── 02-ux-specification.md                       # UX design spec
│   ├── 03-engineering-standards.md                  # Code quality standards
│   └── 04-feature-specifications.md                 # Per-module specs
├── architecture/
│   └── 01-system-design-document.md                 # System architecture
└── design/
    └── 01-design-system.md                          # Design tokens & components
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Font | Geist (via next/font) |
| Deployment | Vercel |

## Architecture

```
Client (Browser)
    │
    ▼
Next.js App Router
    │
    ├── Layout Components (Navbar, Footer, ThemeProvider)
    ├── Page Components (Home, About, Projects, Blog, etc.)
    ├── Section Components (Hero, Skills, Experience, etc.)
    └── UI Components (Button, Badge, SkillBar, etc.)
    │
    ▼
Data Layer (src/data/) + Utility Layer (src/lib/)
```

## Routes

| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Landing page with all sections |
| `/about` | Static | Personal bio and principles |
| `/projects` | Static | Project listing with search/filter |
| `/projects/[slug]` | Dynamic | Project detail and case study |
| `/experience` | Static | Work history, education, certifications |
| `/blog` | Static | Blog listing with search/filter |
| `/blog/[slug]` | Dynamic | Full blog article |
| `/contact` | Static | Contact form |
| `/resume` | Static | Resume and skills summary |
| `/achievements` | Static | Awards and milestones |

## Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 98-100 |
| Accessibility | 100 |
| SEO | 100 |
| FCP | <1s |
| LCP | <2s |
| TBT | <150ms |
| CLS | <0.1 |

## Product Principles

1. **Simplicity before complexity** — Every element earns its place
2. **Performance over decoration** — Animations serve a purpose
3. **Accessibility by default** — High contrast, keyboard nav, semantic HTML
4. **Content first** — The work speaks; the design supports
5. **Consistency** — One pattern, one component, one way to do it

## Key Features

- ✅ Static generation for optimal performance (11/13 routes static)
- ✅ Dark/light theme with system preference detection
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Search + filter for projects and blog
- ✅ Project case studies with architecture and learnings
- ✅ Blog with markdown rendering
- ✅ Contact form with validation
- ✅ SEO (metadata, OG tags, sitemap, robots.txt)
- ✅ Security headers
- ✅ Custom 404 page
- ✅ Loading states
- ✅ Framer Motion animations

## License

MIT