import { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "Building a Production-Grade Portfolio with Next.js",
    slug: "building-production-portfolio-nextjs",
    excerpt:
      "Learn how I built Project Atlas — a portfolio that achieves 95+ Lighthouse scores while showcasing engineering depth.",
    content: `
## Why Build Another Portfolio?

Most developer portfolios fall into one of two categories: generic templates with no personality, or over-designed sites that sacrifice performance for aesthetics. I wanted to build something different — a portfolio that is both a showcase of my work and a demonstration of my engineering capabilities.

## Architecture Decisions

### Next.js App Router

The App Router provides a powerful foundation for building modern web applications. Key benefits:

- **Server Components** for optimal performance
- **Streaming** for progressive rendering
- **Layouts** for persistent UI patterns
- **Route Groups** for clean URL structure

### TypeScript First

Every component, utility, and data file is fully typed. This provides:

- Better IDE support and autocompletion
- Fewer runtime errors
- Self-documenting code
- Easier refactoring

### Tailwind CSS v4

The latest version of Tailwind CSS offers:

- Improved performance with JIT compilation
- CSS-first configuration
- Better dark mode support
- Smaller bundle sizes

## Performance Optimization

Achieving 95+ Lighthouse scores required careful attention to:

1. **Image Optimization** — Using Next.js Image component with WebP format
2. **Code Splitting** — Dynamic imports for heavy components
3. **Font Loading** — System font stack with fallbacks
4. **Bundle Analysis** — Regular audits with @next/bundle-analyzer

## Key Takeaways

Building Project Atlas reinforced several important engineering principles:

- Performance is a feature, not an afterthought
- Accessibility benefits everyone, not just users with disabilities
- TypeScript pays dividends as projects grow
- Good architecture enables rapid iteration
    `,
    date: "2026-06-15",
    tags: ["Next.js", "TypeScript", "Performance", "Architecture"],
    readingTime: 5,
  },
  {
    id: "post-2",
    title: "The Art of System Design Interviews",
    slug: "system-design-interviews-guide",
    excerpt:
      "A comprehensive guide to acing system design interviews with frameworks, patterns, and real-world examples.",
    content: `
## Understanding the Interview

System design interviews evaluate your ability to architect large-scale systems. They're not about getting the "right answer" but about demonstrating your thought process.

## The Framework

### 1. Requirements Clarification

Always start by clarifying requirements:

- **Functional requirements**: What should the system do?
- **Non-functional requirements**: What are the performance, scalability, and reliability goals?
- **Constraints**: What are the limitations (budget, time, team size)?

### 2. High-Level Design

Sketch the overall architecture:

- Client-server interaction
- API design
- Data flow
- Component relationships

### 3. Deep Dive

Focus on the most interesting components:

- Database schema design
- Caching strategy
- Load balancing
- Data partitioning

### 4. Trade-offs

Discuss alternatives and justify your choices:

- SQL vs NoSQL
- Synchronous vs asynchronous
- Monolith vs microservices
- Consistency vs availability

## Common Patterns

- **Read-heavy systems**: Use caching and CDN
- **Write-heavy systems**: Use message queues and batch processing
- **Real-time systems**: Use WebSockets and event-driven architecture
- **Data-intensive systems**: Use data partitioning and replication

## Practice Resources

- System Design Interview by Alex Xu
- Designing Data-Intensive Applications by Martin Kleppmann
- YouTube: System Design Interview channel
    `,
    date: "2026-05-20",
    tags: ["System Design", "Interviews", "Architecture", "Best Practices"],
    readingTime: 7,
  },
  {
    id: "post-3",
    title: "TypeScript Patterns for Scalable Applications",
    slug: "typescript-patterns-scalable-apps",
    excerpt:
      "Explore advanced TypeScript patterns that keep your codebase maintainable as it grows.",
    content: `
## Why TypeScript Patterns Matter

As applications grow, maintaining type safety becomes increasingly important. The right patterns can prevent bugs, improve developer experience, and make refactoring safer.

## Discriminated Unions

Use discriminated unions for handling different states:

\`\`\`typescript
type Result<T> = 
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error }
  | { status: 'loading' };
\`\`\`

## Branded Types

Prevent mixing up similar primitive types:

\`\`\`typescript
type UserId = string & { readonly __brand: 'UserId' };
type PostId = string & { readonly __brand: 'PostId' };
\`\`\`

## Generic Constraints

Create reusable, type-safe utilities:

\`\`\`typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
\`\`\`

## Conclusion

These patterns have helped me maintain large codebases with confidence. The key is to start simple and add complexity only when it provides clear value.
    `,
    date: "2026-04-10",
    tags: ["TypeScript", "Patterns", "Best Practices"],
    readingTime: 6,
  },
];