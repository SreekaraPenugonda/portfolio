"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { prefersReducedMotion } from "@/lib/utils";

const certificates = [
  {
    src: "/certficates/bytexlgaming.jpg",
    alt: "ByteXL Gaming Championship Certificate — Sreekara Penugonda",
  },
  {
    src: "/certficates/certificate.png",
    alt: "Achievement Certificate — Sreekara Penugonda",
  },
  {
    src: "/certficates/orcadehubpythonprog.jpg",
    alt: "OrcadeHub Python Programming Certificate — Sreekara Penugonda",
  },
  {
    src: "/certficates/skillcraft-1.jpg",
    alt: "SkillCraft Technology Internship Certificate — Sreekara Penugonda",
  },
  {
    src: "/certficates/skillcraft-2.jpg",
    alt: "SkillCraft Technology Completion Certificate — Sreekara Penugonda",
  },
  {
    src: "/certficates/skillcraftrecom-1.jpg",
    alt: "SkillCraft Recommendation Letter Page 1 — Sreekara Penugonda",
  },
  {
    src: "/certficates/skillcraftrecom-2.jpg",
    alt: "SkillCraft Recommendation Letter Page 2 — Sreekara Penugonda",
  },
];

export function CertificationGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const reducedMotion = prefersReducedMotion();

  useEffect(() => {
    if (!scrollRef.current || reducedMotion) return;

    const track = scrollRef.current;
    // Clone items for seamless infinite scroll
    const items = track.querySelectorAll<HTMLElement>(".cert-item");
    items.forEach((item) => {
      const clone = item.cloneNode(true) as HTMLElement;
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });

    const scrollWidth = track.scrollWidth / 2;

    controls.start({
      x: -scrollWidth,
      transition: {
        duration: 30,
        repeat: Infinity,
        ease: "linear",
      },
    });

    return () => controls.stop();
  }, [controls, reducedMotion]);

  return (
    <section
      aria-label="Certification gallery"
      className="w-full overflow-hidden bg-zinc-50 dark:bg-zinc-950 py-16"
    >
      <div className="text-center mb-10 px-4">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Certifications
        </h2>
        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          Hover to pause · Hover over a certificate to zoom in
        </p>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-8 items-center"
        style={{ width: "fit-content" }}
      >
        {certificates.map((cert, idx) => (
          <motion.div
            key={idx}
            className="cert-item relative w-[70vw] h-[60vh] max-w-4xl shrink-0 rounded-xl overflow-hidden shadow-2xl bg-white dark:bg-zinc-900"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Image
              src={cert.src}
              alt={cert.alt}
              fill
              sizes="(max-width: 768px) 90vw, 70vw"
              className="object-contain p-4"
              loading={idx === 0 ? "eager" : "lazy"}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}