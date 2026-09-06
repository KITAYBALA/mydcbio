import React from 'react';
import { GameItem, GameStatus } from '../types/profile';

interface GamesSectionProps {
  games: GameItem[];
  title?: string;
}

export const GamesSection: React.FC<GamesSectionProps> = ({
  games,
  title = 'Games',
}) => {
  if (!games || games.length === 0) return null;

  const statusDot = (status: GameStatus) => {
    switch (status) {
      case 'Playing':
        return 'bg-[#23a55a]';
      case 'Favorite':
        return 'bg-[#f0b232]';
      case 'Finished':
        return 'bg-[#5865F2]';
      case 'Occasionally':
        return 'bg-[#717684]';
      default:
        return 'bg-[#717684]';
    }
  };

  return (
    <section className="space-y-3 pt-2" aria-labelledby="section-games">
      <h2
        id="section-games"
        className="text-[11px] font-mono uppercase tracking-widest text-[#5e6678] font-semibold"
      >
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {games.map((game, idx) => (
          <div
            key={idx}
            className="p-2.5 rounded-lg bg-[#0e1017] border border-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.09)] transition-colors space-y-1"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${statusDot(
                    game.status
                  )}`}
                />
                <span className="text-xs font-semibold text-[#f0f2f5] truncate">
                  {game.name}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#5e6678] uppercase flex-shrink-0">
                {game.platform}
              </span>
            </div>

            {game.note && (
              <p className="text-[11px] text-[#8e95a5] pl-3 leading-snug font-normal line-clamp-1">
                {game.note}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
