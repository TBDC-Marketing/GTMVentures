# GTM Venture Advisors website rebrand implementation plan

Prepared July 17, 2026. This brief is written for the coding agent responsible for rebuilding the current React/Vite site around the approved **Meridian Reserve** identity and canonical GTM compass monogram.

## 1. Outcome and design direction

Rebuild the site as a premium, institutional capital-advisory experience. It should feel credible enough for an investment bank, but more focused and entrepreneurial than a traditional large institution.

The intended impression is:

- **Trust:** deep Midnight Navy, disciplined spacing, restrained motion and strong information hierarchy.
- **Reputation:** editorial Instrument Serif headlines, Antique Gold details and proof placed near claims.
- **Momentum:** the compass/meridian motif, directional rules and purposeful imagery imply navigation and cross-border progress.
- **Clarity:** fewer repetitive full-height sections, tighter copy, consistent calls to action and clear next steps.

This is a visual and structural rebrand, not a wholesale content rewrite. Preserve substantiated business claims unless the client provides replacements. All financial, regulatory, transaction-value and employment-history claims must receive a final factual/legal review before launch.

## 2. Current-state audit

### What is working

- The one-page narrative is logical: proposition, sectors, credibility, approach, team, services, proof, contact.
- Instrument Serif and Inter are already in use and align with the approved brand kit.
- The photography is credible and sector-specific.
- Framer Motion already supports restrained entrance effects and reduced-motion detection.
- The dark “network” section demonstrates that the site can support a more authoritative navy treatment.

### What is weakening the brand

- The dominant `#F0EBE1` beige makes the experience feel muted and lifestyle-oriented rather than institutional.
- The current logo in the navigation and TBDC lockup is a three-bar placeholder, not the approved identity.
- The 1,300px hero and three separate 760px pillar blocks create excessive scrolling before services and proof.
- Gold is treated primarily as italic decoration. It needs a more systematic role in rules, labels, calls to action and proof.
- The page lacks an immediate primary CTA above the fold.
- Several lower-contrast beige/grey combinations are visually faint, especially in the long full-page screenshot.
- The footer contains placeholder legal links, and the regulatory disclosure is visibly a placeholder.
- Contact inputs rely on placeholders instead of persistent labels.

### Implementation debt to remove during the rebrand

- `src/App.tsx` is roughly 1,100 lines and contains content, data, modals, sections and layout in one file.
- `index.html` uses runtime DOM walkers to remove Johnson & Johnson references and patch institutional copy. Fix the source data and remove these overrides.
- `index.html` intercepts the React contact form and creates a second hidden form for FormSubmit. Move submission to a deliberate React form handler or a first-party/serverless endpoint.
- The current contact component also includes a `mailto:` fallback. Avoid two competing submission mechanisms.
- `public/favicon.svg` was an orange placeholder. It has now been replaced with the approved mark.
- LinkedIn, Privacy Policy and Terms of Use routes are placeholders and must not ship as `#` links.

## 3. Approved brand foundations

### Colour tokens

Use these values exactly as the base palette:

```css
@theme {
  --color-brand-navy: #07182D;
  --color-brand-navy-deep: #04111F;
  --color-brand-navy-soft: #102943;
  --color-brand-gold: #C6A15B;
  --color-brand-gold-deep: #A9843F;
  --color-brand-ivory: #F6F1E7;
  --color-brand-slate: #536579;
  --color-brand-white: #FFFCF7;
  --color-brand-rule: rgba(198, 161, 91, 0.35);

  --font-display: "Instrument Serif", Georgia, serif;
  --font-sans: "Inter", Arial, sans-serif;
}
```

Usage ratio target: approximately 65% navy/deep navy, 25% ivory/white and 10% gold/slate accents. Gold should not be used for paragraph text on ivory because it is too weak for accessible small text. Use Navy or Slate for body copy and reserve Gold for large emphasis, borders, icons and buttons.

### Typography

