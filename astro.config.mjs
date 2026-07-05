import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://claudebusole.dev',
  integrations: [tailwind({ applyBaseStyles: false })],
});
