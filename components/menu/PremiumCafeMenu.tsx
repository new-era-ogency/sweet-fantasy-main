'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { MENU_ITEMS, MENU_TABS } from '../../data/beverageMenu.js';
import MenuProductImage from './MenuProductImage';

type TabId = (typeof MENU_TABS)[number]['id'];

function ProductBadge({ item }: { item: (typeof MENU_ITEMS)[number] }) {
  if (typeof item.intensity === 'number') {
    return (
      <span className="absolute left-0 top-2 z-10 bg-[#c8102e] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
        Intensity {item.intensity}/10
      </span>
    );
  }

  if (typeof item.number === 'number') {
    return (
      <span className="absolute left-0 top-2 z-10 bg-[#c8102e] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
        No. {item.number}
      </span>
    );
  }

  return null;
}

export default function PremiumCafeMenu() {
  const [activeTab, setActiveTab] = useState<TabId>('all');
  const [query, setQuery] = useState('');

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const tab = MENU_TABS.find((entry) => entry.id === activeTab);
    const categoryFilter = tab?.category ?? null;

    return MENU_ITEMS.filter((item) => {
      if (categoryFilter && item.category !== categoryFilter) return false;
      if (!normalized) return true;
      const haystack = [item.name, item.details, item.category, item.number ? `no ${item.number}` : '']
        .join(' ')
        .toLowerCase();
      return haystack.includes(normalized);
    });
  }, [activeTab, query]);

  return (
    <section className="border-t border-slate-200 bg-white pt-10 sm:pt-12">
      <header className="flex flex-col gap-6 border-b border-slate-200 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#c8102e]">
            Cafés Richard · Comptoirs Richard
          </p>
          <h2 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-slate-900 sm:text-[2.75rem]">
            Espresso pods &amp; tea library
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
            Official Richard selection — browse pods and infusions available at Sweet Fantasy.
          </p>
        </div>

        <label className="relative block w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products…"
            className="w-full border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#c8102e] focus:ring-1 focus:ring-[#c8102e]"
          />
        </label>
      </header>

      <div className="mt-6 flex flex-wrap gap-1 border-b border-slate-200 pb-4" role="tablist" aria-label="Menu categories">
        {MENU_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex min-h-10 items-center px-4 text-sm font-medium transition-colors ${
                isActive
                  ? 'border-b-2 border-[#c8102e] text-[#c8102e]'
                  : 'border-b-2 border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4" role="list">
        {filteredItems.length === 0 ? (
          <p className="col-span-full border border-dashed border-slate-300 px-6 py-12 text-center text-sm text-slate-500">
            No items match your search. Try another flavour or clear the filter.
          </p>
        ) : (
          filteredItems.map((item) => (
            <article
              key={item.id}
              role="listitem"
              className="group flex flex-col bg-white transition-colors hover:outline hover:outline-1 hover:outline-slate-300"
            >
              <div className="relative aspect-square bg-white p-4 sm:p-5">
                <ProductBadge item={item} />
                <MenuProductImage item={item} />
              </div>

              <div className="flex flex-1 flex-col px-2 pb-4 pt-1 text-center">
                <h3 className="text-sm font-medium leading-snug text-slate-800">{item.name}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{item.details}</p>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#c8102e]">
                  Available in café
                </p>
              </div>
            </article>
          ))
        )}
      </div>

      <p className="mt-10 text-center text-xs text-slate-500">
        Showing {filteredItems.length} of {MENU_ITEMS.length} products
      </p>
    </section>
  );
}
