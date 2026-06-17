/**
 * Boutique café beverage catalog — Espresso pods (Cafés Richard) & teas (Comptoirs Richard).
 * Loaded in the static site via <script>; also consumable from Next.js via require/import.
 */

/** @typedef {'espresso' | 'tea'} BeverageCategory */

/**
 * @typedef {Readonly<{
 *   id: string;
 *   category: BeverageCategory;
 *   brand: string;
 *   name: string;
 *   notes: string;
 *   intensity?: number;
 *   number?: number;
 *   organic?: boolean;
 * }>} BeverageMenuItem
 */

/** @type {readonly BeverageMenuItem[]} */
const BEVERAGE_MENU_ITEMS = Object.freeze([
  {
    id: 'decafeine',
    category: 'espresso',
    brand: 'Cafés Richard',
    name: 'Décaféiné',
    notes: '100% Arabica · Léger & Aromatique',
    intensity: 4,
  },
  {
    id: 'moka-noisette',
    category: 'espresso',
    brand: 'Cafés Richard',
    name: 'Moka Noisette',
    notes: "Arabica d'Éthiopie Aromatisé · Original & Savoureux",
    intensity: 7,
  },
  {
    id: 'moka-yrgacheffe',
    category: 'espresso',
    brand: 'Cafés Richard',
    name: "Moka d'Éthiopie Yrgacheffe",
    notes: 'Café de Spécialité Bio · Délicat & Parfumé',
    intensity: 3,
    organic: true,
  },
  {
    id: 'colombie-huila',
    category: 'espresso',
    brand: 'Cafés Richard',
    name: 'Colombie Huila',
    notes: 'Café de Spécialité · Doux & Suave',
    intensity: 5,
  },
  {
    id: 'costa-rica-tarrazu',
    category: 'espresso',
    brand: 'Cafés Richard',
    name: 'Costa Rica San Rafael Tarrazu',
    notes: 'Café de Spécialité · Acidulé & Complet',
    intensity: 6,
  },
  {
    id: 'perle-noire',
    category: 'espresso',
    brand: 'Cafés Richard',
    name: 'Perle Noire',
    notes: '100% Arabica · Riche & Harmonieux',
    intensity: 6,
  },
  {
    id: 'florio',
    category: 'espresso',
    brand: 'Cafés Richard',
    name: 'Espresso Pod Florio',
    notes: 'Classic Italian-style roast',
  },
  {
    id: 'the-blanc-rose-litchi',
    category: 'tea',
    brand: 'Comptoirs Richard',
    name: 'Thé Blanc Rose Litchi',
    notes: 'Flavoured white tea',
  },
  {
    id: 'camomille-bio',
    category: 'tea',
    brand: 'Comptoirs Richard',
    name: 'Camomille Bio',
    notes: 'Organic herbal tea',
    number: 11,
    organic: true,
  },
  {
    id: 'menthe-poivree-bio',
    category: 'tea',
    brand: 'Comptoirs Richard',
    name: 'Menthe Poivrée Bio',
    notes: 'Organic herbal tea',
    number: 6,
    organic: true,
  },
  {
    id: 'darjeeling-bio',
    category: 'tea',
    brand: 'Comptoirs Richard',
    name: 'Jardins de Darjeeling Bio',
    notes: 'Organic black tea',
    number: 3,
    organic: true,
  },
  {
    id: 'tilleul-bio',
    category: 'tea',
    brand: 'Comptoirs Richard',
    name: 'Tilleul Bio',
    notes: 'Organic herbal tea',
    number: 10,
    organic: true,
  },
  {
    id: 'rooibos-fruits-rouges',
    category: 'tea',
    brand: 'Comptoirs Richard',
    name: 'Rooibos Bio Fruits Rouges',
    notes: 'Organic flavoured rooibos',
    number: 7,
    organic: true,
  },
  {
    id: 'grand-earl-grey',
    category: 'tea',
    brand: 'Comptoirs Richard',
    name: 'Grand Earl Grey',
    notes: 'Flavoured black tea',
    number: 5,
  },
  {
    id: 'jardin-des-merveilles',
    category: 'tea',
    brand: 'Comptoirs Richard',
    name: 'Jardin des Merveilles',
    notes: 'Flavoured green tea',
    number: 1,
  },
  {
    id: 'rooibos-epices',
    category: 'tea',
    brand: 'Comptoirs Richard',
    name: 'Rooibos aux Épices',
    notes: 'Flavoured rooibos',
    number: 13,
  },
  {
    id: 'the-vert-agrumes-bio',
    category: 'tea',
    brand: 'Comptoirs Richard',
    name: 'Thé Vert aux Agrumes Bio',
    notes: 'Organic flavoured green tea',
    number: 2,
    organic: true,
  },
  {
    id: 'vanille-caramel',
    category: 'tea',
    brand: 'Comptoirs Richard',
    name: 'Vanille Caramel',
    notes: 'Flavoured black tea',
    number: 4,
  },
  {
    id: 'tisane-comptoirs-bio',
    category: 'tea',
    brand: 'Comptoirs Richard',
    name: 'Tisane des Comptoirs Bio',
    notes: 'Organic herbal tea',
    number: 12,
    organic: true,
  },
]);

/** @type {readonly { id: string; label: string }[]} */
const BEVERAGE_MENU_TABS = Object.freeze([
  { id: 'all', label: 'All' },
  { id: 'espresso', label: 'Espresso' },
  { id: 'tea', label: 'Teas & Infusions' },
]);

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BEVERAGE_MENU_ITEMS, BEVERAGE_MENU_TABS };
}

if (typeof window !== 'undefined') {
  window.BEVERAGE_MENU_ITEMS = BEVERAGE_MENU_ITEMS;
  window.BEVERAGE_MENU_TABS = BEVERAGE_MENU_TABS;
}
