import React from 'react';

interface StatusIndicatorProps {
  status: 'online' | 'idle' | 'dnd' | 'offline';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  size = 'md',
  showLabel = false,
}) => {
  const statusColors: Record<string, { bg: string; border: string; label: string }> = {
    online: { bg: 'bg-[#23a55a]', border: 'border-[#090a0f]', label: 'Online' },
    idle: { bg: 'bg-[#f0b232]', border: 'border-[#090a0f]', label: 'Idle' },
    dnd: { bg: 'bg-[#f23f43]', border: 'border-[#090a0f]', label: 'Do Not Disturb' },
    offline: { bg: 'bg-[#80848e]', border: 'border-[#090a0f]', label: 'Offline' },
  };

  const current = statusColors[status] || statusColors.offline;

  const sizeClasses = {
    sm: 'w-2.5 h-2.5 border',
    md: 'w-3.5 h-3.5 border-2',
    lg: 'w-4 h-4 border-2',
  }[size];

  return (
    <div className="inline-flex items-center gap-1.5" title={current.label}>
      <span
        className={`inline-block rounded-full ${current.bg} ${current.border} ${sizeClasses} transition-colors duration-200`}
        aria-label={`Discord status: ${current.label}`}
      />
      {showLabel && (
        <span className="text-xs text-[#9aa1b2] font-medium tracking-wide">
          {current.label}
        </span>
      )}
    </div>
  );
};
