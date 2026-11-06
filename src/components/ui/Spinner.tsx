import { cn } from "@/lib/utils";

export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SpinnerVariant = "primary" | "gold" | "white" | "muted";

export type SpinnerProps = {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  className?: string;
  label?: string;
  showText?: boolean;
};

const sizeClasses: Record<SpinnerSize, string> = {
  xs: "h-3.5 w-3.5",
  sm: "h-4.5 w-4.5",
  md: "h-6 w-6",
  lg: "h-9 w-9",
  xl: "h-12 w-12",
};

const colorClasses: Record<SpinnerVariant, string> = {
  primary: "text-primary",
  gold: "text-highlight-light",
  white: "text-white",
  muted: "text-muted",
};

export function Spinner({
  size = "md",
  variant = "primary",
  className,
  label,
  showText = false,
}: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label || "Đang tải"}
      className={cn("inline-flex items-center gap-2.5 select-none", className)}
    >
      <svg
        className={cn("animate-spin", sizeClasses[size], colorClasses[variant])}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          className="opacity-95"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {showText && label && (
        <span className="font-label text-xs font-semibold tracking-wider text-current">
          {label}
        </span>
      )}
      <span className="sr-only">{label || "Đang tải..."}</span>
    </div>
  );
}
