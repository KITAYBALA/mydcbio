import React from 'react';

interface FooterProps {
  username: string;
}

export const Footer: React.FC<FooterProps> = ({ username }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-8 pb-12 mt-12 border-t border-[rgba(255,255,255,0.05)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5e6678]">
      <div className="flex items-center gap-2 font-mono text-[11px]">
        <span>@{username}</span>
        <span>•</span>
        <span>{currentYear}</span>
      </div>

      <div className="text-[11px] text-[#454c5d]">
        built for discord bio
      </div>
    </footer>
  );
};
