import { ProfileConfig } from '../types/profile';

/**
 * =======================================================================
 * OWNER PROFILE CONFIGURATION
 * =======================================================================
 * This is the central file where you can customize all your personal
 * details, games, projects, skills, social links, and section visibility.
 */

export const profileConfig: ProfileConfig = {
  // ---------------------------------------------------------------------
  // 1. Identity & Discord Info
  // ---------------------------------------------------------------------
  displayName: 'ChineseGuy',
  username: 'justach111guy',
  pronouns: 'he/him',
  avatar: '', // Custom avatar preserved from browser or initials fallback
  bannerColor: '#161922',
  banner: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&auto=format&fit=crop&q=80', // Night mountain & moon banner
  tagline: 'website developer, game developer & a good vibecoder :)',
  status: 'building a really fun website!',

  // ---------------------------------------------------------------------
  // 2. Discord Live Presence (Powered by Lanyard)
  // ---------------------------------------------------------------------
  discord: {
    id: '', // Optional: Discord Snowflake ID (discord.gg/lanyard)
    showPresence: true,
    fallbackStatus: 'online', // 'online' | 'idle' | 'dnd' | 'offline'
  },

  // ---------------------------------------------------------------------
  // 3. About Me (Typographic editorial prose)
  // ---------------------------------------------------------------------
  about: [
    "Hey! I'm a developer/vibecoder focused on building web games & applications, fun websites, and interactive/useful tools. Most of my time is spent between VsCode, Antigravity, Cursor etc, playing Blooket KnockOffs, and studying coding/math.",
    "I created this page to share what I'm currently working on, the games I play, and the side projects I play with—without being constrained by Discord's short bio character limit.",
    "Open to DM'S on Discord"
  ],

  // ---------------------------------------------------------------------
  // 4. Currently (High-signal live overview. Empty fields are hidden!)
  // ---------------------------------------------------------------------
  currently: {
    building: 'A Key Performance Indicator between children on families website',
    playing: 'Piddlet',
    learning: 'Javascript',
  },

  // ---------------------------------------------------------------------
  // 5. Selected Projects (Clean editorial list)
  // ---------------------------------------------------------------------
  projects: [
    {
      name: 'Chronos Cache',
      description: 'Ultra-low latency in-memory key-value store built in Rust with lock-free data structures.',
      status: 'Active',
      tags: ['Rust', 'Systems', 'Networking'],
      github: 'https://github.com/oktay',
      link: 'https://github.com/oktay',
    },
    {
      name: 'VoxelCraft Engine',
      description: 'Experimental voxel terrain generator and renderer with greedy meshing and ambient occlusion.',
      status: 'Experiment',
      tags: ['TypeScript', 'WebGL', 'Algorithms'],
      github: 'https://github.com/oktay',
    },
    {
      name: 'Echo Lanyard Bot',
      description: 'Lightweight Discord presence relay and webhook dispatcher for personal portfolios.',
      status: 'Finished',
      tags: ['Go', 'Discord API', 'WebSockets'],
      github: 'https://github.com/oktay',
    },
  ],

  // ---------------------------------------------------------------------
  // 6. Games (Compact backlog format with platforms & notes)
  // ---------------------------------------------------------------------
  games: [
    {
      name: 'Deadlock',
      platform: 'Steam',
      status: 'Playing',
      note: 'Seven / Infernus enthusiast • experimenting with builds',
    },
    {
      name: 'Valorant',
      platform: 'PC',
      status: 'Playing',
      note: 'Ascendant • Initiator / Controller flex',
    },
    {
      name: 'Elden Ring',
      platform: 'Steam',
      status: 'Finished',
      note: '100% completed • Shadow of the Erdtree finished',
    },
    {
      name: 'Factorio',
      platform: 'Steam',
      status: 'Favorite',
      note: 'The factory must grow. Space Age megabase in progress',
    },
    {
      name: 'The Legend of Zelda: Tears of the Kingdom',
      platform: 'Switch',
      status: 'Favorite',
      note: 'Pure engineering sandbox joy',
    },
    {
      name: 'Chess.com',
      platform: 'PC',
      status: 'Occasionally',
      note: '~1550 Rapid • Vienna & Caro-Kann',
    },
  ],

  // ---------------------------------------------------------------------
  // 7. Skills (Categorized domains, NO fake percentage bars!)
  // ---------------------------------------------------------------------
  skills: [
    {
      category: 'Languages & Core',
      items: ['Javascript', 'HTML', 'CSS', 'Typescript', 'SQL'],
    },
    {
      category: 'Frameworks & Systems',
      items: ['React / Next.js', 'Node.js', 'Tailwind CSS', 'PostgreSQL'],
    },
    {
      category: 'Tools & Workflow',
      items: ['Git', 'Bash'],
    },
  ],

  // ---------------------------------------------------------------------
  // 8. Interests (Minimalist inline tags)
  // ---------------------------------------------------------------------
  interests: [
    'coding',
    'vibecoding',
    'playing games',
    'building fun things',
    'solving math problems',
  ],

  // ---------------------------------------------------------------------
  // 9. Favorites (Optional categories. Disabled by default)
  // ---------------------------------------------------------------------
  favorites: {},

  // ---------------------------------------------------------------------
  // 10. External Profiles & Links
  // ---------------------------------------------------------------------
  links: [
    {
      label: 'GitHub',
      url: 'https://github.com',
      icon: 'github',
      description: 'Open-source projects & code',
    },
    {
      label: 'YouTube',
      url: 'https://youtube.com',
      icon: 'youtube',
      description: 'Tech clips & highlights',
    },
    {
      label: 'Email',
      url: 'mailto:contact@example.com',
      icon: 'mail',
      description: 'Direct contact',
    },
    {
      label: 'Spotify',
      url: 'https://spotify.com',
      icon: 'spotify',
      description: 'Coding playlists & favorites',
    },
  ],

  // ---------------------------------------------------------------------
  // 11. Section Visibility Toggles & Custom Titles
  // ---------------------------------------------------------------------
  sections: {
    about: { enabled: true, title: 'About' },
    currently: { enabled: true, title: 'Currently' },
    projects: { enabled: true, title: 'Selected Projects' },
    games: { enabled: true, title: 'Games' },
    skills: { enabled: true, title: 'Skills & Domains' },
    interests: { enabled: true, title: 'Interests' },
    favorites: { enabled: false, title: 'Favorites' }, // Disabled
    links: { enabled: true, title: 'Find Me Online' },
  },

  // ---------------------------------------------------------------------
  // 12. Theme Accent
  // ---------------------------------------------------------------------
  theme: {
    accentColor: '#5865F2', // Discord Blurple
    accentMuted: 'rgba(88, 101, 242, 0.15)',
    backgroundEffect: 'stars', // 'stars' | 'aurora' | 'grid' | 'none'
  },
};
