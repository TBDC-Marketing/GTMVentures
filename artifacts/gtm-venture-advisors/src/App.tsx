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

const TEAM = {
  principals: [
    {
      initials: "NK",
      photo: `${BASE}nitin-kaushal.jpg`,
      name: "Nitin Kaushal",
      title: "Senior Managing Director",
      linkedin: "https://www.linkedin.com/in/nitin-kaushal-a4478425/",
      emailPrefix: "nitin",
      bio: "35+ years in capital markets and investment banking. Former senior roles at PwC, HSBC Securities, Desjardins Securities, and Vengate Capital Partners. Deep relationships with institutional investors and technology/healthcare company leadership.",
      credentials: ["BSc Chemistry (University of Toronto)", "Chartered Accountant", "CF Corporate Finance"],
      placeholderGradient: "from-[#D4A843]/20 to-cream-dark",
    },
    {
      initials: "EC",
      photo: `${BASE}ezra-chang.jpg`,
      name: "Ezra Chang",
      title: "Managing Director",
      linkedin: "https://www.linkedin.com/in/ezrachang/",
      emailPrefix: "ezra",
      bio: "25+ years at the intersection of engineering, technology, and high-growth finance. $1B+ in managed financings and M&A advisory across ATB Capital Markets, Stifel Nicolaus, and National Bank Financial. Most recently led corporate development and M&A at a leading data centre infrastructure company.",
      credentials: ["BASc Mechanical Engineering (University of Toronto)", "MBA (Ivey Business School)", "P.Eng."],
      placeholderGradient: "from-navy/10 to-cream-dark",
    },
    {
      initials: "DK",
      photo: `${BASE}david-kideckel.jpg`,
      name: "David Kideckel",
      title: "Managing Director",
      linkedin: "https://www.linkedin.com/in/davidkideckel/",
      emailPrefix: "david",
      bio: "20+ years across life sciences, capital markets, and corporate advisory. Founder of Kideckel Advisory Group. Former Head of Life Sciences Equity Research at ATB Capital Markets. Leadership roles at Johnson & Johnson and Alexion Pharmaceuticals.",
      credentials: ["PhD Neuroscience & Statistics (University of Toronto)", "MBA (University of Toronto)"],
      placeholderGradient: "from-ink/5 to-cream-dark",
    },
  ],
  supportTeam: [
    { name: "Vik Khurana", role: "CEO", linkedin: "https://www.linkedin.com/in/vikram-khurana-1aa97b/" },
    { name: "Davinder Gurm", linkedin: "https://www.linkedin.com/in/davindergurm/" },
    { name: "Anish Kaushal", linkedin: "https://www.linkedin.com/in/anish-kaushal-md/" },
  ],
};

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

