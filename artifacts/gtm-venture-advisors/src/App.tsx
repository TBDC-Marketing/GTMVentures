import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  Mail,
  Linkedin,
} from "lucide-react";

const BASE = import.meta.env.BASE_URL;

/* ═══════════════════════════════════════════
   CONTENT DATA
   ═══════════════════════════════════════════ */

const SITE = {
  name: "GTM Venture Advisors",
  tagline: "Powered by TBDC",
  email: "info@gtmventureadvisors.com",
  address: "111 Peter Street, 9th Floor, Toronto ON M5V 2H1",
  tbdcUrl: "https://tbdc.com",
  linkedIn: "#",
};

const NAV_LINKS = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Team", href: "#team" },
  { label: "Services", href: "#services" },
  { label: "Network", href: "#network" },
  { label: "Contact", href: "#contact" },
];

const HERO_FOUNDERS = [
  {
    image: `${BASE}hero-founder-1.webp`,
    label: "SERIES B · HEALTHCARE",
    caption: "European founder, North American raise",
    alt: "Portrait of a healthcare-sector founder",
  },
  {
    image: `${BASE}hero-founder-2.webp`,
    label: "PRE-IPO · INDUSTRIAL",
    caption: "Asian scaleup, dual-listing readiness",
    alt: "Portrait of an industrial-sector founder",
  },
  {
    image: `${BASE}hero-founder-3.webp`,
    label: "CROSS-BORDER · SAAS",
    caption: "LATAM expansion, growth equity",
    alt: "Portrait of a SaaS founder",
  },
];

const TEAM = {
  principals: [
    {
      initials: "NK",
      photo: `${BASE}principal-nitin.webp`,
      name: "Nitin Kaushal",
      title: "Senior Managing Director",
      short: "Capital markets across technology and healthcare — 35+ years.",
      linkedin: "https://www.linkedin.com/in/nitin-kaushal-a4478425/",
      emailPrefix: "nitin",
      bio: "35+ years in capital markets and investment banking. Former senior roles at PwC, HSBC Securities, Desjardins Securities, and Vengate Capital Partners. Deep relationships with institutional investors and technology/healthcare company leadership.",
      credentials: ["BSc Chemistry (University of Toronto)", "Chartered Accountant", "CF Corporate Finance"],
    },
    {
      initials: "EC",
      photo: `${BASE}principal-ezra.webp`,
      name: "Ezra Chang",
      title: "Managing Director",
      short: "Engineering-trained capital markets operator — $1B+ in financings.",
      linkedin: "https://www.linkedin.com/in/ezrachang/",
      emailPrefix: "ezra",
      bio: "25+ years at the intersection of engineering, technology, and high-growth finance. $1B+ in managed financings and M&A advisory across ATB Capital Markets, Stifel Nicolaus, and National Bank Financial. Most recently led corporate development and M&A at a leading data centre infrastructure company.",
      credentials: ["BASc Mechanical Engineering (University of Toronto)", "MBA (Ivey Business School)", "P.Eng."],
    },
    {
      initials: "DK",
      photo: `${BASE}principal-david.webp`,
      name: "David Kideckel",
      title: "Managing Director",
      short: "Life sciences equity research and CFO advisory — 20+ years.",
      linkedin: "https://www.linkedin.com/in/davidkideckel/",
      emailPrefix: "david",
      bio: "20+ years across life sciences, capital markets, and corporate advisory. Founder of Kideckel Advisory Group. Former Head of Life Sciences Equity Research at ATB Capital Markets. Leadership roles at Johnson & Johnson and Alexion Pharmaceuticals.",
      credentials: ["PhD Neuroscience & Statistics (University of Toronto)", "MBA (University of Toronto)"],
    },
  ],
  supportTeam: [
    { name: "Vik Khurana", role: "CEO", linkedin: "https://www.linkedin.com/in/vikram-khurana-1aa97b/" },
    { name: "Davinder Gurm", linkedin: "https://www.linkedin.com/in/davindergurm/" },
    { name: "Anish Kaushal", linkedin: "https://www.linkedin.com/in/anish-kaushal-md/" },
  ],
};

