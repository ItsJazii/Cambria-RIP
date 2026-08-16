import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

export const CATEGORIES = ["Exploit", "Economy", "Downtime", "Patch", "Token"] as const;

const events = defineCollection({
  loader: glob({ base: "./src/content/events", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    dateLabel: z.string(),
    category: z.enum(CATEGORIES),
    summary: z.string(),
    sources: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().url(),
        }),
      )
      .min(1),
  }),
});

export const RANKS = ["Legend", "Notorious", "Suspect", "Cleared"] as const;

const shame = defineCollection({
  loader: glob({ base: "./src/content/shame", pattern: "**/[^_]*.md" }),
  schema: z.object({
    name: z.string(),
    handle: z.string().optional(),
    avatar: z.string().optional(),
    charge: z.string().optional(),
    rank: z.enum(RANKS).default("Suspect"),
    dateLabel: z.string().optional(),
    order: z.number().default(100),
    sources: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().url(),
        }),
      )
      .default([]),
  }),
});

export const collections = { events, shame };
