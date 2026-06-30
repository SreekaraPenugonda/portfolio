# System Design Document (SDD)

## Project Atlas — Architecture & Design

---

# 1. System Overview

Project Atlas is built on Next.js 16 with the App Router, TypeScript, and Tailwind CSS. It follows a layered architecture that separates concerns across presentation, application, and data layers.

## 1.1 Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                     Client (Browser)                     │
├─────────────────────────────────────────────────────────┤
│                   Next.js App Router                     │
├─────────────────────────────────────────────────────────┤
│                    Layout Components                     │
│            (Navbar, Footer, ThemeProvider)               │
├─────────────────────────────────────────────────────────┤
│                    Page Components                       │
│     (Home, About, Projects, Blog, Contact, Resume)      │
├─────────────────────────────────────────────────────────┤
│                   Section Components                     │
│    (Hero, Skills, Experience, Achievements, etc.)        │
├─────────────────────────────────────────────────────────┤
│                    UI Components                         │
│      (Button, Badge, SkillBar, SectionHeading)           │
├─────────────────────────────────────────────────────────┤
│                   Data Layer (src/data/)                 │
│    (projects.ts, skills.ts, experience.ts, blog.ts)      │
├─────────────────────────────────────────────────────────┤
│                   Utility Layer (src/lib/)               │
│        (utils.ts, site-config.ts, cn helper)            │
└─────────────────────────────────────────────────────────┘
```

---

# 2. Layer Architecture

## 2.1 Presentation Layer

**Responsibility:** Rendering UI, handling user interactions, managing client state.

**Components:**
- `src/app/` — Route definitions and page components
- `src/components/layout/` — Shared layout components (Navbar, Footer)
- `src/components/sections/` — Page section components (Hero, Skills, etc.)
- `src/components/ui/` — Reusable UI primitives (Button, Badge, etc.)
- `src/components/providers/` — Context providers (ThemeProvider)

**Rules:**
- Page components should be thin — delegate to section components
- Section components compose UI primitives
- UI primitives have no business logic
- Client components use "use client" directive only when necessary

## 2.2 Application Layer

**Responsibility:** Business logic, state management, data transformation.

**Components:**
- `src/lib/` — Utility functions, helpers
- `src/data/` — Data sources and access functions

**Rules:**
- Business logic lives in lib/, not in components
- Data access functions (getProjectById, getFeaturedProjects) are in data/ files
- Transformation logic (formatDate, slugify) is in lib/utils.ts

## 2.3 Data Layer

**Responsibility:** Data storage, retrieval, and schema definition.

**Components:**
- `src/data/` — Static data files (projects, skills, experience, blog, achievements)
- `src/types/` — TypeScript type definitions

**Rules:**
- Data files export typed arrays/objects
- Types are defined in types/ and imported by data files
- No hardcoded strings in components — always reference data files

---

# 3. Component Tree

```
<html>
  <body>
    <ThemeProvider>
      <Navbar />
      <main>
        <HomePage>
          <Hero />
          <AboutSection />
          <SkillsSection>
            <SkillBar /> (×28)
          </SkillsSection>
          <ProjectsSection>
            <ProjectCard /> (×3)
          </ProjectsSection>
          <ExperienceSection />
          <AchievementsSection />
          <BlogSection />
          <ContactSection />
        </HomePage>

        <ProjectsPage>
          <Search />
          <CategoryFilter />
          <ProjectCard /> (×n)
        </ProjectsPage>

        <ProjectDetailPage>
          <BackButton />
          <ProjectHeader />
          <TechBadges />
          <Highlights />
          <Architecture />
          <Learnings />
        </ProjectDetailPage>

        <BlogPage>
          <Search />
          <TagFilter />
          <BlogCard /> (×n)
        </BlogPage>

        <BlogPostPage>
          <BackButton />
          <PostHeader />
          <PostContent />
        </BlogPostPage>

        <ExperiencePage />
        <ContactPage />
        <ResumePage />
      </main>
      <Footer />
    </ThemeProvider>
  </body>
