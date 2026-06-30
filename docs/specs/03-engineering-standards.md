# Engineering Standards

## Project Atlas — Code Quality & Architecture Rules

---

# 1. Folder Structure

```
portfolio/
├── docs/                      # Project documentation
│   ├── specs/                 # Specifications (SRS, UX, Features)
│   ├── architecture/          # System design documents
│   └── design/               # Design system documentation
├── public/                    # Static assets (images, fonts)
│   └── images/               # Project images, OG images
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── about/            # /about route
│   │   ├── blog/             # /blog and /blog/[slug] routes
│   │   ├── contact/          # /contact route
│   │   ├── experience/       # /experience route
│   │   ├── projects/         # /projects and /projects/[slug] routes
│   │   ├── resume/           # /resume route
│   │   └── achievements/     # /achievements route
│   ├── components/           # React components
│   │   ├── layout/           # Layout components (Navbar, Footer)
│   │   ├── sections/         # Page section components (Hero, Skills, etc.)
│   │   ├── ui/               # Reusable UI primitives
│   │   └── providers/        # Context providers
│   ├── data/                 # Static data files
│   ├── lib/                  # Utility functions
│   └── types/                # TypeScript type definitions
├── next.config.ts            # Next.js configuration
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

---

# 2. Naming Conventions

## 2.1 Files

| Type | Convention | Example |
|------|------------|---------|
| React components | PascalCase | `Hero.tsx`, `SkillBar.tsx` |
| Layout components | PascalCase | `Navbar.tsx`, `Footer.tsx` |
| Pages | kebab-case | `page.tsx`, `not-found.tsx` |
| Data files | camelCase | `projects.ts`, `siteConfig.ts` |
| Utilities | camelCase | `utils.ts`, `site-config.ts` |
| Types | PascalCase | `Project.ts`, `Skill.ts` |
| CSS | kebab-case | `globals.css`, `custom.css` |

## 2.2 Variables

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `export function Hero()` |
| Functions | camelCase | `function getFeaturedProjects()` |
| Constants | camelCase | `export const siteConfig` |
| Props | PascalCase | `interface ButtonProps` |
| State | camelCase | `const [isOpen, setIsOpen]` |
| Event handlers | handle* | `handleSubmit`, `handleClick` |

## 2.3 Exports

- **Default exports:** Only for page components (`export default function Page()`)
- **Named exports:** Everything else (`export function Hero()`)

---

# 3. Component Rules

## 3.1 Component Structure

```tsx
// 1. Imports
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// 2. Types/Interfaces
interface SkillBarProps {
  name: string;
  level: number;
  className?: string;
}

// 3. Component
export function SkillBar({ name, level, className }: SkillBarProps) {
  // 4. Early returns (if any)
  // 5. Hooks
  // 6. Event handlers
  // 7. Render
  return (
    <div className={cn("group", className)}>
      {/* Content */}
    </div>
  );
}
```

## 3.2 Component Rules

1. **One component per file** — Unless tightly coupled (e.g., `Button` + `ButtonProps`)
2. **No inline styles** — Use Tailwind utilities or CSS classes
3. **No magic numbers** — Define constants with descriptive names
4. **No nested ternary** — Extract to variables or use early returns
5. **No `useEffect` for data fetching** — Use Server Components or React Query
6. **Minimize "use client"** — Only when using hooks or browser APIs
7. **Prop spreading** — Only for native HTML attributes (e.g., `...props` on `<button>`)

---

# 4. TypeScript Rules

## 4.1 Strict Mode

TypeScript strict mode is enabled. This means:

- `strictNullChecks: true`
- `noImplicitAny: true`
- `strictFunctionTypes: true`
- `strictBindCallApply: true`

## 4.2 Type Definitions

```tsx
// ✅ Preferred: Interface for objects
interface Project {
  id: string;
  title: string;
}

// ✅ Preferred: Type for unions
type ProjectCategory = "full-stack" | "frontend" | "backend";

// ✅ Preferred: Type for utility functions
type Formatter = (date: string) => string;

// ❌ Avoid: Any
const data: any = getData();

