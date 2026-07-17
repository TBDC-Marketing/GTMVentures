import { ArrowRight } from "lucide-react";
import { NETWORK } from "../../content/site";
import { Section } from "../ui/Section";
import { Eyebrow } from "../ui/Eyebrow";
import { Button } from "../ui/Button";
import { FadeIn } from "../ui/FadeIn";
import { SafeImage } from "../ui/SafeImage";

/* Quote + network figures merged into a single navy proof block. */

export function NetworkProof() {
  return (
    <Section id="network" surface="navy">
      <FadeIn>
        <Eyebrow tone="gold">OUR NETWORK</Eyebrow>
      </FadeIn>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: executive portrait + pull quote */}
        <FadeIn>
          <div className="grid grid-cols-[minmax(0,200px)_1fr] sm:grid-cols-[minmax(0,240px)_1fr] gap-6 md:gap-8 items-start">
            <div className="aspect-[4/5] overflow-hidden rounded-sm">
              <SafeImage src={NETWORK.quoteImage} alt={NETWORK.quoteImageAlt} />
            </div>
            <div>
              <blockquote className="font-display italic text-lg sm:text-xl md:text-2xl text-brand-ivory leading-relaxed">
                "{NETWORK.quote}"
              </blockquote>
              <p className="mt-4 text-brand-ivory/60 text-sm">{NETWORK.quoteAttribution}</p>
            </div>
          </div>
        </FadeIn>

        {/* Right: network figure + categories */}
        <FadeIn delay={0.12}>
          <div className="lg:pl-10 lg:border-l lg:border-brand-rule">
            <div className="font-display text-7xl md:text-8xl leading-none text-brand-ivory">
              {NETWORK.figure}
            </div>
            <p className="mt-3 text-brand-ivory/70 text-sm max-w-xs leading-relaxed">
              {NETWORK.figureLabel}
            </p>
            <div aria-hidden="true" className="mt-6 h-px w-16 bg-brand-gold" />
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5 list-none max-w-md">
              {NETWORK.categories.map((cat) => (
                <li key={cat} className="font-display text-lg md:text-xl text-brand-ivory/85">
                  {cat}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href={NETWORK.cta.href} variant="secondary" surface="dark">
                {NETWORK.cta.label} <ArrowRight size={14} aria-hidden="true" />
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
