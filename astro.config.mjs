import { copyFileSync, globSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

const legacyHtmlUrls = {
  name: "legacy-html-urls",
  hooks: {
    "astro:build:generated": ({ dir }) => {
      const cwd = fileURLToPath(dir);
      for (const page of globSync("*/**/index.html", { cwd })) {
        copyFileSync(resolve(cwd, page), resolve(cwd, `${dirname(page)}.html`));
      }
      copyFileSync(resolve(cwd, "index.html"), resolve(cwd, "timeline.html"));
    },
  },
};

export default defineConfig({
  site: "https://cambria-rip.vercel.app",
  trailingSlash: "never",
  build: { format: "file" },
  adapter: vercel(),
  integrations: [
    sitemap({ filter: (page) => !/\/(admin|airdrop-checker|hall-of-shame)(\.html)?$/.test(page) }),
    legacyHtmlUrls,
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
