# Personal Discord Bio Profile

A polished, production-quality, single-user personal website engineered to act as an extended bio for Discord. Built to overcome Discord's restrictive bio character count by providing one permanent URL that showcases who you are, what you build, the games you play, your skills, current activities, and where else to find you online.

Designed with **authentic Discord profile DNA + high-end editorial developer aesthetic** and **zero AI slop** (no generic card grids, no glowing blobs, no bloated boxes, and no fake percentage bars).

---

## ⚡ Quick Start

```bash
# Clone or navigate to the repository
cd discord-bio-profile

# Install dependencies
npm install

# Start local dev server
npm run dev
```

Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

---

## 🎛️ Interactive Owner Edit Panel

You can edit your entire profile directly in the browser with **zero code editing** required:

* **Open the Panel:** Press `Ctrl + E` (or `Cmd + E` on Mac) anywhere on the page, or click **"Edit Profile"** in the footer.
* **Live Updates:** Edit your identity, avatar, Discord banner, bio paragraphs, current activity, projects, games, skills, and links.
* **Save & Apply:** Click **"Save & Apply"** to immediately update your live profile (persists in your browser via `localStorage`).
* **Export `profile.ts`:** Click **"Export profile.ts"** to copy or download the generated TypeScript configuration so you can commit it to Git!
* **Reset:** Restore the default profile configuration at any time.

---

## 🛠️ Editing via Code (`src/config/profile.ts`)

If you prefer editing in your code editor, all configuration is stored in **one single file**:

📁 **`src/config/profile.ts`**

### Customization Reference:

| Field | Description | Where to edit in `src/config/profile.ts` |
| :--- | :--- | :--- |
| **Display Name** | Your profile heading | `displayName: 'Your Name'` |
| **Discord Username** | Your handle (used for 1-click copy) | `username: 'your_handle'` |
| **Pronouns** | Optional badge next to your name | `pronouns: 'he/him'` (or `''` to hide) |
| **Avatar** | Profile picture URL or local path | `avatar: 'https://...'` |
| **Banner Color / Image** | Authentic Discord header banner | `bannerColor: '#181b26'`, `banner: ''` |
| **Tagline** | Short one-line summary under your name | `tagline: 'software engineer & gamer'` |
| **Status / Headline** | Custom status text | `status: 'crafting systems'` |
| **About Bio** | Multiple readable paragraphs | `about: ['Paragraph 1...', 'Paragraph 2...']` |
| **Currently** | Live activities (Playing, Building, Learning, Listening, Watching) | `currently: { playing: '...', building: '...' }` *(empty fields auto-hide)* |
| **Projects** | Selected projects with status tags, links, and GitHub | `projects: [ { name: '...', description: '...', tags: [...] } ]` |
| **Games** | Compact backlog format with platform & status | `games: [ { name: '...', platform: 'PC', status: 'Playing', note: '...' } ]` |
| **Skills** | Categorized domains *(no fake percentage bars)* | `skills: [ { category: 'Languages', items: [...] } ]` |
| **Interests** | Subtle inline tags for hobbies and tech interests | `interests: ['Distributed Systems', 'Game Dev', ...]` |
| **Social Links** | GitHub, Steam, Twitch, YouTube, Spotify, X, Email | `links: [ { label: 'GitHub', url: '...', icon: 'github' }, ... ]` |

---

## 🎮 Live Discord Presence (Via Lanyard)

The website includes built-in support for **[Lanyard](https://github.com/Phineas/lanyard)**, which streams your live Discord presence (online/idle/dnd status, game currently playing, or Spotify track) with **zero private tokens exposed client-side**:

1. Join the Lanyard Discord server: [discord.gg/lanyard](https://discord.gg/lanyard)
2. In `src/config/profile.ts` (or the Owner Edit Panel), paste your 18-digit Discord Snowflake ID into `discord.id`:
   ```typescript
   discord: {
     id: '308323056592486420',
     showPresence: true,
     fallbackStatus: 'online',
   }
   ```
3. If left blank or if Discord is offline, the site gracefully falls back to your static profile configuration without any broken placeholders.

---

## 🚀 Deploying to GitHub Pages

This project is pre-configured for seamless GitHub Pages deployment using relative paths (`base: './'`), meaning it works automatically whether hosted on `username.github.io` or `username.github.io/repository-name/`.

### Automated Deployment with GitHub Actions (Recommended)

1. Create a new GitHub repository and push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<REPO_NAME>.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** → **Pages**.
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.
3. Push any commit to `main`, and the included `.github/workflows/deploy.yml` workflow will automatically build and deploy your site!