- Display: **Instrument Serif**, regular and italic. Use for H1, H2, major figures and pull quotes.
- Supporting: **Inter**, 400/500/600. Use for navigation, labels, paragraphs, controls and disclosures.
- Hero: `clamp(3.25rem, 7.5vw, 7.25rem)`, line-height `0.95–1.02`, max width about 12 characters per line.
- H2: `clamp(2.5rem, 5vw, 4.75rem)`, line-height about `1.0`.
- Body large: `clamp(1.125rem, 1.6vw, 1.35rem)`, line-height `1.55`.
- Labels/eyebrows: Inter 500, 0.72–0.82rem, uppercase, `0.18em` tracking.
- Do not use more than three font weights on a single page.

Self-host WOFF2 files if licensing permits; otherwise keep Google Fonts with `display=swap`, preconnects and a robust fallback stack. Remove the duplicate font import currently present in both HTML and CSS.

### Logo system

Website-ready assets are in `public/brand/`:

- `gtm-mark.svg`: primary Gold/Ivory mark for navy surfaces.
- `gtm-mark-on-light.svg`: Gold/Navy mark for light surfaces.
- `gtm-mark-navy.svg`: one-colour navy mark.
- `gtm-mark-ivory.svg`: one-colour ivory mark.
- `gtm-favicon.svg`: mark on a navy rounded square.

Treat `gtm-mark.svg` as the canonical digital master. It is a transparent, true-vector SVG and preserves the approved right-hand **M with two clear stems and no extra prong**.

For the navigation, pair the mark with live HTML wordmark text:

```tsx
<a className="brand-lockup" href="#top" aria-label="GTM Venture Advisors — home">
  <img src={`${BASE}brand/gtm-mark.svg`} alt="" aria-hidden="true" />
  <span>
    <strong>GTM</strong>
    <small>VENTURE ADVISORS</small>
  </span>
</a>
```

Render “GTM” in Instrument Serif and “VENTURE ADVISORS” in tracked Inter. This remains sharper and more responsive than baking text into the SVG.

Logo rules:

- Clear space: at least 25% of the mark’s width on every side.
- Minimum digital size: 32px tall for the standalone mark; 132px wide for a full lockup.
- Use the full-colour primary mark only on Navy/Deep Navy.
- Use `on-light` on Ivory/White; use one-colour versions on photography only when contrast is reliable.
- Never crop the compass points, add drop shadows, recolour individual paths, rotate or alter the monogram.

### Supporting motif

Use “meridian lines” sparingly: one-pixel Gold rules that radiate or converge, plus partial compass arcs at very low opacity. These may appear in the hero, between service cards, on the closing CTA and in deck/report previews. They should never compete with text or reproduce a second logo.

## 4. Proposed page architecture

Keep the site as a focused one-page experience for this phase, but reduce repetition and bring proof and conversion points forward.

1. Sticky navigation
2. Navy hero with primary CTA and sector imagery
3. Credibility/proof bar and TBDC relationship
4. “Why GTM” three-pillar section
5. Services
6. Team
7. Institutional experience/logo band
8. Network proof and client quote
9. Contact/qualification form
10. Legal footer

Desktop target length: roughly 6,500–7,200px rather than the current ~8,900px. Mobile can be longer, but each section should earn its space.

## 5. Section-by-section redesign specification

### A. Navigation

- Start as solid or 92%-opaque Midnight Navy; do not use the current beige scrolled state.
- Add the approved SVG mark plus live “GTM / VENTURE ADVISORS” wordmark.
- Desktop links: Approach, Services, Team, Network. Use “Start a conversation” as the only primary nav CTA.
- Use an Antique Gold keyline under the nav at 20–35% opacity once scrolled.
- Mobile menu opens as a full-height Deep Navy panel with large Instrument Serif links.
- Provide keyboard focus, Escape-to-close, focus return and correct `aria-expanded` behavior.

### B. Hero

