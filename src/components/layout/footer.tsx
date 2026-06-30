import { siteConfig } from "@/lib/site-config";
import { Globe, Briefcase, MessageCircle, Mail, Code } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { platform: "github", url: siteConfig.links.github, icon: Globe },
    { platform: "linkedin", url: siteConfig.links.linkedin, icon: Briefcase },
    { platform: "twitter", url: siteConfig.links.twitter, icon: MessageCircle },
    { platform: "leetcode", url: siteConfig.links.leetcode, icon: Code },
    { platform: "email", url: siteConfig.links.email, icon: Mail },
  ];

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <Link
              href="/"
              className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50"
            >
              {siteConfig.name.split(" ")[0]}
              <span className="text-zinc-400">.</span>
            </Link>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
                {links.map(({ platform, url, icon: Icon }) => {
              const href = platform === "email" ? "mailto:" + url : url;
              return (
              <a
                key={platform}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                aria-label={platform}
              >
                <Icon size={18} />
              </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-zinc-200 pt-6 text-center dark:border-zinc-800">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            © {currentYear} {siteConfig.name}. Built with Next.js & TypeScript.
          </p>
        </div>
      </div>
    </footer>
  );
}
