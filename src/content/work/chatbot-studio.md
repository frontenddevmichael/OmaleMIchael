---
slug: chatbot-studio
title: ChatBot Studio
summary: A no-code chatbot builder for small businesses that have no help centre and no developer.
status: In development
live: https://chatbotstudio-v2.vercel.app
repo: https://github.com/frontenddevmichael/Chatbotstudio-v2
metric: TODO
images:
  - src: /work/chatbot-studio/d.webp
    alt: ChatBot Studio home page: 'Build chatbots that actually think', with the assistant illustration beside it.
  - src: /work/chatbot-studio/m.webp
    alt: ChatBot Studio home page on a phone.
---

## The problem

Small businesses want a chatbot but sit outside the market. Enterprise tools are priced for support teams and assume a help centre already exists to train on. Most of these businesses have neither, so they buy nothing.

## The product

- A guided builder: name the bot, set the greeting, add knowledge, choose a tone, publish.
- A FAQ layer that expands one question into the variations customers actually type.
- A dashboard for conversations, knowledge and engagement.
- An embeddable widget and an API for the site it belongs to.
- A free tier with ads, and a paid tier without them.

## My role

Product architect and build orchestrator. I ran the competitive analysis that set the direction, prioritised the build across four tiers with an explicit list of what not to build, wrote the design system brief and the five-file prompt suite that drove OpenCode, and reviewed the result before each phase closed.

## Key decisions

**Build for the businesses without documentation.** The original angle, automating health intake, was taken by larger players. The gap that stayed open is the business with no help centre and no budget for enterprise pricing, so the product was rebuilt around that user.

**One codebase for marketing and product.** A single app with an intensity dial for its marketing surfaces avoids maintaining two builds that drift apart.

**Name what will not be built.** The four-tier plan carries an explicit do-not-build list, which kept the scope from expanding every time a feature looked interesting.

## How it was built

A Vite and React frontend with a Supabase backend and edge functions, tested with Vitest across more than fifteen suites, and CI that runs lint, typecheck and tests on every push, then builds and deploys on main.

## Outcome

In development. The deployed page still carries the old product name and points its canonical and social metadata at the old domain, so the rebrand is not visible to visitors or crawlers yet. Metric: TODO.

## Links

Live: https://chatbotstudio-v2.vercel.app
Repo: https://github.com/frontenddevmichael/Chatbotstudio-v2
