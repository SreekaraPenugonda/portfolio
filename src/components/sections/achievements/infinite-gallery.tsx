"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { achievements } from "@/data/achievements";
import { formatDateShort } from "@/lib/utils";
import { ExternalLink, X, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

function TiltCard({
  achievement,
  index,
  total,
  isPaused,
  onSelect,
}: {
  achievement: (typeof achievements)[0];
  index: number;
  total: number;
  isPaused: boolean;
  onSelect: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current || isPaused) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const normX = (e.clientX - centerX) / rect.width;
      const normY = (e.clientY - centerY) / rect.height;
      x.set(normX);
      y.set(normY);
    },
    [isPaused, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const angle = (index / total) * 360;
  const radius = 400;

  const itemX = Math.cos((angle * Math.PI) / 180) * radius;
  const itemZ = Math.sin((angle * Math.PI) / 180) * radius - 200;

  return (
    <motion.div
      ref={ref}
      className="absolute cursor-pointer"
      style={{
        x: itemX,
        z: itemZ,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transform: `translateX(${itemX}px) translateZ(${itemZ}px)`,
      }}
      animate={
        !isPaused
          ? {
              x: [
                itemX,
                itemX + 50,
                itemX - 30,
                itemX + 20,
                itemX,
              ],
              z: [
                itemZ,
                itemZ - 20,
                itemZ + 10,
                itemZ - 5,
                itemZ,
              ],
            }
          : {}
      }
      transition={
        !isPaused
          ? {
              duration: 8 + index * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }
          : {}
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      whileHover={{ scale: 1.3, zIndex: 50 }}
    >
      <div className="relative rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4 shadow-lg backdrop-blur-sm w-48">
        {/* Background blur effect on hover */}
        <div className="absolute inset-0 rounded-xl bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm" />

        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {achievement.type}
          </p>
          <h3 className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-50 leading-tight">
            {achievement.title}
          </h3>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
            {achievement.description}
          </p>
          <p className="mt-2 text-[10px] text-zinc-400 dark:text-zinc-500">
            {formatDateShort(achievement.date)}
          </p>
        </div>

        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 transition-opacity group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.1), transparent 40%)",
          }}
        />
      </div>
    </motion.div>
  );
}

function CinematicPreview({
  achievement,
  onClose,
}: {
  achievement: (typeof achievements)[0] | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (achievement) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [achievement]);

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-xl p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative max-w-lg w-full rounded-2xl border border-zinc-700 bg-zinc-900 p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 rounded-full p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Certificate Image or Icon */}
            {achievement.image ? (
              <div className="mb-6 rounded-xl overflow-hidden border border-zinc-700">
                <img
                  src={achievement.image}
                  alt={achievement.title}
                  className="w-full max-h-64 object-contain bg-zinc-800"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-800 mb-6">
                <span className="text-3xl">
                  {achievement.type === "award"
                    ? "🏆"
                    : achievement.type === "publication"
                      ? "📄"
                      : achievement.type === "recognition"
                        ? "⭐"
                        : "🎖️"}
                </span>
              </div>
            )}

            {/* Content */}
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              {achievement.type}
            </p>
            <h2 className="text-2xl font-bold text-white">
              {achievement.title}
            </h2>
            <p className="mt-3 text-zinc-400 leading-relaxed">
              {achievement.description}
            </p>
            <p className="mt-4 text-sm text-zinc-500">
              {formatDateShort(achievement.date)}
            </p>

            {/* Quick actions */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={() =>
                  achievement.url && window.open(achievement.url, "_blank")
                }
              >
                <Eye size={14} className="mr-2" />
                View Details
              </Button>
              <Button variant="outline" size="sm">
                <Download size={14} className="mr-2" />
                Download Certificate
              </Button>
              {achievement.url && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    window.open(achievement.url, "_blank")
                  }
                >
                  <ExternalLink size={14} className="mr-2" />
                  Verify
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function InfiniteAchievementGallery() {
  const [isPaused, setIsPaused] = useState(false);
  const [selected, setSelected] = useState<
    (typeof achievements)[0] | null
  >(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll / rotation
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.3);
    }, 50);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <>
      <section className="py-20 px-4 overflow-hidden">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Achievements Gallery
            </p>
            <h2 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              Scroll & Explore
            </h2>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400 text-sm">
              Hover to pause · Click to explore
            </p>
          </div>

          {/* 3D Carousel */}
          <div
            ref={containerRef}
            className="relative h-[500px] flex items-center justify-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div
              className="relative"
              style={{
                transformStyle: "preserve-3d",
                perspective: 1000,
              }}
              animate={{ rotateY: rotation }}
              transition={{ ease: "linear", duration: 0.05 }}
            >
              {achievements.map((achievement, i) => (
                <TiltCard
                  key={achievement.id}
                  achievement={achievement}
                  index={i}
                  total={achievements.length}
                  isPaused={isPaused}
                  onSelect={() => setSelected(achievement)}
                />
              ))}
            </motion.div>

            {/* Center glow */}
            <div className="absolute w-32 h-32 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
          </div>

          {/* Quick stats below carousel */}
          <div className="mt-12 flex justify-center gap-8 text-center">
            <div>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {achievements.length}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Achievements
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {achievements.filter((a) => a.type === "award").length}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Awards
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {achievements.filter((a) => a.url).length}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Verifiable
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cinematic Preview Modal */}
      <CinematicPreview
        achievement={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}