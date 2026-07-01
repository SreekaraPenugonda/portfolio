import type { Metadata } from "next";
import { InfiniteAchievementGallery } from "@/components/sections/achievements/infinite-gallery";

export const metadata: Metadata = {
  title: "Achievements",
  description: "Certifications, awards, and recognition earned by Sreekara Penugonda throughout his academic and professional career.",
  alternates: { canonical: "https://sreekara.dev/achievements" },
};

export default function AchievementsPage() {
  return (
    <div className="min-h-screen pt-14">
      <InfiniteAchievementGallery />
    </div>
  );
}