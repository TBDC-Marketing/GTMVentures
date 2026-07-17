/* Surface-aware section wrapper. Sets the gold focus-ring offset color
   so :focus-visible rings read correctly on each background. */

const SURFACES = {
  navy: "bg-brand-navy text-brand-ivory",
  deep: "bg-brand-navy-deep text-brand-ivory",
  ivory: "bg-brand-ivory text-brand-navy",
} as const;

export type Surface = keyof typeof SURFACES;

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-[1280px] px-[clamp(20px,5vw,72px)] ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  id,
  surface = "navy",
  children,
  className = "",
  container = true,
}: {
  id?: string;
  surface?: Surface;
  children: React.ReactNode;
  className?: string;
  container?: boolean;
}) {
  const offset = surface === "ivory" ? "#F6F1E7" : surface === "deep" ? "#04111F" : "#07182D";
  return (
    <section
      id={id}
      style={{ ["--focus-offset-color" as string]: offset }}
      className={`relative py-20 md:py-32 ${SURFACES[surface]} ${className}`}
    >
      {container ? <Container>{children}</Container> : children}
    </section>
  );
}
