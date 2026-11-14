---
slug: sketchroom
title: Sketchroom
summary: A real-time planning canvas whose AI copilot draws onto the board you already have.
status: Live
live: https://sketchroom-eight.vercel.app
repo: https://github.com/frontenddevmichael/Sketchroom
metric: TODO
images:
  - src: /work/sketchroom/d.webp
    alt: Sketchroom home page: 'Where wild ideas become actionable plans', with a shared planning canvas below and two cursors on it.
  - src: /work/sketchroom/m.webp
    alt: The Sketchroom home page on a phone.
---

## The problem

Planning sessions end as a photo of a whiteboard. Remote teams lose the thinking behind the shapes, and the AI tools that draw diagrams start from an empty canvas instead of the plan already on screen. Sketchroom keeps the board shared and makes the copilot read it before it draws.

## The product

- A live canvas built on tldraw, with cursors, selections and presence.
- An AI copilot that returns structured blocks and edges and places them on the board.
- Collision-aware layout so new diagrams extend the canvas instead of stacking on top of it.
- Version history with restore, plus image and document export.
- Invites and roles, and a free tier metered per room and per AI suggestion.

## My role
Product architect, UI/UX designer and build orchestrator. I defined what Docket is and how it is put together, wrote the PRD and the input-expansion spec, decomposed the work into phases and directed AI agents  through them, then reviewed and gated what came back before it shipped. 

## Key decisions

**Convex for the backend.** Reactive queries match the way a shared canvas behaves. Wiring realtime channels by hand against a relational database would have meant rebuilding presence myself.

**The AI provider is three environment variables.** Base URL, key and model are set server-side, so switching from Gemini to OpenRouter or OpenAI needs no code change.

**Prompts carry canvas state.** The model receives every shape on the page with its position, so it can extend an existing flow rather than invent a parallel one.

## How it was built

Nine Convex unit test files run against an in-memory backend, so tests need no deployment or credentials. Playwright smoke tests run against a harness that stubs the backend. Free-plan limits are enforced in one module that the dashboard meters read from, so the cap and the counter cannot drift apart.

## Outcome

Live, canvas behind an account. Metric: TODO.

## Links

Live: https://sketchroom-eight.vercel.app
Repo: https://github.com/frontenddevmichael/Sketchroom
