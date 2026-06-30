"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const certificates = [
  "/certficates/bytexlgaming.jpg",
  "/certficates/certificate.png",
  "/certficates/orcadehubpythonprog.jpg",
  "/certficates/skillcraft-1.jpg",
  "/certficates/skillcraft-2.jpg",
  "/certficates/skillcraftrecom-1.jpg",
  "/certficates/skillcraftrecom-2.jpg",
];

export function CertificationGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    // Clone items for infinite scroll
    const items = scrollRef.current.querySelectorAll(".cert-item");
    items.forEach((item) => {
      const clone = item.cloneNode(true) as HTMLElement;
      clone.setAttribute("aria-hidden", "true");
      scrollRef.current?.appendChild(clone);
    });

    // Continuous auto-scroll with GSAP
    const scrollWidth = scrollRef.current.scrollWidth / 2;
    
    animationRef.current = gsap.to(scrollRef.current, {
      x: -scrollWidth,
      duration: 30,
      repeat: -1,
      ease: "linear",
    });

    return () => {
      animationRef.current?.kill();
    };
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    
    // Pause animation
    animationRef.current?.pause();

    // Enlarge hovered image
    gsap.to(target, {
      scale: 1.3,
      duration: 0.4,
      ease: "power2.out",
      zIndex: 10,
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    
    // Resume animation
    animationRef.current?.play();

    // Reset scale
    gsap.to(target, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
      zIndex: 1,
    });
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      <div
        ref={scrollRef}
        className="flex gap-8 items-center h-full"
        style={{ width: "fit-content" }}
      >
        {certificates.map((cert, idx) => (
          <div
            key={idx}
            className="cert-item w-[70vw] h-[80vh] max-w-4xl shrink-0 rounded-xl overflow-hidden shadow-2xl bg-white dark:bg-zinc-900"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={cert}
              alt={`Certificate ${idx + 1}`}
              className="w-full h-full object-contain p-4"
            />
          </div>
        ))}
      </div>
    </div>
  );
}