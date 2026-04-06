# Artisan's Grain — Astro Site

Static site built with [Astro](https://astro.build) for **The Artisan's Grain** — handcrafted wooden epoxy bow ties, Cleburne, Texas.

---

## Quick Start

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # output → dist/
npm run preview    # preview the built site
```

**Node.js 18+** required.

---

## Project Structure

```
artisans-grain-astro/
├── public/
│   ├── images/
│   │   └── logo.svg            # Replace with actual Logo_TAG.png
│   ├── scripts/
│   │   └── theme.js            # Compiled client-side JS (nav, FAQ, forms)
│   └── styles/
│       ├── global.css          # 90% shared styles — design tokens + all components
│       └── pages/
│           └── shop.css        # 10% per-page CSS (shop sidebar, policy layout)
│
├── src/
│   ├── components/
│   │   ├── Hero.astro          # Reusable page hero with wood-grain SVG
│   │   ├── BannerStrip.astro   # Amber CTA banner strip
│   │   ├── ProductCard.astro   # Product card (used on shop, home, new arrivals)
│   │   └── FaqAccordion.astro  # Accessible FAQ accordion
│   │
│   ├── data/
│   │   └── site.ts             # SITE config, PRODUCTS[], TESTIMONIALS[], nav links
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro    # Root layout: <head>, sticky nav, footer
│   │
│   ├── pages/
│   │   ├── index.astro         # Home
│   │   ├── about.astro         # About / Our Story
│   │   ├── our-craft.astro     # Our Craft (cedar, laser, handcraft process)
│   │   ├── custom-orders.astro # Custom Orders + commission form
│   │   ├── new-arrivals.astro  # New Arrivals + drop history + waitlist
│   │   ├── gift-cards.astro    # Gift Cards + interactive card preview
│   │   ├── contact.astro       # Contact + hours + message form
│   │   ├── shipping-returns.astro # Shipping & Returns policy
│   │   ├── shop/
│   │   │   ├── index.astro     # Shop — All Bow Ties (filtered grid + sidebar)
│   │   │   └── [slug].astro    # Individual product page (dynamic route)
│   │   └── 404.astro           # Not found
│   │
│   ├── scripts/
│   │   └── theme.ts            # TypeScript source for theme.js
│   │
│   └── styles/
│       ├── global.css          # Source of truth for shared CSS
│       └── pages/
│           └── shop.css        # Source of truth for shop/policy CSS
│
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## The 90/10 CSS Architecture

Same principle as the WordPress theme:

- **`public/styles/global.css`** (~120 rules) — design tokens, typography, nav, hero, cards, buttons, forms, footer, product cards, FAQ, banners, tables, pills, swatches. Does 90% of the visual work on every page.
- **`public/styles/pages/shop.css`** — the 10%: shop sidebar, product grid, filter bar, policy sidebar, contact layout. Imported only on relevant pages via `<link slot="head">`.

---

## Adding / Editing Products

All product data lives in `src/data/site.ts`. Each product:

```ts
{
  id:         '001',
  pieceNum:   '047',           // shown as "Piece No. 047"
  name:       'Midnight Tide',
  resin:      'Navy & Cobalt Resin',
  price:      89,
  inStock:    true,
  isNew:      true,
  isLimited:  false,
  slug:       'midnight-tide', // URL: /shop/midnight-tide/
  shortDesc:  '...',
  desc:       '...',
  resinGrad:  'linear-gradient(135deg,#1a3a5c,#2e6da4)', // swatch + SVG colour
}
```

Adding a new product automatically:
- Adds it to the shop grid (`/shop/`)
- Generates a product detail page (`/shop/[slug]/`)
- Shows it on New Arrivals (if `isNew: true`)
- Shows it on the homepage featured section

---

## Adding Your Logo

Replace `public/images/logo.svg` with your actual `Logo_TAG.png`:

```bash
cp /path/to/Logo_TAG.png public/images/logo.png
```

Then update `src/layouts/BaseLayout.astro` — change all `/images/logo.svg` references to `/images/logo.png`.

---

## Connecting a Backend / CMS

The site is currently fully static with data from `src/data/site.ts`. To connect a real backend:

### Option A — Astro Content Collections
Move products to `src/content/products/*.md` or `.json` and use `getCollection('products')`.

### Option B — API fetch at build time
In `src/pages/shop/index.astro`:
```ts
const { products } = await fetch('https://your-api.com/products').then(r => r.json());
```

### Option C — Snipcart / Shopify Buy Button
Add Snipcart or Shopify's JS snippet to `BaseLayout.astro` and replace the "Add to Cart" buttons.

---

## Forms

Forms currently use a simulated success state (800ms delay then button confirms). To wire them up:

**Contact form** (`src/pages/contact.astro`) → POST to a serverless function:
```ts
// Example: Netlify / Vercel serverless function
const res = await fetch('/api/contact', {
  method: 'POST',
  body: new FormData(contactForm),
});
```

**Waitlist** (`src/pages/new-arrivals.astro`) → POST to Mailchimp/Klaviyo API endpoint.

---

## Deployment

### Netlify
```bash
npm run build
# Deploy dist/ to Netlify
# Or: connect GitHub repo → build command: npm run build → publish dir: dist
```

### Vercel
```bash
npx vercel
# Astro is auto-detected
```

### GitHub Pages
```js
// astro.config.mjs
export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/your-repo-name',
});
```

---

## Site Config

Edit `src/data/site.ts` to update:
- Site name, tagline, description
- Contact email
- Social media URLs
- Navigation links
- Footer links
- Testimonials

---

## License

MIT
