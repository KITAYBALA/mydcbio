import React from 'react';

interface AboutSectionProps {
  paragraphs: string[];
  title?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  paragraphs,
  title = 'About',
}) => {
  if (!paragraphs || paragraphs.length === 0) return null;

  return (
    <section className="space-y-2.5 pt-2" aria-labelledby="section-about">
      <h2
        id="section-about"
        className="text-[11px] font-mono uppercase tracking-widest text-[#5e6678] font-semibold"
      >
        {title}
      </h2>
      <div className="space-y-3 text-[13.5px] leading-relaxed text-[#a3abbd] font-normal">
        {paragraphs.map((para, idx) => (
          <p key={idx} className="tracking-normal">
            {para}
          </p>
        ))}
      </div>
    </section>
  );
};
