// src/data/site.ts
// Central data store — replace with a CMS/API fetch in production

export const SITE = {
  name:     "The Artisan's Grain",
  tagline:  'Handcrafted Bow Ties',
  desc:     "Handcrafted wooden epoxy bow ties made one at a time in Cleburne, Texas. Every piece is numbered, signed, and entirely unique.",
  url:      'https://theartisansgrain.com',
  location: 'Cleburne, Texas',
  email:    'hello@theartisansgrain.com',
  instagram:'https://instagram.com/theartisansgrain',
  facebook: 'https://facebook.com/theartisansgrain',
  etsy:     'https://etsy.com/shop/theartisansgrain',
  year:     new Date().getFullYear(),
};

export type Product = {
  id:         string;
  pieceNum:   string;
  name:       string;
  resin:      string;
  price:      number;
  inStock:    boolean;
  isNew:      boolean;
  isLimited:  boolean;
  slug:       string;
  shortDesc:  string;
  desc:       string;
  resinGrad:  string; // CSS gradient for swatch
};

export const PRODUCTS: Product[] = [
  {
    id: '001', pieceNum: '047', name: 'Midnight Tide',
    resin: 'Navy & Cobalt Resin', price: 89,
    inStock: true, isNew: true, isLimited: false,
    slug: 'midnight-tide',
    shortDesc: 'Two-layer navy pour — deep cobalt on midnight blue. The cedar grain pulls the cooler tones into something that reads almost alive.',
    desc: 'Two layers of navy epoxy, deep cobalt on top of midnight blue, poured in sequence so the colours bleed naturally at the seam. The western red cedar grain runs through both layers, pulling the cooler tones into something warm and alive. Signed and numbered on the back.',
    resinGrad: 'linear-gradient(135deg,#1a3a5c,#2e6da4)',
  },
  {
    id: '002', pieceNum: '048', name: 'Nebula Drift',
    resin: 'Galaxy Resin', price: 97,
    inStock: true, isNew: true, isLimited: false,
    slug: 'nebula-drift',
    shortDesc: 'Three-colour galaxy pour — deep violet fading into burnt crimson, finishing in embers of amber orange.',
    desc: 'Three-colour galaxy pour mixed and poured in a single session so the layers bled naturally into each other. Deep violet fading into burnt crimson, finishing in embers of amber orange. Gold mica flakes catch light throughout. The cedar grain runs through all three colours in a way that cannot happen again.',
    resinGrad: 'linear-gradient(135deg,#4a0e8f,#c0392b,#e67e22)',
  },
  {
    id: '003', pieceNum: '043', name: 'Forest Floor',
    resin: 'Forest Green Resin', price: 85,
    inStock: true, isNew: false, isLimited: false,
    slug: 'forest-floor',
    shortDesc: 'Three shades of sage and forest green layered in sequence. Earthy, grounded, and somehow still elegant.',
    desc: 'Three shades of forest green — dark pine, mid sage, and a brighter leaf tone — layered in sequence and poured into hand-routed channels in the cedar. The result is deep and earthy, reading almost like a cross-section of the forest floor itself.',
    resinGrad: 'linear-gradient(135deg,#1a6b3a,#27ae60)',
  },
  {
    id: '004', pieceNum: '041', name: 'Harvest Gold',
    resin: 'Gold Mica Resin', price: 92,
    inStock: true, isNew: false, isLimited: false,
    slug: 'harvest-gold',
    shortDesc: 'Gold mica resin with a shimmer that catches light differently at every angle. Warm, bold, and genuinely striking.',
    desc: 'Deep gold mica resin poured into the cedar channels. The mica particles align differently throughout the pour, so the piece catches light at different angles — sometimes a flat amber, sometimes a full metallic shine. Warm against the cedar grain.',
    resinGrad: 'linear-gradient(135deg,#b8860b,#f1c40f)',
  },
  {
    id: '005', pieceNum: '039', name: 'Ember Deep',
    resin: 'Crimson Resin', price: 85,
    inStock: false, isNew: false, isLimited: false,
    slug: 'ember-deep',
    shortDesc: 'Deep crimson resin, almost burgundy in the cedar. Rich and confident.',
    desc: 'A two-tone crimson pour — dark blood red at the base fading to a warmer scarlet at the surface. In the cedar, the colour reads almost burgundy in low light and a true deep red in bright light.',
    resinGrad: 'linear-gradient(135deg,#8b0000,#c0392b)',
  },
  {
    id: '006', pieceNum: '044', name: 'Slate & Storm',
    resin: 'Slate Blue Resin', price: 87,
    inStock: true, isNew: false, isLimited: false,
    slug: 'slate-storm',
    shortDesc: 'Three shades of slate and storm grey-blue. Understated power.',
    desc: 'Three shades of slate blue, from near-navy to a lighter steel grey, layered and poured to create a piece that reads quietly confident. The cedar grain gives the cool tones an unexpected warmth.',
    resinGrad: 'linear-gradient(135deg,#2c3e50,#4a6fa5)',
  },
  {
    id: '007', pieceNum: '046', name: 'Champagne Toast',
    resin: 'Champagne Mica Resin', price: 94,
    inStock: true, isNew: true, isLimited: true,
    slug: 'champagne-toast',
    shortDesc: 'Pale gold mica with a soft shimmer. Understated, warm, and genuinely striking against a dark suit.',
    desc: 'Pale champagne mica resin — barely gold, more warm cream with a fine metallic shimmer. The mica catches light subtly, never flashy, always refined. An ideal complement to a navy or charcoal suit.',
    resinGrad: 'linear-gradient(135deg,#e8d5b7,#d4af7a)',
  },
  {
    id: '008', pieceNum: '045', name: 'Rose & Cedar',
    resin: 'Rose Resin', price: 88,
    inStock: true, isNew: true, isLimited: false,
    slug: 'rose-cedar',
    shortDesc: 'Deep rose fading to warm blush. Striking against the cedar grain.',
    desc: 'Deep rose fading to a warm blush, poured in two passes so the transition is gradual and natural. In the cedar grain, the pink reads almost burgundy in shadow and true rose in direct light.',
    resinGrad: 'linear-gradient(135deg,#8b1a4a,#c0527a)',
  },
  {
    id: '009', pieceNum: '042', name: 'Onyx & Cedar',
    resin: 'Onyx Black Resin', price: 89,
    inStock: true, isNew: false, isLimited: false,
    slug: 'onyx-cedar',
    shortDesc: 'Pure onyx black resin. The cedar grain reads through the darkness like a negative image.',
    desc: 'Pure onyx black resin, slightly satin rather than gloss, poured into the cedar channels. The cedar grain reads through the darkness like a negative image — warm brown lines against the black. Dramatic without trying to be.',
    resinGrad: 'linear-gradient(135deg,#1c1c1c,#3a3a3a)',
  },
];

