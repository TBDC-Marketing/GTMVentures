const BASE = import.meta.env.BASE_URL;

/* Canonical compass mark + live wordmark text.
   The SVG files in public/brand/ are the approved masters — never
   inline, retrace, or recolour their paths. The img is aria-hidden;
   the wordmark text supplies the accessible name. */

const MARKS = {
  dark: "brand/gtm-mark.svg",
  light: "brand/gtm-mark-on-light.svg",
  "mono-navy": "brand/gtm-mark-navy.svg",
  "mono-ivory": "brand/gtm-mark-ivory.svg",
} as const;

export function BrandLogo({
  surface = "dark",
  lockup = true,
  markHeight = 40,
  className = "",
}: {
  surface?: keyof typeof MARKS;
  lockup?: boolean;
  markHeight?: number;
  className?: string;
}) {
  const onDark = surface === "dark" || surface === "mono-ivory";
  /* viewBox is 870x985 → width ≈ height * 0.883 */
  const markWidth = Math.round(markHeight * 0.883);

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src={`${BASE}${MARKS[surface]}`}
        alt=""
        aria-hidden="true"
        width={markWidth}
        height={markHeight}
        style={{ height: markHeight, width: markWidth }}
      />
      {lockup && (
        <span className="flex flex-col justify-center leading-none">
          <strong
            className={`font-display font-normal tracking-tight ${onDark ? "text-brand-ivory" : "text-brand-navy"}`}
            style={{ fontSize: markHeight * 0.52 }}
          >
            GTM
          </strong>
          <small
            className={`font-sans font-medium uppercase tracking-[0.18em] ${onDark ? "text-brand-gold" : "text-brand-gold-deep"}`}
            style={{ fontSize: Math.max(markHeight * 0.19, 8), marginTop: markHeight * 0.08 }}
          >
            Venture Advisors
          </small>
        </span>
      )}
    </span>
  );
}
