import { motion, useScroll, useTransform } from "framer-motion";
import { HERO, HERO_SECTORS } from "../../content/site";
import { Container } from "../ui/Section";
import { Eyebrow } from "../ui/Eyebrow";
import { Button } from "../ui/Button";
import { FadeIn } from "../ui/FadeIn";
import { SafeImage } from "../ui/SafeImage";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.25], [0, reduced ? 0 : -10]);

  return (
    <section
      id="top"
      className="relative bg-brand-navy-deep text-brand-ivory pt-32 md:pt-40 pb-14 md:pb-20 overflow-hidden"
      style={{ ["--focus-offset-color" as string]: "#04111F" }}
    >
      {/* Navy field with a subtle radial glow behind the headline */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,#04111F_0%,#07182D_78%,#07182D_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_28%_22%,rgba(198,161,91,0.10),transparent_70%)]"
      />
      {/* Meridian rule: single gold line converging toward the headline */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-[27%] hidden lg:block h-px w-[8%] bg-brand-rule"
      />

      <Container className="relative">
        <FadeIn>
          <Eyebrow tone="gold">{HERO.eyebrow}</Eyebrow>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h1 className="mt-5 font-display font-normal text-[clamp(2.6rem,6.5vw,6.5rem)] leading-[1.02] tracking-[-0.02em] max-w-[17ch]">
            {HERO.headlineBefore}
            <em className="text-brand-gold">{HERO.headlineEmphasis}</em>
            {HERO.headlineAfter}
          </h1>
        </FadeIn>

        <FadeIn delay={0.16}>
          <p className="mt-6 text-brand-ivory/80 text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] max-w-2xl">
            {HERO.sub}
          </p>
        </FadeIn>

        <FadeIn delay={0.22}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href={HERO.primaryCta.href} variant="primary">
              {HERO.primaryCta.label}
            </Button>
            <Button href={HERO.secondaryCta.href} variant="secondary" surface="dark">
              {HERO.secondaryCta.label}
            </Button>
          </div>
        </FadeIn>

        {/* Sector triptych — uniform heights, navy overlay, gold top rule */}
        <FadeIn delay={0.3}>
          <motion.div
            className="mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6"
            style={{ y }}
          >
            {HERO_SECTORS.map((sector) => (
              <div key={sector.label} className="group flex flex-col">
                <div aria-hidden="true" className="h-px w-full bg-brand-gold/60 mb-4" />
                <div className="relative w-full aspect-[4/3] sm:aspect-[4/5] md:aspect-[4/4.4] overflow-hidden rounded-sm">
                  <SafeImage
                    src={sector.image}
                    alt={sector.alt}
                    loading="eager"
                    className="object-top group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,17,31,0.10)_0%,rgba(4,17,31,0.45)_100%)]"
                  />
                </div>
                <div className="mt-3">
                  <div className="text-[0.68rem] uppercase tracking-[0.18em] text-brand-gold font-medium">
                    {sector.label}
                  </div>
                  <div className="mt-1 font-display italic text-sm text-brand-ivory/70">
                    {sector.caption}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </FadeIn>
      </Container>
    </section>
  );
}
