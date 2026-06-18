'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { MENU_ITEMS, MENU_TABS } from '../../data/beverageMenu.js';
import BeverageProductCard from './BeverageProductCard';

type TabId = (typeof MENU_TABS)[number]['id'];

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
    <section className="mt-14 overflow-hidden rounded-[2.5rem] border border-zinc-100 bg-white p-5 shadow-[0_8px_40px_rgba(15,47,74,0.06)] sm:p-8 lg:p-10">
      <header className="flex flex-col gap-6 border-b border-zinc-200/80 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#0f2f4a]">
            Cafés Richard · Comptoirs Richard
          </p>
          <h2 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-zinc-900 sm:text-[2.75rem]">
            Espresso pods &amp; tea library
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-stone-500">
            Official Richard selection — browse pods and infusions available at Sweet Fantasy.
          </p>
        </div>

        <label className="relative block w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products…"
            className="w-full rounded-2xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-[#0f2f4a]/60 focus:ring-1 focus:ring-[#0f2f4a]/30"
          />
        </label>
      </header>

      <div className="mt-6 flex flex-wrap gap-1 border-b border-zinc-200/80 pb-4" role="tablist" aria-label="Menu categories">
        {MENU_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex min-h-10 items-center px-4 text-sm font-medium transition-colors duration-300 ${
                isActive
                  ? 'border-b-2 border-[#0f2f4a] text-[#0f2f4a]'
                  : 'border-b-2 border-transparent text-zinc-600 hover:text-zinc-900'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6" role="list">
        {filteredItems.length === 0 ? (
          <p className="col-span-full rounded-2xl border border-dashed border-zinc-200 px-6 py-14 text-center text-sm text-stone-500">
            No items match your search. Try another flavour or clear the filter.
          </p>
        ) : (
          filteredItems.map((item) => <BeverageProductCard key={item.id} item={item} />)
        )}
      </div>

      <p className="mt-10 text-center text-xs tracking-wide text-stone-500">
        Showing {filteredItems.length} of {MENU_ITEMS.length} products
      </p>
    </section>
  );
}
