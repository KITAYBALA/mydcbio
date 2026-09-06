import React, { useState } from 'react';
import { Copy, Check, Gamepad2, Headphones } from 'lucide-react';
import { ProfileConfig, DiscordPresence } from '../types/profile';
import { copyToClipboard } from '../lib/clipboard';
import { StatusIndicator } from './StatusIndicator';
import { HeartButton } from './HeartButton';
import { ShareButton } from './ShareButton';

interface ProfileHeaderProps {
  config: ProfileConfig;
  presence: DiscordPresence;
  heartsCount: number;
  hasLiked: boolean;
  onToggleHeart: () => void;
  isUpdatingHeart: boolean;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  config,
  presence,
  heartsCount,
  hasLiked,
  onToggleHeart,
  isUpdatingHeart,
}) => {
  const [copiedUser, setCopiedUser] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  // If Lanyard has a custom avatar or live status, use it; otherwise fallback to config
  const status = presence.status || config.discord.fallbackStatus || 'online';

  // Priority: If user provided a custom avatar (URL or uploaded file), use it!
  // Otherwise, fall back to Discord avatar if available from Lanyard.
  const hasCustomAvatar = Boolean(config.avatar && config.avatar.trim() !== '');
  const avatarUrl = hasCustomAvatar
    ? config.avatar
    : (presence.discordUser?.avatar && presence.discordUser?.id
        ? `https://cdn.discordapp.com/avatars/${presence.discordUser.id}/${presence.discordUser.avatar}.png?size=256`
        : config.avatar);

  // Reset error state if avatarUrl changes
  React.useEffect(() => {
    setAvatarError(false);
  }, [avatarUrl]);

  const handleCopyUsername = async () => {
    const success = await copyToClipboard(config.username);
    if (success) {
      setCopiedUser(true);
      setTimeout(() => setCopiedUser(false), 2000);
    }
  };

  const primaryActivity = presence.activities?.find(
    (act) => act.type === 0 || act.type === 2 // 0: Playing game, 2: Listening (Spotify)
  );

  return (
    <header className="relative rounded-2xl overflow-hidden bg-[#0e1017] border border-[rgba(255,255,255,0.06)] shadow-xl">
      {/* Discord Profile Banner */}
      <div
        className="h-28 sm:h-32 w-full relative"
        style={{
          backgroundColor: config.bannerColor || '#181b26',
          backgroundImage: config.banner ? `url(${config.banner})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Subtle decorative overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0e1017]/80 pointer-events-none" />
      </div>

      {/* Main Profile Identity Body (overlapping avatar cutout) */}
      <div className="px-5 sm:px-6 pb-6 pt-0 relative">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 sm:-mt-14 mb-4">
          {/* Avatar with authentic Discord cutout ring */}
          <div className="relative inline-block">
            <div className="w-22 h-22 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-[#161822] p-1 bg-[#0e1017] shadow-lg flex items-center justify-center">
              {avatarError || !avatarUrl ? (
                <div className="w-full h-full rounded-xl bg-[#5865F2] flex items-center justify-center text-white font-bold text-xl sm:text-2xl font-mono select-none">
                  {config.displayName ? config.displayName.slice(0, 2).toUpperCase() : '??'}
                </div>
              ) : (
                <img
                  src={avatarUrl}
                  alt={`${config.displayName}'s avatar`}
                  className="w-full h-full object-cover rounded-xl"
                  onError={() => setAvatarError(true)}
                />
              )}
            </div>
            {/* Status dot in bottom right with background cutout */}
            <div className="absolute -bottom-0.5 -right-0.5 bg-[#0e1017] p-1 rounded-full shadow-md">
              <StatusIndicator status={status} size="md" />
            </div>
          </div>

          {/* Action row (Heart + Share) */}
          <div className="flex items-center gap-2 self-start sm:self-end pt-2 sm:pt-0">
            <HeartButton
              count={heartsCount}
              hasLiked={hasLiked}
              onToggle={onToggleHeart}
              isUpdating={isUpdatingHeart}
            />
            <ShareButton title={`${config.displayName}'s Discord Bio`} />
          </div>
        </div>

        {/* Identity Information */}
        <div className="space-y-2">
          <div>
            <div className="flex items-baseline gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#f4f5f8]">
                {config.displayName}
              </h1>

              {config.pronouns && (
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#161822] text-[#8e95a5] border border-[rgba(255,255,255,0.06)]">
                  {config.pronouns}
                </span>
              )}
            </div>

            {/* Discord Username with tactile 1-click copy */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleCopyUsername}
                title="Click to copy Discord username"
                aria-label={`Copy Discord username @${config.username}`}
                className="group inline-flex items-center gap-1.5 text-xs font-mono text-[#8e95a5] hover:text-[#f4f5f8] transition-colors py-0.5 px-2 -ml-2 rounded-md hover:bg-[#161824] cursor-pointer"
              >
                <span>@{config.username}</span>
                {copiedUser ? (
                  <span className="inline-flex items-center gap-0.5 text-[#23a55a] font-sans font-medium text-[11px] ml-1">
                    <Check className="w-3 h-3" />
                    Copied!
                  </span>
                ) : (
                  <Copy className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity ml-0.5" />
                )}
              </button>

              <span className="text-[#3c4150]">•</span>
              <StatusIndicator status={status} showLabel size="sm" />
            </div>
          </div>

          {/* Tagline */}
          {config.tagline && (
            <p className="text-xs sm:text-sm text-[#9aa1b2] font-normal leading-relaxed">
              {config.tagline}
            </p>
          )}

          {/* Live Activity or Custom Status */}
          {(primaryActivity || config.status) && (
            <div className="pt-2.5 mt-2.5 border-t border-[rgba(255,255,255,0.05)] flex items-center gap-2 text-xs text-[#9aa1b2]">
              {primaryActivity ? (
                <>
                  {primaryActivity.type === 2 ? (
                    <Headphones className="w-3.5 h-3.5 text-[#1db954] flex-shrink-0" />
                  ) : (
                    <Gamepad2 className="w-3.5 h-3.5 text-[#5865F2] flex-shrink-0" />
                  )}
                  <span className="truncate">
                    <span className="text-[#5e6678]">
                      {primaryActivity.type === 2 ? 'Listening to' : 'Playing'}
                    </span>{' '}
                    <span className="text-[#f4f5f8] font-medium">{primaryActivity.name}</span>
                    {primaryActivity.details && (
                      <span className="text-[#8e95a5]"> — {primaryActivity.details}</span>
                    )}
                  </span>
                </>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5865F2] opacity-80 flex-shrink-0" />
                  <span className="italic text-[#8e95a5] truncate">{config.status}</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