function EditorialPlaceholder({
  initials,
  label,
  gradient = "from-cream-dark to-ink/5",
  className = "",
  rounded = "rounded-[4px]",
}: {
  initials?: string;
  label?: string;
  gradient?: string;
  className?: string;
  rounded?: string;
}) {
  return (
    <div className={`bg-gradient-to-br ${gradient} ${rounded} shadow-sm flex items-center justify-center ${className}`}>
      {initials && (
        <span className="font-display italic text-4xl text-ink/40">{initials}</span>
      )}
      {label && !initials && (
        <span className="font-sans text-xs uppercase tracking-widest text-ink-muted/60">{label}</span>
      )}
    </div>
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
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 md:px-8 lg:px-16 h-16 md:h-20">
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

        <div className="hidden md:flex items-center gap-7">
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

function HeroPortrait({
  initials,
  name,
  title,
  photo,
  height,
  gradient,
}: {
  initials: string;
  name: string;
  title: string;
  photo: string;
  height: string;
  gradient: string;
}) {
  const [imgError, setImgError] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -20]);

  return (
    <motion.div className="flex flex-col items-start" style={{ y }}>
      {imgError ? (
        <EditorialPlaceholder
          initials={initials}
          gradient={gradient}
          className={`w-full ${height}`}
        />
      ) : (
        <div className={`w-full ${height} rounded-[4px] overflow-hidden shadow-sm`}>
          <img
            src={photo}
            alt={name}
            className="w-full h-full object-cover object-top"
            onError={() => setImgError(true)}
          />
        </div>
      )}
      <div className="mt-3">
        <span className="text-[0.7rem] uppercase tracking-[0.12em] text-ink-muted">{name}</span>
        <span className="font-display italic text-[0.7rem] text-ink-muted ml-1">{title}</span>
      </div>
    </motion.div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen bg-cream pt-28 md:pt-36 pb-16 md:pb-24">
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
          <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 items-end">
            <HeroPortrait
              initials="NK"
              name="NITIN KAUSHAL"
              title="Senior Managing Director"
              photo={TEAM.principals[0].photo}
              height="h-[280px] md:h-[380px]"
              gradient="from-[#D4A843]/20 to-cream-dark"
            />
            <HeroPortrait
              initials="EC"
              name="EZRA CHANG"
              title="Managing Director"
              photo={TEAM.principals[1].photo}
              height="h-[320px] md:h-[420px]"
              gradient="from-navy/10 to-cream-dark"
            />
            <HeroPortrait
              initials="DK"
              name="DAVID KIDECKEL"
              title="Managing Director"
              photo={TEAM.principals[2].photo}
              height="h-[260px] md:h-[340px]"
              gradient="from-ink/5 to-cream-dark"
            />
            <div className="hidden md:block">
              <EditorialPlaceholder
                label="TORONTO"
                gradient="from-cream-dark to-ink/5"
                className="w-full h-[300px]"
              />
              <div className="mt-3">
                <span className="text-[0.7rem] uppercase tracking-[0.12em] text-ink-muted">Toronto Financial District</span>
              </div>
            </div>
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
   BIG QUOTE SECTIONS
   ═══════════════════════════════════════════ */

function QuoteSection({
  imagePosition,
  headline,
  body,
  linkText,
  linkHref,
  placeholderLabel,
  placeholderGradient,
}: {
  imagePosition: "left" | "right";
  headline: string;
  body: string;
  linkText?: string;
  linkHref?: string;
  placeholderLabel: string;
  placeholderGradient: string;
}) {
  const isLeft = imagePosition === "left";

  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8 lg:px-16">
        <FadeIn>
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${!isLeft ? "lg:[direction:rtl]" : ""}`}>
            <div className={!isLeft ? "lg:[direction:ltr]" : ""}>
              <EditorialPlaceholder
                label={placeholderLabel}
                gradient={placeholderGradient}
                className="w-full h-[400px] md:h-[520px]"
              />
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

function InlineTeamPhoto({ photo, initials }: { photo: string; initials: string }) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <span className="inline-flex w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-cream-dark to-ink/10 items-center justify-center align-middle mr-2 border border-ink/10">
        <span className="font-display italic text-lg text-ink/40">{initials}</span>
      </span>
    );
  }

  return (
    <span className="inline-block w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden align-middle mr-2 border border-ink/10">
      <img
        src={photo}
        alt=""
        className="w-full h-full object-cover object-top"
        onError={() => setImgError(true)}
      />
    </span>
  );
}

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
        <div className="mt-16 md:mt-20 flex flex-wrap items-baseline gap-x-8 md:gap-x-12 gap-y-6">
          {TEAM.principals.map((p, i) => (
            <button
              key={i}
              onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
              className="flex items-center group cursor-pointer"
            >
              <InlineTeamPhoto photo={p.photo} initials={p.initials} />
              <span className="font-display italic text-2xl md:text-[2.5rem] text-ink group-hover:text-warm-accent transition-colors leading-tight">
                {p.name}
              </span>
            </button>
          ))}
        </div>
      </FadeIn>

      <AnimatePresence>
        {expandedIndex !== null && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-10 pt-8 border-t border-ink/10 max-w-2xl">
              <h3 className="font-display text-xl text-ink">{TEAM.principals[expandedIndex].name}</h3>
              <p className="text-ink-muted text-sm mt-1">{TEAM.principals[expandedIndex].title}</p>
              <p className="mt-4 text-ink-soft text-sm leading-relaxed">{TEAM.principals[expandedIndex].bio}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {TEAM.principals[expandedIndex].credentials.map((cred, j) => (
                  <span key={j} className="text-[0.65rem] uppercase tracking-wider text-ink-muted">
                    {cred}{j < TEAM.principals[expandedIndex].credentials.length - 1 ? " ·" : ""}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-4">
                <a
                  href={TEAM.principals[expandedIndex].linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal hover:text-ink text-sm font-medium transition-colors inline-flex items-center gap-1.5"
                >
                  <Linkedin size={14} /> LinkedIn
                </a>
                <a
                  href={`mailto:${TEAM.principals[expandedIndex].emailPrefix}@gtmventureadvisors.com`}
                  className="text-teal hover:text-ink text-sm font-medium transition-colors inline-flex items-center gap-1.5"
                >
                  <Mail size={14} /> Email
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
            <EditorialPlaceholder
              initials="GV"
              gradient="from-cream-dark to-ink/5"
              className="w-full h-[400px] md:h-[520px]"
            />
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
        <QuoteSection
          imagePosition="left"
          headline="We're embedded."
          body="GTM Venture Advisors is the capital markets arm of TBDC — a government-backed accelerator that has helped hundreds of international founders scale into North America."
          linkText="Learn about TBDC"
          linkHref="https://tbdc.com"
          placeholderLabel="TBDC"
          placeholderGradient="from-cream-dark to-[#D4A843]/10"
        />
        <QuoteSection
          imagePosition="right"
          headline="We're institutional."
          body="Our partners bring 80+ years of combined experience from PwC, HSBC, National Bank Financial, ATB Capital Markets, and Johnson & Johnson. You get the discipline of global firms with the speed of a boutique."
          placeholderLabel="BOARDROOM"
          placeholderGradient="from-cream-dark to-navy/10"
        />
        <QuoteSection
          imagePosition="left"
          headline="We're outcome-driven."
          body="From Series A to pre-IPO, we advise on capital raises, M&A, partnerships, and public-market readiness. No retainer theater. Every engagement is measured in deals done."
          placeholderLabel="DEALS"
          placeholderGradient="from-cream-dark to-ink/5"
        />
        <TeamSection />
        <PastEmployersSection />
        <ServicesSection />
        <PullQuoteSection />
        <NetworkSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
