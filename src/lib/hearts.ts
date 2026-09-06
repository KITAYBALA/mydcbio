import { useState, useEffect, useCallback, useRef } from 'react';

const STORAGE_KEY_LIKED = 'discord_bio_profile_liked';
const STORAGE_KEY_COUNT = 'discord_bio_profile_heart_count';
const DEFAULT_INITIAL_COUNT = 0;

export function useHearts() {
  const [hasLiked, setHasLiked] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_LIKED) === 'true';
    } catch {
      return false;
    }
  });

  const [count, setCount] = useState<number>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_COUNT);
      if (stored !== null) {
        const parsed = parseInt(stored, 10);
        if (parsed === 184 || parsed === 185) return 0;
        return isNaN(parsed) ? DEFAULT_INITIAL_COUNT : parsed;
      }
    } catch {
      // Ignore localStorage errors
    }
    return DEFAULT_INITIAL_COUNT;
  });

  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync to local storage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LIKED, String(hasLiked));
      localStorage.setItem(STORAGE_KEY_COUNT, String(count));
    } catch {
      // Ignore
    }
  }, [hasLiked, count]);

  const toggleHeart = useCallback(() => {
    if (isUpdating) return; // Spam prevention

    setIsUpdating(true);

    const nextLiked = !hasLiked;
    setHasLiked(nextLiked);
    setCount(nextLiked ? count + 1 : Math.max(0, count - 1));

    // Optional Backend sync hook (e.g. Supabase or serverless function)
    const apiUrl = (import.meta as { env?: { VITE_HEARTS_API_URL?: string } }).env
      ?.VITE_HEARTS_API_URL;
    if (apiUrl) {
      fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: nextLiked ? 'like' : 'unlike' }),
      }).catch((err) => {
        console.warn('Backend heart sync failed, keeping optimistic local state:', err);
      });
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      setIsUpdating(false);
    }, 350);
  }, [hasLiked, count, isUpdating]);

  return {
    hasLiked,
    count,
    toggleHeart,
    isUpdating,
  };
}
