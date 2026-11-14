---
slug: correr
title: Correr
summary: An accountability app where commitments get checked daily and reviewed weekly, with an AI coach that only runs on the server.
status: Beta
live: TODO
repo: https://github.com/frontenddevmichael/correr-app
metric: TODO
---

## The problem

Goals fail quietly. A commitment made on Monday is forgotten by Thursday, and nothing in a to-do app ever asks how it went. Correr is built around the follow-up: a daily check-in, a weekly review and a coach that knows what you promised.

## The product

- Commitments with due dates, marked missed when they pass.
- Daily check-ins and weekly reviews, timed in each person's own timezone.
- An AI coach for conversations and an AI roadmap generated to a strict schema.
- Circles, public or private, so a group can hold each other to the same commitments.
- Reminders that respect quiet hours, on iOS, Android and web.

## My role

Product architect and build orchestrator. I set the product scope and the constraints, drove the build, and reviewed each phase before the next one started. 
## Key decisions

**AI keys live only on the server.** Every AI call runs in a Convex action, so the OpenRouter key never appears in an `EXPO_PUBLIC_` variable or in the client bundle.

**Timezone belongs to the profile, not the device.** A check-in made at 8pm in Lagos counts for the Lagos day. The client syncs its detected timezone when the profile loads, and the reminder jobs use that value.

**A schema, one retry, then a stub.** Roadmap requests use a strict JSON schema, retry once if the response is malformed or truncated, and fall back to a local stub so the screen never hard-fails.

## How it was built

Three scheduled jobs handle missed commitments, reminder creation and expired rate limits. Unit tests cover day boundaries, reminder windows and AI text handling. Typecheck and lint run in CI, and EAS build profiles are defined for development, preview and production.

## Outcome

Beta, not public. Email and password sign-in works; Google sign-in and billing are stubbed. The first EAS build still needs the Expo project ID, so there is no install link yet. Metric: TODO.

## Links

Repo: https://github.com/frontenddevmichael/correr-app
