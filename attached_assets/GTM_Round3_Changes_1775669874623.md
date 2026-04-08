# GTM Venture Advisors — Round 3 Changes

Apply the following changes to the current site.

---

### 1. Add "Where Our Team Has Worked" Logo Bar

Add a new horizontal logo bar section showing career affiliation logos. This should appear **between the Team section and the Services accordion** (or at the bottom of the Team section, after the TBDC Support Team card).

**Design:**
- Light background (surface/off-white), consistent with the Team section
- Small eyebrow label above: "WHERE OUR TEAM HAS WORKED"
- Display logos in a single horizontal row, centered, evenly spaced
- Logos should be rendered in **grayscale / muted opacity** (e.g., `opacity-40 grayscale hover:opacity-70 hover:grayscale-0 transition-all`) to keep them subtle and not overpower the page
- On mobile: wrap to 2 rows of 3–4 logos, or use a horizontal scroll

**Logos to include (7 total):**
1. PwC
2. HSBC
3. National Bank Financial
4. Stifel
5. Johnson & Johnson
6. ATB Capital Markets
7. Desjardins

For now, use clean text-based placeholders styled as logo blocks (white rectangles with the company name in a neutral font, gray border) since we don't have SVG logo files yet. Structure the code so logos can be easily swapped in later — use an array of objects with `name` and `logoUrl` fields, where `logoUrl` is initially null and falls back to a text placeholder.

---

### 2. Add Stat to Network & Reach Section

In the Network & Reach section, add a prominent stat callout above or beside the existing tag pills:

**"50+ Institutional Investors in Our Active Network"**

Display this as a large number treatment, similar to the hero trust strip:
- "50+" in large bold display font (gold color)
- "Institutional Investors in Our Active Network" as a subtitle beneath it in smaller text
- Center it above the existing tag cloud of capital source categories

---

### 3. Add Individual Email Addresses to Team Cards

Add an email address to each of the three principal team cards. Display it below the bio text and above the credential badges.

**Emails:**
- Nitin Kaushal: nitin@gtmventureadvisors.com
- Ezra Chang: ezra@gtmventureadvisors.com
- David Kideckel: david@gtmventureadvisors.com

**Design:**
- Use a small mailto: link styled with the teal color
- Include a small mail icon (Lucide `Mail`, 14px) before the email text
- Font size: `text-sm`
- Add a subtle hover state (underline or lighter teal)

**Keep the main site CTA** ("Book a Strategic Call") pointing to `mailto:info@gtmventureadvisors.com` — only the team cards get individual addresses.

**Important — bot scraping protection:** Since Ezra raised scraping concerns, render the email addresses using a light obfuscation technique. Instead of putting the raw email in the HTML, construct the `mailto:` href in JavaScript on click:

```jsx
onClick={() => window.location.href = `mailto:${name}@gtmventureadvisors.com`}
```

Display the visible text as the full email, but don't put it in an `<a href="mailto:...">` tag that bots can easily crawl. Use a `<button>` styled as a link instead.

---

### Summary

| # | Section | Change |
|---|---------|--------|
| 1 | New section (after Team) | "Where Our Team Has Worked" logo bar — 7 institutions, grayscale, placeholder-ready |
| 2 | Network & Reach | Add "50+ Institutional Investors" stat callout |
| 3 | Team cards | Add individual emails with bot-scraping protection |
