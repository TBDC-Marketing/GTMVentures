import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  GitMerge,
  Building2,
  Cpu,
  HeartPulse,
  Shield,
  Factory,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  Mail,
  Linkedin,
  MapPin,
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
  { label: "What We Do", href: "#what-we-do" },
  { label: "Sectors", href: "#sectors" },
  { label: "Team", href: "#team" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const HERO = {
  eyebrow: "CAPITAL MARKETS & FINANCIAL ADVISORY",
  headlineParts: [
    { text: "From international traction to North American capital and market entry.", gold: false },
  ],
  subhead:
    "We work with Series A to pre-IPO companies to secure capital, structure partnerships, and execute North American expansion — leveraging both institutional networks and the TBDC ecosystem.",
  stats: [
    { value: "80+", label: "Years Collective Experience" },
    { value: "$1B+", label: "in Managed Financings" },
    { value: "4", label: "Core Sectors" },
  ],
};

const WHAT_WE_DO = {
  eyebrow: "WHAT WE DO",
  headline: "Institutional Expertise. Boutique Agility.",
  intro:
    "GTM Venture Advisors is a Private Capital Markets and Financial Advisory firm and wholly owned subsidiary of TBDC — Toronto's government-backed international startup accelerator. We bring the financial sophistication of global institutions with the agility of a boutique to founders and companies scaling across borders.",
  cards: [
    {
      icon: "TrendingUp",
      title: "Capital Raising & Advisory",
      desc: "Private fundraising advisory and capital markets strategy across VC, PE, family offices, and non-dilutive government funding.",
    },
    {
      icon: "GitMerge",
      title: "M&A & Strategic Advisory",
      desc: "End-to-end M&A support, joint ventures, corporate partnerships, and licensing for companies ready for transformative deals.",
    },
    {
      icon: "Building2",
      title: "IPO / RTO Readiness",
      desc: "Preparing high-growth companies for public markets in North America — from corporate finance structuring to go-public execution.",
    },
  ],
};

const SECTORS = {
  eyebrow: "SECTORS & FOCUS",
  headline: "Deep Expertise Where It Matters",
  items: [
    {
      icon: "Cpu",
      name: "Technology",
      desc: "Enterprise software, AI/ML, data infrastructure, and SaaS platforms scaling into North American markets.",
    },
    {
      icon: "HeartPulse",
      name: "Healthcare & Life Sciences",
      desc: "Biotech, medtech, pharma services, and digital health companies navigating complex capital and regulatory landscapes.",
    },
    {
      icon: "Shield",
      name: "Defense & Security",
      desc: "Defense technology, cybersecurity, and dual-use companies accessing North American procurement and capital channels.",
    },
    {
      icon: "Factory",
      name: "Diversified Industrials",
      desc: "Advanced manufacturing, cleantech, and infrastructure companies with capital-intensive growth trajectories.",
    },
  ],
  focusBadges: [
    { value: "Series A & B", label: "Stage Focus" },
    { value: "Pre-IPO", label: "Growth Stage" },
    { value: "International → North America", label: "Geographic Specialization" },
  ],
};

const TBDC_SECTION = {
  eyebrow: "PARTNERSHIP WITH TBDC",
  headline: "Embedded in Canada's International Startup Ecosystem",
  paragraphs: [
    "GTM Venture Advisors operates as the capital markets and financial advisory partner of the Toronto Business Development Centre (TBDC) — a government-backed international startup accelerator that has helped hundreds of founders from Europe, Asia and beyond to establish and scale operations in North America.",
    "Through programs like Horizon, Pivot, and Land & Expand, TBDC sources high-growth international founders with validated traction. GTM extends that ecosystem with institutional-grade financial advisory, connecting TBDC founders — and qualified external clients — to the capital and strategic relationships needed to scale.",
  ],
  flow: [
    { label: "TBDC Ecosystem", sub: "International founders with validated traction" },
    { label: "GTM Advisory", sub: "Capital markets strategy & execution" },
    { label: "Outcomes", sub: "Capital raised · Deals closed · Markets entered" },
  ],
};

const TEAM = {
  eyebrow: "OUR TEAM",
  headline: "Decades of Global Firm Experience.",
  headlineGold: "Boutique Agility.",
  subhead:
    "Our principals bring 80+ years of combined capital markets expertise from the world's leading financial institutions.",
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
    },
  ],
  supportTeam: [
    { name: "Vik Khurana", role: "CEO", linkedin: "https://www.linkedin.com/in/vikram-khurana-1aa97b/" },
    { name: "Davinder Gurm", linkedin: "https://www.linkedin.com/in/davindergurm/" },
    { name: "Anish Kaushal", linkedin: "https://www.linkedin.com/in/anish-kaushal-md/" },
  ],
};

