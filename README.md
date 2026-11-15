# MK Men's — static site
Plain HTML/CSS/JS, no build step.

## Change prices / products
Edit **js/products.js** only. Each product has `price` (₹ number; `null` shows "Price on request"),
`mrp` (optional strike-through), `sizes`, `colors`, `images`, `isNew`.
WhatsApp number is `MK_CONFIG.whatsapp` at the top of the same file.

## Add a product
Put `name.jpg` (~1200px) and `name-sm.jpg` (~600px) in assets/products/ and add an entry to MK_PRODUCTS.
Product links: `index.html#p=<product-id>`.
