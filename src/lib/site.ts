export const SITE = {
  name: "Cambria.rip",
  title: "Everything That Went Right/Wrong in New Cambria",
  description:
    "A sourced timeline of Cambria incidents - exploits, dupes, rollbacks, outages, disabled mechanics, and the compensation posts that followed.",
  ogImage: "/og-image.png",
  x: "https://x.com/playcambria",
  discord: "https://discord.gg/playcambria",
  blog: "https://blog.cambria.gg",
  docs: "https://docs.cambria.gg",
} as const;

export const CATEGORY_VAR: Record<string, string> = {
  Exploit: "var(--cat-exploit)",
  Economy: "var(--cat-economy)",
  Downtime: "var(--cat-downtime)",
  Patch: "var(--cat-patch)",
  Token: "var(--cat-token)",
};
