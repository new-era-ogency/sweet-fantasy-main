'use client';

import { useMemo, useState } from 'react';
import { Coffee, Leaf, Search, Sparkles } from 'lucide-react';
import { BEVERAGE_MENU_ITEMS, BEVERAGE_MENU_TABS } from '../../data/beverageMenu.js';

type TabId = (typeof BEVERAGE_MENU_TABS)[number]['id'];

function IntensityMeter({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2" aria-label={`Intensity ${value} of 10`}>
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-800/70">Intensity</span>
      <div className="flex gap-1">
        {Array.from({ length: 10 }, (_, index) => (
          <span
            key={index}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              index < value ? 'bg-amber-700' : 'bg-amber-900/10'
            }`}
          />
        ))}
      </div>
      <span className="text-xs font-bold tabular-nums text-amber-900">{value}</span>
    </div>
  );
}

export default function BeverageMenu() {
  const [activeTab, setActiveTab] = useState<TabId>('all');
  const [query, setQuery] = useState('');

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return BEVERAGE_MENU_ITEMS.filter((item) => {
      const tabMatch = activeTab === 'all' || item.category === activeTab;
      if (!tabMatch) return false;
      if (!normalized) return true;
      const haystack = [item.name, item.notes, item.brand, item.number ? `no ${item.number}` : '']
        .join(' ')
        .toLowerCase();
      return haystack.includes(normalized);
    });
  }, [activeTab, query]);

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-stone-200/80 bg-gradient-to-br from-stone-50 via-white to-amber-50/40 p-6 shadow-[0_32px_80px_-48px_rgba(28,25,23,0.45)] sm:p-8 lg:p-10">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-stone-300/20 blur-3xl" />

      <header className="relative flex flex-col gap-6 border-b border-stone-200/70 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.28em] text-amber-900/70">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Boutique Selection
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
            Espresso &amp; Tea Library
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-stone-600">
            Curated Cafés Richard espresso pods and Comptoirs Richard infusions — explore by mood, intensity, or flavour.
          </p>
        </div>

        <label className="relative block w-full max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search flavours, origins, or notes…"
            className="w-full rounded-2xl border border-stone-200/80 bg-white/90 py-3.5 pl-11 pr-4 text-sm text-stone-800 shadow-sm outline-none ring-0 transition placeholder:text-stone-400 focus:border-amber-300 focus:shadow-[0_0_0_4px_rgba(251,191,36,0.15)]"
          />
        </label>
      </header>

      <div className="relative mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Beverage categories">
        {BEVERAGE_MENU_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? 'bg-stone-900 text-white shadow-lg shadow-stone-900/15'
                  : 'bg-white/80 text-stone-600 ring-1 ring-stone-200/80 hover:bg-white hover:text-stone-900'
              }`}
            >
              {tab.id === 'espresso' ? <Coffee className="h-4 w-4" /> : null}
              {tab.id === 'tea' ? <Leaf className="h-4 w-4" /> : null}
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="relative mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3" role="list">
        {filteredItems.length === 0 ? (
          <p className="col-span-full rounded-2xl border border-dashed border-stone-300 bg-white/70 px-6 py-12 text-center text-sm text-stone-500">
            No selections match your search. Try another flavour or reset the filters.
          </p>
        ) : (
          filteredItems.map((item) => (
            <article
              key={item.id}
              role="listitem"
              className="group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-stone-200/70 bg-white/90 p-5 shadow-[0_18px_50px_-36px_rgba(28,25,23,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-200/80 hover:shadow-[0_28px_60px_-34px_rgba(120,53,15,0.25)]"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-stone-600">
                  {item.category === 'espresso' ? (
                    <Coffee className="h-3.5 w-3.5 text-amber-800" aria-hidden />
                  ) : (
                    <Leaf className="h-3.5 w-3.5 text-emerald-700" aria-hidden />
                  )}
                  {item.brand}
                </span>
                {item.organic ? (
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-800 ring-1 ring-emerald-200/80">
                    Bio
                  </span>
                ) : null}
              </div>

              <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight text-stone-900 transition-colors group-hover:text-amber-950">
                {item.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{item.notes}</p>

              <div className="mt-5 border-t border-stone-100 pt-4">
                {typeof item.intensity === 'number' ? (
                  <IntensityMeter value={item.intensity} />
                ) : typeof item.number === 'number' ? (
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800/80">
                    Collection No. {item.number}
                  </p>
                ) : (
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Signature roast</p>
                )}
              </div>
            </article>
          ))
        )}
      </div>

      <p className="relative mt-6 text-center text-xs text-stone-500">
        Showing {filteredItems.length} of {BEVERAGE_MENU_ITEMS.length} selections
      </p>
    </section>
  );
}
