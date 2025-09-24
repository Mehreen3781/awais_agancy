export const products = [
  {
    id: "p1001",
    name: "Deluxe Gift Hamper",
    priceGBP: 49.99,
    short: "Premium snacks and treats in a keepsake box.",
    images: [
      "/assets/products/hamper/1.jpg",
      "/assets/products/hamper/2.jpg",
      "/assets/products/hamper/3.jpg",
      "/assets/products/hamper/4.jpg",
      "/assets/products/hamper/5.jpg"
    ],
    video: "/assets/products/hamper/demo.mp4",
    details: "A curated selection of artisan snacks, chocolates, and beverages, beautifully packed for gifting.",
    tags: ["gift", "uk", "popular"]
  },
  {
    id: "p1002",
    name: "UK Tea Collection",
    priceGBP: 24.50,
    short: "Fine British teas with a porcelain cup.",
    images: [
      "/assets/products/tea/1.jpg",
      "/assets/products/tea/2.jpg",
      "/assets/products/tea/3.jpg",
      "/assets/products/tea/4.jpg"
    ],
    video: "/assets/products/tea/demo.mp4",
    details: "Explore classic blends from the UK with tasting notes and brewing guide.",
    tags: ["uk", "tea"]
  },
  {
    id: "p1003",
    name: "Aroma Candle Set",
    priceGBP: 18.00,
    short: "Scented candles for calm evenings.",
    images: [
      "/assets/products/candle/1.jpg",
      "/assets/products/candle/2.jpg",
      "/assets/products/candle/3.jpg",
      "/assets/products/candle/4.jpg"
    ],
    video: "/assets/products/candle/demo.mp4",
    details: "Long-lasting soy wax candles with essential oils.",
    tags: ["home", "relax"]
  },
  {
    id: "p1004",
    name: "Luxury Chocolate Box",
    priceGBP: 29.95,
    short: "Handcrafted truffles and pralines.",
    images: [
      "/assets/products/choco/1.jpg",
      "/assets/products/choco/2.jpg",
      "/assets/products/choco/3.jpg",
      "/assets/products/choco/4.jpg"
    ],
    video: "/assets/products/choco/demo.mp4",
    details: "Single-origin cocoa with unique flavor profiles.",
    tags: ["gift", "chocolate"]
  }
];

// Async data loader with JSON fallback
export async function getProducts() {
  try {
    const res = await fetch('/data/products.json', { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json) && json.length) return json;
    }
  } catch (e) {
    // ignore and fall back
  }
  return products;
}

