import React from 'react';

interface FavoritesSectionProps {
  favorites?: Record<string, string[]>;
  title?: string;
}

export const FavoritesSection: React.FC<FavoritesSectionProps> = ({
  favorites,
  title = 'Favorites',
}) => {
  if (!favorites) return null;

  const validEntries = Object.entries(favorites).filter(
    ([_, items]) => items && items.length > 0
  );

  if (validEntries.length === 0) return null;

  return (
    <section className="space-y-3" aria-labelledby="section-favorites">
      <h2
        id="section-favorites"
        className="text-xs font-semibold uppercase tracking-wider text-[#5e6678]"
      >
        {title}
      </h2>

      <div className="space-y-2.5">
        {validEntries.map(([category, items]) => (
          <div
            key={category}
            className="p-3 rounded-xl bg-[#11131a] border border-[rgba(255,255,255,0.05)] space-y-1.5"
          >
            <span className="text-[11px] font-mono text-[#5e6678] uppercase tracking-wider block">
              {category}
            </span>
            <p className="text-xs text-[#d1d5db] leading-relaxed">
              {items.join(' • ')}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
