"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
}

export function HorizontalScroll({ children, className = "" }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Translate horizontal based on vertical scroll
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: "300vh" }} // Tall container to create scroll distance
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="flex h-full items-center"
          style={{ x }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}