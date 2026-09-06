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
  username: 'justachillguy',
  pronouns: 'he/him',
  avatar: `${import.meta.env.BASE_URL}avatar.jpg`, // Custom uploaded Tom & Jerry ninja cat avatar
  bannerColor: '#161922',
  banner: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&auto=format&fit=crop&q=80',
  tagline: 'website developer, game developer & a good vibecoder :)',
  status: 'building a really fun website!',

  // ---------------------------------------------------------------------
  // 2. Discord Live Presence (Powered by Lanyard)
  // ---------------------------------------------------------------------
  discord: {
    id: '1372920261891981362',
    showPresence: true,
    fallbackStatus: 'online',
  },

  // ---------------------------------------------------------------------
  // 3. About Me
  // ---------------------------------------------------------------------
  about: [
    "Hey! I'm a developer/vibecoder focused on building web games & applications, fun websites, and interactive/useful tools. Most of my time is spent between VsCode, Antigravity, Cursor etc, playing Blooket KnockOffs, and studying coding/math.",
    "I created this page to share what I'm currently working on, the games I play, and the side projects I play with—without being constrained by Discord's short bio character limit.",
    "Open to DM'S on Discord",
  ],

  // ---------------------------------------------------------------------
  // 4. Currently
  // ---------------------------------------------------------------------
  currently: {
    building: 'A Key Performance Indicator between children on families website',
    playing: 'Picklet',
    learning: 'Javascript',
    listening: 'Hans Zimmer - Interstellar Cornfield Chase',
    watching: '',
  },

  // ---------------------------------------------------------------------
  // 5. Selected Projects
  // ---------------------------------------------------------------------
  projects: [
    {
      name: 'IPicklet',
      description: 'an Iblooket designed for Picklet :)',
      status: 'Experiment',
      tags: ['Picklet', 'IBlooket', 'Blooket'],
      github: 'https://github.com/KITAYBALA/IPicklet',
      link: 'https://kitaybala.github.io/IPicklet/',
    },
    {
      name: 'Doodlecraft',
      description: 'I did this website for my sister since she loves draawing',
      status: 'Experiment',
      tags: ['Drawing', 'Art', 'OnlineArt', 'Doodle'],
      github: 'https://github.com/KITAYBALA/doodleart',
      link: 'https://kitaybala.github.io/doodleart/',
    },
    {
      name: 'Boomkit',
      description: 'The First Blooket Knock off i have ever built, reached over 250 users :3',
      status: 'Active',
      tags: ['Blooket', 'Knockoff'],
      github: 'https://github.com/KITAYBALA/boomkit',
      link: 'https://boomkit.org/',
    },
  ],

  // ---------------------------------------------------------------------
  // 6. Games
  // ---------------------------------------------------------------------
  games: [
    {
      name: 'Kerbal Space Program',
      platform: 'Steam',
      status: 'Playing',
      note: "I'm not a pro here",
    },
    {
      name: 'Counter-Strike',
      platform: 'Steam',
      status: 'Occasionally',
      note: 'Quit this game',
    },
    {
      name: 'Lichess',
      platform: 'PC',
      status: 'Finished',
      note: 'I like playing chess variants and chess itself. 1700 elo',
    },
  ],

  // ---------------------------------------------------------------------
  // 7. Skills
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
  // 8. Interests
  // ---------------------------------------------------------------------
  interests: [
    'coding',
    'vibecoding',
    'playing games',
    'building fun things',
    'solving math problems',
  ],

  // ---------------------------------------------------------------------
  // 9. Favorites (Disabled)
  // ---------------------------------------------------------------------
  favorites: {},

  // ---------------------------------------------------------------------
  // 10. External Profiles & Links
  // ---------------------------------------------------------------------
  links: [
    {
      label: 'GitHub',
      url: 'https://github.com/KITAYBALA/',
      icon: 'github',
      description: 'Open-source projects & code',
    },
    {
      label: 'YouTube',
      url: 'https://youtube.com/revplayhd',
      icon: 'youtube',
      description: 'Tech clips & highlights',
    },
    {
      label: 'Email',
      url: 'mailto:okinho333@outlook.com',
      icon: 'mail',
      description: 'Direct contact',
    },
    {
      label: 'Spotify',
      url: 'https://open.spotify.com/playlist/1I0aJkPTZoKyzLacGGUxtB',
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
    favorites: { enabled: false, title: 'Favorites' }, // Disabled as requested
    links: { enabled: true, title: 'Find Me Online' },
  },

  // ---------------------------------------------------------------------
  // 12. Theme Accent
  // ---------------------------------------------------------------------
  theme: {
    accentColor: '#5865F2',
    accentMuted: 'rgba(88, 101, 242, 0.15)',
    backgroundEffect: 'stars',
  },
};