export type Testimonial = {
  text:   string;
  author: string;
  stars:  number;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    text:   "Wore the Tidewater to my daughter's wedding. Strangers stopped me all night to ask where I got it. Unreal craftsmanship.",
    author: 'R. Calloway, Dallas TX',
    stars:  5,
  },
  {
    text:   "Ordered a custom piece with our state colours. The communication was personal, and the result was even better than the photo.",
    author: 'M. Fenstermacher, Austin TX',
    stars:  5,
  },
  {
    text:   "I've collected wooden accessories for years. This is the finest piece I own. The resin pours look like liquid glass.",
    author: 'T. Ashworth, Nashville TN',
    stars:  5,
  },
];

export const NAV_LINKS = [
  { label: 'Shop',          href: '/shop/' },
  { label: 'Our Craft',     href: '/our-craft/' },
  { label: 'Custom Orders', href: '/custom-orders/' },
  { label: 'About',         href: '/about/' },
];

export const FOOTER_SHOP = [
  { label: 'All Bow Ties',   href: '/shop/' },
  { label: 'New Arrivals',   href: '/new-arrivals/' },
  { label: 'Custom Orders',  href: '/custom-orders/' },
  { label: 'Gift Cards',     href: '/gift-cards/' },
];

export const FOOTER_INFO = [
  { label: 'Our Story',         href: '/about/' },
  { label: 'The Process',       href: '/our-craft/' },
  { label: 'Shipping & Returns',href: '/shipping-returns/' },
  { label: 'Contact',           href: '/contact/' },
];
