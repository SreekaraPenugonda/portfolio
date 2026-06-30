# Feature Specifications

## Project Atlas — Module-by-Module Specifications

---

# 1. Hero Module

## Purpose
Establish immediate professional identity and guide users into the portfolio.

## Components
- `Hero` — Full-viewport hero section

## Props
None (uses `siteConfig` from lib)

## States
| State | Handling |
|-------|----------|
| Loading | CSS background only, text appears via animation |
| Loaded | Elements animate in sequence |
| Mobile | Reduced font sizes, stacked CTA buttons |

## Acceptance Criteria
- [ ] Name renders from siteConfig
- [ ] Tagline renders from siteConfig
- [ ] "View Projects" links to /projects
- [ ] "Get in Touch" links to /contact
- [ ] Scroll indicator animates with bounce
- [ ] Background gradient adapts to theme
- [ ] All animations complete within 1.5s

## Edge Cases
- Long names truncate gracefully
- No JavaScript: static content visible immediately

---

# 2. About Module

## Purpose
Provide personal context and establish trust through quick facts and principles.

## Components
- `AboutSection` — Bio + quick facts + principles

## Data
Hardcoded in component (personal content changes infrequently)

## States
| State | Handling |
|-------|----------|
| Desktop | Two-column layout |
| Mobile | Single column, stacked |

## Acceptance Criteria
- [ ] Bio section with 3 paragraphs
- [ ] Quick facts card with 5 facts
- [ ] Core principles card with 4 principles
- [ ] Animates on scroll into view
- [ ] Responsive layout

---

# 3. Skills Module

## Purpose
Visualize technical proficiency across categories.

## Components
- `SkillsSection` — Category grid
- `SkillBar` — Individual skill with animated bar

## Data
`src/data/skills.ts`

## States
| State | Handling |
|-------|----------|
| Default | All categories displayed in grid |
| Mobile | Single column, 1 category per row |
| Tablet | 2 categories per row |
| Desktop | 3 categories per row |

## Acceptance Criteria
- [ ] Skills grouped by category
- [ ] Each skill shows name and proficiency percentage
- [ ] Bars animate from 0 to target width on scroll
- [ ] Categories have clear labels
- [ ] Works in both themes

## Edge Cases
- Very long skill names truncate with ellipsis
- Empty categories not rendered
- Level 0 skills render empty bar

---

# 4. Projects Module

## Purpose
Showcase engineering work with depth and context.

## Components
- `ProjectsSection` — Featured projects on landing
- `ProjectsPage` — Full listing with search and filter
- `ProjectDetailPage` — Deep dive into single project

## Data
`src/data/projects.ts`

## States
| State | Handling |
|-------|----------|
| Default | All projects shown, featured highlighted |
| Loading | Skeleton cards |
| Empty search | "No projects found" message |
| Filter active | Only matching category shown |
| Search + Filter | Combined filtering applied |
| 404 (detail) | "Project not found" with back link |

## Search Behavior
- Triggers on every keystroke
- Searches: title, description, technologies
- Case-insensitive
- Debounce: none (instant for small dataset)

## Filter Behavior
- Click toggles category active
- Click active category to deselect
- "All" button clears filter
- Categories from project data (dynamic)

## Acceptance Criteria
- [ ] Featured projects shown on landing
- [ ] Full listing at /projects
- [ ] Search filters by title, description, technologies
- [ ] Category filter buttons
- [ ] Combined search + filter
- [ ] Project detail page with full case study
- [ ] Live demo and source code links
- [ ] Technology badges
- [ ] Highlights list
- [ ] Architecture section (if available)
- [ ] Key learnings (if available)
- [ ] Empty state for no results

## Edge Cases
- Project with no live URL: hide live demo button
- Project with no source URL: hide source code button
- Project with no architecture: hide architecture section
- Special characters in search: escaped properly

---

# 5. Experience Module

## Purpose
Demonstrate career progression and measurable impact.

## Components
- `ExperienceSection` — Timeline on landing
- `ExperiencePage` — Full experience with education and certifications

## Data
`src/data/experience.ts`

## States
| State | Handling |
|-------|----------|
| Default | Timeline layout with dots |
| Mobile | Smaller timeline, left-aligned |
| Multiple entries | Stacked timeline items |

## Acceptance Criteria
- [ ] Timeline with role, company, location, date range
- [ ] Key achievements as bullet points
- [ ] Technology badges per role
- [ ] Education section with GPA and highlights
- [ ] Certifications grid
- [ ] Dates formatted consistently
- [ ] "Present" for current role

