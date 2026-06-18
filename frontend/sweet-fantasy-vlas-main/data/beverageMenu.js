/**
 * Premium café menu — Cafés Richard espresso pods & Comptoirs Richard teas.
 * Product photos are hosted locally under ./images/menu/ for reliable delivery.
 */

/** @type {readonly import('./menuItems.types').MenuItem[]} */
const MENU_ITEMS = Object.freeze([
  {
    id: 'e1',
    category: 'Espresso',
    name: 'Décaféiné',
    details: '100% Arabica, Léger & Aromatique',
    intensity: 4,
    imageUrl: './images/menu/e1.jpg',
  },
  {
    id: 'e2',
    category: 'Espresso',
    name: 'Moka Noisette',
    details: "Arabica d'Éthiopie Aromatisé, Original & Savoureux",
    intensity: 7,
    imageUrl: './images/menu/e2.jpg',
  },
  {
    id: 'e3',
    category: 'Espresso',
    name: "Moka d'Éthiopie Yrgacheffe",
    details: 'Café de Spécialité Bio, Délicat & Parfumé',
    intensity: 3,
    imageUrl: './images/menu/e3.jpg',
  },
  {
    id: 'e4',
    category: 'Espresso',
    name: 'Colombie Huila',
    details: 'Café de Spécialité, Doux & Suave',
    intensity: 5,
    imageUrl: './images/menu/e4.jpg',
  },
  {
    id: 'e5',
    category: 'Espresso',
    name: 'Costa Rica San Rafael Tarrazu',
    details: 'Café de Spécialité, Acidulé & Complet',
    intensity: 6,
    imageUrl: './images/menu/e5.jpg',
  },
  {
    id: 'e6',
    category: 'Espresso',
    name: 'Perle Noire',
    details: '100% Arabica, Riche & Harmonieux',
    intensity: 6,
    imageUrl: './images/menu/e6.jpg',
  },
  {
    id: 'e7',
    category: 'Espresso',
    name: 'Espresso Pod Florio',
    details: 'Classic Italian-style roast, 100% Arabica',
    intensity: 8,
    imageUrl: './images/menu/e7.jpg',
  },
  {
    id: 't1',
    category: 'Teas & Infusions',
    name: 'Thé Blanc Rose Litchi Bio',
    details: 'Flavoured organic white tea',
    number: 24,
    imageUrl: './images/menu/t1.jpg',
  },
  {
    id: 't2',
    category: 'Teas & Infusions',
    name: 'Camomille Bio',
    details: 'Organic herbal tea (No. 11)',
    number: 11,
    imageUrl: './images/menu/t2.jpg',
  },
  {
    id: 't3',
    category: 'Teas & Infusions',
    name: 'Menthe Poivrée Bio',
    details: 'Organic herbal tea (No. 6)',
    number: 6,
    imageUrl: './images/menu/t3.jpg',
  },
  {
    id: 't4',
    category: 'Teas & Infusions',
    name: 'Jardins de Darjeeling Bio',
    details: 'Organic black tea (No. 3)',
    number: 3,
    imageUrl: './images/menu/t4.jpg',
  },
  {
    id: 't5',
    category: 'Teas & Infusions',
    name: 'Tilleul Bio',
    details: 'Organic herbal tea (No. 10)',
    number: 10,
    imageUrl: './images/menu/t5.jpg',
  },
  {
    id: 't6',
    category: 'Teas & Infusions',
    name: 'Rooibos Bio Fruits Rouges',
    details: 'Organic flavoured rooibos (No. 7)',
    number: 7,
    imageUrl: './images/menu/t6.jpg',
  },
  {
    id: 't7',
    category: 'Teas & Infusions',
    name: 'Grand Earl Grey Bio',
    details: 'Flavoured organic black tea (No. 5)',
    number: 5,
    imageUrl: './images/menu/t7.jpg',
  },
  {
    id: 't8',
    category: 'Teas & Infusions',
    name: 'Jardin des Merveilles Bio',
    details: 'Flavoured organic green tea (No. 1)',
    number: 1,
    imageUrl: './images/menu/t8.jpg',
  },
  {
    id: 't9',
    category: 'Teas & Infusions',
    name: 'Rooibos aux Épices Bio',
    details: 'Flavoured organic rooibos (No. 13)',
    number: 13,
    imageUrl: './images/menu/t9.jpg',
  },
  {
    id: 't10',
    category: 'Teas & Infusions',
    name: 'Thé Vert aux Agrumes Bio',
    details: 'Organic flavoured green tea (No. 2)',
    number: 2,
    imageUrl: './images/menu/t10.jpg',
  },
  {
    id: 't11',
    category: 'Teas & Infusions',
    name: 'Vanille Caramel Bio',
    details: 'Flavoured organic black tea (No. 4)',
    number: 4,
    imageUrl: './images/menu/t11.jpg',
  },
  {
    id: 't12',
    category: 'Teas & Infusions',
    name: 'Tisane des Comptoirs Bio',
    details: 'Organic herbal tea blend (No. 12)',
    number: 12,
    imageUrl: './images/menu/t12.jpg',
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
