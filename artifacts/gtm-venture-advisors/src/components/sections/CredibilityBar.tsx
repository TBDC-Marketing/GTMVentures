import { PROOF_STATS, SITE } from "../../content/site";
import { Container } from "../ui/Section";
import { FadeIn } from "../ui/FadeIn";

/* Proof bar directly below the hero — trust arrives early.
   Figures are already-published claims; final factual review before launch. */

export function CredibilityBar() {
  return (
    <section
      aria-label="Credibility"
      className="bg-brand-ivory text-brand-navy border-y border-brand-rule"
      style={{ ["--focus-offset-color" as string]: "#F6F1E7" }}
    >
      <Container>
        <FadeIn direction="none">
          <dl className="grid grid-cols-2 lg:grid-cols-4 py-10 md:py-12 gap-y-10">
            {PROOF_STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center text-center px-4 md:px-8 ${
                  i > 0 ? "lg:border-l lg:border-brand-rule" : ""
                } ${i % 2 === 1 ? "border-l border-brand-rule lg:border-l" : ""}`}
              >
                <dt className="order-2 mt-2 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-brand-slate">
                  {stat.href ? (
                    <a
                      href={stat.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-brand-gold-deep transition-colors underline underline-offset-4 decoration-brand-rule"
                    >
                      {stat.label}
                    </a>
                  ) : (
                    stat.label
                  )}
                </dt>
                <dd className="order-1 font-display text-4xl md:text-5xl leading-none text-brand-navy">
                  {stat.figure}
                </dd>
              </div>
            ))}
          </dl>
          <p className="sr-only">{SITE.tagline}</p>
        </FadeIn>
      </Container>
    </section>
  );
}
