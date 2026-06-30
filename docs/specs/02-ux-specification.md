# UX Specification

## Project Atlas — User Experience Design

---

# 1. User Journeys

## 1.1 Recruiter Journey (45 seconds)

```
Arrival → Hero → About → Skills → Projects → Resume → Contact
   ↓        ↓       ↓        ↓         ↓          ↓         ↓
   URL    Who is  Can they  What do  Proof of   Can they  Can I
   loads   this?   build?   they     ability?   hire?    contact?
                      know?
```

**Key UX Rule:** Every section must answer the recruiter's implicit question within 2 seconds of scrolling to it.

## 1.2 Hiring Manager Journey (5 minutes)

```
Landing → Projects → Project Detail → Experience → Blog → GitHub
   ↓        ↓            ↓               ↓          ↓       ↓
 Overview  Which     Architecture    Depth of     Written  Code
           projects? decisions?     experience?  comm.    quality?
```

**Key UX Rule:** Deep technical content must be accessible but not overwhelming. Progressive disclosure — show summary, link to details.

## 1.3 Developer Journey (10 minutes)

```
Projects → Blog → GitHub → Contact
   ↓        ↓       ↓        ↓
  Browse   Read    Explore  Connect / Collaborate
          articles  code
```

**Key UX Rule:** Provide easy access to source code and technical content without friction.

---

# 2. Screen-by-Screen Specifications

## 2.1 Landing Page

### Purpose
Establish immediate credibility and guide the user into the portfolio.

### Layout (Desktop)
```
┌──────────────────────────────────────────────┐
│  [Logo]   Home Projects Exp Blog Contact 🌙  │ ← Fixed Nav
├──────────────────────────────────────────────┤
│                                              │
│              Hi, I'm [Name]                  │
│            Software Engineer                  │
│                                              │
│    [View Projects]  [Get in Touch]           │
│                                              │
│                    ↓                          │ ← Scroll indicator
├──────────────────────────────────────────────┤
│           About Me                           │
│  ┌─────────────────┐ ┌─────────────────┐    │
│  │ Bio text        │ │ Quick Facts      │    │
│  │ ...             │ │ Core Principles  │    │
│  └─────────────────┘ └─────────────────┘    │
├──────────────────────────────────────────────┤
│           Skills & Technologies              │
│  ┌────────┐ ┌────────┐ ┌────────┐           │
│  │Languages│ │Frontend│ │Backend │           │
│  │ TS ████ │ │ React  │ │ Node   │           │
│  │ JS ████ │ │ █████  │ │ █████  │           │
│  └────────┘ └────────┘ └────────┘           │
│  ┌────────┐ ┌────────┐ ┌────────┐           │
│  │Database│ │ DevOps │ │ Tools  │           │
│  └────────┘ └────────┘ └────────┘           │
├──────────────────────────────────────────────┤
│           Featured Projects                  │
│  ┌────────────────────────────────────────┐  │
│  │ Project Atlas — A production-grade...  │  │
│  │ [Tech] [Tech] [Tech]             →    │  │
│  └────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────┐  │
│  │ E-Commerce Platform — Full-stack...   │  │
│  └────────────────────────────────────────┘  │
│              [View All Projects →]          │
├──────────────────────────────────────────────┤
│           Experience                         │
│  │ ● Senior Software Engineer @ Tech Corp    │
│  │ ● Full Stack Developer @ StartupXYZ      │
│  │ ● Frontend Developer @ WebAgency Pro     │
├──────────────────────────────────────────────┤
│           Achievements                       │
│  [🏆] [📖] [⭐] [🏅] [🎯] [🎤]              │
├──────────────────────────────────────────────┤
│           Latest Articles                    │
│  [Card 1]      [Card 2]      [Card 3]       │
│              [Read All Articles →]          │
├──────────────────────────────────────────────┤
│           Get in Touch                       │
│  ┌──────────────────────────┐               │
│  │  Name     │   Email      │               │
│  │  Subject                │               │
│  │  Message                │               │
│  │  [Send Message]         │               │
│  └──────────────────────────┘               │
│   [GitHub] [LinkedIn] [Twitter] [Email]      │
├──────────────────────────────────────────────┤
│  © 2026 Name. Built with Next.js & TS.      │
└──────────────────────────────────────────────┘
```

### States

| State | Behavior |
|-------|----------|
| Initial load | Hero elements animate in sequence (0.1s staggered) |
| Scrolled past hero | Fixed nav gains backdrop blur |
| Scrolled to section | Section items animate on viewport entry |
| Theme toggle | Smooth transition, no flash |
| Mobile (<768px) | Single column layout, hamburger menu |

