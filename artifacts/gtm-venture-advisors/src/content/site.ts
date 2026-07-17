const BASE = import.meta.env.BASE_URL;

/* ═══════════════════════════════════════════
   SITE-WIDE CONTENT
   All copy and data for the one-page site.
   ═══════════════════════════════════════════ */

export const SITE = {
  name: "GTM Venture Advisors",
  tagline: "The Capital Markets Advisory Arm of TBDC",
  email: "info@gtmventureadvisors.com",
  address: "111 Peter Street, 9th Floor, Toronto ON M5V 2H1",
  tbdcUrl: "https://tbdc.com",
  canonicalUrl: "https://gtmventureadvisors.com/",
};

export const NAV_LINKS = [
  { label: "Approach", href: "#approach" },
  { label: "Services", href: "#services" },
  { label: "Team", href: "#team" },
  { label: "Network", href: "#network" },
];

export const HERO = {
  eyebrow: "CAPITAL MARKETS & CROSS-BORDER ADVISORY",
  /* Headline is split in the Hero component so "raise capital"
     carries the single gold-italic emphasis. */
  headlineBefore: "We help Series A to pre-IPO companies ",
  headlineEmphasis: "raise capital",
  headlineAfter: " and execute North American expansion.",
  sub: "Raise capital faster. Scale with confidence. Execute your North American expansion with institutional-grade advisory.",
  primaryCta: { label: "Start a conversation", href: "#contact" },
  secondaryCta: { label: "Explore our advisory", href: "#services" },
};

export const HERO_SECTORS = [
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

/* Proof cells — figures already published on the current site.
   Flagged for final factual review before launch. */
export const PROOF_STATS: { figure: string; label: string; href?: string }[] = [
  { figure: "60+", label: "years combined experience" },
  { figure: "$1B+", label: "financings & advisory" },
  { figure: "50+", label: "investor relationships" },
  { figure: "TBDC", label: "a TBDC company", href: "https://tbdc.com" },
];

export const APPROACH = {
  intro: "Built for founders who need conviction and momentum.",
  panels: [
    {
      label: "Embedded",
      image: `${BASE}pillar-embedded.webp`,
      alt: "Aerial view of Toronto's financial district at dusk",
      body: "GTM Venture Advisors is the capital markets advisory arm of TBDC — a government-backed accelerator that has helped hundreds of international founders scale into North America. Senior advisors work directly with your management team.",
      linkText: "Learn about TBDC",
      linkHref: "https://tbdc.com",
    },
    {
      label: "Institutional",
      image: `${BASE}pillar-institutional.webp`,
      alt: "Architectural detail of a modern boardroom interior",
      body: "Our partners bring 60+ years of combined experience from PwC, HSBC, National Bank Financial, and ATB Capital Markets. You get the discipline of global firms with the speed of a boutique.",
    },
    {
      label: "Outcome-driven",
      image: `${BASE}pillar-outcome.webp`,
      alt: "Two hands meeting across a table in agreement",
      body: "Our engagements are structured around clear outcomes: the right capital, the right partners, and deals that get done. Strategy is always aligned to a financing, expansion, or transaction goal.",
    },
  ],
};

export const SERVICES = {
  heading: "Full-cycle capital advisory.",
  sub: "We advise across the full capital lifecycle — from strategy through close.",
  cta: { label: "Discuss your capital strategy", href: "#contact" },
  pillars: [
    {
      numeral: "01",
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
      numeral: "02",
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
      numeral: "03",
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
  ],
};

export const TEAM = {
  heading: "Decades of global experience.",
  sub: "Our principals bring 60+ years of combined capital markets expertise from the world's leading financial institutions.",
  principals: [
    {
      photo: `${BASE}principal-nitin.webp`,
      name: "Nitin Kaushal",
      title: "Managing Director",
      short: "Capital markets across technology and healthcare — 35+ years.",
      linkedin: "https://www.linkedin.com/in/nitin-kaushal-a4478425/",
      emailPrefix: "nitin",
      bio: "35+ years in capital markets and investment banking. Former senior roles at PwC, HSBC Securities, Desjardins Securities, and Vengate Capital Partners. Deep relationships with institutional investors and technology/healthcare company leadership.",
      credentials: ["BSc Chemistry (University of Toronto)", "Chartered Accountant", "CF Corporate Finance"],
    },
    {
      photo: `${BASE}principal-ezra.webp`,
      name: "Ezra Chang",
      title: "Managing Director",
      short: "Engineering-trained capital markets professional — $1B+ in financings.",
      linkedin: "https://www.linkedin.com/in/ezrachang/",
      emailPrefix: "ezra",
      bio: "25+ years at the intersection of engineering, technology, and high-growth finance. $1B+ in managed financings and M&A advisory across ATB Capital Markets, Stifel Nicolaus, and National Bank Financial. Most recently led corporate development and M&A at a leading data centre infrastructure company.",
      credentials: ["BASc Mechanical Engineering (University of Toronto)", "MBA (Ivey Business School)", "P.Eng."],
    },
    {
      photo: `${BASE}principal-anish.webp`,
      name: "Anish Kaushal",
      title: "Vice President",
      short: "MD by training, VC for 7+ years across biotech and medtech.",
      linkedin: "https://www.linkedin.com/in/anish-kaushal-md/",
      emailPrefix: "anish",
      bio: "MD by training and VC for 7+ years in Europe and North America having analyzed over 1000+ companies and led deals in biotech/medtech with board experience. Deep relationships with life sciences investors globally.",
      credentials: ["BSc Medicine (University of St. Andrews)", "MBChB (University of Edinburgh)"],
    },
  ],
};

/* Johnson & Johnson intentionally excluded per client direction. */
export const EXPERIENCE = {
  label: "Selected institutions where our team built its experience",
  logos: [
    { src: `${BASE}logo-pwc.png`, alt: "PwC" },
    { src: `${BASE}logo-hsbc.png`, alt: "HSBC" },
    { src: `${BASE}logo-national-bank.png`, alt: "National Bank Financial" },
    { src: `${BASE}logo-stifel.png`, alt: "Stifel" },
    { src: `${BASE}logo-atb.png`, alt: "ATB Capital Markets" },
    { src: `${BASE}logo-desjardins.png`, alt: "Desjardins" },
  ],
};

export const NETWORK = {
  quote:
    "When you're scaling internationally, you don't need another consultant. You need someone who's sat on both sides of the boardroom.",
  quoteAttribution: "Nitin Kaushal, Managing Director",
  quoteImage: `${BASE}quote-nitin.webp`,
  quoteImageAlt: "Nitin Kaushal, Managing Director",
  figure: "50+",
  figureLabel: "Institutional investors in our active network",
  categories: [
    "Venture Capital",
    "Private Equity",
    "Corporate Venture",
    "Family Offices",
    "Growth Equity",
    "Government / Non-Dilutive",
    "Strategic Investors",
  ],
  cta: { label: "Access our network", href: "#contact" },
};

export const CONTACT = {
  heading: "Let's chart the next stage.",
  sub: "One conversation is usually enough to know if we're a fit.",
  formEndpoint: "https://formsubmit.co/ajax/info@gtmventureadvisors.com",
  stageOptions: [
    "Series A",
    "Series B–C",
    "Growth / pre-IPO",
    "M&A / strategic",
    "Other",
  ],
};
