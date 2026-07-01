"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const close = useCallback(() => {
    setIsOpen(false);
    setSearch("");
    setActiveIndex(0);
  }, []);

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

  // Reset active index when filtered results change
  useEffect(() => {
    setActiveIndex(0);
  }, [search]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }
      if (!isOpen) return;

      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        return;
      }
      if (e.key === "Enter" && filtered[activeIndex]) {
        e.preventDefault();
        filtered[activeIndex].action();
        close();
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, activeIndex, close]);

  // Focus trap: keep focus inside the dialog
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector(`[data-active="true"]`);
      activeEl?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const dialogId = "command-palette-dialog";
  const listboxId = "command-palette-listbox";

  return (
    <>
      {/* Keyboard hint (optional — can be removed) */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
              onClick={close}
              aria-hidden="true"
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              id={dialogId}
              className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[101] w-full max-w-xl"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
              >
                {/* Search input */}
                <div className="flex items-center gap-3 border-b border-zinc-200 pb-3 dark:border-zinc-800">
                  <Search size={20} className="text-zinc-400" aria-hidden="true" />
                  <input
                    ref={inputRef}
                    type="text"
                    role="combobox"
                    aria-autocomplete="list"
                    aria-controls={listboxId}
                    aria-expanded={filtered.length > 0}
                    aria-activedescendant={
                      filtered[activeIndex] ? `cmd-${filtered[activeIndex].id}` : undefined
                    }
                    placeholder="Type a command or search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 bg-transparent text-sm outline-none text-zinc-900 dark:text-zinc-50 placeholder-zinc-400"
                  />
                  <kbd className="rounded border border-zinc-200 px-2 py-1 text-xs text-zinc-400 dark:border-zinc-700">
                    ESC
                  </kbd>
                </div>

                {/* Results list */}
                <div
                  ref={listRef}
                  id={listboxId}
                  role="listbox"
                  aria-label="Commands"
                  className="mt-2 max-h-80 overflow-y-auto"
                >
                  {filtered.length === 0 && (
                    <p className="py-8 text-center text-sm text-zinc-400">
                      No commands found.
                    </p>
                  )}
                  {filtered.map((cmd, idx) => {
                    const Icon = cmd.icon as React.ComponentType<{ size?: number; className?: string }>;
                    const isActive = idx === activeIndex;
                    return (
                      <button
                        key={cmd.id}
                        id={`cmd-${cmd.id}`}
                        role="option"
                        aria-selected={isActive}
                        data-active={isActive}
                        onClick={() => {
                          cmd.action();
                          close();
                        }}
                        onMouseEnter={() => setActiveIndex(idx)}
                        className={`flex w-full items-center gap-3 rounded-lg p-3 text-left text-sm transition-colors ${
                          isActive
                            ? "bg-zinc-100 dark:bg-zinc-800"
                            : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                        }`}
                      >
                        <Icon size={18} className="text-zinc-400" aria-hidden="true" />
                        <span className="flex-1 text-zinc-900 dark:text-zinc-50">{cmd.label}</span>
                        <ArrowRight size={14} className="text-zinc-400" aria-hidden="true" />
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