const PILLAR_SECTIONS = [
  {
    imagePosition: "left" as const,
    image: `${BASE}pillar-embedded.webp`,
    alt: "Aerial view of Toronto's financial district at dusk",
    headline: "We're embedded.",
    body: "GTM Venture Advisors is the capital markets arm of TBDC — a government-backed accelerator that has helped hundreds of international founders scale into North America.",
    linkText: "Learn about TBDC",
    linkHref: "https://tbdc.com",
  },
  {
    imagePosition: "right" as const,
    image: `${BASE}pillar-institutional.webp`,
    alt: "Architectural detail of a modern boardroom interior",
    headline: "We're institutional.",
    body: "Our partners bring 80+ years of combined experience from PwC, HSBC, National Bank Financial, ATB Capital Markets, and Johnson & Johnson. You get the discipline of global firms with the speed of a boutique.",
  },
  {
    imagePosition: "left" as const,
    image: `${BASE}pillar-outcome.webp`,
    alt: "Two hands meeting across a table in agreement",
    headline: "We're outcome-driven.",
    body: "From Series A to pre-IPO, we advise on capital raises, M&A, partnerships, and public-market readiness. No retainer theater. Every engagement is measured in deals done.",
  },
];

const SERVICES_LIST = [
  "Capital Raising",
  "M&A Advisory",
  "IPO / RTO Readiness",
  "Corporate Development",
  "Government & Non-Dilutive",
];

const NETWORK_CATEGORIES = [
  ["Venture Capital", "Private Equity", "Corporate Venture"],
  ["Family Offices", "Growth Equity", "Government / Non-Dilutive"],
  ["Strategic Investors"],
];

const PAST_EMPLOYERS = ["PwC", "HSBC", "National Bank Financial", "Stifel", "Johnson & Johnson", "ATB Capital Markets", "Desjardins"];

/* ═══════════════════════════════════════════
   UTILITY COMPONENTS
   ═══════════════════════════════════════════ */

function SafeImage({ src, alt, className = "", loading = "lazy" }: {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
}) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className={`w-full h-full bg-cream-dark flex items-center justify-center ${className}`}>
        <span className="text-xs italic text-ink-muted text-center px-4">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => setErrored(true)}
      className={`w-full h-full object-cover ${className}`}
    />
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[0.7rem] font-medium uppercase tracking-[0.12em] text-ink-muted mb-4">
      {children}
    </span>
  );
}

