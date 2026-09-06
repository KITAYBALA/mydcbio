import React, { useState } from 'react';
import { Sparkles, Waves, Grid3X3, Moon } from 'lucide-react';

interface BackgroundToggleProps {
  current: 'stars' | 'aurora' | 'grid' | 'none';
  onChange: (effect: 'stars' | 'aurora' | 'grid' | 'none') => void;
}

export const BackgroundToggle: React.FC<BackgroundToggleProps> = ({ current, onChange }) => {
  const [toast, setToast] = useState<string | null>(null);

  const modes: Array<{
    id: 'stars' | 'aurora' | 'grid' | 'none';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    { id: 'stars', label: 'Stars & Meteors', icon: Sparkles },
    { id: 'aurora', label: 'Cosmic Aurora', icon: Waves },
    { id: 'grid', label: '3D Cyber Grid', icon: Grid3X3 },
    { id: 'none', label: 'Pure Dark', icon: Moon },
  ];

  const handleNext = () => {
    const currentIndex = modes.findIndex((m) => m.id === current);
    const nextIndex = (currentIndex + 1) % modes.length;
    const nextMode = modes[nextIndex];
    onChange(nextMode.id);

    setToast(nextMode.label);
    setTimeout(() => setToast(null), 1800);
  };

  const currentMode = modes.find((m) => m.id === current) || modes[0];
  const Icon = currentMode.icon;

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
      {toast && (
        <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#121520]/90 border border-[rgba(255,255,255,0.12)] text-[#f0f2f5] backdrop-blur-md shadow-lg animate-in fade-in slide-in-from-right-2 duration-150">
          {toast}
        </span>
      )}

      <button
        type="button"
        onClick={handleNext}
        title={`Change background animation (Current: ${currentMode.label})`}
        aria-label="Toggle background animation"
        className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#121520]/80 hover:bg-[#1a1e2d] border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)] text-[#9aa1b2] hover:text-[#f0f2f5] backdrop-blur-md shadow-xl transition-all active:scale-95 cursor-pointer select-none text-xs font-medium"
      >
        <Icon className="w-3.5 h-3.5 text-[#5865F2] group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline text-[11px]">{currentMode.label}</span>
      </button>
    </div>
  );
};