### Animation Timing

| Element | Delay | Duration | Easing |
|---------|-------|----------|--------|
| "Hi, I'm" | 0.1s | 0.5s | easeOut |
| Name | 0.2s | 0.5s | easeOut |
| Tagline | 0.3s | 0.5s | easeOut |
| Description | 0.4s | 0.5s | easeOut |
| Buttons | 0.5s | 0.5s | easeOut |
| Scroll indicator | 1.0s | 0.5s | easeOut |

---

## 2.2 Projects Page

### Purpose
Allow recruiters to find and evaluate projects quickly.

### Layout
```
┌──────────────────────────────────────────────┐
│  Projects                                    │
│                                             │
│  [🔍 Search projects...]                     │
│  [All] [Full Stack] [Frontend] [AI/ML] ...   │
│                                             │
│  ┌────────────────────────────────────────┐  │
│  │ [Full Stack] [Featured]                │  │
│  │ Project Atlas                          │  │
│  │ A production-grade engineering...      │  │
│  │ [Next.js] [TS] [Tailwind] ...  →      │  │
│  └────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────┐  │
│  │ ...                                    │  │
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

### States

| State | Behavior |
|-------|----------|
| Loading | Skeleton cards |
| Empty search | "No projects found" message |
| Filter active | Only matching projects shown |
| Hover | Card lifts with shadow, arrow animates right |

---

## 2.3 Project Detail Page

### Purpose
Demonstrate technical depth and engineering thinking.

### Layout
```
┌──────────────────────────────────────────────┐
│  ← Back to projects                          │
│                                             │
│  [Full Stack] [Featured]                    │
│  Project Atlas                              │
│  A production-grade engineering portfolio    │
│  June 2026                                  │
│                                             │
│  [Live Demo]  [Source Code]                 │
│                                             │
│  Technologies                               │
│  [Next.js] [TypeScript] [Tailwind] ...      │
│                                             │
│  About                                      │
│  Long description text...                   │
│                                             │
│  Key Highlights                             │
│  • 95+ Lighthouse score                     │
│  • 100% accessibility                       │
│  • Responsive across all devices             │
│                                             │
│  Architecture                               │
│  Architecture description...                 │
│                                             │
│  Key Learnings                              │
│  • Advanced Next.js patterns                 │
│  • Performance optimization                  │
└──────────────────────────────────────────────┘
```

---

# 3. Interaction Rules

## 3.1 Navigation

| Element | Behavior |
|---------|----------|
| Nav links | Active route highlighted with background |
| Theme toggle | Icon changes (sun ↔ moon), smooth CSS transition |
| Mobile hamburger | Animate icon to X, drawer slides in |
| Back buttons | Consistent position (top-left), arrow icon |

## 3.2 Cards

| Element | Behavior |
|---------|----------|
| Project cards | Hover: lift 2px, shadow, arrow slides right |
| Blog cards | Hover: lift 2px, subtle shadow |
| Achievement cards | Hover: lift 1px, external link icon appears |

## 3.3 Forms

| Element | Behavior |
|---------|----------|
| Input focus | Border color change, ring animation |
| Required fields | HTML5 validation, custom error styling |
| Submission | Button shows loading state, success state on completion |
| Success | Green card with checkmark, auto-dismiss after 5s |

## 3.4 Theme Transition

| Element | Duration | Notes |
|---------|----------|-------|
| Background | 300ms | Smooth color transition |
| Text | 200ms | Quick adaptation |
| Borders | 200ms | Quick adaptation |
| All | — | Use `transition-colors` utility |

---

# 4. Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Mobile | <640px | Single column, hamburger nav, stacked cards |
| Tablet | 640-1024px | 2-column grids, inline nav |
| Desktop | >1024px | 3-column grids, full nav with all links |
| Max width | 1280px | Content centered, max-width constraint |

---

# 5. Empty & Error States

| State | Component | Behavior |
|-------|-----------|----------|
| No projects | Projects list | "No projects found matching your criteria." |
| No articles | Blog list | "No articles found matching your criteria." |
| 404 | Any route | Custom 404 page with "Go Home" button |
| Loading | Any page | Spinning loader centered on page |
| Form success | Contact form | Green success card with checkmark |
| Project not found | Project detail | "Project not found" with back link |
| Article not found | Blog post | "Article not found" with back link |