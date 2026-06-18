'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Coffee, Leaf } from 'lucide-react';
import type { MenuItem } from '../../data/menuItems.types';
import { getFallbackGradient, getFallbackTextColor, getProductInitials } from './menuImageFallbacks';

type MenuProductImageProps = {
  item: MenuItem;
};

export default function MenuProductImage({ item }: MenuProductImageProps) {
  const [failed, setFailed] = useState(false);
  const isEspresso = item.category === 'Espresso';
  const initials = getProductInitials(item.name);
  const gradient = getFallbackGradient(item);
  const textColor = getFallbackTextColor(item);

  if (failed) {
    return (
      <div
        className="relative flex aspect-[4/3] flex-col items-center justify-center gap-3 overflow-hidden p-6 shadow-inner"
        style={{ background: gradient }}
        role="img"
        aria-label={item.name}
      >
        <div
          className="rounded-full border border-white/25 bg-white/10 p-3 backdrop-blur-sm"
          style={{ color: textColor }}
        >
          {isEspresso ? <Coffee className="h-7 w-7" strokeWidth={1.5} aria-hidden /> : <Leaf className="h-7 w-7" strokeWidth={1.5} aria-hidden />}
        </div>
        <span className="font-serif text-3xl font-semibold tracking-[0.18em]" style={{ color: textColor }}>
          {initials}
        </span>
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-neutral-50 p-4">
      <Image
        src={item.imageUrl}
        alt={item.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
        referrerPolicy="no-referrer"
        className="object-contain p-2 transition-transform duration-300 ease-out group-hover:scale-105"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
