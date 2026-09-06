import React from 'react';
import { Mail, Globe, ArrowUpRight } from 'lucide-react';
import {
  GithubIcon,
  TwitchIcon,
  YoutubeIcon,
  SteamIcon,
  SpotifyIcon,
  XTwitterIcon,
} from './BrandIcons';
import { SocialLink } from '../types/profile';

interface SocialLinksProps {
  links: SocialLink[];
  title?: string;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  links,
  title = 'Find Me Online',
}) => {
  if (!links || links.length === 0) return null;

  const renderIcon = (icon: string) => {
    switch (icon.toLowerCase()) {
      case 'github':
        return <GithubIcon size={14} />;
      case 'steam':
        return <SteamIcon size={14} />;
      case 'twitch':
        return <TwitchIcon size={14} />;
      case 'youtube':
        return <YoutubeIcon size={14} />;
      case 'spotify':
        return <SpotifyIcon size={14} />;
      case 'x':
      case 'twitter':
        return <XTwitterIcon size={14} />;
      case 'mail':
        return <Mail className="w-3.5 h-3.5" />;
      default:
        return <Globe className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section className="space-y-3 pt-2" aria-labelledby="section-links">
      <h2
        id="section-links"
        className="text-[11px] font-mono uppercase tracking-widest text-[#5e6678] font-semibold"
      >
        {title}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {links.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-[#0e1017] hover:bg-[#141722] border border-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.1)] transition-colors flex items-center justify-between group"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[#636c80] group-hover:text-[#5865F2] transition-colors flex-shrink-0">
                {renderIcon(link.icon)}
              </span>
              <span className="text-xs font-medium text-[#c6ccd8] group-hover:text-white transition-colors truncate">
                {link.label}
              </span>
            </div>

            <ArrowUpRight className="w-3 h-3 text-[#5e6678] group-hover:text-[#a3abbd] transition-colors flex-shrink-0" />
          </a>
        ))}
      </div>
    </section>
  );
};
