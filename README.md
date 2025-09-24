# Awase Agency8™ Static Shop

A lightweight, data‑driven e‑commerce front‑end ready for Netlify.

## Quick Start

- Put your images/videos into `assets/`
- Edit products in `data/products.json` or `js/data.js`
- Open `index.html` with a static server, or deploy to Netlify

## Add / Update Products (No code search)

Preferred: edit `data/products.json` using this shape:

```json
{
  "id": "unique-id",
  "name": "Product Name",
  "priceGBP": 25.00,
  "short": "Short description",
  "images": ["/assets/products/example/1.jpg", "/assets/products/example/2.jpg"],
  "video": "/assets/products/example/demo.mp4",
  "details": "Long description",
  "tags": ["gift", "uk"]
}
```

This site loads `/data/products.json` via fetch with a built‑in fallback to the local `js/data.js` array if the JSON is missing.

## Netlify Deployment

- Push this folder to GitHub
- On Netlify: New Site from Git → select repo
- Build command: none
- Publish directory: `/`

## Structure

- `index.html` — home, hero, grid, navbar, cart badge
- `product.html` — details page with slider (4–5 images) + video
- `css/styles.css` — styling, animations, responsive
- `js/data.js` — async data loader (JSON first, fallback to array)
- `data/products.json` — DTO for easy updates
- `assets/` — images and videos

MIT