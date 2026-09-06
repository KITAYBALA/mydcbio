import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { copyToClipboard } from '../lib/clipboard';

interface ShareButtonProps {
  title?: string;
  url?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ title = 'Discord Bio Profile', url }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleShare = async () => {
    const targetUrl = url || window.location.href;

    if (navigator.share && /mobile|android|iphone|ipad/i.test(navigator.userAgent)) {
      try {
        await navigator.share({
          title,
          url: targetUrl,
        });
        return;
      } catch {
        // User cancelled or share failed, fallback to clipboard
      }
    }

    const success = await copyToClipboard(targetUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label="Share profile link"
      className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#14161f] border border-[rgba(255,255,255,0.08)] text-[#9aa1b2] hover:text-[#f0f2f5] hover:bg-[#1a1e2a] hover:border-[rgba(255,255,255,0.14)] transition-all duration-150 active:scale-[0.97] cursor-pointer"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-[#23a55a]" />
          <span className="text-[#23a55a]">Link copied</span>
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5 group-hover:scale-105 transition-transform duration-150" />
          <span>Share</span>
        </>
      )}
    </button>
  );
};
