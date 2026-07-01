"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";

/** Minimal markdown→JSX renderer that produces valid HTML. */
function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Headings
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-2xl font-bold mt-8 mb-4 text-zinc-900 dark:text-zinc-50">
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-xl font-semibold mt-6 mb-3 text-zinc-900 dark:text-zinc-50">
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // Unordered list block — collect consecutive "- " lines
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc list-inside my-3 space-y-1">
          {items.map((item, j) => (
            <li key={j} className="text-zinc-600 dark:text-zinc-400">
              {item}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list block — collect consecutive "N. " lines
    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\. /, ""));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="list-decimal list-inside my-3 space-y-1">
          {items.map((item, j) => (
            <li key={j} className="text-zinc-600 dark:text-zinc-400">
              {item}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Code blocks (```...```)
    if (line.startsWith("```")) {
      const codeLines: string[] = [];
      i++; // skip opening ```
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <pre key={`code-${i}`} className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 my-4 overflow-x-auto text-sm font-mono">
          <code>{codeLines.join("\n")}</code>
        </pre>
      );
      continue;
    }

    // Bold paragraph (line wrapped in **)
    if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
      elements.push(
        <p key={i} className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
          {line.slice(2, -2)}
        </p>
      );
      i++;
      continue;
    }

    // Empty line → spacing
    if (line.trim() === "") {
      elements.push(<div key={i} className="h-2" />);
      i++;
      continue;
    }

    // Default paragraph
    elements.push(
      <p key={i} className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
        {line}
      </p>
    );
    i++;
  }

  return elements;
}

export default function BlogPostPage() {
  const params = useParams();
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <div className="min-h-screen py-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Article not found
          </h1>
          <Link
            href="/blog"
            className="mt-4 inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            <ArrowLeft size={16} />
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen py-20 px-4">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 mb-8"
        >
          <ArrowLeft size={16} />
          Back to blog
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {post.title}
          </h1>

          <div className="mt-4 flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {post.readingTime} min read
            </span>
          </div>

          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="mt-8 prose prose-zinc dark:prose-invert max-w-none">
            {renderMarkdown(post.content)}
          </div>
        </motion.div>
      </div>
    </article>
  );
}