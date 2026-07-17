import { ArrowUpRight } from "lucide-react";
import { APPROACH } from "../../content/site";
import { Section } from "../ui/Section";
import { Eyebrow } from "../ui/Eyebrow";
import { FadeIn } from "../ui/FadeIn";
import { SafeImage } from "../ui/SafeImage";

/* "Why GTM" — the three former full-height pillar sections consolidated
   into one module: navy intro line, then three ivory panels. */

export function Approach() {
  return (
    <Section id="approach" surface="navy">
      <FadeIn>
        <Eyebrow tone="gold">WHY GTM</Eyebrow>
        <h2 className="mt-4 font-display font-normal text-[clamp(2.5rem,5vw,4.75rem)] leading-[1.0] text-brand-ivory max-w-3xl">
          Built for founders who need <em className="text-brand-gold">conviction and momentum.</em>
        </h2>
        <p className="mt-5 text-brand-ivory/70 text-[clamp(1.05rem,1.5vw,1.25rem)] leading-[1.55] max-w-2xl">
          The international operators ready for their North American moment — with traction in
          their home markets and appetite for scale.
        </p>
      </FadeIn>

      <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {APPROACH.panels.map((panel, i) => (
          <FadeIn key={panel.label} delay={0.08 * i}>
            <article className="h-full bg-brand-ivory rounded-sm overflow-hidden flex flex-col">
              <div className="aspect-[16/10] overflow-hidden">
                <SafeImage src={panel.image} alt={panel.alt} />
              </div>
              <div className="p-7 md:p-8 flex flex-col grow">
                <Eyebrow tone="gold" className="!text-brand-gold-deep">
                  {panel.label}
                </Eyebrow>
                <p className="mt-4 text-brand-navy text-[0.98rem] leading-[1.6]">{panel.body}</p>
                {panel.linkText && panel.linkHref && (
                  <a
                    href={panel.linkHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-auto pt-5 text-brand-gold-deep hover:text-brand-navy text-sm font-medium transition-colors underline underline-offset-4 decoration-brand-rule"
                  >
                    {panel.linkText} <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
