import type { Metadata } from "next";
import { ResumeClient } from "./resume-client";

export const metadata: Metadata = {
  title: "Resume — Sreekara Penugonda",
  description:
    "Resume of Penugonda Sreekara — Full-Stack Developer, AWS Cloud Intern, and Smart India Hackathon 2024 Winner. B.Tech CSE at Vignan's University.",
  alternates: { canonical: "https://sreekara.dev/resume" },
};

export default function ResumePage() {
  return <ResumeClient />;
}