const SERVICES = {
  eyebrow: "END-TO-END SERVICES",
  headline: "A Full Suite of Capital Markets & Advisory Services",
  items: [
    {
      num: "01",
      title: "Private Fundraising Advisory & Capital Markets Strategy",
      desc: "Strategic advisory on capital raising across venture capital, private equity, family offices, growth equity, and non-dilutive government sources. We develop fundraising roadmaps, prepare investor materials, and manage the process from targeting to close.",
    },
    {
      num: "02",
      title: "M&A & Strategic Advisory",
      desc: "End-to-end advisory on mergers, acquisitions, and strategic transactions. From target identification and valuation through due diligence, negotiation, and integration planning.",
    },
    {
      num: "03",
      title: "Sales & Business Development",
      desc: "Go-to-market advisory for companies entering or expanding in North American markets. Customer introductions, channel strategy, and enterprise sales support leveraging TBDC's institutional network.",
    },
    {
      num: "04",
      title: "Government Relations",
      desc: "Navigation of government programs, grants, and procurement channels across federal, provincial, and municipal levels. Connections to non-dilutive funding sources and public-sector partnerships.",
    },
    {
      num: "05",
      title: "Joint Ventures, Corporate Partnerships & Licensing",
      desc: "Structuring and negotiating joint ventures, strategic partnerships, technology licensing agreements, and corporate development opportunities that accelerate growth.",
    },
    {
      num: "06",
      title: "Corporate Finance & Accounting",
      desc: "Financial structuring, reporting readiness, and CFO-level advisory to ensure companies are institutional-grade before approaching capital markets.",
    },
    {
      num: "07",
      title: "North American IPO / RTO Readiness",
      desc: "Comprehensive preparation for public markets — including financial audit readiness, corporate governance, regulatory compliance, underwriter introductions, and go-public strategy across Canadian and US exchanges.",
    },
  ],
};

const NETWORK = {
  eyebrow: "INTERNATIONAL REACH",
  headline: "Institutional Depth. Global Connections.",
  copy: "GTM Venture Advisors maintains active relationships across the capital ecosystem — from early-stage venture capital and family offices to growth equity, private equity, strategic corporate investors, and government entities offering non-dilutive capital. Our partners' careers span global institutions on three continents, and our network extends wherever ambitious founders need capital.",
  stat: { value: "50+", label: "Institutional Investors in Our Active Network" },
  tags: [
    "Venture Capital",
    "Family Offices",
    "Growth Equity Funds",
    "Private Equity",
    "Government Entities & Non-Dilutive Capital",
    "Strategic Investors",
    "Corporate Venture Capital",
  ],
};

const PAST_EMPLOYERS = [
  { name: "PwC", logoUrl: null },
  { name: "HSBC", logoUrl: null },
  { name: "National Bank Financial", logoUrl: null },
  { name: "Stifel", logoUrl: null },
  { name: "Johnson & Johnson", logoUrl: null },
  { name: "ATB Capital Markets", logoUrl: null },
  { name: "Desjardins", logoUrl: null },
];

const CONTACT = {
  eyebrow: "GET IN TOUCH",
  headline: "Ready to Scale?",
  headlineGold: "Let's Talk.",
  subhead:
    "Whether you're raising capital, preparing for public markets, or exploring strategic options, GTM Venture Advisors can help you navigate the path forward.",
};

/* ═══════════════════════════════════════════
   UTILITY COMPONENTS
   ═══════════════════════════════════════════ */

type IconName = "TrendingUp" | "GitMerge" | "Building2" | "Cpu" | "HeartPulse" | "Shield" | "Factory";

const ICON_MAP: Record<IconName, React.ElementType> = {
  TrendingUp,
  GitMerge,
  Building2,
  Cpu,
  HeartPulse,
  Shield,
  Factory,
};

function Icon({ name, className }: { name: string; className?: string }) {
  const Comp = ICON_MAP[name as IconName];
  return Comp ? <Comp className={className} /> : null;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[0.7rem] sm:text-xs font-medium uppercase tracking-[0.18em] text-teal mb-4">
      {children}
    </span>
  );
}

