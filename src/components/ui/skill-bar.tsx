"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkillBarProps {
  name: string;
  level: number;
  className?: string;
}

export function SkillBar({ name, level, className }: SkillBarProps) {
  return (
    <div className={cn("group", className)}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {name}
        </span>
        <span className="text-xs text-zinc-400 dark:text-zinc-500">
          {level}%
        </span>
      </div>
      <div className="h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-zinc-900 dark:bg-zinc-100"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}