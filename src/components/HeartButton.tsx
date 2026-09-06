import React from 'react';
import { Heart } from 'lucide-react';

interface HeartButtonProps {
  count: number;
  hasLiked: boolean;
  onToggle: () => void;
  isUpdating?: boolean;
}

export const HeartButton: React.FC<HeartButtonProps> = ({
  count,
  hasLiked,
  onToggle,
  isUpdating = false,
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={hasLiked}
      aria-label={hasLiked ? 'Unlike this profile' : 'Like this profile'}
      disabled={isUpdating}
      className={`group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-[0.97] cursor-pointer select-none ${
        hasLiked
          ? 'bg-[rgba(242,63,67,0.12)] border-[rgba(242,63,67,0.35)] text-[#f23f43]'
          : 'bg-[#14161f] border-[rgba(255,255,255,0.08)] text-[#9aa1b2] hover:text-[#f0f2f5] hover:bg-[#1a1e2a] hover:border-[rgba(255,255,255,0.14)]'
      }`}
    >
      <Heart
        className={`w-3.5 h-3.5 transition-transform duration-150 ${
          hasLiked ? 'fill-current text-[#f23f43] scale-105' : 'group-hover:scale-110'
        }`}
      />
      <span className="tabular-nums font-mono">
        {isNaN(count) ? '0' : count.toLocaleString()}
      </span>
    </button>
  );
};
