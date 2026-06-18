export type MenuItem = {
  id: string;
  category: 'Espresso' | 'Teas & Infusions';
  name: string;
  details: string;
  intensity?: number;
  number?: number;
  imageUrl: string;
};

export type MenuTab = {
  id: string;
  label: string;
  category: MenuItem['category'] | null;
};
