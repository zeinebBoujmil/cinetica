import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: false, // Mode non-headless pour voir l'exécution
    viewport: { width: 1280, height: 720 }, // Dimensions de la fenêtre
    baseURL: 'http://localhost:3000', // Définissez l'URL de base pour votre application
  },
});
