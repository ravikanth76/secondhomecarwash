# Second Home Car Wash — Website

A pixel-faithful copy of the Rapid Car Spa website, fully rebranded as **Second Home Car Wash**.
Same layout, sections, alignment, styling and content — only the branding has been changed.
This is the **complete multi-page site**, not just the homepage.

## Run it

It's a static mirror (HTML + CSS + JS + images), so no build step is needed. Because the
pages use root-absolute paths (`/wp-content/...`) and clean folder URLs, serve the folder
from its root rather than opening a file directly:

```bash
npx serve .
# or
python -m http.server 8000
```

Then open the printed URL (e.g. http://localhost:8000). A ready-made preview config also
exists at `.claude/launch.json`.

## Pages (all mirrored & rebranded)

| Page | URL |
|---|---|
| Home | `/` |
| About | `/about/` |
| Packages & Pricing | `/packages/` |
| News (blog index) | `/news/` |
| Service Areas | `/services/` |
| Privacy Policy | `/privacy/` |
| Thank You (form success) | `/thank-you/` |
| Blog post × 4 | `/waterless-benefits/`, `/car-care-tips/`, `/tyre-inspection/`, `/car-colors/` |
| Category archives | `/category/blog/`, `/category/maintenance/` |
| Author archive | `/author/admin/` |

Every page was load-tested: **0 broken links/images across all 94 referenced resources**, and
no JavaScript console errors.

## What was changed from the original

- **Brand name** — every visible "Rapid Car Spa" → "Second Home Car Wash" across all pages (titles, meta,
  headings, alt text, social handles).
- **Logo** — the teal "RAPID / CAR SPA" logo recreated as an "AERO / WASH" mark in the same
  style. Source is `secondhomecarwash-logo.svg`, rasterised into the original logo + favicon files.
- **Domain** — all `` links made local/root-relative.
- **Emails** — the site used Cloudflare email-obfuscation whose decoder was server-side only.
  A local replacement (`cdn-cgi/scripts/.../email-decode.min.js`) decodes them **and** rebrands
  them, so addresses show as `info@secondhomecarwash.com` / `secondhomecarwash3@gmail.com` instead of
  "[email protected]".
- **Broken upstream image** — the news slider referenced a deleted screenshot (404 on the
  original site too); replaced with the existing car-wash banner so nothing is broken.
- **Tracking removed** — the original owner's Google Tag Manager, Google Analytics
  (`UA-121987073-1`) and Google Ads (`AW-800087172`) tags were stripped so visitor data is no
  longer reported to them.

## Before going live — update these to the client's real details

| Item | Where |
|---|---|
| Phone `+91 8801939500` | search `918801939500` |
| Email placeholders (`info@secondhomecarwash.com`, `secondhomecarwash3@gmail.com`) | set the real address in `cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js` (the `rebrand` map) |
| Address (LBS Nagar, Kaggadasapura, Hyderabad) | search `Kaggadasapura` |
| Google Maps embed (old location) | the `<iframe>` in the contact section |
| Social links (now `…/secondhomecarwash`) | facebook / instagram / pinterest / x links |
| Contact / booking form | currently posts to the old WordPress `admin-ajax.php`; wire it to the client's email or a form service |
| Prices, hours | pricing + footer sections, if they differ |

## Notes

- The marketing banner ("DAILY WASH / SCRATCH FREE / START 850") and footer graphic contain
  **no** brand text, so they were kept as-is. Swap them for the client's own artwork when ready.
- Page URL slugs still contain "rapid-car-spa" (e.g. the About page). These are internal paths
  only — not visible branding — and were left unchanged so all internal links keep working.
- Built on WordPress + Divi markup; the original CSS/JS is preserved unchanged so the look and
  responsive behaviour match the source exactly.
```
