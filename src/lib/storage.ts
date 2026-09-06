import { ProfileConfig } from '../types/profile';
import { profileConfig as defaultConfig } from '../config/profile';

const STORAGE_KEY_CONFIG = 'discord_bio_profile_custom_config';

export function loadProfileConfig(): ProfileConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Merge with default config to ensure all fields and sections are present
      return {
        ...defaultConfig,
        ...parsed,
        sections: {
          ...defaultConfig.sections,
          ...(parsed.sections || {}),
        },
        currently: {
          ...defaultConfig.currently,
          ...(parsed.currently || {}),
        },
        discord: {
          ...defaultConfig.discord,
          ...(parsed.discord || {}),
        },
        theme: {
          ...defaultConfig.theme,
          ...(parsed.theme || {}),
        },
      };
    }
  } catch (err) {
    console.warn('Failed to load profile config from localStorage:', err);
  }
  return defaultConfig;
}

export function saveProfileConfig(config: ProfileConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  } catch (err) {
    console.warn('Failed to save profile config to localStorage:', err);
  }
}

export function resetProfileConfig(): ProfileConfig {
  try {
    localStorage.removeItem(STORAGE_KEY_CONFIG);
  } catch (err) {
    console.warn('Failed to clear profile config from localStorage:', err);
  }
  return defaultConfig;
}

export function exportProfileConfigToTypeScript(config: ProfileConfig): string {
  return `import { ProfileConfig } from '../types/profile';

/**
 * =======================================================================
 * OWNER PROFILE CONFIGURATION
 * Generated via Owner Edit Panel
 * =======================================================================
 */

export const profileConfig: ProfileConfig = ${JSON.stringify(config, null, 2)};
`;
}
