export type GamePlatform = 'PC' | 'PlayStation' | 'Xbox' | 'Switch' | 'Steam' | 'Mobile';

export type GameStatus = 'Playing' | 'Finished' | 'Favorite' | 'Occasionally';

export type ProjectStatus = 'Active' | 'Experiment' | 'Finished' | 'Paused';

export interface GameItem {
  name: string;
  platform: GamePlatform;
  status: GameStatus;
  note?: string;
  image?: string;
}

export interface ProjectItem {
  name: string;
  description: string;
  status: ProjectStatus;
  tags: string[];
  link?: string;
  github?: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface SocialLink {
  label: string;
  url: string;
  icon: 'github' | 'steam' | 'twitch' | 'youtube' | 'spotify' | 'x' | 'mail' | 'web';
  description?: string;
}

export interface SectionConfig {
  enabled: boolean;
  title?: string;
}

export interface ProfileConfig {
  displayName: string;
  username: string;
  pronouns?: string;
  avatar: string;
  banner?: string; // Optional banner image URL
  bannerColor?: string; // Fallback banner background hex (e.g. '#1e2330' or Discord default)
  tagline: string;
  status?: string;
  about: string[];
  currently?: {
    playing?: string;
    building?: string;
    learning?: string;
    watching?: string;
    listening?: string;
  };
  interests: string[];
  games: GameItem[];
  projects: ProjectItem[];
  skills: SkillGroup[];
  favorites?: Record<string, string[]>;
  links: SocialLink[];
  discord: {
    id?: string; // Discord user snowflake ID for live Lanyard presence (e.g. "123456789012345678")
    showPresence?: boolean;
    fallbackStatus?: 'online' | 'idle' | 'dnd' | 'offline';
  };
  sections: {
    about: SectionConfig;
    currently: SectionConfig;
    projects: SectionConfig;
    games: SectionConfig;
    skills: SectionConfig;
    interests: SectionConfig;
    favorites: SectionConfig;
    links: SectionConfig;
  };
  theme: {
    accentColor: string; // Accent color hex (default '#5865F2')
    accentMuted: string; // Muted tone for borders/backgrounds
    backgroundEffect?: 'stars' | 'aurora' | 'grid' | 'none';
  };
}

export interface DiscordPresence {
  online: boolean;
  status: 'online' | 'idle' | 'dnd' | 'offline';
  customStatus?: string;
  activities: Array<{
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
  }>;
  discordUser?: {
    id: string;
    username: string;
    avatar: string | null;
    discriminator: string;
    global_name?: string;
  };
}
