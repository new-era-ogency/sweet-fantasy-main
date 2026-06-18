'use client';

import { Coffee, Leaf } from 'lucide-react';
import type { MenuItem } from '../../data/menuItems.types';
import MenuProductImage from './MenuProductImage';

type BeverageProductCardProps = {
  item: MenuItem;
};

function CategoryLabel({ category }: { category: MenuItem['category'] }) {
  const isEspresso = category === 'Espresso';
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
      {isEspresso ? (
        <Coffee className="h-3 w-3 text-zinc-400" strokeWidth={1.75} aria-hidden />
      ) : (
        <Leaf className="h-3 w-3 text-zinc-400" strokeWidth={1.75} aria-hidden />
      )}
      {category}
    </span>
  );
}

function MetadataBadge({ item }: { item: MenuItem }) {
  if (typeof item.intensity === 'number') {
    return (
      <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-700">
        Intensity: {item.intensity}/10
      </span>
    );
  }

  if (typeof item.number === 'number') {
    return (
      <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-700">
        No. {item.number}
      </span>
    );
  }

  return null;
}

export default function BeverageProductCard({ item }: BeverageProductCardProps) {
  return (
    <article
      role="listitem"
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
    >
      <div className="aspect-[4/5] overflow-hidden bg-white p-1.5 sm:p-2">
        <div className="relative h-full w-full overflow-hidden">
          <MenuProductImage item={item} />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <div className="flex items-center justify-between gap-3 border-b border-zinc-100/80 pb-3">
          <CategoryLabel category={item.category} />
          <MetadataBadge item={item} />
        </div>

        <h3 className="mt-3 font-serif text-[1.05rem] font-semibold leading-snug tracking-tight text-zinc-900">
          {item.name}
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-stone-500">{item.details}</p>

        <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.16em] text-[#0f2f4a]/80">
          Available in café
        </p>
      </div>
    </article>
  );
}
