import { EXPERIENCE } from "../../content/site";
import { Container } from "../ui/Section";
import { FadeIn } from "../ui/FadeIn";

/* Static grid — no auto-motion. Logos are normalized to a single
   monochrome treatment with equal optical weight. The label wording
   avoids implying organizational endorsement. */

export function Experience() {
  return (
    <section
      aria-label="Institutional experience"
      className="bg-brand-white text-brand-navy py-14 md:py-20 border-y border-brand-rule"
      style={{ ["--focus-offset-color" as string]: "#FFFCF7" }}
    >
      <Container>
        <FadeIn>
          <p className="text-center text-[0.72rem] font-medium uppercase tracking-[0.18em] text-brand-slate">
            {EXPERIENCE.label}
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <ul className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-10 items-center list-none">
            {EXPERIENCE.logos.map((logo) => (
              <li key={logo.alt} className="flex items-center justify-center">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  decoding="async"
                  className="max-h-9 md:max-h-10 w-auto max-w-[8.5rem] object-contain grayscale opacity-55 hover:opacity-85 transition-opacity duration-300"
                />
              </li>
            ))}
          </ul>
        </FadeIn>
      </Container>
    </section>
  );
}