function SectionWrap({
  id,
  dark,
  children,
  className = "",
}: {
  id?: string;
  dark?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative py-24 md:py-32 ${dark ? "bg-navy text-cream" : "bg-cream text-ink"} ${className}`}
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8 lg:px-16">{children}</div>
    </section>
  );
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function PillButton({
  children,
  href,
  onClick,
  dark,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  dark?: boolean;
}) {
  const cls = dark
    ? "border border-cream/30 text-cream hover:bg-cream hover:text-navy"
    : "border border-ink text-ink hover:bg-ink hover:text-cream";
  if (href) {
    return (
      <a href={href} className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors ${cls}`}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors ${cls}`}>
      {children}
    </button>
  );
}

/* ═══════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════ */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-cream border-b border-ink/10" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 md:px-8 lg:px-16 h-20 md:h-24">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2.5">
          <div className="flex flex-col gap-[3px]">
            <div className="w-5 h-[2px] bg-gold" />
            <div className="w-5 h-[2px] bg-gold" />
            <div className="w-5 h-[2px] bg-gold" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-ink font-medium text-sm leading-tight tracking-tight">
              GTM Venture Advisors
            </span>
            <span className="text-ink-muted text-[0.55rem] uppercase tracking-[0.12em] leading-none mt-0.5">
              Powered by TBDC
            </span>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-ink hover:text-warm-accent text-[0.8rem] font-medium tracking-wide transition-colors"
            >
              {l.label}
            </button>
          ))}
          <PillButton onClick={() => scrollTo("#contact")}>
            Get in Touch
          </PillButton>
        </div>

        <button className="md:hidden text-ink" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-cream border-t border-ink/10 overflow-hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className="text-left text-ink hover:text-warm-accent py-2 text-sm font-medium"
                >
                  {l.label}
                </button>
              ))}
              <div className="mt-2">
                <PillButton onClick={() => scrollTo("#contact")}>Get in Touch</PillButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ═══════════════════════════════════════════
   SCROLL PROGRESS BAR
   ═══════════════════════════════════════════ */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return <motion.div className="fixed top-0 left-0 h-[2px] bg-gold z-[60]" style={{ width }} />;
}

/* ═══════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════ */

function HeroSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -20]);

  return (
    <section className="relative min-h-screen bg-cream pt-32 md:pt-40 pb-16 md:pb-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8 lg:px-16">
        <FadeIn>
          <h1 className="font-display text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] font-normal leading-[1.05] tracking-[-0.02em] text-ink max-w-5xl">
            We help founders turn{" "}
            <em className="text-gold">international traction</em>{" "}
            into{" "}
            <em className="text-gold">North American capital.</em>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <motion.div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-end" style={{ y }}>
            {HERO_FOUNDERS.map((founder, i) => (
              <div key={i} className="flex flex-col items-start">
                <div className={`w-full overflow-hidden rounded-sm ${
                  i === 1 ? "aspect-[4/5] md:h-[460px]" : "aspect-[4/5] md:h-[400px]"
                }`}>
                  <SafeImage
                    src={founder.image}
                    alt={founder.alt}
                    loading="eager"
                    className="object-top"
                  />
                </div>
                <div className="mt-3">
                  <div className="text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted font-medium">
                    {founder.label}
                  </div>
                  <div className="mt-0.5 font-display italic text-sm text-ink-soft">
                    {founder.caption}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PHILOSOPHY STATEMENT
   ═══════════════════════════════════════════ */

function PhilosophyStatement() {
  return (
    <SectionWrap id="philosophy">
      <FadeIn>
        <p className="font-display italic text-xl md:text-2xl lg:text-[1.75rem] text-ink-soft leading-relaxed max-w-3xl">
          When it comes to the founders we work with, we look for conviction and momentum.
          The international operators ready for their North American moment — with traction
          in their home markets and appetite for scale.
        </p>
        <div className="mt-10">
          <PillButton href="#services">
            Our Philosophy <ArrowRight size={14} />
          </PillButton>
        </div>
      </FadeIn>
    </SectionWrap>
  );
}

/* ═══════════════════════════════════════════
   BIG QUOTE SECTIONS (PILLARS)
   ═══════════════════════════════════════════ */

function QuoteSection({
  imagePosition,
  image,
  alt,
  headline,
  body,
  linkText,
  linkHref,
}: {
  imagePosition: "left" | "right";
  image: string;
  alt: string;
  headline: string;
  body: string;
  linkText?: string;
  linkHref?: string;
}) {
  const isLeft = imagePosition === "left";

  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8 lg:px-16">
        <FadeIn>
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${!isLeft ? "lg:[direction:rtl]" : ""}`}>
            <div className={!isLeft ? "lg:[direction:ltr]" : ""}>
              <div className="aspect-[4/5] overflow-hidden rounded-sm">
                <SafeImage src={image} alt={alt} />
              </div>
            </div>
            <div className={`max-w-[420px] ${!isLeft ? "lg:[direction:ltr]" : ""}`}>
              <h2 className="font-display italic text-3xl md:text-4xl lg:text-[3rem] font-normal leading-[1.1] text-ink">
                {headline}
              </h2>
              <p className="mt-6 text-ink-muted text-base md:text-lg leading-relaxed">
                {body}
              </p>
              {linkText && linkHref && (
                <a
                  href={linkHref}
                  target={linkHref.startsWith("http") ? "_blank" : undefined}
                  rel={linkHref.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-1.5 mt-6 text-teal hover:text-ink text-sm font-medium transition-colors underline underline-offset-4 decoration-teal/40 hover:decoration-ink"
                >
                  {linkText} <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   TEAM
   ═══════════════════════════════════════════ */

function TeamSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <SectionWrap id="team">
      <FadeIn>
        <Eyebrow>OUR TEAM</Eyebrow>
        <h2 className="font-display text-3xl md:text-4xl lg:text-[4rem] font-normal leading-[1.1] text-ink max-w-2xl">
          Decades of <em className="text-gold">global experience.</em>
        </h2>
        <p className="mt-5 text-ink-muted text-base md:text-lg leading-relaxed max-w-xl">
          Our principals bring 80+ years of combined capital markets expertise from the world's leading financial institutions.
        </p>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {TEAM.principals.map((p, i) => (
            <div key={i} className="flex flex-col">
              <div className="aspect-[4/5] overflow-hidden rounded-sm">
                <SafeImage src={p.photo} alt={p.name} className="object-top" />
              </div>
              <h3 className="mt-5 font-display italic text-2xl md:text-3xl text-ink">{p.name}</h3>
              <p className="mt-1 text-xs uppercase tracking-widest text-ink-muted">{p.title}</p>
              <p className="mt-2 text-sm text-ink-soft">{p.short}</p>
              <div className="mt-3 flex items-center gap-3">
                <a
                  href={`mailto:${p.emailPrefix}@gtmventureadvisors.com`}
                  className="text-teal hover:text-ink transition-colors"
                  aria-label={`Email ${p.name.split(" ")[0]}`}
                >
                  <Mail size={15} />
                </a>
                <a
                  href={p.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal hover:text-ink transition-colors"
                  aria-label={`${p.name} LinkedIn`}
                >
                  <Linkedin size={15} />
                </a>
              </div>
              <button
                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                className="mt-3 text-left text-teal hover:text-ink text-xs font-medium transition-colors underline underline-offset-2 decoration-teal/40 hover:decoration-ink"
              >
                {expandedIndex === i ? "Hide bio" : "Full bio →"}
              </button>
              <AnimatePresence>
                {expandedIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-ink/10">
                      <p className="text-ink-soft text-sm leading-relaxed">{p.bio}</p>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {p.credentials.map((cred, j) => (
                          <span key={j} className="text-[0.65rem] uppercase tracking-wider text-ink-muted">
                            {cred}{j < p.credentials.length - 1 ? " ·" : ""}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.25}>
        <p className="mt-16 text-ink-muted text-sm italic">
          Supported by TBDC's executive team:{" "}
          {TEAM.supportTeam.map((m, i) => (
            <span key={i}>
              <a
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline underline-offset-2 decoration-ink/20 hover:decoration-ink transition-colors"
              >
                {m.name}
              </a>
              {i < TEAM.supportTeam.length - 2 ? ", " : i === TEAM.supportTeam.length - 2 ? ", and " : "."}
            </span>
          ))}
        </p>
      </FadeIn>
    </SectionWrap>
  );
}

/* ═══════════════════════════════════════════
   SERVICES
   ═══════════════════════════════════════════ */

function ServicesSection() {
  return (
    <SectionWrap id="services">
      <FadeIn>
        <div className="max-w-2xl mx-auto text-center">
          <Eyebrow>WHAT WE DO</Eyebrow>
          <p className="font-display text-xl md:text-2xl text-ink-soft leading-relaxed">
            We advise across the full capital lifecycle:
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="mt-14 max-w-xl mx-auto">
          {SERVICES_LIST.map((service, i) => (
            <div key={i}>
              <div className="py-5 md:py-6 text-center">
                <span className="font-display text-2xl md:text-3xl lg:text-[2.25rem] text-ink font-normal">
                  {service}
                </span>
              </div>
              {i < SERVICES_LIST.length - 1 && (
                <div className="border-t border-ink/10" />
              )}
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.25}>
        <div className="mt-14 text-center">
          <PillButton href="#contact">
            Start a conversation <ArrowRight size={14} />
          </PillButton>
        </div>
      </FadeIn>
    </SectionWrap>
  );
}

/* ═══════════════════════════════════════════
   PULL-QUOTE
   ═══════════════════════════════════════════ */

function PullQuoteSection() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8 lg:px-16">
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="aspect-[4/5] overflow-hidden rounded-sm">
              <SafeImage
                src={`${BASE}quote-nitin.webp`}
                alt="Nitin Kaushal, Senior Managing Director"
              />
            </div>
            <div className="max-w-[420px]">
              <blockquote className="font-display italic text-xl md:text-2xl lg:text-[1.65rem] text-ink leading-relaxed">
                "When you're scaling internationally, you don't need another consultant. You need someone who's sat on both sides of the boardroom."
              </blockquote>
              <p className="mt-6 text-ink-muted text-sm">
                Nitin Kaushal, Senior Managing Director
              </p>
              <a
                href="#team"
                className="inline-flex items-center gap-1.5 mt-4 text-teal hover:text-ink text-sm font-medium transition-colors underline underline-offset-4 decoration-teal/40 hover:decoration-ink"
              >
                Meet the team <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   GOLD RULE TRANSITION
   ═══════════════════════════════════════════ */

function GoldRule() {
  return (
    <div className="bg-cream flex justify-center pt-8 pb-16">
      <div className="h-px w-16 bg-gold" />
    </div>
  );
}

/* ═══════════════════════════════════════════
   NETWORK
   ═══════════════════════════════════════════ */

function NetworkSection() {
  return (
    <SectionWrap id="network" dark>
      <FadeIn>
        <div className="text-center max-w-3xl mx-auto">
          <Eyebrow>OUR NETWORK</Eyebrow>
          <p className="font-display italic text-xl md:text-2xl text-cream/90 leading-relaxed">
            Our relationships span <em className="text-gold">oceans and industries.</em>
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="mt-16 max-w-3xl mx-auto">
          {NETWORK_CATEGORIES.map((row, i) => (
            <div key={i} className="flex flex-wrap justify-center gap-x-12 md:gap-x-16 gap-y-4 mb-6 md:mb-8">
              {row.map((cat, j) => (
                <span key={j} className="font-display text-xl md:text-2xl text-cream/80 font-normal">
                  {cat}
                </span>
              ))}
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.25}>
        <div className="mt-12 text-center">
          <PillButton href="#contact" dark>
            Access our network <ArrowRight size={14} />
          </PillButton>
        </div>
      </FadeIn>

      <FadeIn delay={0.3}>
        <div className="mt-16 text-center">
          <span className="font-display text-5xl md:text-6xl text-cream">50+</span>
          <p className="font-display italic text-sm text-cream/50 mt-2">
            Institutional investors in our active network
          </p>
        </div>
      </FadeIn>
    </SectionWrap>
  );
}

/* ═══════════════════════════════════════════
   WHERE OUR TEAM HAS WORKED
   ═══════════════════════════════════════════ */

function PastEmployersSection() {
  return (
    <section className="bg-cream py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-5 md:px-8 lg:px-16">
        <FadeIn>
          <p className="text-center text-[0.7rem] uppercase tracking-[0.12em] text-ink-muted font-medium mb-8">
            Where Our Team Has Worked
          </p>
          <p className="text-center text-base text-ink leading-relaxed">
            {PAST_EMPLOYERS.join(" · ")}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CONTACT
   ═══════════════════════════════════════════ */

function ContactSection() {
  return (
    <SectionWrap id="contact">
      <FadeIn>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl lg:text-[4rem] font-normal leading-[1.1] text-ink">
            Let's <em className="text-gold">talk.</em>
          </h2>
          <p className="mt-5 font-display italic text-lg md:text-xl text-ink-muted">
            One conversation is usually enough to know if we're a fit.
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="inline-block mt-8 font-display italic text-xl md:text-2xl text-ink underline underline-offset-4 decoration-ink/30 hover:text-warm-accent hover:decoration-warm-accent transition-colors"
          >
            {SITE.email}
          </a>
          <p className="mt-6 text-ink-muted text-sm">
            {SITE.address}
          </p>
          <p className="mt-2 text-ink-muted text-xs">
            {SITE.name} · A wholly owned subsidiary of the Toronto Business Development Centre
          </p>
          <p className="mt-8 text-ink-muted text-[0.65rem] max-w-lg mx-auto leading-relaxed">
            [Regulatory disclosure placeholder — securities advisory disclosures to be added here prior to launch.]
          </p>
        </div>
      </FadeIn>
    </SectionWrap>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="bg-cream-dark py-10 px-5 md:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2.5">
            <div className="flex flex-col gap-[3px]">
              <div className="w-4 h-[2px] bg-gold" />
              <div className="w-4 h-[2px] bg-gold" />
              <div className="w-4 h-[2px] bg-gold" />
            </div>
            <span className="text-ink font-medium text-sm">GTM Venture Advisors</span>
          </div>
          <div className="flex items-center gap-1.5 text-ink-muted text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            Toronto
          </div>
        </div>

        <div className="border-t border-ink/10 pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.12em] text-ink-muted font-medium mb-3">Contact</p>
              <a href={`mailto:${SITE.email}`} className="block text-ink hover:text-teal transition-colors text-sm mb-1">
                {SITE.email}
              </a>
              <p className="text-ink-muted text-xs">{SITE.address}</p>
            </div>
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.12em] text-ink-muted font-medium mb-3">Resources</p>
              <a href={SITE.tbdcUrl} target="_blank" rel="noopener noreferrer" className="block text-ink hover:text-teal transition-colors text-sm mb-1">
                TBDC.com
              </a>
              <a href={SITE.linkedIn} target="_blank" rel="noopener noreferrer" className="block text-ink hover:text-teal transition-colors text-sm">
                LinkedIn
              </a>
            </div>
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.12em] text-ink-muted font-medium mb-3">Legal</p>
              <a href="#" className="block text-ink hover:text-teal transition-colors text-sm mb-1">Privacy Policy</a>
              <a href="#" className="block text-ink hover:text-teal transition-colors text-sm">Terms of Use</a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-ink/10">
          <p className="text-ink-muted text-xs">
            © {new Date().getFullYear()} {SITE.name}. A wholly owned subsidiary of the Toronto Business Development Centre.
          </p>
          <p className="text-ink-muted text-[0.6rem] italic mt-2">
            Hero imagery represents the types of founders and engagements GTM advises. Not depictions of specific clients.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   APP
   ═══════════════════════════════════════════ */

export default function App() {
  return (
    <div className="bg-cream min-h-screen">
      <ScrollProgress />
      <Nav />
      <main>
        <HeroSection />
        <PhilosophyStatement />
        {PILLAR_SECTIONS.map((pillar, i) => (
          <QuoteSection key={i} {...pillar} />
        ))}
        <TeamSection />
        <PastEmployersSection />
        <ServicesSection />
        <PullQuoteSection />
        <GoldRule />
        <NetworkSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