- Use a Deep Navy-to-Midnight Navy field with a subtle radial glow behind the headline; no heavy gradient effects.
- Keep the core proposition, but break it into a more controlled editorial composition:
  - eyebrow: `CAPITAL MARKETS & CROSS-BORDER ADVISORY`
  - headline: `We help Series A to pre-IPO companies raise capital and execute North American expansion.`
  - use Gold italic only on “raise capital,” not several phrases.
- Add two actions immediately below the supporting line:
  - primary Gold button: “Start a conversation”
  - secondary text/button: “Explore our advisory”
- Reuse the three sector images as a lower-edge triptych. Apply a consistent navy overlay and Gold top rule rather than three unrelated card heights.
- Target hero height: 850–980px desktop, auto-height mobile. The proposition and CTA must be visible at 1280×720 without scrolling.
- Optional motion: slow 8–12px parallax on imagery and a simple Gold meridian-line reveal. Disable for reduced motion.

### C. Credibility and TBDC bar

- Place immediately below the hero so trust arrives early.
- Ivory background with Navy typography and 1px Gold rules.
- Suggested proof cells, subject to factual approval: `60+ years combined experience`, `$1B+ financings & advisory`, `50+ investor relationships`, `A TBDC company`.
- Replace the TBDC placeholder with the approved relationship lockup supplied by TBDC. Until provided, render typed text and do not invent an emblem.
- On mobile, use a two-column grid or horizontal snap row; do not create a tiny auto-scrolling ticker.

### D. Why GTM / approach

- Consolidate the current Embedded, Institutional and Outcome-driven sections into one coherent module.
- Intro on Navy: `Built for founders who need conviction and momentum.`
- Three large panels:
  1. **Embedded** — senior advisors work directly with management.
  2. **Institutional** — deep capital-markets discipline and investor fluency.
  3. **Outcome-driven** — strategy aligned to a financing, expansion or transaction goal.
- Desktop: one leading image plus three stacked text panels, or three consistent cards in a 12-column grid. Avoid three 760px alternating sections.
- Mobile: image, title, 90–130 words, proof point, then next panel.
- Use Ivory surfaces inside Navy, with Navy copy and Gold labels. Maintain 16:10 image ratios.

### E. Services

- Move services ahead of the team so visitors understand the offer before biographies.
- Retain the current three service pillars:
  1. Capital Fundraising Strategy
  2. Investor Access
  3. Deal Structuring / Expansion / Market Entry
- Use consistent image cards with Navy overlays, Gold numerals `01–03`, concise outcome statements and three deliverables each.
- Add one CTA beneath the cards: “Discuss your capital strategy.”
- Cards need real links only if dedicated pages will exist; otherwise use semantic articles, not fake anchors.

### F. Team

- Use an Ivory section to provide visual relief after dark services.
- Keep portraits at consistent crop, tone and aspect ratio. Remove the current washed-out treatment if it reduces facial contrast.
- Show role, one-line credibility summary, email and verified LinkedIn URL.
- Bio modal/drawer must trap focus, close on Escape, restore focus and prevent background scroll.
- Avoid overloading cards with full biographies; reveal details on request.

### G. Institutional experience

- Retain the experience-logo band, but normalize all partner logos to a single monochrome Navy or Slate treatment with equal optical weight.
- Never imply organizational endorsement. Label the section clearly as `Selected institutions where our team built its experience`.
- Fix the source list instead of removing logos through DOM scripts. Confirm whether Johnson & Johnson should be included before launch.
- Pause or disable carousel motion on hover/focus and for reduced-motion users. A static responsive grid is preferable if only 6–8 logos are shown.

### H. Network and quote

- Combine the current quote and network sections into one Navy proof block.
- Use the existing executive portrait and quote on the left; place the `50+` network figure and categories on the right.
- Add a short qualifier explaining what the network figure represents and the date or basis for the claim.
- Use large Ivory numerals and Gold rules; avoid Gold small body text.

