import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Relative base allows seamless deployment on GitHub Pages repository paths (e.g. username.github.io/discord-bio/)
  // as well as custom root domains.
  base: './',
});
