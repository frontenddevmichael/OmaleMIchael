---
slug: bells-notes
title: Bells Notes
summary: A free notes and past-questions library for Bells University students, with no account to read or contribute.
status: Live
live: https://bells-notes.omalemcmails.workers.dev
repo: https://github.com/frontenddevmichael/bells-notes
metric: TODO
images:
  - src: /work/bells-notes/d.webp
    alt: Bells Notes home screen with a course search field, Browse the shelves, Search and Contribute cards.
  - src: /work/bells-notes/m.webp
    alt: Bells Notes on a phone, with the search field and Start here cards.
---

## The problem

Course material at Bells University moves through group chats and folders that reset every semester. Past questions disappear with the set that wrote them, and asking a student to create an account before sharing notes loses most of them at the door.

## The product

- Browse and search by department, subject, paper type and year.
- Upvote, bookmark and comment on papers.
- Upload without an account: title, course, level and the file, nothing else.
- A passphrase-gated moderation queue instead of public posting.
- A mobile app on the same backend as the web library.

## My role

Product architect and build orchestrator. I built untop of an existing Google drive library, wrote the specifications and prompts, and directed the phased build through AI coding agents, reviewing and gating each stage.

## Key decisions

**No accounts.** Reading and contributing both work without sign-up. The trade is that moderation carries more weight, which is why submissions land in a queue rather than going live.

**One backend, two clients.** The web app and the Expo app share a Convex backend and a framework-free core of Zod schemas, so the catalogue rules cannot drift between platforms.

**Remove the duplicate, keep the library clean.** The submission mutation rejects an exact title and course match that is already live or pending, so the queue does not fill with the same paper twice.

## How it was built

A Convex backend with scheduled jobs that keep the catalogue in step with its source, a Vue 3 web app with eleven routes, and a React Native app in the same repository. The shared core holds the schema both clients validate against.

## Outcome

Live on Cloudflare Workers. Uploads currently run through the mobile app while the web upload screen is paused, so contributing from the browser is not offered yet. Metric: TODO.

## Links

Live: https://bells-notes.omalemcmails.workers.dev
Repo: https://github.com/frontenddevmichael/bells-notes
