# Software Requirements Specification (SRS)

## Project Atlas — v2.0

---

# 1. Introduction

## 1.1 Purpose

This document defines the complete functional and non-functional requirements for Project Atlas, a production-grade software engineering portfolio platform. The platform serves as both a showcase of the developer's work and a demonstration of their engineering capabilities.

## 1.2 Scope

Project Atlas is a web application that provides:
- A professional landing page with hero section
- Project case studies with technical depth
- Skills visualization with proficiency indicators
- Work experience timeline
- Blog with technical articles
- Resume delivery (download + online view)
- Contact system with form validation
- Search across projects and blog content
- Analytics tracking
- Content management capabilities

## 1.3 Definitions

| Term | Definition |
|------|------------|
| SSR | Server-Side Rendering |
| SSG | Static Site Generation |
| ISR | Incremental Static Regeneration |
| CLS | Cumulative Layout Shift |
| FCP | First Contentful Paint |
| LCP | Largest Contentful Paint |
| TBT | Total Blocking Time |
| WCAG | Web Content Accessibility Guidelines |

---

# 2. Functional Requirements

## 2.1 Landing Page

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-01 | Display hero section with name, title, and tagline | Critical | ✅ |
| FR-02 | Include call-to-action buttons (View Projects, Get in Touch) | Critical | ✅ |
| FR-03 | Animate entrance of hero elements sequentially | High | ✅ |
| FR-04 | Show scroll indicator at bottom of viewport | Medium | ✅ |
| FR-05 | Display background gradient that adapts to theme | Low | ✅ |

## 2.2 About Section

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-06 | Display professional biography | Critical | ✅ |
| FR-07 | Show quick facts (location, role, education) | High | ✅ |
| FR-08 | Display core engineering principles | Medium | ✅ |
| FR-09 | Animate on scroll into view | Medium | ✅ |

## 2.3 Skills Section

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-10 | Display skills grouped by category | Critical | ✅ |
| FR-11 | Show proficiency level as animated progress bar | High | ✅ |
| FR-12 | Categories: Languages, Frontend, Backend, Database, DevOps, Tools | High | ✅ |
| FR-13 | Animate bars on scroll into view | Medium | ✅ |

## 2.4 Projects Module

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-14 | Display featured projects on landing page | Critical | ✅ |
| FR-15 | Provide full project listing page | Critical | ✅ |
| FR-16 | Support search by title, description, and technologies | High | ✅ |
| FR-17 | Support filtering by category | High | ✅ |
| FR-18 | Display project badges (category, featured) | High | ✅ |
| FR-19 | Show technology tags for each project | High | ✅ |
| FR-20 | Link to live demo and source code | High | ✅ |
| FR-21 | Provide project detail page with full case study | Critical | ✅ |
| FR-22 | Display key highlights as bullet list | High | ✅ |
| FR-23 | Show architecture description when available | Medium | ✅ |
| FR-24 | Display key learnings when available | Medium | ✅ |
| FR-25 | Show "no results" state when filters return empty | Medium | ✅ |

## 2.5 Experience Module

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-26 | Display work history as timeline | Critical | ✅ |
| FR-27 | Show role, company, location, and dates | Critical | ✅ |
| FR-28 | Display key achievements for each role | High | ✅ |
| FR-29 | Show technology tags per role | High | ✅ |
| FR-30 | Display education section | High | ✅ |
| FR-31 | Display certifications section | Medium | ✅ |

## 2.6 Blog Module

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-32 | Display blog post listing | Critical | ✅ |
| FR-33 | Support search by title and excerpt | High | ✅ |
| FR-34 | Support filtering by tag | High | ✅ |
| FR-35 | Show reading time and publish date | High | ✅ |
| FR-36 | Provide full article view | Critical | ✅ |
| FR-37 | Render markdown content as formatted HTML | High | ✅ |
| FR-38 | Show "no results" state when filters return empty | Medium | ✅ |

## 2.7 Resume Module

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-39 | Display skills summary | Critical | ✅ |
| FR-40 | Show notable experience highlights | High | ✅ |
| FR-41 | Provide download button (PDF) | High | ✅ |
| FR-42 | Provide view online option | Medium | ✅ |

## 2.8 Contact Module

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-43 | Display contact form with name, email, subject, message | Critical | ✅ |
| FR-44 | Validate required fields | Critical | ✅ |
| FR-45 | Validate email format | High | ✅ |
| FR-46 | Show success state after submission | High | ✅ |
| FR-47 | Display social media links | High | ✅ |
| FR-48 | Provide email link | High | ✅ |

## 2.9 Navigation

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-49 | Display fixed navigation bar | Critical | ✅ |
| FR-50 | Show active route indicator | High | ✅ |
| FR-51 | Provide mobile hamburger menu | Critical | ✅ |
| FR-52 | Animate mobile menu open/close | Medium | ✅ |
| FR-53 | Include theme toggle in navigation | High | ✅ |

