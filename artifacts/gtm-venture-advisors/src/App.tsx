import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  Mail,
  Linkedin,
  TrendingUp,
  Users,
  Briefcase,
} from "lucide-react";

const BASE = import.meta.env.BASE_URL;

/* ═══════════════════════════════════════════
   CONTENT DATA
   ═══════════════════════════════════════════ */

const SITE = {
  name: "GTM Venture Advisors",
  tagline: "The Capital Markets Advisory Arm of TBDC",
  heroHeadline: "We help Series A to pre-IPO companies raise capital and execute North American expansion.",
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

const HERO_SECTORS = [
  {
    image: `${BASE}sector-technology.jpg`,
    label: "TECHNOLOGY",
    caption: "Enterprise SaaS, infrastructure & platforms",
    alt: "Modern data center with server racks representing the technology sector",
  },
  {
    image: `${BASE}sector-healthtech.jpg`,
    label: "HEALTH TECH",
    caption: "Biotech, medtech & digital health",
    alt: "Laboratory equipment representing the health tech sector",
  },
  {
    image: `${BASE}sector-ai.jpg`,
    label: "AI & DEEP TECH",
    caption: "Machine learning, automation & frontier tech",
    alt: "Abstract circuit design representing the AI and deep tech sector",
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
      short: "Engineering-trained capital markets professional — $1B+ in financings.",
      linkedin: "https://www.linkedin.com/in/ezrachang/",
      emailPrefix: "ezra",
      bio: "25+ years at the intersection of engineering, technology, and high-growth finance. $1B+ in managed financings and M&A advisory across ATB Capital Markets, Stifel Nicolaus, and National Bank Financial. Most recently led corporate development and M&A at a leading data centre infrastructure company.",
      credentials: ["BASc Mechanical Engineering (University of Toronto)", "MBA (Ivey Business School)", "P.Eng."],
    },
  ],
};

const PILLAR_SECTIONS = [
  {
    imagePosition: "left" as const,
    image: `${BASE}pillar-embedded.webp`,
    alt: "Aerial view of Toronto's financial district at dusk",
    headline: "We're embedded.",
    body: "GTM Venture Advisors is the capital markets advisory arm of TBDC — a government-backed accelerator that has helped hundreds of international founders scale into North America.",
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
    body: "Our engagements are structured around clear outcomes: the right capital, the right partners, and deals that get done.",
  },
];

const SERVICE_PILLARS = [
  {
    icon: TrendingUp,
    title: "Capital Fundraising Strategy",
    image: `${BASE}pillar-fundraising.jpg`,
    alt: "Executive strategy session with financial materials and presentation planning",
    items: [
      "Pitch & presentation refinement",
      "Current and future raise planning",
      "Strategic decision guidance",
      "Corporate restructuring considerations",
    ],
  },
  {
    icon: Users,
    title: "Investor Access",
    image: `${BASE}pillar-investor-access.jpg`,
    alt: "Executives in conversation during a professional advisory meeting",
    items: [
      "Institutional investor introductions",
      "Strategic investor matching",
      "Meeting preparation & coaching",
      "Relationship management",
    ],
  },
  {
    icon: Briefcase,
    title: "Deal Structuring, Expansion & Market Entry",
    image: `${BASE}pillar-deal-structuring.jpg`,
    alt: "Business meeting focused on documents and deal execution",
    items: [
      "Term sheet negotiation",
      "Risk review & mitigation",
      "North American market entry strategy",
      "Cross-border deal execution",
    ],
  },
];

const NETWORK_CATEGORIES = [
  ["Venture Capital", "Private Equity", "Corporate Venture"],
  ["Family Offices", "Growth Equity", "Government / Non-Dilutive"],
  ["Strategic Investors"],
];


