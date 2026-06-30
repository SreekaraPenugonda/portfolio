"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Map of technology names to their corresponding icon/text and color
const skillIconMap: Record<string, { icon: string; color: string }> = {
  TypeScript: { icon: "TS", color: "#3178C6" },
  JavaScript: { icon: "JS", color: "#F7DF1E" },
  Python: { icon: "Py", color: "#3776AB" },
  Java: { icon: "Jv", color: "#ED8B00" },
  SQL: { icon: "SQL", color: "#CC2927" },
  "HTML/CSS": { icon: "{}", color: "#E34F26" },
  React: { icon: "⚛️", color: "#61DAFB" },
  "Next.js": { icon: "N", color: "#000000" },
  "Tailwind CSS": { icon: "TW", color: "#06B6D4" },
  "Framer Motion": { icon: "FM", color: "#0055FF" },
  Redux: { icon: "Rx", color: "#764ABC" },
  "React Native": { icon: "RN", color: "#61DAFB" },
  "Node.js": { icon: "⬡", color: "#339933" },
  Express: { icon: "Ex", color: "#000000" },
  FastAPI: { icon: "FA", color: "#009688" },
  "REST APIs": { icon: "↔", color: "#FF6C37" },
  GraphQL: { icon: "GL", color: "#E10098" },
  MongoDB: { icon: "MDB", color: "#47A248" },
  PostgreSQL: { icon: "PG", color: "#4169E1" },
  Redis: { icon: "Re", color: "#FF4438" },
  Firebase: { icon: "FB", color: "#FFCA28" },
  Docker: { icon: "D", color: "#2496ED" },
  Kubernetes: { icon: "K8s", color: "#326CE5" },
  AWS: { icon: "AWS", color: "#FF9900" },
  "CI/CD": { icon: "↻", color: "#2396ED" },
  Git: { icon: "Git", color: "#F05032" },
  "VS Code": { icon: "VSC", color: "#007ACC" },
  Figma: { icon: "Fg", color: "#F24E1E" },
  Postman: { icon: "PM", color: "#FF6C37" },
  Linux: { icon: "🐧", color: "#FCC624" },
};

interface SkillIconProps {
  name: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function SkillIcon({
  name,
  size = "md",
  showLabel = true,
  className,
}: SkillIconProps) {
  const [isHovered, setIsHovered] = useState(false);
  const iconData = skillIconMap[name] || {
    icon: name.slice(0, 2).toUpperCase(),
    color: "#71717a",
  };

  const sizeMap = {
    sm: { container: "w-8 h-8", text: "text-xs", label: "text-[10px]" },
    md: { container: "w-10 h-10", text: "text-sm", label: "text-xs" },
    lg: { container: "w-12 h-12", text: "text-base", label: "text-sm" },
  };

  return (
    <motion.div
      className={cn("relative inline-flex flex-col items-center", className)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className={cn(
          "flex items-center justify-center rounded-lg border-2 transition-colors",
          sizeMap[size].container
        )}
        style={{
          borderColor: isHovered ? iconData.color : "transparent",
          backgroundColor: isHovered
            ? `${iconData.color}15`
            : "rgb(39 39 42 / 0.3)",
        }}
        animate={{
          scale: isHovered ? 1.15 : 1,
          y: isHovered ? -4 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <span
          className={cn("font-bold", sizeMap[size].text)}
          style={{ color: isHovered ? iconData.color : "#a1a1aa" }}
        >
          {iconData.icon}
        </span>
      </motion.div>

      {showLabel && (
        <motion.span
          className={cn(
            "absolute -bottom-5 whitespace-nowrap font-medium",
            sizeMap[size].label
          )}
          style={{ color: iconData.color }}
          initial={{ opacity: 0, y: 2 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 2,
          }}
          transition={{ duration: 0.15 }}
        >
          {name}
        </motion.span>
      )}
    </motion.div>
  );
}