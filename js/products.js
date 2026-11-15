/* =====================================================================
   MK MEN'S — PRODUCT & PRICE LIST  (the only file you need to edit)
   ---------------------------------------------------------------------
   • price  : number in ₹ (e.g. 1499). Leave as null → shows "Price on request".
   • mrp    : optional original price for a strike-through (e.g. 1999) or null.
   • sizes  : edit per product if stock differs.
   • colors : colour options shown in the product view (optional).
   • images : files in assets/products/ (a "-sm" copy is used for cards).
   • isNew  : true → appears in "New arrivals".
   ===================================================================== */
window.MK_CONFIG = {
  brand: "MK Men's",
  whatsapp: '918088297074',      // WhatsApp number with country code, no "+"
  phoneDisplay: '+91 80882 97074',
  currency: '₹'
};

const TOP = ['S', 'M', 'L', 'XL', 'XXL'];
const WAIST = ['28', '30', '32', '34', '36'];

window.MK_CATEGORIES = [
  { id: 'shirts',      label: 'Shirts' },
  { id: 'tees',        label: 'Oversized Tees' },
  { id: 'jeans',       label: 'Jeans' },
  { id: 'trousers',    label: 'Trousers' },
  { id: 'track-pants', label: 'Track Pants' }
];

window.MK_PRODUCTS = [
  /* ---------------- SHIRTS ---------------- */
  { id: 'signature-script-gingham', name: 'Signature Script Gingham Shirt', category: 'shirts', price: 499, mrp: null, isNew: true,
    tagline: 'Mini-check cotton with a bold script across the back.',
    description: 'A crisp mini-gingham button-down with a tiny chest monogram and a sweeping navy script across the back and sleeve. Relaxed through the body, sharp at the collar.',
    details: ['Cotton-blend mini gingham', 'Button-down collar', 'Large back & sleeve script print', 'Relaxed fit'],
    sizes: TOP, colors: ['Sage', 'Stone'],
    images: ['shirt-gingham-front', 'shirt-gingham-back', 'shirt-gingham-duo-back', 'shirt-gingham-duo-front'] },

  { id: 'blossom-stitch-oxford', name: 'Blossom Stitch Oxford', category: 'shirts', price: 549, mrp: null, isNew: true,
    tagline: 'Fine stripes scattered with tiny embroidered blooms.',
    description: 'Soft striped oxford shirting dotted with delicate thread-embroidered flowers. Easy for a weekday, special enough for a wedding brunch.',
    details: ['Cotton-blend fine stripe', 'Floral thread embroidery', 'Full sleeves, curved hem', 'Regular fit'],
    sizes: TOP, colors: ['Blush Pink', 'Sky Blue'],
    images: ['shirt-blossom-pink-blue', 'shirt-blossom-pink-front', 'shirt-blossom-pink-back'] },

  { id: 'midnight-bloom-hem-shirt', name: 'Midnight Bloom Hem Shirt', category: 'shirts', price: 499, mrp: null, isNew: true,
    tagline: 'Deep tones rising into a white botanical border.',
    description: 'A rich, fluid shirt finished with a garden of white blooms climbing up from the hem. Tuck it in for evenings, wear it loose for everything else.',
    details: ['Soft drape fabric with a subtle sheen', 'Placed botanical hem print', 'Full sleeves', 'Regular fit'],
    sizes: TOP, colors: ['Maroon', 'Black', 'Bottle Green'],
    images: ['shirt-bloom-hem-maroon', 'shirt-bloom-hem-black-green'] },

  { id: 'inkline-floral-shirt', name: 'Inkline Floral Shirt', category: 'shirts', price: 499, mrp: null,
    tagline: 'Bold white line-art flowers on deep espresso.',
    description: 'Hand-drawn flowers in crisp white outline across a dark brown base. A statement shirt that still feels effortless.',
    details: ['All-over line-art floral print', 'Classic collar', 'Full sleeves', 'Regular fit'],
    sizes: TOP, colors: ['Espresso'],
    images: ['shirt-inkline-floral-brown'] },

  { id: 'earthen-linen-button-down', name: 'Earthen Linen Button-Down', category: 'shirts', price: 549, mrp: null,
    tagline: 'Linen-look texture in three grounded shades.',
    description: 'A breathable linen-look button-down with a soft slub texture, button-down collar and twin flap pockets. Built for Indian summers and long days.',
    details: ['Linen-look textured weave', 'Button-down collar, twin flap pockets', 'Full sleeves — roll them up', 'Relaxed fit'],
    sizes: TOP, colors: ['Cocoa', 'Taupe', 'Ash Grey'],
    images: ['shirt-linen-cocoa', 'shirt-linen-ash-cocoa', 'shirt-linen-taupe'] },

  { id: 'palm-boulevard-pinstripe', name: 'Palm Boulevard Pinstripe', category: 'shirts', price: 549, mrp: null, isNew: true,
    tagline: 'Midnight pinstripe with a palm-lined city on its back.',
    description: 'Clean black pinstripe up front, a white palm-tree city script across the back. Sharp from one side, loud from the other.',
    details: ['Pinstripe shirting', 'Large back graphic print', 'Twin flap pockets', 'Relaxed fit'],
    sizes: TOP, colors: ['Black'],
    images: ['shirt-palm-pinstripe-back', 'shirt-palm-pinstripe-front'] },

  { id: 'falling-leaf-shirt', name: 'Falling Leaf Shirt', category: 'shirts', price: 549, mrp: null,
    tagline: 'Jet black, traced with white leaf embroidery.',
    description: 'Minimal white line-embroidered leaves drift across a jet-black shirt. Quiet detail that rewards a second look.',
    details: ['Line-embroidered leaf motifs', 'Classic collar', 'Full sleeves', 'Regular fit'],
    sizes: TOP, colors: ['Jet Black'],
    images: ['shirt-leaf-black'] },

  { id: 'tide-shell-shirt', name: 'Tide Shell Shirt', category: 'shirts', price: 549, mrp: null,
    tagline: 'Dark olive-charcoal with sketched white shells.',
    description: 'Coastal mood, city cut. Hand-sketched motifs scattered over a dark base — the shirt for every holiday and every Friday.',
    details: ['All-over sketch print', 'Classic collar', 'Full sleeves', 'Regular fit'],
    sizes: TOP, colors: ['Charcoal'],
    images: ['shirt-shell-charcoal-v2'] },

  /* ---------------- OVERSIZED TEES ---------------- */
  { id: 'phantom-smoke-tee', name: 'Phantom Smoke Tee', category: 'tees', price: 349, mrp: null, isNew: true,
    tagline: 'Oversized black tee wrapped in white smoke.',
    description: 'Heavy oversized tee with a swirling smoke-and-claw print that wraps around the body. Drop shoulders, boxy fit, zero effort.',
    details: ['Heavyweight cotton jersey', 'Oversized drop-shoulder fit', 'Wrap-around smoke print', 'Ribbed crew neck'],
    sizes: TOP, colors: ['Black'],
    images: ['tee-smoke-wings-front', 'tee-smoke-wings-back'] },

  { id: 'gothic-wing-tee', name: 'Gothic Wing Tee', category: 'tees', price: 349, mrp: null, isNew: true,
    tagline: 'Clean white front. Blackened wings down the back.',
    description: 'A minimal chest graphic up front and a full gothic wing-and-spine print across the back. Oversized and boxy.',
    details: ['Heavyweight cotton jersey', 'Oversized drop-shoulder fit', 'Small chest print, full back print', 'Ribbed crew neck'],
    sizes: TOP, colors: ['White'],
    images: ['tee-smoke-wings-back', 'tee-smoke-wings-front'] },

  { id: 'racing-raglan-tee', name: 'Racing Raglan Tee', category: 'tees', price: 349, mrp: null,
    tagline: 'Cream body, black raglan sleeves, red supercar on the back.',
    description: 'A retro motorsport tee: contrast black raglan sleeves, a bold red chest badge and a full-colour classic racing-car graphic on the back.',
    details: ['Cotton jersey', 'Contrast raglan sleeves', 'Front badge, full back graphic', 'Oversized fit'],
    sizes: TOP, colors: ['Cream / Black'],
    images: ['tee-raglan-front', 'tee-raglan-back'] },

  { id: 'red-box-comic-tee', name: 'Red Box Comic Tee', category: 'tees', price: 349, mrp: null,
    tagline: 'Punchy red box logo up front, comic hero on the back.',
    description: 'Cream oversized tee with a red box graphic on the chest and a full comic-style superhero artwork across the back.',
    details: ['Heavyweight cotton jersey', 'Oversized drop-shoulder fit', 'Front box print, full back graphic', 'Ribbed crew neck'],
    sizes: TOP, colors: ['Cream'],
    images: ['tee-redbox-back', 'tee-redbox-front'] },

  { id: 'rottweiler-street-tee', name: 'Rottweiler Street Tee', category: 'tees', price: 349, mrp: null, isNew: true,
    tagline: '"Respect +99" up front. Street legend on the back.',
    description: 'A nostalgic street tee: a clean "Respect +99" type lock-up on the chest and a full-colour street character with his rottweiler across the back.',
    details: ['Heavyweight cotton jersey', 'Oversized drop-shoulder fit', 'Front type print, full back graphic', 'Ribbed crew neck'],
    sizes: TOP, colors: ['Cream'],
    images: ['tee-rottweiler-back', 'tee-rottweiler-front', 'tee-rottweiler-back-2'] },

  /* ---------------- JEANS ---------------- */
  { id: 'midnight-fade-jeans', name: 'Midnight Fade Jeans', category: 'jeans', price: 799, mrp: null, isNew: true,
    tagline: 'Dark denim with a smoky hand-faded front.',
    description: 'Dark-wash denim with faded thighs, whiskering and a tapered leg. The pair you will reach for every single day.',
    details: ['Stretch cotton denim', 'Faded wash with whiskering', 'Five-pocket styling', 'Slim-tapered fit'],
    sizes: WAIST, colors: ['Midnight Black', 'Smoke Black'],
    images: ['jeans-midnight-fade'] },

  { id: 'wide-leg-denim', name: 'Easy Wide-Leg Denim', category: 'jeans', price: 799, mrp: null,
    tagline: 'Relaxed, straight and wide — the new silhouette.',
    description: 'A relaxed wide-fit jean with a clean wash and a generous straight leg. Pairs perfectly with oversized tees and boxy shirts.',
    details: ['Cotton denim', 'Clean wash', 'Five-pocket styling', 'Wide / baggy fit'],
    sizes: WAIST, colors: ['Ice Blue', 'Washed Black'],
    images: ['jeans-wide-leg-blue-black'] },

  /* ---------------- TROUSERS ---------------- */
  { id: 'pleated-baggy-trouser', name: 'Pleated Baggy Trouser', category: 'trousers', price: 649, mrp: null, isNew: true,
    tagline: 'Front pleats, fluid drape, a wide easy leg.',
    description: 'A modern pleated trouser with a high rise and a baggy, falling leg. Dress it up with a shirt or down with a tee.',
    details: ['Soft suiting fabric', 'Front pleats, side pockets', 'High rise', 'Baggy fit'],
    sizes: WAIST, colors: ['Black', 'Cream'],
    images: ['trouser-pleated-black-cream'] },

  /* ---------------- TRACK PANTS ---------------- */
  { id: 'serpent-track-pants', name: 'Serpent Track Pants', category: 'track-pants', price: 399, mrp: null, isNew: true,
    tagline: 'Coiled white serpents down both legs.',
    description: 'Relaxed black track pants with a striking white serpent print coiling down the legs. Elastic waist, drawcord and a wide straight leg.',
    details: ['Soft knit fabric', 'Elastic waist with drawcord', 'Placed serpent print', 'Wide straight fit'],
    sizes: TOP, colors: ['Black / White'],
    images: ['track-serpent-tribal'] },

  { id: 'tribal-glyph-track-pants', name: 'Tribal Glyph Track Pants', category: 'track-pants', price: 399, mrp: null,
    tagline: 'Sharp tribal glyphs and a contrast white drawstring.',
    description: 'Black wide-leg track pants with a crisp white tribal print and a contrast white drawstring. Street-ready comfort.',
    details: ['Soft knit fabric', 'Elastic waist, white drawstring', 'Tribal print on both legs', 'Wide straight fit'],
    sizes: TOP, colors: ['Black'],
    images: ['track-tribal-drawstring', 'track-serpent-tribal'] },

  { id: 'web-flame-track-pants', name: 'Web & Flame Track Pants', category: 'track-pants', price: 399, mrp: null,
    tagline: 'Spider-web gothic type above, flames below.',
    description: 'Mesh-look black track pants loaded with gothic lettering, spider-webs and a burst of white flames at the hem.',
    details: ['Breathable mesh-look knit', 'Elastic waist with drawcord', 'Gothic & flame graphics', 'Wide straight fit'],
    sizes: TOP, colors: ['Black'],
    images: ['track-web-flame'] },

  { id: 'azure-dragon-track-pants', name: 'Azure Dragon Track Pants', category: 'track-pants', price: 399, mrp: null, isNew: true,
    tagline: 'An icy-blue dragon — or an amber dagger. Your pick.',
    description: 'Two moods, one cut: a blue dragon print or a fiery amber thorned dagger, both on black mesh-look track pants.',
    details: ['Breathable mesh-look knit', 'Elastic waist with drawcord', 'Large placed graphic', 'Wide straight fit'],
    sizes: TOP, colors: ['Blue Dragon', 'Amber Dagger'],
    images: ['track-dragon-dagger-1', 'track-dragon-dagger-2'] }
];
