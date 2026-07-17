/* Shared button. Primary = gold on navy; secondary = outline.
   `surface` flips outline colors for dark vs light backgrounds. */

const BASE_CLS =
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 min-h-[44px] text-sm font-medium tracking-wide transition-colors";

function classes(variant: "primary" | "secondary", surface: "dark" | "light") {
  if (variant === "primary") {
    return `${BASE_CLS} bg-brand-gold text-brand-navy-deep hover:bg-brand-gold-deep`;
  }
  return surface === "dark"
    ? `${BASE_CLS} border border-brand-ivory/40 text-brand-ivory hover:border-brand-gold hover:text-brand-gold`
    : `${BASE_CLS} border border-brand-navy/50 text-brand-navy hover:border-brand-gold-deep hover:text-brand-gold-deep`;
}

export function Button({
  children,
  href,
  onClick,
  type,
  variant = "primary",
  surface = "dark",
  className = "",
  disabled,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
  surface?: "dark" | "light";
  className?: string;
  disabled?: boolean;
}) {
  const cls = `${classes(variant, surface)} ${className}`;
  if (href) {
    return (
      <a href={href} onClick={onClick} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} disabled={disabled} className={`${cls} disabled:opacity-60 disabled:cursor-not-allowed`}>
      {children}
    </button>
  );
}
