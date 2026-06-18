'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Coffee, Leaf } from 'lucide-react';
import type { MenuItem } from '../../data/menuItems.types';

type MenuProductImageProps = {
  item: MenuItem;
};

export default function MenuProductImage({ item }: MenuProductImageProps) {
  const [failed, setFailed] = useState(false);
  const isEspresso = item.category === 'Espresso';

  if (failed) {
    return (
      <div
        className="flex h-full w-full flex-col items-center justify-center gap-2 bg-slate-50 p-4 text-center"
        role="img"
        aria-label={item.name}
      >
        {isEspresso ? (
          <Coffee className="h-8 w-8 text-slate-300" strokeWidth={1.5} aria-hidden />
        ) : (
          <Leaf className="h-8 w-8 text-slate-300" strokeWidth={1.5} aria-hidden />
        )}
        <span className="text-xs text-slate-400">{item.name}</span>
      </div>
    );
  }

  return (
    <Image
      src={item.imageUrl}
      alt={item.name}
      fill
      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      className="object-contain"
      onError={() => setFailed(true)}
    />
  );
}