function GoldText({ children }: { children: React.ReactNode }) {
  return <span className="text-gold">{children}</span>;
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
      className={`relative py-20 md:py-28 lg:py-32 ${dark ? "bg-navy text-white" : "bg-surface text-charcoal"} ${className}`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

function FadeUp({
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
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Counter({ value, duration = 1.8 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView) return;
    const match = value.match(/^([^0-9]*)(\d+)(.*)$/);
    if (!match) return;
    const [, prefix, numStr, suffix] = match;
    const target = parseInt(numStr, 10);
    let start = 0;
    const step = target / (duration * 60);
    const frame = () => {
      start += step;
      if (start >= target) {
        setDisplay(`${prefix}${target}${suffix}`);
        return;
      }
      setDisplay(`${prefix}${Math.floor(start)}${suffix}`);
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [inView, value, duration]);

  return <span ref={ref}>{display}</span>;
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
        scrolled ? "bg-navy/95 backdrop-blur-md shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8 h-16 md:h-20">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex flex-col items-start">
          <span className="text-white font-semibold text-sm md:text-base leading-tight tracking-tight">
            {SITE.name}
          </span>
          <span className="text-gray-500 text-[0.55rem] uppercase tracking-[0.18em] leading-none mt-0.5">
            {SITE.tagline}
          </span>
        </button>

        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-gray-300 hover:text-teal text-[0.8rem] font-medium tracking-wide transition-colors"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#contact")}
            className="ml-2 rounded-md bg-teal px-5 py-2 text-sm font-semibold text-white hover:bg-teal-light transition-colors"
          >
            Book a Strategic Call
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
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
            className="md:hidden bg-navy-light border-t border-navy-mid overflow-hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className="text-left text-gray-300 hover:text-teal py-2 text-sm font-medium"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("#contact")}
                className="mt-2 rounded-md bg-teal px-5 py-2.5 text-sm font-semibold text-white text-center"
              >
                Book a Strategic Call
              </button>
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
  return <motion.div className="fixed top-0 left-0 h-[3px] bg-teal z-[60]" style={{ width }} />;
}

/* ═══════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════ */

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy">
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src={`${BASE}gtmherovideo.mp4`}
        />
        <div className="absolute inset-0 bg-navy/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(0,131,143,0.15)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(212,168,67,0.08)_0%,transparent_50%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8 text-center pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <Eyebrow>{HERO.eyebrow}</Eyebrow>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-bold leading-[1.15] tracking-tight text-white max-w-4xl mx-auto"
        >
          {HERO.headlineParts.map((p, i) =>
            p.gold ? <GoldText key={i}>{p.text}</GoldText> : <span key={i}>{p.text}</span>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="mt-6 md:mt-8 text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
        >
          {HERO.subhead}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.5 }}
          className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="rounded-md bg-teal px-7 py-3 text-sm font-semibold text-white hover:bg-teal-light transition-colors inline-flex items-center gap-2"
          >
            Book a Strategic Call <ArrowRight size={16} />
          </a>
          <a
            href="#services"
            onClick={(e) => { e.preventDefault(); document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" }); }}
            className="rounded-md border border-white/20 px-7 py-3 text-sm font-semibold text-white hover:border-teal hover:text-teal transition-colors"
          >
            Explore Our Services
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-16 md:mt-20 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0 sm:divide-x sm:divide-white/10"
        >
          {HERO.stats.map((s, i) => (
            <div key={i} className="sm:px-8 text-center">
              <div className="text-2xl md:text-3xl font-bold text-white font-display">
                <Counter value={s.value} />
              </div>
              <div className="text-[0.7rem] text-gray-400 uppercase tracking-wider mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="text-gray-500" size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   WHAT WE DO
   ═══════════════════════════════════════════ */

function WhatWeDoSection() {
  return (
    <SectionWrap id="what-we-do" dark>
      <FadeUp>
        <Eyebrow>{WHAT_WE_DO.eyebrow}</Eyebrow>
        <h2 className="font-display text-2xl md:text-4xl font-bold text-white">{WHAT_WE_DO.headline}</h2>
        <p className="mt-5 text-gray-300 leading-relaxed max-w-3xl text-base md:text-lg">{WHAT_WE_DO.intro}</p>
      </FadeUp>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
        {WHAT_WE_DO.cards.map((c, i) => (
          <FadeUp key={i} delay={i * 0.12}>
            <motion.div
              whileHover={{ y: -4 }}
              className="group rounded-xl bg-navy-light border border-navy-mid p-7 md:p-8 transition-all duration-300 hover:border-teal/40 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-teal scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <div className="w-11 h-11 rounded-lg bg-teal/10 flex items-center justify-center mb-5">
                <Icon name={c.icon} className="text-teal w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{c.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{c.desc}</p>
            </motion.div>
          </FadeUp>
        ))}
      </div>
    </SectionWrap>
  );
}

/* ═══════════════════════════════════════════
   SECTORS & FOCUS
   ═══════════════════════════════════════════ */

function SectorsSection() {
  return (
    <SectionWrap id="sectors">
      <FadeUp>
        <Eyebrow>{SECTORS.eyebrow}</Eyebrow>
        <h2 className="font-display text-2xl md:text-4xl font-bold">{SECTORS.headline}</h2>
      </FadeUp>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {SECTORS.items.map((s, i) => (
          <FadeUp key={i} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -3 }}
              className="group rounded-xl bg-white border border-gray-200 p-7 shadow-sm hover:shadow-md hover:border-teal/30 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(0,131,143,0.08)" }}>
                <Icon name={s.icon} className="text-teal w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-charcoal mb-2">{s.name}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          </FadeUp>
        ))}
      </div>

      <FadeUp delay={0.3}>
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0 sm:divide-x sm:divide-gray-200">
          {SECTORS.focusBadges.map((b, i) => (
            <div key={i} className="sm:px-10 text-center">
              <div className="text-lg md:text-xl font-bold text-charcoal">{b.value}</div>
              <div className="text-[0.7rem] text-gray-400 uppercase tracking-wider mt-1">{b.label}</div>
            </div>
          ))}
        </div>
      </FadeUp>
    </SectionWrap>
  );
}

/* ═══════════════════════════════════════════
   TBDC AFFILIATION
   ═══════════════════════════════════════════ */

function TbdcSection() {
  return (
    <SectionWrap dark>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <FadeUp>
            <Eyebrow>{TBDC_SECTION.eyebrow}</Eyebrow>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-white">{TBDC_SECTION.headline}</h2>
          </FadeUp>
          {TBDC_SECTION.paragraphs.map((p, i) => (
            <FadeUp key={i} delay={0.15 * (i + 1)}>
              <p className="mt-5 text-gray-300 leading-relaxed text-base">{p}</p>
            </FadeUp>
          ))}
          <FadeUp delay={0.4}>
            <a
              href={SITE.tbdcUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-teal hover:text-teal-light text-sm font-medium transition-colors"
            >
              Learn More About TBDC <ArrowUpRight size={14} />
            </a>
          </FadeUp>
        </div>

        <FadeUp delay={0.2}>
          <div className="flex flex-col gap-4">
            {TBDC_SECTION.flow.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                className="relative"
              >
                <div className="rounded-xl bg-navy-light border border-navy-mid p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-teal rounded-full" />
                  <div className="pl-4">
                    <div className="text-xs uppercase tracking-wider text-teal font-medium">
                      Step {i + 1}
                    </div>
                    <div className="text-white font-semibold mt-1">{step.label}</div>
                    <div className="text-gray-400 text-sm mt-1">{step.sub}</div>
                  </div>
                </div>
                {i < TBDC_SECTION.flow.length - 1 && (
                  <div className="flex justify-center py-1">
                    <div className="w-px h-4 bg-teal/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </FadeUp>
      </div>
    </SectionWrap>
  );
}

/* ═══════════════════════════════════════════
   TEAM
   ═══════════════════════════════════════════ */

function TeamMemberPhoto({ photo, initials, name }: { photo: string; initials: string; name: string }) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-navy-mid to-navy flex items-center justify-center border-2 border-teal/20 mx-auto mb-5">
        <span className="text-2xl md:text-3xl font-bold text-teal/60 font-display">{initials}</span>
      </div>
    );
  }

  return (
    <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-teal/20 mx-auto mb-5">
      <img
        src={photo}
        alt={name}
        className="w-full h-full object-cover object-top"
        onError={() => setImgError(true)}
      />
    </div>
  );
}

function TeamSection() {
  return (
    <SectionWrap id="team">
      <FadeUp>
        <div className="text-center max-w-3xl mx-auto">
          <Eyebrow>{TEAM.eyebrow}</Eyebrow>
          <h2 className="font-display text-2xl md:text-4xl font-bold">
            {TEAM.headline} <GoldText>{TEAM.headlineGold}</GoldText>
          </h2>
          <p className="mt-4 text-gray-500 text-base md:text-lg leading-relaxed">{TEAM.subhead}</p>
        </div>
      </FadeUp>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
        {TEAM.principals.map((p, i) => (
          <FadeUp key={i} delay={i * 0.12}>
            <div className="text-center">
              <TeamMemberPhoto photo={p.photo} initials={p.initials} name={p.name} />
              <h3 className="text-lg font-bold text-charcoal">{p.name}</h3>
              <div className="text-teal text-sm font-medium mt-1">{p.title}</div>
              <a
                href={p.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-2 text-xs text-gray-400 hover:text-teal transition-colors"
              >
                <Linkedin size={13} /> LinkedIn
              </a>
              <p className="mt-4 text-gray-500 text-sm leading-relaxed">{p.bio}</p>
              <button
                onClick={() => { window.location.href = `mailto:${p.emailPrefix}@gtmventureadvisors.com`; }}
                className="mt-3 inline-flex items-center gap-1.5 text-sm text-teal hover:underline hover:text-teal-light transition-colors"
              >
                <Mail size={14} />
                Email {p.name.split(" ")[0]}
              </button>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                {p.credentials.map((cred, j) => (
                  <span
                    key={j}
                    className="inline-block text-[0.6rem] uppercase tracking-wider text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full"
                  >
                    {cred}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>
        ))}
      </div>

      <FadeUp delay={0.3}>
        <div className="mt-16 rounded-xl bg-gray-50 border border-gray-200 p-6 md:p-8 text-center">
          <div className="text-xs uppercase tracking-wider text-teal font-medium mb-2">TBDC Support Team</div>
          <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mx-auto">
            Supported by the TBDC executive and operations team, including{" "}
            {TEAM.supportTeam.map((m, i) => (
              <span key={i}>
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-charcoal hover:text-teal transition-colors underline underline-offset-2 decoration-gray-300 hover:decoration-teal"
                >
                  {m.name}{m.role ? ` (${m.role})` : ""}
                </a>
                {i < TEAM.supportTeam.length - 2 ? ", " : i === TEAM.supportTeam.length - 2 ? ", and " : "."}
              </span>
            ))}
          </p>
        </div>
      </FadeUp>
    </SectionWrap>
  );
}

/* ═══════════════════════════════════════════
   SERVICES (ACCORDION)
   ═══════════════════════════════════════════ */

function ServiceItem({
  item,
  isOpen,
  toggle,
  index,
}: {
  item: typeof SERVICES.items[0];
  isOpen: boolean;
  toggle: () => void;
  index: number;
}) {
  return (
    <FadeUp delay={index * 0.06}>
      <div className="border-b border-navy-mid">
        <button
          onClick={toggle}
          className="w-full flex items-center gap-5 py-6 text-left group"
        >
          <span className="text-gold font-display text-2xl md:text-3xl font-bold w-12 shrink-0">{item.num}</span>
          <span className="flex-1 text-white font-semibold text-base md:text-lg group-hover:text-teal transition-colors">
            {item.title}
          </span>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronDown className="text-gray-500 shrink-0" size={20} />
          </motion.div>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="pb-6 text-gray-400 text-sm md:text-base leading-relaxed max-w-3xl" style={{ paddingLeft: "4.25rem" }}>
                {item.desc}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeUp>
  );
}

/* ═══════════════════════════════════════════
   WHERE OUR TEAM HAS WORKED
   ═══════════════════════════════════════════ */

function PastEmployersSection() {
  return (
    <section className="bg-gray-50 border-y border-gray-100 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <FadeUp>
          <p className="text-center text-xs uppercase tracking-widest text-gray-400 font-medium mb-8">
            Where Our Team Has Worked
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {PAST_EMPLOYERS.map((org, i) => (
              <div
                key={i}
                className="opacity-40 grayscale hover:opacity-70 hover:grayscale-0 transition-all duration-300 flex items-center justify-center bg-white border border-gray-200 rounded-md px-5 py-3 min-w-[120px]"
              >
                {org.logoUrl ? (
                  <img src={org.logoUrl} alt={org.name} className="h-7 object-contain" />
                ) : (
                  <span className="text-sm font-medium text-gray-600 whitespace-nowrap">{org.name}</span>
                )}
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function ServicesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <SectionWrap id="services" dark>
      <FadeUp>
        <Eyebrow>{SERVICES.eyebrow}</Eyebrow>
        <h2 className="font-display text-2xl md:text-4xl font-bold text-white">{SERVICES.headline}</h2>
      </FadeUp>

      <div className="mt-12">
        {SERVICES.items.map((item, i) => (
          <ServiceItem
            key={i}
            item={item}
            index={i}
            isOpen={openIndex === i}
            toggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </SectionWrap>
  );
}

/* ═══════════════════════════════════════════
   NETWORK & REACH
   ═══════════════════════════════════════════ */

function NetworkSection() {
  return (
    <SectionWrap>
      <div className="max-w-3xl mx-auto text-center">
        <FadeUp>
          <Eyebrow>{NETWORK.eyebrow}</Eyebrow>
          <h2 className="font-display text-2xl md:text-4xl font-bold">{NETWORK.headline}</h2>
          <p className="mt-5 text-gray-500 leading-relaxed text-base md:text-lg">{NETWORK.copy}</p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="mt-10 mb-10 text-center">
            <div className="text-4xl md:text-5xl font-bold font-display text-gold">{NETWORK.stat.value}</div>
            <div className="mt-2 text-sm uppercase tracking-wider text-gray-500">{NETWORK.stat.label}</div>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            {NETWORK.tags.map((tag, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.3 }}
                className="inline-block text-sm font-medium text-charcoal bg-white border border-gray-200 px-4 py-2 rounded-full shadow-sm"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </FadeUp>
      </div>
    </SectionWrap>
  );
}

/* ═══════════════════════════════════════════
   CONTACT / CTA
   ═══════════════════════════════════════════ */

function ContactSection() {
  return (
    <SectionWrap id="contact" dark className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,131,143,0.1)_0%,transparent_60%)]" />

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <FadeUp>
          <Eyebrow>{CONTACT.eyebrow}</Eyebrow>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white">
            {CONTACT.headline} <GoldText>{CONTACT.headlineGold}</GoldText>
          </h2>
          <p className="mt-5 text-gray-300 text-base md:text-lg leading-relaxed">{CONTACT.subhead}</p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="mt-10">
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-2 rounded-md bg-teal px-8 py-3.5 text-sm font-semibold text-white hover:bg-teal-light transition-colors"
            >
              <Mail size={16} />
              Email Us
            </a>
          </div>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-400 text-sm">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} className="text-teal" />
              {SITE.address}
            </span>
          </div>
          <p className="mt-2 text-gray-500 text-xs">
            {SITE.name} · A wholly owned subsidiary of the Toronto Business Development Centre
          </p>
          <p className="mt-6 text-gray-600 text-[0.65rem] max-w-lg mx-auto leading-relaxed">
            [Regulatory disclosure placeholder — securities advisory disclosures to be added here prior to launch.]
          </p>
        </FadeUp>
      </div>
    </SectionWrap>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="bg-[#060D17] py-10 px-5 sm:px-8 border-t border-navy-mid">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-xs text-center md:text-left">
          © {new Date().getFullYear()} {SITE.name}. A wholly owned subsidiary of the Toronto Business Development Centre.
        </p>
        <div className="flex items-center gap-5">
          <a
            href={SITE.tbdcUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-teal text-xs transition-colors"
          >
            TBDC.com
          </a>
          <span className="text-navy-mid">·</span>
          <a href="#" className="text-gray-500 hover:text-teal text-xs transition-colors">
            Privacy Policy
          </a>
          <span className="text-navy-mid">·</span>
          <a href="#" className="text-gray-500 hover:text-teal text-xs transition-colors">
            Terms of Use
          </a>
          <span className="text-navy-mid">·</span>
          <a href={SITE.linkedIn} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-teal transition-colors">
            <Linkedin size={14} />
          </a>
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
    <div className="bg-navy min-h-screen">
      <ScrollProgress />
      <Nav />
      <main>
        <HeroSection />
        <WhatWeDoSection />
        <SectorsSection />
        <TbdcSection />
        <TeamSection />
        <PastEmployersSection />
        <ServicesSection />
        <NetworkSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
