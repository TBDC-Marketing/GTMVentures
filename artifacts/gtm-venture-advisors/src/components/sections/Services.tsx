import { ArrowRight } from "lucide-react";
import { SERVICES } from "../../content/site";
import { Section } from "../ui/Section";
import { Eyebrow } from "../ui/Eyebrow";
import { Button } from "../ui/Button";
import { FadeIn } from "../ui/FadeIn";
import { SafeImage } from "../ui/SafeImage";

export function Services() {
  return (
    <Section id="services" surface="deep">
      <FadeIn>
        <div className="max-w-2xl">
          <Eyebrow tone="gold">WHAT WE DO</Eyebrow>
          <h2 className="mt-4 font-display font-normal text-[clamp(2.5rem,5vw,4.75rem)] leading-[1.0] text-brand-ivory">
            Full-cycle capital <em className="text-brand-gold">advisory.</em>
          </h2>
          <p className="mt-5 font-display italic text-lg md:text-xl text-brand-ivory/70 leading-relaxed">
            {SERVICES.sub}
          </p>
        </div>
      </FadeIn>

      {/* Meridian rule between heading and cards */}
      <div aria-hidden="true" className="mt-10 h-px w-full bg-brand-rule" />

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
        {SERVICES.pillars.map((pillar, i) => (
          <FadeIn key={pillar.numeral} delay={0.08 * i} className="h-full">
            <article className="group relative h-full min-h-[420px] md:min-h-[480px] overflow-hidden rounded-sm border border-brand-ivory/10">
              <div className="absolute inset-0">
                <SafeImage
                  src={pillar.image}
                  alt={pillar.alt}
                  className="transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,17,31,0.55)_0%,rgba(4,17,31,0.65)_40%,rgba(4,17,31,0.88)_100%)]"
              />

              <div className="relative z-10 flex h-full flex-col p-7 md:p-8">
                <div className="font-display text-brand-gold text-2xl" aria-hidden="true">
                  {pillar.numeral}
                </div>
                <h3 className="mt-3 max-w-[14ch] font-display text-[1.8rem] md:text-[2rem] leading-[1.08] text-brand-ivory">
                  {pillar.title}
                </h3>
                <ul className="mt-auto space-y-2.5 pt-8">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[0.95rem] leading-6 text-brand-ivory/90">
                      <span aria-hidden="true" className="mt-[0.6rem] h-1 w-4 shrink-0 bg-brand-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.2}>
        <div className="mt-12 text-center">
          <Button href={SERVICES.cta.href} variant="primary">
            {SERVICES.cta.label} <ArrowRight size={14} aria-hidden="true" />
          </Button>
        </div>
      </FadeIn>
    </Section>
  );
}
