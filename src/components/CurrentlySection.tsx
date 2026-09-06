import React from 'react';

interface CurrentlySectionProps {
  currently?: {
    playing?: string;
    building?: string;
    learning?: string;
    watching?: string;
    listening?: string;
  };
  title?: string;
}

export const CurrentlySection: React.FC<CurrentlySectionProps> = ({
  currently,
  title = 'Currently',
}) => {
  if (!currently) return null;

  const items = [
    { key: 'building', label: 'building', value: currently.building },
    { key: 'playing', label: 'playing', value: currently.playing },
    { key: 'learning', label: 'learning', value: currently.learning },
    { key: 'listening', label: 'listening', value: currently.listening },
    { key: 'watching', label: 'watching', value: currently.watching },
  ].filter((item) => Boolean(item.value && item.value.trim() !== ''));

  if (items.length === 0) return null;

  return (
    <section className="space-y-2.5 pt-2" aria-labelledby="section-currently">
      <h2
        id="section-currently"
        className="text-[11px] font-mono uppercase tracking-widest text-[#5e6678] font-semibold"
      >
        {title}
      </h2>

      <div className="divide-y divide-[rgba(255,255,255,0.04)] border-y border-[rgba(255,255,255,0.05)] py-0.5">
        {items.map(({ key, label, value }) => (
          <div
            key={key}
            className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr] items-baseline py-2 text-xs gap-3"
          >
            <span className="font-mono text-[11px] text-[#636c80] uppercase tracking-wider">
              {label}
            </span>
            <span className="text-[#d8dce6] font-medium leading-relaxed">
              {value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
