---
title: "Islands Slowly Suffocate Under Their Own Uptime"
date: 2026-04-19
dateLabel: "Apr 19, 2026"
category: "Downtime"
summary: >-
  Patch v0.3.9 fixed a memory leak that made Islands degrade the longer they stayed up, disabled crypto OTC trades 'temporarily' for a re-architecture, and stopped players from spamming the accept-trade button into bugged trades.
sources:
  - label: "Islands Changelog"
    url: "https://docs.cambria.gg/islands/changelog"
---

Three lines from one patch:

- "Fixed memory leak issue with Islands that was causing the game to slow down after long periods of uptime."
- "Crypto OTC Trades disabled temporarily while we re-architect the implementation."
- "Prevent spamming accept trade button (led to trading bugs)."

A double-clickable trade confirm in a game where trades move real value is the kind of bug that funds a bug bounty.
