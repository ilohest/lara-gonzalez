import { defineConfig } from 'astro/config';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import react from '@astrojs/react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://astro.build/config
export default defineConfig({
    output: "static",
    site: "https://www.laragonzalez.com",
    outDir: "../lara-gonzalez-web/dist",
    integrations: [react()],
    devToolbar: {
      enabled: false
    },
    vite: {
      server: {
        headers: {
          'Content-Security-Policy':
            "script-src 'self' https://cdn-cookieyes.com 'wasm-unsafe-eval' 'inline-speculation-rules';",
        },
      },
      publicDir: 'public',
      resolve: {
          alias: {
            '@lara/components/': `${resolve(__dirname, './src/components')}/`,
            '@lara/public/': `${resolve(__dirname, './src/public')}/`,
            '@lara/templates/': `${resolve(__dirname, './src/templates')}/`,
            '@lara/layout/': `${resolve(__dirname, './src/layout')}/`,
            '@lara/models/': `${resolve(__dirname, './src/models')}/`,
            '@lara/services/': `${resolve(__dirname, './src/services')}/`,
            '@lara/theme/': `${resolve(__dirname, './src/theme')}/`,
            '@lara/utils/': `${resolve(__dirname, './src/utils')}/`,
          },
        },
      },
});
