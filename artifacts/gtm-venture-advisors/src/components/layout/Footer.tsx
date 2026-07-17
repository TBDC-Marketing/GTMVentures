import { SITE } from "../../content/site";
import { BrandLogo } from "../brand/BrandLogo";
import { Container } from "../ui/Section";

export function Footer() {
  return (
    <footer
      className="bg-brand-navy-deep text-brand-ivory border-t border-brand-rule py-12 md:py-16"
      style={{ ["--focus-offset-color" as string]: "#04111F" }}
    >
      <Container>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
          <a href="#top" aria-label="GTM Venture Advisors — back to top">
            <BrandLogo surface="dark" markHeight={44} />
          </a>
          <div className="flex items-center gap-2 text-brand-ivory/60 text-sm">
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-brand-gold inline-block" />
            Toronto
          </div>
        </div>

        <div className="border-t border-brand-ivory/10 pt-8 grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.18em] text-brand-gold font-medium mb-3">
              Contact
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="block text-brand-ivory hover:text-brand-gold transition-colors mb-1"
            >
              {SITE.email}
            </a>
            <p className="text-brand-ivory/60 text-xs">{SITE.address}</p>
          </div>
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.18em] text-brand-gold font-medium mb-3">
              Resources
            </p>
            <a
              href={SITE.tbdcUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-brand-ivory hover:text-brand-gold transition-colors"
            >
              TBDC.com
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-brand-ivory/10">
          <p className="text-brand-ivory/50 text-xs leading-relaxed">
            © {new Date().getFullYear()} {SITE.name}. A wholly owned subsidiary of the Toronto
            Business Development Centre.
          </p>
        </div>
      </Container>
    </footer>
  );
}
