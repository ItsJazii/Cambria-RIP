import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://cambria-rip.vercel.app",
  trailingSlash: "never",
  build: { format: "file" },
  adapter: vercel(),
  integrations: [sitemap({ filter: (page) => !/\/(admin|airdrop-checker|hall-of-shame)(\.html)?$/.test(page) })],
  vite: {
    plugins: [tailwindcss()],
  },
});
