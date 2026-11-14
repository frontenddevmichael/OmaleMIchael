---
slug: zelion
title: Zelion
summary: Client work at Zelion Advanced Systems: an admin page, a landing page refactor and a newsletter system that drafts itself.
status: Company work
live: https://zelionsystems.com
repo: TODO
metric: TODO
images:
  - src: /work/zelion/d.webp
    alt: The Zelion Advanced Systems landing page after the refactor.
  - src: /work/zelion/m.webp
    alt: The Zelion Advanced Systems landing page on a phone.
---

## The problem

The company site had no place to manage what it published. Newsletter updates were assembled by hand: someone read the feed, summarised what changed and wrote the email. That work is repeatable, and it stopped happening on busy weeks.

## The product

Built in React with Vite and plain CSS, so it stays light and matches the site it belongs to.

- An admin page for the site, so content changes do not need a developer.
- A refactor of the landing page.
- A newsletter system that uses the site's RSS feed as its content layer.
- An AI layer that summarises changes and drafts the issue.
- A person approves and sends from the admin page, with the backend on Cloudflare.

## My role

Intern at Zelion Advanced Systems, 2026 to now. I built these three pieces: the admin page, the landing page refactor and the newsletter automation, from the data flow through to the interface.

## Key decisions

**RSS as the source of truth.** The feed already describes what changed on the site, so the newsletter reads it rather than duplicating content into a second place that can fall out of date.

**Draft, then approve.** The AI writes the issue, a person sends it. Nothing goes to subscribers without a human reading it first.

**Admin on the same stack as the site.** Keeping the admin inside the existing frontend avoided a second deployment and a second login for a small team.

## How it was built

RSS in, an AI summary pass, a drafted issue, an approval step and a send, all behind the admin page. The code is private, so this is the written version rather than a repository link.

## Outcome

In use at Zelion. Metric: TODO.

## Links

Live: https://zelionsystems.com
