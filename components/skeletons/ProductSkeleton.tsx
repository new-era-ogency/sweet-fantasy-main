'use client';

type ProductSkeletonProps = {
  layout?: 'portrait' | 'landscape' | 'news';
};

/**
 * Matches featured dessert / news card dimensions to prevent CLS while catalog data loads.
 * Use as a React Suspense fallback in Next.js, or mirror markup in the static Alpine site.
 */
export default function ProductSkeleton({ layout = 'portrait' }: ProductSkeletonProps) {
  if (layout === 'news') {
    return (
      <article
        className="overflow-hidden rounded-[1.75rem] border border-slate-900/[0.06] bg-white ring-1 ring-slate-900/[0.04]"
        aria-hidden="true"
      >
        <div className="aspect-[4/3] animate-pulse bg-gradient-to-br from-accent-beige/25 via-slate-100 to-santorini/15" />
        <div className="space-y-3 p-5 sm:p-6">
          <div className="h-3 w-28 animate-pulse rounded-full bg-slate-200/90" />
          <div className="h-7 w-4/5 animate-pulse rounded-lg bg-slate-200/90" />
          <div className="space-y-2">
            <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
            <div className="h-3 w-[92%] animate-pulse rounded bg-slate-100" />
            <div className="h-3 w-[78%] animate-pulse rounded bg-slate-100" />
          </div>
        </div>
      </article>
    );
  }

  const mediaAspect = layout === 'landscape' ? 'aspect-[5/4]' : 'aspect-[4/5]';

  return (
    <article
      className="overflow-hidden rounded-[1.75rem] border border-slate-900/[0.06] bg-white ring-1 ring-slate-900/[0.04]"
      aria-hidden="true"
    >
      <div className={`${mediaAspect} animate-pulse bg-gradient-to-br from-accent-beige/25 via-slate-100 to-santorini/15`} />
      <div className="space-y-3 p-5">
        <div className="h-6 w-3/4 animate-pulse rounded-lg bg-slate-200/90" />
        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
          <div className="h-3 w-[88%] animate-pulse rounded bg-slate-100" />
        </div>
      </div>
    </article>
  );
}

export function ProductSkeletonGrid({
  count = 3,
  layout = 'portrait',
}: {
  count?: number;
  layout?: ProductSkeletonProps['layout'];
}) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <ProductSkeleton key={`product-skeleton-${index}`} layout={layout} />
      ))}
    </>
  );
}
