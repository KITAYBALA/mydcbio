import React from 'react';
import { SkillGroup } from '../types/profile';

interface SkillsSectionProps {
  skills: SkillGroup[];
  title?: string;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  title = 'Skills & Domains',
}) => {
  if (!skills || skills.length === 0) return null;

  return (
    <section className="space-y-3 pt-2" aria-labelledby="section-skills">
      <h2
        id="section-skills"
        className="text-[11px] font-mono uppercase tracking-widest text-[#5e6678] font-semibold"
      >
        {title}
      </h2>

      <div className="space-y-2 border-y border-[rgba(255,255,255,0.05)] py-2.5">
        {skills.map((group, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 sm:grid-cols-[130px_1fr] items-baseline gap-1 sm:gap-3 text-xs"
          >
            <span className="font-mono text-[11px] text-[#636c80] uppercase">
              {group.category}
            </span>
            <p className="text-[#a3abbd] leading-relaxed">
              {group.items.join(' • ')}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