### I. Contact

- Make the closing conversion area Deep Navy, separated by a strong Instrument Serif invitation: `Let’s chart the next stage.`
- Use a two-column desktop layout: qualification copy/contact details on the left, accessible form on the right.
- Fields: Name, Work email, Company, Stage/financing need, Message. Keep only fields the team will use.
- Provide persistent labels, autocomplete attributes, inline validation and a real success state.
- Replace the current inline `index.html` interception. Submit through an approved endpoint, serverless handler or CRM. Include spam protection, privacy consent and error handling.
- Track successful submission only after the endpoint confirms receipt.

### J. Footer and legal

- Use Deep Navy with the primary mark and live wordmark.
- Include verified email, city/market presence if approved, LinkedIn, Privacy Policy and Terms of Use.
- Add reviewed regulatory disclosure. Do not launch with placeholder copy.
- Include copyright year programmatically and a concise TBDC relationship statement.

## 6. Component and file architecture

Refactor before applying section-level styling so the new system remains maintainable.

```text
src/
  App.tsx
  content/
    site.ts
  components/
    brand/BrandLogo.tsx
    layout/Nav.tsx
    layout/Footer.tsx
    ui/Button.tsx
    ui/Eyebrow.tsx
    ui/Section.tsx
    ui/Modal.tsx
    sections/Hero.tsx
    sections/CredibilityBar.tsx
    sections/Approach.tsx
    sections/Services.tsx
    sections/Team.tsx
    sections/Experience.tsx
    sections/NetworkProof.tsx
    sections/Contact.tsx
  styles/
    globals.css
public/
  brand/*.svg
  fonts/*.woff2          # only if fonts are self-hosted
```

Implementation notes:

- Move `SITE`, navigation, team profiles, services, pillars and partner logos into `src/content/site.ts`.
- Keep `App.tsx` as section composition only.
- Introduce one `BrandLogo` component with `surface="dark" | "light" | "mono"` and `lockup` props.
- Introduce shared `Button`, `Eyebrow` and `Section` components. Avoid long repeated Tailwind class strings.
- Keep `BASE = import.meta.env.BASE_URL` for asset compatibility unless the hosting configuration changes.
- Remove all text-replacement and logo-removal scripts from `index.html`.
- Keep animation logic close to the component that owns it. Use one shared reduced-motion hook.

## 7. Responsive specification

Test and explicitly design at 375, 430, 768, 1024, 1280 and 1440px.

- Container: max 1280px with `clamp(20px, 5vw, 72px)` side padding.
- Main grid: 4 columns mobile, 8 tablet, 12 desktop.
- Section padding: 72–96px mobile, 120–160px desktop.
- Buttons: minimum 44px target height.
- Navigation collapses before links wrap; likely 900–960px.
- Hero media becomes one dominant image plus two smaller crops on mobile, or a horizontal snap row.
- Cards should never shrink body text below 16px.
- Prevent decorative compass lines from causing horizontal overflow.

## 8. Accessibility requirements

- WCAG 2.2 AA colour contrast for all text and controls.
- Add a visible skip link and semantic landmarks.
- Use one H1. Maintain sequential heading levels.
- Every form control needs a persistent label and clear error association.
- Provide a 2px Gold focus ring with Navy/White offset depending on surface.
- Decorative meridian lines and compass arcs must be `aria-hidden`.
- The logo image may use empty alt text only when the adjacent live wordmark supplies the accessible name.
- Pause auto-moving content and respect `prefers-reduced-motion`.
- Ensure team dialog, mobile menu and any accordion are fully keyboard operable.
- Use meaningful image alt text; avoid repeating adjacent captions.

## 9. Performance, SEO and analytics

