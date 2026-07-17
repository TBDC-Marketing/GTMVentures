# GTM Venture Advisors logo assets

These SVGs are derived from the approved canonical mark in `branding-options/meridian-brand-kit-v2/canonical-logo.png`. They are true vector paths with transparent backgrounds; no raster image is embedded.

## Files

- `gtm-mark.svg` — primary two-colour mark for Midnight Navy backgrounds.
- `gtm-mark-on-light.svg` — Antique Gold compass with Midnight Navy monogram for light backgrounds.
- `gtm-mark-navy.svg` — one-colour Midnight Navy mark.
- `gtm-mark-ivory.svg` — one-colour Warm Ivory mark for dark or photographic backgrounds.
- `gtm-favicon.svg` — primary mark on a rounded Midnight Navy square.
- `../favicon.svg` — website favicon copy of `gtm-favicon.svg`.

## Canonical colours

- Midnight Navy: `#07182D`
- Antique Gold: `#C6A15B`
- Warm Ivory: `#F6F1E7`

## Website usage

Use the SVG files as external images rather than inlining and editing their paths:

```tsx
<img
  src={`${import.meta.env.BASE_URL}brand/gtm-mark.svg`}
  alt="GTM Venture Advisors"
  width={56}
  height={64}
/>
```

Pair the mark with live HTML text for the wordmark so Instrument Serif and Inter remain crisp and accessible at every responsive size. Do not redraw, skew, crop, add strokes, or alter the internal monogram.

