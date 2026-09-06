import React, { useState } from 'react';
import { loadProfileConfig, saveProfileConfig } from './lib/storage';
import { useDiscordPresence } from './lib/discord';
import { useHearts } from './lib/hearts';
import { ProfileHeader } from './components/ProfileHeader';
import { AboutSection } from './components/AboutSection';
import { CurrentlySection } from './components/CurrentlySection';
import { ProjectsSection } from './components/ProjectsSection';
import { GamesSection } from './components/GamesSection';
import { SkillsSection } from './components/SkillsSection';
import { InterestsSection } from './components/InterestsSection';
import { FavoritesSection } from './components/FavoritesSection';
import { SocialLinks } from './components/SocialLinks';
import { Footer } from './components/Footer';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { BackgroundToggle } from './components/BackgroundToggle';
import { ProfileConfig } from './types/profile';

export const App: React.FC = () => {
  const [profile, setProfile] = useState<ProfileConfig>(() => loadProfileConfig());

  const { presence } = useDiscordPresence(
    profile.discord.id,
    profile.discord.fallbackStatus
  );

  const { hasLiked, count: heartsCount, toggleHeart, isUpdating: isUpdatingHeart } = useHearts();

  const handleSaveProfile = (newConfig: ProfileConfig) => {
    saveProfileConfig(newConfig);
    setProfile(newConfig);
  };

  const handleChangeBg = (effect: 'stars' | 'aurora' | 'grid' | 'none') => {
    const updated: ProfileConfig = {
      ...profile,
      theme: {
        ...profile.theme,
        backgroundEffect: effect,
      },
    };
    handleSaveProfile(updated);
  };

  const { sections } = profile;

  return (
    <div className="min-h-screen bg-[#090a0f] text-[#f0f2f5] antialiased selection:bg-[#5865F2]/30 selection:text-white relative">
      {/* Living animated background canvas */}
      <BackgroundCanvas effect={profile.theme?.backgroundEffect || 'stars'} />

      {/* Restrained subtle dark ambient top glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-36 opacity-[0.02] blur-3xl bg-[#5865F2]"
        aria-hidden="true"
      />

      {/* Main Container - Editorial single column layout */}
      <main className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
        {/* Header with authentic Discord profile banner & squircle cutout avatar */}
        <ProfileHeader
          config={profile}
          presence={presence}
          heartsCount={heartsCount}
          hasLiked={hasLiked}
          onToggleHeart={toggleHeart}
          isUpdatingHeart={isUpdatingHeart}
        />

        {/* Modular Content Sections */}
        <div className="space-y-6">
          {sections.about?.enabled && (
            <AboutSection
              paragraphs={profile.about}
              title={sections.about.title}
            />
          )}

          {sections.currently?.enabled && (
            <CurrentlySection
              currently={profile.currently}
              title={sections.currently.title}
            />
          )}

          {sections.projects?.enabled && (
            <ProjectsSection
              projects={profile.projects}
              title={sections.projects.title}
            />
          )}

          {sections.games?.enabled && (
            <GamesSection
              games={profile.games}
              title={sections.games.title}
            />
          )}

          {sections.skills?.enabled && (
            <SkillsSection
              skills={profile.skills}
              title={sections.skills.title}
            />
          )}

          {sections.interests?.enabled && (
            <InterestsSection
              interests={profile.interests}
              title={sections.interests.title}
            />
          )}

          {sections.favorites?.enabled && (
            <FavoritesSection
              favorites={profile.favorites}
              title={sections.favorites.title}
            />
          )}

          {sections.links?.enabled && (
            <SocialLinks
              links={profile.links}
              title={sections.links.title}
            />
          )}
        </div>

        {/* Minimal Footer */}
        <Footer username={profile.username} />
      </main>

      {/* Floating Background Effect Switcher */}
      <BackgroundToggle
        current={profile.theme?.backgroundEffect || 'stars'}
        onChange={handleChangeBg}
      />
    </div>
  );
};

export default App;
