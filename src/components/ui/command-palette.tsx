"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, FileText, User, Briefcase, Mail, Home } from "lucide-react";
import { useRouter } from "next/navigation";

interface Command {
  id: string;
  label: string;
  icon: React.ElementType;
  action: () => void;
  category: string;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const commands: Command[] = [
    { id: "home", label: "Go to Home", icon: Home, action: () => router.push("/"), category: "Navigation" },
    { id: "projects", label: "View Projects", icon: Briefcase, action: () => router.push("/projects"), category: "Navigation" },
    { id: "experience", label: "View Experience", icon: User, action: () => router.push("/experience"), category: "Navigation" },
    { id: "blog", label: "Read Blog", icon: FileText, action: () => router.push("/blog"), category: "Navigation" },
    { id: "contact", label: "Contact Me", icon: Mail, action: () => router.push("/contact"), category: "Navigation" },
  ];

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[101] w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-4 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex items-center gap-3 border-b border-zinc-200 pb-3 dark:border-zinc-800">
              <Search size={20} className="text-zinc-400" />
              <input
                type="text"
                placeholder="Type a command or search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none text-zinc-900 dark:text-zinc-50 placeholder-zinc-400"
                autoFocus
              />
              <kbd className="rounded border border-zinc-200 px-2 py-1 text-xs text-zinc-400 dark:border-zinc-700">
                ESC
              </kbd>
            </div>
            <div className="mt-2 max-h-80 overflow-y-auto">
              {filtered.map((cmd) => {
                const Icon = cmd.icon as React.ComponentType<{ size?: number; className?: string }>;
                return (
                  <button
                    key={cmd.id}
                    onClick={() => {
                      cmd.action();
                      setIsOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-lg p-3 text-left text-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <Icon size={18} className="text-zinc-400" />
                    <span className="flex-1 text-zinc-900 dark:text-zinc-50">{cmd.label}</span>
                    <ArrowRight size={14} className="text-zinc-400" />
                  </button>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}