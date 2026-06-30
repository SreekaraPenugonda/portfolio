# Design System Specification

## Project Atlas — Design Tokens & Components

---

# 1. Design Principles

1. **Simplicity before complexity** — Every element must earn its place
2. **Performance over decoration** — Animations serve a purpose or don't exist
3. **Accessibility by default** — High contrast, keyboard nav, semantic HTML
4. **Content first** — The work speaks, the design supports
5. **Consistency** — One pattern, one component, one way to do it

---

# 2. Color Palette

## 2.1 Neutral Scale

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| 50 | `#fafafa` | `#09090b` | Background (inverse) |
| 100 | `#f4f4f5` | `#18181b` | Subtle background |
| 200 | `#e4e4e7` | `#27272a` | Borders, dividers |
| 300 | `#d4d4d8` | `#3f3f46` | Disabled elements |
| 400 | `#a1a1aa` | `#52525b` | Muted text |
| 500 | `#71717a` | `#71717a` | Secondary text |
| 600 | `#52525b` | `#a1a1aa` | Body text (inverse) |
| 700 | `#3f3f46` | `#d4d4d8` | Body text |
| 800 | `#27272a` | `#e4e4e7` | Headings (inverse) |
| 900 | `#18181b` | `#f4f4f5` | Headings |
| 950 | `#09090b` | `#fafafa` | Primary text (inverse) |

## 2.2 Accent Colors

The accent palette is intentionally minimal. All use zinc-based neutrals for the primary identity.

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| Primary bg | `#18181b` | `#fafafa` | Primary buttons, active states |
| Primary text | `#fafafa` | `#18181b` | Text on primary backgrounds |
| Success | `#059669` | `#34d399` | Success states |
| Warning | `#d97706` | `#fbbf24` | Warning states |
| Error | `#dc2626` | `#f87171` | Error states |

## 2.3 Surface Colors

| Surface | Light | Dark |
|---------|-------|------|
| Page background | `#ffffff` | `#09090b` |
| Card background | `#ffffff` | `#09090b` (with border) |
| Card hover | `#ffffff` | `#09090b` (with stronger border + shadow) |
| Section alt background | `#fafafa` | `#09090b` (with 50% opacity) |
| Overlay | `rgba(0,0,0,0.5)` | `rgba(0,0,0,0.7)` |

---

# 3. Typography

## 3.1 Font Family

**Primary:** Geist Sans (variable, via `next/font/google`)
**Mono:** Geist Mono (variable, via `next/font/google`)

## 3.2 Type Scale

| Level | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| Hero | 4rem (64px) | 700 | 1.1 | -0.02em | Hero heading |
| h1 | 2.5rem (40px) | 700 | 1.2 | -0.02em | Page title |
| h2 | 1.875rem (30px) | 700 | 1.3 | -0.01em | Section heading |
| h3 | 1.25rem (20px) | 600 | 1.4 | -0.01em | Card title |
| Body | 1rem (16px) | 400 | 1.6 | 0 | Paragraphs |
| Body-sm | 0.875rem (14px) | 400 | 1.5 | 0 | Secondary text |
| Caption | 0.75rem (12px) | 400 | 1.5 | 0 | Metadata, dates |
| Label | 0.75rem (12px) | 600 | 1.5 | 0.05em | Section labels, uppercase |
| Tech | 0.75rem (12px) | 500 | 1.5 | 0 | Tech tags |

## 3.3 CSS Variables

```css
--font-sans: 'Geist Sans', system-ui, sans-serif;
--font-mono: 'Geist Mono', monospace;
```

---

# 4. Spacing

## 4.1 Scale

| Token | Value | Usage |
|-------|-------|-------|
| 1 | 0.25rem | Icon gaps |
| 2 | 0.5rem | Tight spacing |
| 3 | 0.75rem | Element spacing |
| 4 | 1rem | Default padding |
| 5 | 1.25rem | Section padding |
| 6 | 1.5rem | Card padding |
| 8 | 2rem | Section margin |
| 10 | 2.5rem | Large spacing |
| 12 | 3rem | Section vertical padding |
| 16 | 4rem | Page vertical padding |
| 20 | 5rem | Section separator |

## 4.2 Layout

| Element | Max Width | Padding (mobile) | Padding (desktop) |
|---------|-----------|-------------------|-------------------|
| Content | 64rem (1024px) | 1rem | 1.5rem |
| Text | 48rem (768px) | 1rem | 1.5rem |
| Narrow | 36rem (576px) | 1rem | 1rem |

---

# 5. Borders & Radius

## 5.1 Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| sm | 0.375rem | Small elements |
| DEFAULT | 0.5rem | Buttons, inputs |
| lg | 0.75rem | Cards |
| xl | 0.75rem | Large cards |
| 2xl | 1rem | Modals |
| full | 9999px | Badges, pills |

## 5.2 Borders

