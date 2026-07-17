import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "../../content/site";
import { BrandLogo } from "../brand/BrandLogo";
import { Button } from "../ui/Button";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* Escape closes the mobile panel and returns focus to the toggle. */
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    /* Prevent background scroll while the panel is open. */
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) panelRef.current?.querySelector("a")?.focus();
  }, [mobileOpen]);

  const close = () => setMobileOpen(false);

  return (
    <nav
      aria-label="Main"
      className={`fixed inset-x-0 top-0 z-50 bg-brand-navy/[0.92] backdrop-blur-sm transition-shadow duration-300 ${
        scrolled ? "border-b border-brand-rule" : "border-b border-transparent"
      }`}
      style={{ ["--focus-offset-color" as string]: "#07182D" }}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-[clamp(20px,5vw,72px)] h-20">
        <a href="#top" aria-label="GTM Venture Advisors — home" className="shrink-0">
          <BrandLogo surface="dark" markHeight={40} />
        </a>

        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-brand-ivory/90 hover:text-brand-gold text-[0.85rem] font-medium tracking-wide transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Button href="#contact" variant="primary">
            Start a conversation
          </Button>
        </div>

        <button
          ref={toggleRef}
          className="md:hidden text-brand-ivory p-2 -mr-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 top-20 bg-brand-navy-deep flex flex-col"
          >
            <div className="flex flex-col gap-2 px-[clamp(20px,5vw,72px)] py-10">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={close}
                  className="font-display text-3xl text-brand-ivory hover:text-brand-gold py-3 transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-6">
                <Button href="#contact" onClick={close} variant="primary">
                  Start a conversation
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
