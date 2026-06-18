import type { MenuItem } from '../../data/menuItems.types';

const PRODUCT_GRADIENTS: Record<string, string> = {
  e1: 'linear-gradient(145deg, #fafaf9 0%, #e7e5e4 48%, #fde68a 100%)',
  e2: 'linear-gradient(145deg, #e7e5e4 0%, #a8a29e 52%, #57534e 100%)',
  e3: 'linear-gradient(145deg, #fffbeb 0%, #fde68a 42%, #f59e0b 100%)',
  e4: 'linear-gradient(145deg, #ecfccb 0%, #bef264 45%, #854d0e 100%)',
  e5: 'linear-gradient(145deg, #292524 0%, #57534e 50%, #a16207 100%)',
  e6: 'linear-gradient(145deg, #0c0a09 0%, #3f3f46 38%, #92400e 100%)',
  e7: 'linear-gradient(145deg, #1c1917 0%, #78350f 55%, #451a03 100%)',
  t1: 'linear-gradient(145deg, #fdf2f8 0%, #fce7f3 50%, #f9a8d4 100%)',
  t2: 'linear-gradient(145deg, #fefce8 0%, #fef08a 55%, #ca8a04 100%)',
  t3: 'linear-gradient(145deg, #ecfdf5 0%, #bbf7d0 50%, #059669 100%)',
  t4: 'linear-gradient(145deg, #fff7ed 0%, #fed7aa 50%, #c2410c 100%)',
  t5: 'linear-gradient(145deg, #f0fdf4 0%, #d9f99d 50%, #4d7c0f 100%)',
  t6: 'linear-gradient(145deg, #fef2f2 0%, #fecaca 50%, #be123c 100%)',
  t7: 'linear-gradient(145deg, #eff6ff 0%, #bfdbfe 50%, #1d4ed8 100%)',
  t8: 'linear-gradient(145deg, #ecfdf5 0%, #a7f3d0 50%, #047857 100%)',
  t9: 'linear-gradient(145deg, #fff7ed 0%, #fdba74 50%, #9a3412 100%)',
  t10: 'linear-gradient(145deg, #f7fee7 0%, #d9f99d 50%, #65a30d 100%)',
  t11: 'linear-gradient(145deg, #fffbeb 0%, #fcd34d 50%, #b45309 100%)',
  t12: 'linear-gradient(145deg, #f5f5f4 0%, #d6d3d1 50%, #78716c 100%)',
};

const PRODUCT_TEXT_CLASSES: Record<string, string> = {
  e1: 'text-stone-800',
  e2: 'text-stone-900',
  e3: 'text-amber-950',
  e4: 'text-lime-950',
  e5: 'text-amber-50',
  e6: 'text-amber-50',
  e7: 'text-amber-100',
  t1: 'text-rose-950',
  t2: 'text-yellow-950',
  t3: 'text-emerald-950',
  t4: 'text-orange-950',
  t5: 'text-lime-950',
  t6: 'text-rose-950',
  t7: 'text-blue-950',
  t8: 'text-emerald-950',
  t9: 'text-orange-950',
  t10: 'text-lime-950',
  t11: 'text-amber-950',
  t12: 'text-stone-800',
};

export function getProductInitials(name: string): string {
  const words = name
    .replace(/[^a-zA-ZÀ-ÿ\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
  if (words.length >= 2) return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return 'SF';
}

export function getFallbackGradient(item: MenuItem): string {
  if (PRODUCT_GRADIENTS[item.id]) return PRODUCT_GRADIENTS[item.id];

  if (item.category === 'Espresso') {
    const intensity = item.intensity ?? 5;
    if (intensity <= 3) return 'linear-gradient(145deg, #fafaf9 0%, #e7e5e4 50%, #fde68a 100%)';
    if (intensity <= 6) return 'linear-gradient(145deg, #d6d3d1 0%, #a8a29e 50%, #57534e 100%)';
    return 'linear-gradient(145deg, #1c1917 0%, #44403c 45%, #92400e 100%)';
  }

  return 'linear-gradient(145deg, #ecfdf5 0%, #d1fae5 50%, #6ee7b7 100%)';
}

export function getFallbackTextColor(item: MenuItem): string {
  if (PRODUCT_TEXT_CLASSES[item.id]) {
    const map: Record<string, string> = {
      e1: '#292524',
      e2: '#1c1917',
      e3: '#451a03',
      e4: '#1a2e05',
      e5: '#fffbeb',
      e6: '#fffbeb',
      e7: '#fef3c7',
      t1: '#4c0519',
      t2: '#422006',
      t3: '#022c22',
      t4: '#431407',
      t5: '#1a2e05',
      t6: '#4c0519',
      t7: '#172554',
      t8: '#022c22',
      t9: '#431407',
      t10: '#1a2e05',
      t11: '#451a03',
      t12: '#292524',
    };
    return map[item.id] ?? '#292524';
  }

  if (item.category === 'Espresso') {
    const intensity = item.intensity ?? 5;
    if (intensity >= 7) return '#fffbeb';
    if (intensity <= 3) return '#292524';
    return '#1c1917';
  }

  return '#022c22';
}