// ✅ Correct: Use specific type or unknown
const data: unknown = getData();
```

## 4.3 Import Rules

```tsx
// ✅ Preferred: Path aliases
import { cn } from "@/lib/utils";

// ❌ Avoid: Relative imports that go deep
import { cn } from "../../lib/utils";

// ✅ Preferred: Type imports with `type` keyword
import type { Metadata } from "next";
```

---

# 5. Data Layer Rules

## 5.1 Data File Structure

```tsx
// src/data/projects.ts
import { Project } from "@/types";

export const projects: Project[] = [
  // ... data
];

// Helper functions at the bottom
export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
```

## 5.2 Rules

1. **No business logic in data files** — Only data and simple query functions
2. **No component imports in data files** — Pure data only
3. **Type all data** — Every array and object must have a type
4. **Export query functions** — `getProjectById()`, `getFeaturedProjects()`

---

# 6. CSS Rules

## 6.1 Tailwind Usage

```tsx
// ✅ Preferred: Tailwind utilities
<div className="flex items-center gap-4 p-6 rounded-xl border" />

// ❌ Avoid: Custom CSS for simple layouts
<div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} />

// ✅ Preferred: cn() for conditional classes
<div className={cn("base-class", isActive && "active-class")} />

// ✅ Preferred: Tailwind dark mode
<div className="text-zinc-600 dark:text-zinc-400" />
```

## 6.2 Custom CSS

Only in `globals.css` for:
- CSS custom properties (color tokens)
- Scrollbar styles
- Focus/selection styles
- Font-face declarations

---

# 7. Animation Rules

## 7.1 Framer Motion

```tsx
// ✅ Preferred: Viewport-triggered animations
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>

// ✅ Preferred: Staggered entrance
{items.map((item, idx) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: idx * 0.1 }}
  />
))}
```

## 7.2 Rules

1. **All animations set `viewport={{ once: true }}`** — Animate once, no repeats
2. **No animation on initial page load** — Only scroll-triggered animations
3. **Respect `prefers-reduced-motion`** — Future consideration
4. **Max stagger delay: 0.5s** — Don't make users wait

---

# 8. Performance Rules

## 8.1 Image Optimization

```tsx
// ✅ Preferred: Next.js Image component
import Image from "next/image";

<Image
  src="/images/project.png"
  alt="Project screenshot"
  width={800}
  height={450}
  priority={isAboveFold}
/>
```

## 8.2 Bundle Optimization

1. **Dynamic imports for heavy components**
2. **No barrel exports** — Import directly from source files
3. **Minimize client components** — Server Components by default
4. **Avoid `useEffect`** — Prefer Server Components or event handlers

---

# 9. Documentation Rules

## 9.1 Code Comments

```tsx
// ✅ For complex logic
// Memoize filtered projects to avoid re-computation on every keystroke
const filtered = useMemo(() => {
  return projects.filter(/* ... */);
}, [search, activeCategory]);
```

## 9.2 README

Every major module should have a brief comment explaining its purpose:
- What the component/file does
- What props it accepts (for components)
- Any important behavioral notes

---

# 10. Git Workflow

## 10.1 Branch Strategy

- `main` — Production-ready code
- `develop` — Integration branch
- `feature/*` — New features
- `fix/*` — Bug fixes
- `docs/*` — Documentation updates

## 10.2 Commit Messages

```
type(scope): description

Types: feat, fix, docs, refactor, perf, test, chore
Scope: component name or module

Examples:
feat(projects): add category filtering
fix(nav): resolve mobile menu focus trap
docs(srs): add non-functional requirements
refactor(theme): extract theme provider to separate file
```

---

# 11. Code Review Checklist

- [ ] TypeScript compiles without errors
- [ ] No `any` types used
- [ ] No console.log statements
- [ ] No commented-out code
- [ ] Proper error/empty states handled
- [ ] Mobile responsiveness verified
- [ ] Dark mode works correctly
- [ ] Accessibility: keyboard nav, ARIA labels, focus indicators
- [ ] Animations respect `viewport={{ once: true }}`
- [ ] No duplicate or unused imports
- [ ] Components follow naming conventions
- [ ] Data is typed properly
- [ ] Performance: no unnecessary re-renders, proper memo usage