## 2.10 Theme System

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-54 | Support light and dark themes | Critical | ✅ |
| FR-55 | Detect system preference on first visit | High | ✅ |
| FR-56 | Persist theme choice in localStorage | High | ✅ |
| FR-57 | Prevent flash of wrong theme on load | Critical | ✅ |
| FR-58 | Toggle theme via button in navigation | High | ✅ |

## 2.11 Search

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-59 | Search projects by title, description, technologies | High | ✅ |
| FR-60 | Search blog by title and excerpt | High | ✅ |
| FR-61 | Show results in real-time as user types | Medium | ✅ |
| FR-62 | Clear search with empty state handling | Medium | ✅ |

---

# 3. Non-Functional Requirements

## 3.1 Performance

| ID | Requirement | Target | Status |
|----|-------------|--------|--------|
| NFR-01 | Lighthouse Performance score | 98-100 | ⏳ |
| NFR-02 | First Contentful Paint (FCP) | <1s | ⏳ |
| NFR-03 | Largest Contentful Paint (LCP) | <2s | ⏳ |
| NFR-04 | Total Blocking Time (TBT) | <150ms | ⏳ |
| NFR-05 | Cumulative Layout Shift (CLS) | <0.1 | ⏳ |
| NFR-06 | Initial bundle size (JS) | <150KB | ⏳ |
| NFR-07 | Image optimization | WebP/AVIF formats | ✅ |

## 3.2 Accessibility

| ID | Requirement | Target | Status |
|----|-------------|--------|--------|
| NFR-08 | Lighthouse Accessibility score | 100 | ⏳ |
| NFR-09 | Keyboard navigation support | Full | ✅ |
| NFR-10 | Focus indicators on all interactive elements | Visible | ✅ |
| NFR-11 | ARIA labels on icon-only buttons | Present | ✅ |
| NFR-12 | Color contrast ratio (normal text) | ≥4.5:1 | ✅ |
| NFR-13 | Color contrast ratio (large text) | ≥3:1 | ✅ |
| NFR-14 | Semantic HTML structure | Proper | ✅ |

## 3.3 SEO

| ID | Requirement | Target | Status |
|----|-------------|--------|--------|
| NFR-15 | Lighthouse SEO score | 100 | ⏳ |
| NFR-16 | Meta title and description per page | Present | ✅ |
| NFR-17 | Open Graph tags | Present | ✅ |
| NFR-18 | Twitter Card tags | Present | ✅ |
| NFR-19 | Structured data (JSON-LD) | Present | ⏳ |
| NFR-20 | Sitemap.xml | Present | ✅ |
| NFR-21 | Robots.txt | Present | ✅ |
| NFR-22 | Canonical URLs | Present | ⏳ |

## 3.4 Security

| ID | Requirement | Target | Status |
|----|-------------|--------|--------|
| NFR-23 | X-Frame-Options header | DENY | ✅ |
| NFR-24 | X-Content-Type-Options header | nosniff | ✅ |
| NFR-25 | Referrer-Policy header | strict-origin-when-cross-origin | ✅ |
| NFR-26 | Input validation on contact form | All fields | ✅ |
| NFR-27 | Rate limiting on form submission | TBD | ❌ |

## 3.5 Reliability

| ID | Requirement | Target | Status |
|----|-------------|--------|--------|
| NFR-28 | Uptime (via Vercel) | 99.9% | ⏳ |
| NFR-29 | Graceful error states | All routes | ✅ |
| NFR-30 | 404 page | Custom | ✅ |
| NFR-31 | Loading states | Present | ✅ |

## 3.6 Maintainability

| ID | Requirement | Target | Status |
|----|-------------|--------|--------|
| NFR-32 | TypeScript strict mode | Enabled | ✅ |
| NFR-33 | Modular component architecture | Implemented | ✅ |
| NFR-34 | Separation of data from presentation | Implemented | ✅ |
| NFR-35 | Consistent naming conventions | Followed | ✅ |
| NFR-36 | Documentation | Present | ✅ |

---

# 4. Constraints

## 4.1 Technical Constraints
- Must use Next.js App Router (v16+)
- Must use TypeScript throughout
- Must use Tailwind CSS for styling
- Must deploy on Vercel
- Must support all modern browsers (last 2 versions)

## 4.2 Design Constraints
- Must use neutral color palette with single accent
- Must be mobile-first responsive
- Must support dark mode natively
- Must not use external UI libraries (custom components only)

---

# 5. Assumptions & Dependencies

## 5.1 Assumptions
- Content will be updated manually via data files initially
- CMS integration is a future enhancement
- Contact form will use a third-party service in production
- Analytics will be added in a later phase

## 5.2 Dependencies
- Next.js 16+ for framework capabilities
- Framer Motion for animations
- Lucide React for icons
- Tailwind CSS for styling
- Vercel for hosting and deployment