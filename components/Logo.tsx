import clsx from "clsx";

interface LogoOryonProps {
  className?: string;
}

// Simple wordmark: plain text "Oryon" using current color.
export function LogoOryon({ className }: LogoOryonProps) {
  return (
    <span className={clsx("inline-block font-bold tracking-tight", className)} aria-label="Oryon logo">
      Oryon
    </span>
  );
}
