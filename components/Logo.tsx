import clsx from "clsx";

interface LogoOryonProps {
  className?: string;
}

// Simple wordmark: plain text "Oryon" using current color.
// Light mode: dark gradient, Dark mode: cosmic gradient
export function LogoOryon({ className }: LogoOryonProps) {
  return (
    <span className={clsx("inline-block font-bold tracking-tight bg-gradient-to-r from-black to-cosmic-600 dark:from-cosmic-100 dark:to-cosmic-400 bg-clip-text text-transparent", className)} aria-label="Oryon logo">
      Oryon
    </span>
  );
}
