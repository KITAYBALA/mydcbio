import { useState, useEffect } from 'react';
import { DiscordPresence } from '../types/profile';

interface LanyardActivity {
  name: string;
  type: number;
  details?: string;
  state?: string;
  timestamps?: { start?: number; end?: number };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
}

interface LanyardData {
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  activities: LanyardActivity[];
  discord_user: {
    id: string;
    username: string;
    avatar: string | null;
    discriminator: string;
    global_name?: string;
  };
  spotify?: {
    track_id: string;
    timestamps: { start: number; end: number };
    song: string;
    artist: string;
    album_art_url: string;
    album: string;
  } | null;
  listening_to_spotify?: boolean;
}

export function useDiscordPresence(
  discordId?: string,
  fallbackStatus: 'online' | 'idle' | 'dnd' | 'offline' = 'online'
) {
  const [presence, setPresence] = useState<DiscordPresence>({
    online: fallbackStatus !== 'offline',
    status: fallbackStatus,
    activities: [],
  });
  const [loading, setLoading] = useState<boolean>(Boolean(discordId));

  useEffect(() => {
    if (!discordId || discordId.trim() === '') {
      setLoading(false);
      return;
    }

    let socket: WebSocket | null = null;
    let heartbeatInterval: ReturnType<typeof setInterval> | null = null;
    let isCancelled = false;

    // 1. Initial REST fetch for instant paint
    const fetchInitialData = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`);
        if (!response.ok) throw new Error(`Lanyard HTTP error: ${response.status}`);
        const json = await response.json();
        if (json.success && json.data && !isCancelled) {
          const data: LanyardData = json.data;
          setPresence({
            online: data.discord_status !== 'offline',
            status: data.discord_status,
            activities: data.activities || [],
            discordUser: data.discord_user,
          });
        }
      } catch (err) {
        console.warn('Lanyard presence REST request fallback:', err);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    fetchInitialData();

    // 2. Connect to Lanyard WebSocket for real-time live presence updates
    try {
      socket = new WebSocket('wss://api.lanyard.rest/socket');

      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          const { op, d } = message;

          if (op === 1) {
            // Hello opcode: start heartbeat and subscribe to user
            const heartbeatMs = d.heartbeat_interval;
            heartbeatInterval = setInterval(() => {
              if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({ op: 3 }));
              }
            }, heartbeatMs);

            if (socket && socket.readyState === WebSocket.OPEN) {
              socket.send(
                JSON.stringify({
                  op: 2,
                  d: {
                    subscribe_to_id: discordId,
                  },
                })
              );
            }
          } else if (op === 0) {
            // Event opcode (INIT_STATE or PRESENCE_UPDATE)
            const data: LanyardData = d;
            if (!isCancelled && data) {
              setPresence({
                online: data.discord_status !== 'offline',
                status: data.discord_status,
                activities: data.activities || [],
                discordUser: data.discord_user,
              });
            }
          }
        } catch {
          // Ignore parse errors on ping/pong
        }
      };

      socket.onerror = () => {
        // Fallback silently if socket is blocked
      };
    } catch {
      // WebSocket setup failed, REST fallback already populated
    }

    return () => {
      isCancelled = true;
      if (heartbeatInterval) clearInterval(heartbeatInterval);
      if (socket) {
        socket.close();
      }
    };
  }, [discordId, fallbackStatus]);

  return { presence, loading };
}
