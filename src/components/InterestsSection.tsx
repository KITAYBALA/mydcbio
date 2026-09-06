import React from 'react';

interface InterestsSectionProps {
  interests: string[];
  title?: string;
}

export const InterestsSection: React.FC<InterestsSectionProps> = ({
  interests,
  title = 'Interests',
}) => {
  if (!interests || interests.length === 0) return null;

  return (
    <section className="space-y-2.5 pt-2" aria-labelledby="section-interests">
      <h2
        id="section-interests"
        className="text-[11px] font-mono uppercase tracking-widest text-[#5e6678] font-semibold"
      >
        {title}
      </h2>

      <div className="flex flex-wrap gap-1.5">
        {interests.map((interest, idx) => (
          <span
            key={idx}
            className="text-xs text-[#8e95a5] hover:text-[#f0f2f5] bg-[#0e1017] hover:bg-[#151822] border border-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.1)] px-2.5 py-1 rounded-md transition-colors select-none font-normal"
          >
            {interest}
          </span>
        ))}
      </div>
    </section>
  );
};