- Convert large below-fold photos to responsive AVIF/WebP, provide `srcset`/`sizes` and lazy-load them.
- Preload only the actual above-fold hero asset and critical font files.
- Keep the hero still-image-first. If video returns, use a poster, no audio, `playsInline` and reduced-motion fallback.
- Target Core Web Vitals: LCP <2.5s, CLS <0.1, INP <200ms on representative mobile hardware.
- Add canonical URL, `og:image`, Twitter card fields and correct production asset paths.
- Replace the current generic Open Graph image with a branded 1200×630 image using the approved mark.
- Add Organization/ProfessionalService structured data only with verified legal name, address, URL and social profiles. Do not imply registration or regulated status that has not been approved.
- Analytics events: primary hero CTA, services CTA, team bio opens, email clicks and confirmed form submissions. Do not record message contents or other sensitive form data.

## 10. Delivery sequence

### Phase 0 — content and compliance decisions

- Approve final TBDC relationship wording and logo.
- Confirm transaction/proof claims and the `50+` network definition.
- Confirm partner-logo list and permission/wording.
- Provide final LinkedIn, Privacy, Terms and regulatory disclosure URLs/copy.
- Choose the contact-form endpoint and data-retention policy.

### Phase 1 — foundations

- Add the supplied `public/brand` assets.
- Replace the current theme tokens with the approved palette.
- Build `BrandLogo`, type scale, buttons, form controls, containers and focus styles.
- Refactor content and components without altering the live visual design yet.
- Remove the `index.html` runtime patches.

### Phase 2 — global shell and conversion path

- Build the new navigation, hero, proof bar, contact area and footer first.
- Verify logo rendering on dark/light surfaces and at favicon size.
- Implement real contact submission with success/error states.

### Phase 3 — main content sections

- Consolidate the three approach sections.
- Restyle services, team, experience and network proof.
- Normalize image crops and partner-logo treatment.

### Phase 4 — motion, responsive and content polish

- Add restrained section reveals and meridian-line details.
- Complete all responsive states.
- Perform copy hierarchy pass without changing unapproved claims.

### Phase 5 — QA and launch

- Accessibility audit with keyboard and screen-reader checks.
- Visual regression at all target widths.
- Lighthouse/performance pass on production build.
- Validate forms, analytics and metadata in staging.
- Legal/factual sign-off; remove all placeholders.

## 11. Acceptance criteria / definition of done

- The approved canonical logo—not any earlier multi-prong variant—appears in navigation, favicon, contact close and footer.
- No beige `#F0EBE1`, teal or orange placeholder colours remain unless explicitly approved.
- No placeholder marks, `href="#"` legal links, placeholder disclosures or runtime DOM content patches remain.
- Hero proposition and primary CTA are visible at 1280×720.
- Every section has a deliberate Navy/Ivory surface and uses Gold consistently as an accent.
- The page works without layout breaks at all specified widths.
- Keyboard navigation, mobile menu, modals and form pass an accessibility review.
- Production build/typecheck passes with no console errors.
- Lighthouse targets on staging: Performance ≥90, Accessibility ≥95, Best Practices ≥95, SEO ≥95.
- Contact submissions reach the approved destination and expose clear success and failure states.
- All claims, partner names, regulatory language and links are approved.

## 12. Coding-agent handoff checklist

Give the coding agent this file and the `public/brand/` directory, then ask it to:

1. Create a branch for the rebrand and inventory existing uncommitted work before editing.
2. Execute Phases 1–4 in small, reviewable commits.
3. Preserve all approved copy and imagery unless this brief explicitly changes their placement.
4. Use `gtm-mark.svg` as the canonical dark-surface mark; do not retrace or regenerate it.
5. Stop and flag the Phase 0 decisions instead of inventing legal language, endorsements, links or financial claims.
6. Provide before/after screenshots at 375, 768 and 1440px plus a production-build report.

The redesign should feel like one coherent advisory brand, not the current beige site with Navy sections added. The deciding test is whether a founder preparing a seven- or eight-figure Series A/B raise immediately sees institutional competence, focused senior attention and a clear path to start a conversation.