## Edge Cases
- No end date: displays "Present"
- Future start date: display as-is (no validation needed for data files)
- No highlights: empty state

---

# 6. Blog Module

## Purpose
Demonstrate written communication and technical depth.

## Components
- `BlogSection` — Recent posts on landing
- `BlogPage` — Full listing with search and filter
- `BlogPostPage` — Full article reader

## Data
`src/data/blog.ts`

## States
| State | Handling |
|-------|----------|
| Default | All posts shown |
| Empty search | "No articles found" message |
| Tag filter | Only matching tag shown |
| 404 (post) | "Article not found" with back link |

## Content Rendering
- Markdown parsed into HTML with simple line-by-line parsing
- Headers (##, ###), lists (-, 1.), code blocks (```)
- Bold (**text**), paragraphs, line breaks

## Acceptance Criteria
- [ ] Recent posts on landing (3)
- [ ] Full listing at /blog with search
- [ ] Tag filter buttons
- [ ] Reading time and date on cards
- [ ] Full article view with proper formatting
- [ ] Back to blog navigation
- [ ] Empty state for no results

## Edge Cases
- Very long article: scrolls naturally
- No tags: hide tag area
- Code blocks with language specification: render as plain code block

---

# 7. Resume Module

## Purpose
Provide downloadable and viewable resume.

## Components
- `ResumePage` — Skills summary and download options

## States
| State | Handling |
|-------|----------|
| Default | Skills grid + experience + download buttons |
| Loading | Skeleton (if async content added later) |

## Acceptance Criteria
- [ ] Download PDF button
- [ ] View Online button (opens PDF in new tab)
- [ ] Skills summary in 2x2 grid
- [ ] Notable experience highlights
- [ ] Responsive layout

---

# 8. Contact Module

## Purpose
Enable professional inquiries.

## Components
- `ContactSection` — Form with validation
- `ContactPage` — Thin wrapper around ContactSection

## States
| State | Handling |
|-------|----------|
| Default | Empty form with placeholder text |
| Validation error | Native HTML5 validation messages |
| Submitting | Button disabled, no loading state (future) |
| Success | Green card with checkmark, auto-dismiss 5s |
| Error | Red card with error message (future) |

## Form Fields
- Name (text, required)
- Email (email, required)
- Subject (text, required)
- Message (textarea, required, 5 rows)

## Acceptance Criteria
- [ ] All fields have labels and placeholders
- [ ] Required fields validated natively
- [ ] Email field validates format
- [ ] Success state shows confirmation
- [ ] Social links displayed below form
- [ ] Email link opens default mail client

## Edge Cases
- Very long messages: textarea scrolls
- XSS attempts: React handles escaping
- Rapid submission: handled by state (future: rate limiting)

---

# 9. Theme System

## Purpose
Support user preference for light or dark mode.

## Implementation
- Context-based theme provider
- localStorage for persistence
- System preference detection on first visit
- CSS class toggle on `<html>`

## States
| State | Handling |
|-------|----------|
| System preference detected | Applied on load |
| Manual toggle | Overrides system preference |
| No JavaScript | Default light mode |
| SSR/SSG | Safe default returned from hook |

## Acceptance Criteria
- [ ] Light and dark themes fully supported
- [ ] System preference detected on first visit
- [ ] Theme persists across page loads
- [ ] No flash of wrong theme
- [ ] Toggle button in navigation
- [ ] Smooth transition between themes
- [ ] Safe fallback during SSR

## Edge Cases
- localStorage unavailable: use system preference only
- No system preference: default to dark
- JavaScript disabled: light mode only (no toggle)
- SSR rendering: safe default returned

---

# 10. Search Module

## Purpose
Enable quick filtering of projects and blog content.

## Implementation
- Client-side search with useState + useMemo
- Case-insensitive matching
- Real-time filtering on keystroke

## Scope
- Projects: title, description, technologies
- Blog: title, excerpt

## Acceptance Criteria
- [ ] Search input with icon
- [ ] Real-time filtering as user types
- [ ] Case-insensitive matching
- [ ] Works in combination with category/tag filters
- [ ] Empty state when no results
- [ ] Clear search to show all results

## Edge Cases
- Rapid typing: instant updates (no debounce needed for small dataset)
- Special regex characters: literal string matching
- Very long search query: handled normally