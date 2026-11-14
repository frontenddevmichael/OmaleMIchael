---
slug: docket
title: Docket
summary: AI test management that turns requirements and screens into a test matrix you can trace.
status: Live
live: https://client-indol-two-76.vercel.app
repo: https://github.com/frontenddevmichael/Docket
metric: TODO
lead: true
images:
  - src: /work/docket/d.webp
    alt: Docket home page: the hero reads 'A screen, its spec, and the verdict stamped', above a session view of test cases marked pass and fail.
  - src: /work/docket/m.webp
    alt: The Docket home page on a phone, hero and test session stacked.
---

## The problem

Small QA teams write test cases by hand across screens, specs and requirements. Coverage drifts, and nobody can say which requirement a given test came from. Docket starts from the material a team already has.

## The product

- Generates test cases from six inputs: screenshots, written requirements, Figma links, GitHub pull requests, API specs and zipped source.
- Runs a request, assign, accept or reject, generate, execute workflow.
- Tracks execution with evidence, eight statuses, environment, severity and priority.
- Keeps an issue log with defect distribution and blockers per project.
- Exports an editable report with coverage, a verdict stamp and a PDF.

Every generated case keeps a link back to the requirement or screen element that produced it, so a failure can be defended in a review.

## My role

Product architect, UI/UX designer and build orchestrator. I defined what Docket is and how it is put together, wrote the PRD and the input-expansion spec, decomposed the work into phases and directed AI agents  through them, then reviewed and gated what came back before it shipped. 
## Key decisions

**The client talks to Supabase directly, with a narrow API for privileged work.** Most reads and writes go through row-level security. A small Express API verifies the user's JWT on every request and holds the service-role key only for AI generation, screenshots and workspace admin. Users get fast queries and the dangerous key never reaches the browser.

**Every case traces to its source.** The link is stored at generation time, not reconstructed later, because the value of a test matrix is the audit trail.

## How it was built

Nineteen database migrations, a root Dockerfile that compiles client and server into one image, and CI that runs lint, typecheck, unit tests and Playwright smoke tests. A separate workflow health-checks the API and Supabase every fifteen minutes and opens an issue when the service is down.

## Outcome

Live and self-serve. Metric: TODO.

## Links

Live: https://client-indol-two-76.vercel.app
Repo: https://github.com/frontenddevmichael/Docket
