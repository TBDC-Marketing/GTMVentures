export function Eyebrow({
  children,
  tone = "gold",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "gold" | "slate" | "ivory";
  className?: string;
}) {
  const toneCls =
    tone === "gold"
      ? "text-brand-gold"
      : tone === "slate"
        ? "text-brand-slate"
        : "text-brand-ivory/70";
  return (
    <span
      className={`inline-block font-medium uppercase tracking-[0.18em] text-[0.75rem] ${toneCls} ${className}`}
    >
      {children}
    </span>
  );
}
