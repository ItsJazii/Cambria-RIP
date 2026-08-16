---
title: "A Patch Prints 6.15 Million Keys That Should Not Exist"
date: 2026-08-10
dateLabel: "Aug 10, 2026"
category: "Exploit"
summary: >-
  An August 10 patch let players target T1 emeralds, which - stacked with Brews and faster fishing - massively over-emitted key value. T1 emeralds carried an incorrect EV from a minimum $1 floor that made them 23.5% more valuable than designed.
sources:
  - label: "Aug 13: Emerald Bug"
    url: "https://blog.cambria.gg/aug-13-emerald-bug/"
---

On Monday August 10th, Cambria shipped a patch that let players specifically target T1 emeralds. Combined with Brew stacking and faster fishing, this produced a massive over-emission of key value: roughly 6.15 million keys that should never have existed.

The root cause was mundane. A minimum $1 floor gave T1 emeralds an incorrect expected value, making them 23.5% more valuable than designed. In an economy where keys are withdrawable, a 23.5% EV error is not a tuning miss - it is an open faucet, and it ran for three days.