</html>
```

---

# 4. Data Flow

## 4.1 Static Data Flow

```
Data File (src/data/*.ts)
    │
    ▼
Import in Component
    │
    ▼
useMemo/useState for filtering
    │
    ▼
Render UI
```

**Example: Projects Filtering**
```
projects.ts → ProjectsPage (client component)
                  │
                  ▼
            useState for search/filter
                  │
                  ▼
            useMemo to compute filtered results
                  │
                  ▼
            map() to render ProjectCards
```

## 4.2 Theme Data Flow

```
localStorage.getItem('theme')
    │
    ▼
ThemeProvider (client component)
    │
    ├──► document.documentElement.classList.toggle('dark')
    │
    ▼
useTheme() hook consumed by Navbar and other components
```

---

# 5. Route Design

## 5.1 Route Map

| Route | Type | File | Content |
|-------|------|------|---------|
| `/` | Static | `app/page.tsx` | Landing page with all sections |
| `/about` | Static | `app/about/page.tsx` | About page |
| `/projects` | Static | `app/projects/page.tsx` | Projects listing with search/filter |
| `/projects/[slug]` | Dynamic | `app/projects/[slug]/page.tsx` | Project detail |
| `/experience` | Static | `app/experience/page.tsx` | Work experience, education, certs |
| `/blog` | Static | `app/blog/page.tsx` | Blog listing with search/filter |
| `/blog/[slug]` | Dynamic | `app/blog/[slug]/page.tsx` | Blog post |
| `/contact` | Static | `app/contact/page.tsx` | Contact form |
| `/resume` | Static | `app/resume/page.tsx` | Resume view |
| `/achievements` | Static | `app/achievements/page.tsx` | Achievements grid |
| `/robots.txt` | Static | `app/robots.ts` | SEO robots |
| `/sitemap.xml` | Static | `app/sitemap.ts` | SEO sitemap |
| `/_not-found` | Static | `app/not-found.tsx` | Custom 404 |

## 5.2 Route Groups (Future)

```
/app
  /(marketing)      — Public facing pages
    /landing
    /about
    /projects
    /blog
  /(content)        — Content management
    /admin
    /editor
  /api              — API routes (future)
    /contact
    /analytics
```

---

# 6. API Design (Future)

## 6.1 Contact Form API

```
POST /api/contact
  Body: { name, email, subject, message }
  Response: { success: boolean, message: string }
  Rate Limit: 5 requests/hour per IP
```

## 6.2 Analytics API

```
POST /api/analytics/event
  Body: { event: string, properties: object }
  Response: { success: boolean }

GET /api/analytics/summary
  Response: { pageViews, uniqueVisitors, topPages }
```

---

# 7. Performance Strategy

## 7.1 Current Optimizations

| Technique | Implementation | Status |
|-----------|---------------|--------|
| Static generation | All non-dynamic routes pre-rendered | ✅ |
| Image optimization | WebP/AVIF via Next.js Image | ✅ |
| Font optimization | Geist font with `next/font` | ✅ |
| Code splitting | Automatic via Next.js App Router | ✅ |
| Lazy loading | Dynamic imports for heavy components | ⏳ |
| Bundle analysis | `@next/bundle-analyzer` | ⏳ |

## 7.2 Target Metrics

| Metric | Current | Target |
|--------|---------|--------|
| Performance | TBD | 98-100 |
| FCP | TBD | <1s |
| LCP | TBD | <2s |
| TBT | TBD | <150ms |
| CLS | TBD | <0.1 |
| Bundle Size (JS) | TBD | <150KB |

---

# 8. Deployment Architecture

```
┌─────────────────────┐
│   GitHub Repository │
└────────┬────────────┘
         │ push
         ▼
┌─────────────────────┐
│  GitHub Actions CI  │
│  - Lint             │
│  - Type Check       │
│  - Build            │
└────────┬────────────┘
         │ deploy
         ▼
┌─────────────────────┐
│   Vercel Platform   │
│  - Production       │
│  - Preview (PRs)    │
│  - Edge Network     │
└─────────────────────┘
```

## 8.1 Environment Configuration

| Variable | Purpose | Source |
|----------|---------|--------|
| `NEXT_PUBLIC_SITE_URL` | Site URL for SEO | Vercel env |
| `NEXT_PUBLIC_ANALYTICS_ID` | Analytics tracking ID | Vercel env |
| `CONTACT_API_KEY` | Contact form API key | Vercel env |

---

# 9. Monitoring & Analytics (Future)

## 9.1 Planned Monitoring

- Vercel Analytics for page views and engagement
- Custom event tracking for resume downloads and project clicks
- Error tracking via Vercel Error Monitoring
- Performance monitoring via Lighthouse CI

## 9.2 Success Metrics Tracking

| Event | Tracked | Purpose |
|-------|---------|---------|
| Page view | ✅ (Vercel) | Traffic analysis |
| Project click | ⏳ | Engagement measurement |
| Resume download | ⏳ | Conversion tracking |
| Contact form submit | ⏳ | Lead generation |
| External link click | ⏳ | Outbound engagement |