import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: 'https://claudebusole.dev',
  integrations: [tailwind({ applyBaseStyles: false })],
  output: "hybrid",
  adapter: cloudflare()
});