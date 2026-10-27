---
title: "The Weekly USDC Settlement Is Retired"
date: 2026-09-06
dateLabel: "Sep 6, 2026"
category: "Economy"
summary: >-
  v0.5.3 replaced weekly USDC settlement with a floating Key pool: Dungeon Coins convert back to Keys at 99%, but only once the pool hits 100,000 Keys, and with per-player and server-wide rate limits until it passes 500,000.
sources:
  - label: "Patch v0.5.3"
    url: "https://docs.cambria.gg/dungeons/patch-notes/patch-v0.5.3"
---

Dungeon Coins became a floating claim on the pool of Keys risked on runs. The rate is re-quoted every two minutes.

While the pool is small, the limits are the story:

- The pool only **opens for conversions once it reaches 100,000 Keys**.
- Below 500,000 Keys ($50k), your 24-hour allowance is "half the Keys you've risked in the last 24 hours, plus 100", on top of a shared hourly budget across all players.
- Conversions pay 99% (99.5% above 500k). The 1% stays in the pool.
- "The weekly USDC settlement is retired." The pool only resets, and pays out pro-rata, on Dungeon balance updates.

The same patch set Dungeon fees to a flat 3% and lowered the max Dungeon risk to 5,000 Keys ($500).