const PARTNER_LOGOS = [
  { src: `${BASE}logo-pwc.png`, alt: "PwC" },
  { src: `${BASE}logo-hsbc.png`, alt: "HSBC" },
  { src: `${BASE}logo-national-bank.png`, alt: "National Bank Financial" },
  { src: `${BASE}logo-stifel.png`, alt: "Stifel" },
  { src: `${BASE}logo-jnj.png`, alt: "Johnson & Johnson" },
  { src: `${BASE}logo-atb.png`, alt: "ATB Capital Markets" },
  { src: `${BASE}logo-desjardins.png`, alt: "Desjardins" },
];

/* ═══════════════════════════════════════════
   REDUCED-MOTION HOOK
   ═══════════════════════════════════════════ */

function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return prefersReduced;
}

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
    <span className="inline-block text-[0.7rem] font-medium uppercase tracking-[0.12em] text-ink-muted mb-3">
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
      className={`relative py-16 md:py-20 ${dark ? "bg-navy text-cream" : "bg-cream text-ink"} ${className}`}
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8 lg:px-16">{children}</div>
    </section>
  );
}

function FadeIn({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "none";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = usePrefersReducedMotion();

  const initial = reduced
    ? { opacity: 1 }
    : { opacity: 0, ...(direction === "up" ? { y: 24 } : {}) };
  const animate = reduced
    ? { opacity: 1 }
    : inView
      ? { opacity: 1, y: 0 }
      : {};

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.7, delay: reduced ? 0 : delay, ease: "easeOut" }}
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
          {/* Placeholder-ready area for GTM/TBDC logo lockup */}
          <div className="flex flex-col gap-[3px]" aria-label="GTM Venture Advisors logo placeholder">
            <div className="w-5 h-[2px] bg-gold" />
            <div className="w-5 h-[2px] bg-gold" />
            <div className="w-5 h-[2px] bg-gold" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-ink font-medium text-sm leading-tight tracking-tight">
              GTM Venture Advisors
            </span>
            <a
              href={SITE.tbdcUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-muted hover:text-teal text-[0.55rem] uppercase tracking-[0.12em] leading-none mt-0.5 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Powered by TBDC
            </a>
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
    <section className="relative min-h-screen bg-cream pt-28 md:pt-36 pb-12 md:pb-16">
      <div className="mx-auto max-w-6xl px-5 md:px-8 lg:px-16">
        <FadeIn>
          <h1 className="font-display text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] font-normal leading-[1.05] tracking-[-0.02em] text-ink max-w-5xl">
            {SITE.heroHeadline.split("raise capital").map((part, i, arr) =>
              i < arr.length - 1 ? (
                <span key={i}>
                  {part}
                  <em className="text-gold">raise capital</em>
                </span>
              ) : (
                <span key={i}>{part}</span>
              ),
            )}
          </h1>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="mt-6 text-ink-muted text-lg md:text-xl max-w-2xl leading-relaxed">
            Raise capital faster. Scale with confidence. Execute your North American expansion with institutional-grade advisory.
          </p>
        </FadeIn>

        <FadeIn delay={0.25}>
          <motion.div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-end" style={{ y }}>
            {HERO_SECTORS.map((sector, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-start group"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`w-full overflow-hidden rounded-sm shadow-sm group-hover:shadow-md transition-shadow duration-300 ${
                  i === 1 ? "aspect-[4/5] md:h-[460px]" : "aspect-[4/5] md:h-[400px]"
                }`}>
                  <SafeImage
                    src={sector.image}
                    alt={sector.alt}
                    loading="eager"
                    className="object-top group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
                <div className="mt-3">
                  <div className="text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted font-medium">
                    {sector.label}
                  </div>
                  <div className="mt-0.5 font-display italic text-sm text-ink-soft">
                    {sector.caption}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   TBDC LOGO LOCKUP / "POWERED BY" AREA
   ═══════════════════════════════════════════ */

function TBDCLockup() {
  return (
    <section className="bg-cream py-8 md:py-10 border-t border-b border-ink/5">
      <div className="mx-auto max-w-6xl px-5 md:px-8 lg:px-16">
        <FadeIn>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            {/* Placeholder for GTM/TBDC logo lockup — replace with final asset */}
            <div className="flex items-center gap-3 px-6 py-3 border border-ink/10 rounded-sm bg-cream-dark/30">
              <div className="flex flex-col gap-[2px]">
                <div className="w-4 h-[2px] bg-gold" />
                <div className="w-4 h-[2px] bg-gold" />
                <div className="w-4 h-[2px] bg-gold" />
              </div>
              <span className="text-ink font-medium text-sm">GTM Venture Advisors</span>
              <span className="text-ink-muted text-xs mx-1">|</span>
              <a
                href={SITE.tbdcUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal hover:text-ink text-sm font-medium transition-colors"
              >
                TBDC
              </a>
            </div>
            <p className="text-ink-muted text-xs text-center sm:text-left">
              {SITE.tagline}
            </p>
          </div>
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
        <div className="mt-8">
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
    <section className="bg-cream py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8 lg:px-16">
        <FadeIn>
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${!isLeft ? "lg:[direction:rtl]" : ""}`}>
            <div className={!isLeft ? "lg:[direction:ltr]" : ""}>
              <div className="aspect-[4/5] overflow-hidden rounded-sm">
                <SafeImage src={image} alt={alt} />
              </div>
            </div>
            <div className={`max-w-[420px] ${!isLeft ? "lg:[direction:ltr]" : ""}`}>
              <h2 className="font-display italic text-3xl md:text-4xl lg:text-[3rem] font-normal leading-[1.1] text-ink">
                {headline}
              </h2>
              <p className="mt-5 text-ink-muted text-base md:text-lg leading-relaxed">
                {body}
              </p>
              {linkText && linkHref && (
                <a
                  href={linkHref}
                  target={linkHref.startsWith("http") ? "_blank" : undefined}
                  rel={linkHref.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-1.5 mt-5 text-teal hover:text-ink text-sm font-medium transition-colors underline underline-offset-4 decoration-teal/40 hover:decoration-ink"
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
        <p className="mt-4 text-ink-muted text-base md:text-lg leading-relaxed max-w-xl">
          Our principals bring 80+ years of combined capital markets expertise from the world's leading financial institutions.
        </p>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {TEAM.principals.map((p, i) => (
            <motion.div
              key={i}
              className="flex flex-col group"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              {/* Image path is easy to swap — update the photo field in TEAM.principals */}
              <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-sm group-hover:shadow-md transition-shadow duration-300">
                <SafeImage src={p.photo} alt={p.name} className="object-top" />
              </div>
              <h3 className="mt-4 font-display italic text-2xl md:text-3xl text-ink">{p.name}</h3>
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
            </motion.div>
          ))}
        </div>
      </FadeIn>
    </SectionWrap>
  );
}

/* ═══════════════════════════════════════════
   SUPPORTED BY TBDC EXPERTISE
   ═══════════════════════════════════════════ */

function LogoCarousel() {
  const reduced = usePrefersReducedMotion();
  const logos = [...PARTNER_LOGOS, ...PARTNER_LOGOS];

  return (
    <div className="relative overflow-hidden py-2">
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-cream-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-cream-dark to-transparent z-10 pointer-events-none" />
      <motion.div
        className="flex items-center gap-12 md:gap-16 w-max"
        animate={reduced ? {} : { x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {logos.map((logo, i) => (
          <div
            key={i}
            className="flex items-center justify-center shrink-0 h-10 md:h-12 w-28 md:w-36 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              decoding="async"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function TBDCExpertiseSection() {
  return (
    <section className="bg-cream-dark py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-5 md:px-8 lg:px-16">
        <FadeIn>
          <div className="text-center mb-8">
            <Eyebrow>SUPPORTED BY TBDC EXPERTISE</Eyebrow>
            <p className="font-display italic text-lg md:text-xl text-ink-soft leading-relaxed max-w-2xl mx-auto">
              Backed by the full resources and network of the{" "}
              <a
                href={SITE.tbdcUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal hover:text-ink underline underline-offset-2 decoration-teal/40 hover:decoration-ink transition-colors"
              >
                Toronto Business Development Centre
              </a>
              .
            </p>
            <p className="text-sm md:text-base text-ink-muted leading-relaxed max-w-2xl mx-auto mt-3">
              Our team brings institutional experience across capital markets, banking, consulting, and global enterprise — amplified by TBDC's founder network.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <LogoCarousel />
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SERVICES (THREE VISUAL PILLARS)
   ═══════════════════════════════════════════ */

function ServicesSection() {
  const reduced = usePrefersReducedMotion();

  return (
    <SectionWrap id="services">
      <FadeIn>
        <div className="max-w-2xl mx-auto text-center">
          <Eyebrow>WHAT WE DO</Eyebrow>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[3rem] font-normal leading-[1.1] text-ink">
            Full-cycle capital <em className="text-gold">advisory.</em>
          </h2>
          <p className="mt-4 font-display italic text-lg md:text-xl text-ink-muted leading-relaxed">
            We advise across the full capital lifecycle — from strategy through close.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {SERVICE_PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={i}
                className="group relative min-h-[420px] md:min-h-[500px] overflow-hidden rounded-sm border border-ink/10 bg-ink shadow-[0_24px_60px_rgba(15,23,28,0.14)]"
                whileHover={reduced ? undefined : { y: -2 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0">
                  <SafeImage
                    src={pillar.image}
                    alt={pillar.alt}
                    className="transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,24,28,0.42)_0%,rgba(18,24,28,0.56)_38%,rgba(18,24,28,0.78)_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,170,92,0.16),transparent_38%)]" />

                <div className="relative z-10 flex h-full flex-col p-7 md:p-8 lg:p-9 text-cream">
                  <div className="w-11 h-11 rounded-full border border-cream/25 bg-cream/10 backdrop-blur-[2px] flex items-center justify-center mb-5 shrink-0">
                    <Icon size={20} className="text-cream" />
                  </div>
                  <h3 className="max-w-[12ch] font-display text-[2rem] md:text-[2.2rem] leading-[1.05] text-cream mb-6">
                    {pillar.title}
                  </h3>
                  <ul className="mt-auto space-y-3 pr-2">
                    {pillar.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-[0.98rem] leading-7 text-cream/90">
                        <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </FadeIn>

      <FadeIn delay={0.25}>
        <div className="mt-10 text-center">
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
  /* Quote content — easy to swap with an approved final quote */
  const quoteText = "When you're scaling internationally, you don't need another consultant. You need someone who's sat on both sides of the boardroom.";
  const quoteAttribution = "Nitin Kaushal, Senior Managing Director";

  return (
    <section className="bg-cream py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8 lg:px-16">
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="aspect-[4/5] overflow-hidden rounded-sm">
              <SafeImage
                src={`${BASE}quote-nitin.webp`}
                alt="Nitin Kaushal, Senior Managing Director"
              />
            </div>
            <div className="max-w-[420px]">
              <blockquote className="font-display italic text-xl md:text-2xl lg:text-[1.65rem] text-ink leading-relaxed">
                "{quoteText}"
              </blockquote>
              <p className="mt-5 text-ink-muted text-sm">
                {quoteAttribution}
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
    <div className="bg-cream flex justify-center pt-4 pb-8">
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
        <div className="mt-12 max-w-3xl mx-auto">
          {NETWORK_CATEGORIES.map((row, i) => (
            <div key={i} className="flex flex-wrap justify-center gap-x-12 md:gap-x-16 gap-y-3 mb-5 md:mb-6">
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
        <div className="mt-10 text-center">
          <PillButton href="#contact" dark>
            Access our network <ArrowRight size={14} />
          </PillButton>
        </div>
      </FadeIn>

      <FadeIn delay={0.3}>
        <div className="mt-12 flex justify-center">
          <div className="text-center">
            <span className="font-display text-5xl md:text-6xl text-cream">50+</span>
            <p className="font-display italic text-sm text-cream/50 mt-2">
              Institutional investors in our active network
            </p>
          </div>
        </div>
      </FadeIn>
    </SectionWrap>
  );
}

/* ═══════════════════════════════════════════
   CONTACT (FLEXIBLE)
   ═══════════════════════════════════════════ */

function ContactSection() {
  const [formMode] = useState<"email" | "form" | "both">("both");

  return (
    <SectionWrap id="contact">
      <FadeIn>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl lg:text-[4rem] font-normal leading-[1.1] text-ink">
            Let's <em className="text-gold">talk.</em>
          </h2>
          <p className="mt-4 font-display italic text-lg md:text-xl text-ink-muted">
            One conversation is usually enough to know if we're a fit.
          </p>

          {/* General inbox — always shown */}
          {(formMode === "email" || formMode === "both") && (
            <div className="mt-8">
              <a
                href={`mailto:${SITE.email}`}
                className="inline-block font-display italic text-xl md:text-2xl text-ink underline underline-offset-4 decoration-ink/30 hover:text-warm-accent hover:decoration-warm-accent transition-colors"
              >
                {SITE.email}
              </a>
            </div>
          )}

          {/* Contact form placeholder — uncomment or toggle formMode to "form" or "both" */}
          {(formMode === "form" || formMode === "both") && (
            <div className="mt-8 max-w-md mx-auto border border-ink/10 rounded-sm p-6 bg-cream-dark/30">
              <p className="text-ink-muted text-sm mb-4">Or send us a message directly:</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  window.location.href = `mailto:${SITE.email}`;
                }}
                className="space-y-3"
              >
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 text-sm border border-ink/10 rounded-sm bg-cream focus:outline-none focus:border-gold/50 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-2.5 text-sm border border-ink/10 rounded-sm bg-cream focus:outline-none focus:border-gold/50 transition-colors"
                />
                <textarea
                  placeholder="Tell us about your company and what you're looking for..."
                  rows={3}
                  className="w-full px-4 py-2.5 text-sm border border-ink/10 rounded-sm bg-cream focus:outline-none focus:border-gold/50 transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 text-sm font-medium bg-ink text-cream rounded-sm hover:bg-navy transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          )}

          {/* Individual team emails */}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {TEAM.principals.map((p, i) => (
              <a
                key={i}
                href={`mailto:${p.emailPrefix}@gtmventureadvisors.com`}
                className="text-teal hover:text-ink text-xs font-medium transition-colors underline underline-offset-2 decoration-teal/40"
              >
                {p.name.split(" ")[0]}
              </a>
            ))}
          </div>

          <p className="mt-6 text-ink-muted text-sm">
            {SITE.address}
          </p>
          <p className="mt-2 text-ink-muted text-xs">
            {SITE.name} · A wholly owned subsidiary of the Toronto Business Development Centre
          </p>
          <p className="mt-6 text-ink-muted text-[0.65rem] max-w-lg mx-auto leading-relaxed">
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
    <footer className="bg-cream-dark py-8 px-5 md:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
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

        <div className="border-t border-ink/10 pt-6">
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

        <div className="mt-6 pt-4 border-t border-ink/10">
          <p className="text-ink-muted text-xs">
            © {new Date().getFullYear()} {SITE.name}. A wholly owned subsidiary of the Toronto Business Development Centre.
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
        <TBDCLockup />
        <PhilosophyStatement />
        {PILLAR_SECTIONS.map((pillar, i) => (
          <QuoteSection key={i} {...pillar} />
        ))}
        <TeamSection />
        <TBDCExpertiseSection />
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
