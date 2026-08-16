import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://cambria-timeline.pages.dev",
  trailingSlash: "always",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
