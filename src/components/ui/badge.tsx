import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "success" | "warning";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        {
          "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300":
            variant === "default",
          "border border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400":
            variant === "outline",
          "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300":
            variant === "success",
          "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300":
            variant === "warning",
        },
        className
      )}
    >
      {children}
    </span>
  );
}