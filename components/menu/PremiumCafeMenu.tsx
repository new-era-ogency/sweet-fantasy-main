'use client';

import { useMemo, useState } from 'react';
import { Coffee, Leaf, Search, Sparkles } from 'lucide-react';
import { MENU_ITEMS, MENU_TABS } from '../../data/beverageMenu.js';
import MenuProductImage from './MenuProductImage';

type TabId = (typeof MENU_TABS)[number]['id'];

function MenuBadge({ item }: { item: (typeof MENU_ITEMS)[number] }) {
  if (typeof item.intensity === 'number') {
    return (
      <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-900 ring-1 ring-amber-200/80">
        Intensity: {item.intensity}/10
      </span>
    );
  }

  if (typeof item.number === 'number') {
    return (
      <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-900 ring-1 ring-emerald-200/80">
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
    <section className="relative overflow-hidden rounded-[2rem] border border-stone-200/80 bg-gradient-to-br from-stone-50 via-white to-amber-50/30 p-6 shadow-[0_32px_80px_-48px_rgba(28,25,23,0.4)] sm:p-8 lg:p-10">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-200/25 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-stone-300/15 blur-3xl" aria-hidden />

      <header className="relative flex flex-col gap-6 border-b border-stone-200/70 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.28em] text-amber-900/75">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Cafés Richard · Comptoirs Richard
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
            Premium Menu
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-stone-600">
            Espresso pods and herbal infusions — filter by category, intensity, or flavour.
          </p>
        </div>

        <label className="relative block w-full max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or description…"
            className="w-full rounded-2xl border border-stone-200/80 bg-white py-3.5 pl-11 pr-4 text-sm text-stone-800 shadow-sm outline-none transition-all duration-300 placeholder:text-stone-400 focus:border-amber-300 focus:shadow-[0_0_0_4px_rgba(251,191,36,0.14)]"
          />
        </label>
      </header>

      <div className="relative mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Menu categories">
        {MENU_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold tracking-wide transition-all duration-300 ${
                isActive
                  ? 'bg-stone-900 text-white shadow-lg shadow-stone-900/15'
                  : 'border border-stone-200/80 bg-white text-stone-600 hover:border-stone-300 hover:text-stone-900'
              }`}
            >
              {tab.id === 'espresso' ? <Coffee className="h-4 w-4" aria-hidden /> : null}
              {tab.id === 'tea' ? <Leaf className="h-4 w-4" aria-hidden /> : null}
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="relative mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" role="list">
        {filteredItems.length === 0 ? (
          <p className="col-span-full rounded-2xl border border-dashed border-stone-300 bg-white/80 px-6 py-12 text-center text-sm text-stone-500">
            No items match your search. Try another flavour or clear the filter.
          </p>
        ) : (
          filteredItems.map((item) => (
            <article
              key={item.id}
              role="listitem"
              className="group flex flex-col overflow-hidden rounded-[1.35rem] border border-stone-200/70 bg-white shadow-[0_16px_48px_-32px_rgba(28,25,23,0.28)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-200/70 hover:shadow-[0_24px_56px_-30px_rgba(120,53,15,0.22)]"
            >
              <MenuProductImage item={item} />

              <div className="flex flex-1 flex-col border-t border-stone-100 p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-stone-500">
                    {item.category === 'Espresso' ? (
                      <Coffee className="h-3.5 w-3.5 text-amber-800" aria-hidden />
                    ) : (
                      <Leaf className="h-3.5 w-3.5 text-emerald-700" aria-hidden />
                    )}
                    {item.category}
                  </span>
                  <MenuBadge item={item} />
                </div>

                <h3 className="mt-3 font-serif text-xl font-semibold leading-snug tracking-tight text-stone-900 transition-colors duration-300 group-hover:text-amber-950">
                  {item.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{item.details}</p>
              </div>
            </article>
          ))
        )}
      </div>

      <p className="relative mt-8 text-center text-xs tracking-wide text-stone-500">
        Showing {filteredItems.length} of {MENU_ITEMS.length} items
      </p>
    </section>
  );
}
