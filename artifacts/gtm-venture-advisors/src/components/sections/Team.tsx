import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin } from "lucide-react";
import { TEAM } from "../../content/site";
import { Section } from "../ui/Section";
import { Eyebrow } from "../ui/Eyebrow";
import { FadeIn } from "../ui/FadeIn";
import { SafeImage } from "../ui/SafeImage";

export function Team() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <Section id="team" surface="ivory">
      <FadeIn>
        <Eyebrow tone="gold" className="!text-brand-gold-deep">
          OUR TEAM
        </Eyebrow>
        <h2 className="mt-4 font-display font-normal text-[clamp(2.5rem,5vw,4.75rem)] leading-[1.0] text-brand-navy max-w-2xl">
          Decades of <em className="text-brand-gold-deep">global experience.</em>
        </h2>
        <p className="mt-5 text-brand-slate text-[clamp(1.05rem,1.5vw,1.25rem)] leading-[1.55] max-w-xl">
          {TEAM.sub}
        </p>
      </FadeIn>

      <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12">
        {TEAM.principals.map((p, i) => {
          const expanded = expandedIndex === i;
          const bioId = `team-bio-${i}`;
          return (
            <FadeIn key={p.name} delay={0.08 * i}>
              <article className="flex flex-col">
                <div className="aspect-[4/5] overflow-hidden rounded-sm">
                  <SafeImage src={p.photo} alt={p.name} className="object-top" />
                </div>
                <h3 className="mt-5 font-display text-2xl md:text-[1.7rem] text-brand-navy">
                  {p.name}
                </h3>
                <p className="mt-1 text-[0.72rem] uppercase tracking-[0.18em] font-medium text-brand-slate">
                  {p.title}
                </p>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-brand-navy/80">{p.short}</p>
                <div className="mt-4 flex items-center gap-4">
                  <a
                    href={`mailto:${p.emailPrefix}@gtmventureadvisors.com`}
                    className="text-brand-gold-deep hover:text-brand-navy transition-colors"
                    aria-label={`Email ${p.name.split(" ")[0]}`}
                  >
                    <Mail size={16} aria-hidden="true" />
                  </a>
                  <a
                    href={p.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-gold-deep hover:text-brand-navy transition-colors"
                    aria-label={`${p.name} LinkedIn`}
                  >
                    <Linkedin size={16} aria-hidden="true" />
                  </a>
                  <button
                    onClick={() => setExpandedIndex(expanded ? null : i)}
                    aria-expanded={expanded}
                    aria-controls={bioId}
                    className="ml-auto text-brand-gold-deep hover:text-brand-navy text-xs font-medium transition-colors underline underline-offset-4 decoration-brand-rule"
                  >
                    {expanded ? "Hide bio" : "Full bio"}
                  </button>
                </div>
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      id={bioId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-brand-rule">
                        <p className="text-brand-navy/80 text-sm leading-relaxed">{p.bio}</p>
                        <p className="mt-3 text-[0.68rem] uppercase tracking-wider text-brand-slate">
                          {p.credentials.join(" · ")}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}