All borders use `1px` width with the `border-zinc-200` (light) / `border-zinc-800` (dark) token.

---

# 6. Shadows

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| sm | `0 1px 2px rgba(0,0,0,0.05)` | None | Subtle elevation |
| DEFAULT | `0 1px 3px rgba(0,0,0,0.1)` | `0 1px 3px rgba(0,0,0,0.3)` | Card hover |
| md | `0 4px 6px rgba(0,0,0,0.1)` | `0 4px 6px rgba(0,0,0,0.4)` | Dropdowns |

---

# 7. Animation & Motion

## 7.1 Duration

| Token | Value | Usage |
|-------|-------|-------|
| fast | 150ms | Hover states, color transitions |
| normal | 200ms | Button presses, focus rings |
| slow | 300ms | Theme transitions |
| entrance | 500ms | Page/section entrance |
| stagger | 100ms | Delay between staggered elements |

## 7.2 Easing

| Token | Value | Usage |
|-------|-------|-------|
| default | `ease-in-out` | Standard transitions |
| entrance | `cubic-bezier(0.16, 1, 0.3, 1)` | Element entrance |
| exit | `ease-in` | Element exit |

## 7.3 Motion Rules

1. **No motion on page load** — Only animate into viewport
2. **Staggered entrance** — Elements enter sequentially with 100ms delays
3. **Purposeful exits** — Menu items exit in reverse order of entrance
4. **Reduced motion** — Respect `prefers-reduced-motion` media query
5. **Scale** — Cards scale 1.02 on hover, not 1.1

---

# 8. Component Specifications

## 8.1 Button

| Prop | Values |
|------|--------|
| variant | `primary`, `secondary`, `outline`, `ghost` |
| size | `sm`, `md`, `lg` |
| states | default, hover, active, disabled, focus-visible |

**Primary Button:**
- Light: bg-zinc-900, text-white, hover:bg-zinc-800
- Dark: bg-white, text-zinc-900, hover:bg-zinc-200
- Radius: rounded-lg (0.5rem)

## 8.2 Badge

| Prop | Values |
|------|--------|
| variant | `default`, `outline`, `success`, `warning` |
| Shape | rounded-full |

**Default Badge:**
- Light: bg-zinc-100, text-zinc-700
- Dark: bg-zinc-800, text-zinc-300

## 8.3 Card

| Property | Value |
|----------|-------|
| Border | 1px solid (zinc-200/800) |
| Radius | rounded-xl (0.75rem) |
| Padding | p-6 (1.5rem) |
| Hover | Border darkens, shadow-sm |
| Transition | all 200ms ease-in-out |

## 8.4 Input

| Property | Value |
|----------|-------|
| Border | 1px solid zinc-200/800 |
| Radius | rounded-lg (0.5rem) |
| Padding | px-4 py-2.5 (1rem/0.625rem) |
| Focus | Border zinc-400/600, ring-2 ring-zinc-400/20 |
| Placeholder | text-zinc-400/500 |
| Transition | colors 200ms |

## 8.5 Navigation

| Element | Property | Value |
|---------|----------|-------|
| Nav item | Padding | px-3 py-2 |
| Nav item | Radius | rounded-lg |
| Nav item active | Background | bg-zinc-100/800 |
| Nav item hover | Background | bg-zinc-100/800 |
| Logo | Font | text-lg font-bold |
| Header | Position | fixed top-0 |
| Header | Backdrop | blur-md with 80% opacity |

---

# 9. Icon Standards

- **Library:** Lucide React
- **Size:** 16-20px for inline icons, 24px for standalone
- **Color:** Inherits from parent text color by default
- **Accessibility:** All standalone icon buttons must have `aria-label`

---

# 10. Accessibility Standards

## 10.1 Color Contrast

| Element | Required Ratio | Achieved |
|---------|---------------|----------|
| Normal text | 4.5:1 | ✅ |
| Large text (18px+) | 3:1 | ✅ |
| UI components | 3:1 | ✅ |

## 10.2 Keyboard Navigation

- Tab order follows visual order
- Focus indicators on all interactive elements
- Skip to content link (future)
- No keyboard traps

## 10.3 ARIA

- Icon buttons: `aria-label`
- Theme toggle: `aria-label="Switch to dark/light mode"`
- Navigation: semantic `<nav>` element
- Main content: `<main>` landmark
- Mobile menu: proper `aria-expanded` management

---

# 11. Dark Mode

## 11.1 Strategy

- CSS class-based toggling (`dark` class on `<html>`)
- System preference detection on first visit
- Manual toggle persists to localStorage
- Flash prevention script in `<head>`

## 11.2 Implementation

```html
<script>
  (function() {
    try {
      var theme = localStorage.getItem('theme');
      if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      }
    } catch(e) {}
  })();
</script>
```

## 11.3 Transition

Use `transition-colors` utility for smooth theme transitions on all themeable elements.