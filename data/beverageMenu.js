/**
 * Premium café menu — Cafés Richard espresso pods & Comptoirs Richard teas.
 * Loaded in the static site via <script>; also consumable from Next.js via require/import.
 */

/** @type {readonly import('./menuItems.types').MenuItem[]} */
const MENU_ITEMS = Object.freeze([
  {
    id: 'e1',
    category: 'Espresso',
    name: 'Décaféiné',
    details: '100% Arabica, Léger & Aromatique',
    intensity: 4,
    imageUrl: 'https://www.espresso-international.com/media/catalog/product/c/a/cafes-richard-ese-pods-decaf-box.jpg',
  },
  {
    id: 'e2',
    category: 'Espresso',
    name: 'Moka Noisette',
    details: "Arabica d'Éthiopie Aromatisé, Original & Savoureux",
    intensity: 7,
    imageUrl: 'https://www.espresso-international.com/media/catalog/product/c/a/cafes-richard-ese-pods-moka-noisette.jpg',
  },
  {
    id: 'e3',
    category: 'Espresso',
    name: "Moka d'Éthiopie Yrgacheffe",
    details: 'Café de Spécialité Bio, Délicat & Parfumé',
    intensity: 3,
    imageUrl: 'https://www.espresso-international.com/media/catalog/product/c/a/cafes-richard-ese-pods-moka-d-ethiopie.jpg',
  },
  {
    id: 'e4',
    category: 'Espresso',
    name: 'Colombie Huila',
    details: 'Café de Spécialité, Doux & Suave',
    intensity: 5,
    imageUrl: 'https://www.espresso-international.com/media/catalog/product/c/a/cafes-richard-ese-pods-colombie.jpg',
  },
  {
    id: 'e5',
    category: 'Espresso',
    name: 'Costa Rica San Rafael Tarrazu',
    details: 'Café de Spécialité, Acidulé & Complet',
    intensity: 6,
    imageUrl: 'https://www.espresso-international.com/media/catalog/product/c/a/cafes-richard-ese-pods-costa-rica.jpg',
  },
  {
    id: 'e6',
    category: 'Espresso',
    name: 'Perle Noire',
    details: '100% Arabica, Riche & Harmonieux',
    intensity: 6,
    imageUrl: 'https://www.espresso-international.com/media/catalog/product/c/a/cafes-richard-ese-pods-perle-noire.jpg',
  },
  {
    id: 'e7',
    category: 'Espresso',
    name: 'Espresso Pod Florio',
    details: 'Classic Italian-style roast, 100% Arabica',
    intensity: 8,
    imageUrl: 'https://www.espresso-international.com/media/catalog/product/c/a/cafes-richard-ese-pods-florio.jpg',
  },
  {
    id: 't1',
    category: 'Teas & Infusions',
    name: 'Thé Blanc Rose Litchi Bio',
    details: 'Flavoured organic white tea',
    number: 24,
    imageUrl: 'https://www.comptoirsrichard.fr/media/catalog/product/t/h/the-blanc-rose-litchi-bio-boite-sachets.jpg',
  },
  {
    id: 't2',
    category: 'Teas & Infusions',
    name: 'Camomille Bio',
    details: 'Organic herbal tea (No. 11)',
    number: 11,
    imageUrl: 'https://www.comptoirsrichard.fr/media/catalog/product/c/a/camomille-bio-boite-sachets.jpg',
  },
  {
    id: 't3',
    category: 'Teas & Infusions',
    name: 'Menthe Poivrée Bio',
    details: 'Organic herbal tea (No. 6)',
    number: 6,
    imageUrl: 'https://www.comptoirsrichard.fr/media/catalog/product/m/e/menthe-poivree-bio-boite-sachets.jpg',
  },
  {
    id: 't4',
    category: 'Teas & Infusions',
    name: 'Jardins de Darjeeling Bio',
    details: 'Organic black tea (No. 3)',
    number: 3,
    imageUrl: 'https://www.comptoirsrichard.fr/media/catalog/product/j/a/jardins-de-darjeeling-bio-boite-sachets.jpg',
  },
  {
    id: 't5',
    category: 'Teas & Infusions',
    name: 'Tilleul Bio',
    details: 'Organic herbal tea (No. 10)',
    number: 10,
    imageUrl: 'https://www.comptoirsrichard.fr/media/catalog/product/t/i/tilleul-bio-boite-sachets.jpg',
  },
  {
    id: 't6',
    category: 'Teas & Infusions',
    name: 'Rooibos Bio Fruits Rouges',
    details: 'Organic flavoured rooibos (No. 7)',
    number: 7,
    imageUrl: 'https://www.comptoirsrichard.fr/media/catalog/product/r/o/rooibos-fruits-rouges-bio-boite-sachets.jpg',
  },
  {
    id: 't7',
    category: 'Teas & Infusions',
    name: 'Grand Earl Grey Bio',
    details: 'Flavoured organic black tea (No. 5)',
    number: 5,
    imageUrl: 'https://www.comptoirsrichard.fr/media/catalog/product/g/r/grand-earl-grey-bio-boite-sachets.jpg',
  },
  {
    id: 't8',
    category: 'Teas & Infusions',
    name: 'Jardin des Merveilles Bio',
    details: 'Flavoured organic green tea (No. 1)',
    number: 1,
    imageUrl: 'https://www.comptoirsrichard.fr/media/catalog/product/j/a/jardin-des-merveilles-bio-boite-sachets.jpg',
  },
  {
    id: 't9',
    category: 'Teas & Infusions',
    name: 'Rooibos aux Épices Bio',
    details: 'Flavoured organic rooibos (No. 13)',
    number: 13,
    imageUrl: 'https://www.comptoirsrichard.fr/media/catalog/product/r/o/rooibos-aux-epices-bio-boite-sachets.jpg',
  },
  {
    id: 't10',
    category: 'Teas & Infusions',
    name: 'Thé Vert aux Agrumes Bio',
    details: 'Organic flavoured green tea (No. 2)',
    number: 2,
    imageUrl: 'https://www.comptoirsrichard.fr/media/catalog/product/t/h/the-vert-aux-agrumes-bio-boite-sachets.jpg',
  },
  {
    id: 't11',
    category: 'Teas & Infusions',
    name: 'Vanille Caramel Bio',
    details: 'Flavoured organic black tea (No. 4)',
    number: 4,
    imageUrl: 'https://www.comptoirsrichard.fr/media/catalog/product/v/a/vanille-caramel-bio-boite-sachets.jpg',
  },
  {
    id: 't12',
    category: 'Teas & Infusions',
    name: 'Tisane des Comptoirs Bio',
    details: 'Organic herbal tea blend (No. 12)',
    number: 12,
    imageUrl: 'https://www.comptoirsrichard.fr/media/catalog/product/t/i/tisane-des-comptoirs-bio-boite-sachets.jpg',
  },
]);

/** @type {readonly { id: string; label: string; category: string | null }[]} */
const MENU_TABS = Object.freeze([
  { id: 'all', label: 'All Items', category: null },
  { id: 'espresso', label: 'Espresso Pods', category: 'Espresso' },
  { id: 'tea', label: 'Teas & Infusions', category: 'Teas & Infusions' },
]);

/** @deprecated Use MENU_ITEMS */
const BEVERAGE_MENU_ITEMS = MENU_ITEMS;

/** @deprecated Use MENU_TABS */
const BEVERAGE_MENU_TABS = MENU_TABS;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MENU_ITEMS, MENU_TABS, BEVERAGE_MENU_ITEMS, BEVERAGE_MENU_TABS };
}

if (typeof window !== 'undefined') {
  window.MENU_ITEMS = MENU_ITEMS;
  window.MENU_TABS = MENU_TABS;
  window.BEVERAGE_MENU_ITEMS = MENU_ITEMS;
  window.BEVERAGE_MENU_TABS = MENU_TABS;
}
