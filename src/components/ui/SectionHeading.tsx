import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

type SectionHeadingProps = {
  id?: string;
  roman: string;
  eyebrow: string;
  title: string;
  summary?: string;
  variant?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  id,
  roman,
  eyebrow,
  title,
  summary,
  variant = "light",
  align = "left",
  className,
}: SectionHeadingProps) {
  const isDark = variant === "dark";
  const isCenter = align === "center";

  return (
    <Reveal
      className={cn(
        "relative",
        isCenter ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className,
      )}
    >
      <div className={cn("flex items-baseline gap-4", isCenter && "justify-center")}>
        <span
          aria-hidden="true"
          className={cn(
            "font-label text-4xl font-bold tracking-tight sm:text-5xl",
            isDark ? "text-highlight-light/90" : "text-primary",
          )}
        >
          {roman}.
        </span>
        <span
          className={cn(
            "font-body text-base font-semibold tracking-[0.22em] uppercase",
            isDark ? "text-white/75" : "text-primary-dark",
          )}
        >
          {eyebrow}
        </span>
      </div>

      <h2
        id={id}
        className={cn(
          "mt-3 font-heading text-3xl leading-heading font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]",
          isDark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>

      {summary && (
        <p
          className={cn(
            "mt-4 font-body text-base leading-relaxed sm:text-lg",
            isDark ? "text-white/80" : "text-muted",
          )}
        >
          {summary}
        </p>
      )}
    </Reveal>
  );
}
