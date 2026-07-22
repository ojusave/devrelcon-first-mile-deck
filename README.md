# What Makes Developers Actually Ship?

[Open the live deck](https://devrelcon.onrender.com/) and use the right side of the screen to move forward.

This is Ojus Save's DevRelCon NYC workshop about the first mile of developer onboarding: the route between arriving with an idea and reaching the first usable result.

The workshop does not grade onboarding by how short the quickstart looks. It asks whether a developer can find one sensible route, recognize progress, recover from a wrong turn, and tell when the first useful outcome has happened.

## What happens in the deck

| Slides | What you will see | Why it is there |
| --- | --- | --- |
| 1 to 7 | Odysseus takes ten years to get home after Troy. | A clear destination does not guarantee a usable route. Developers also arrive with a destination of their own. |
| 8 to 11 | You try a workshop onboarding flow while the room dashboard records named route events. | Experience the route before discussing it. The dashboard separates the intended route, observed movement, bypassed stages, and backtracking. Slide 11 is reserved for event-specific results and is skipped automatically until its URL is configured. |
| 12 | The deck states exactly what the workshop tracker recorded. | A stopping point tells us where to investigate. It does not tell us why someone stopped. |
| 13 to 15 | Ojus's research across 224 developer platforms: scope, first-success clarity, and documented route conditions. | Show exactly what Ojus examined, what he found, and what documentation research cannot prove. |
| 16 to 17 | A separate inventory of 790 possible blocker hypotheses and eight concrete examples. | Keep plausible explanations separate from diagnosed causes. |
| 18 | The Developer Journey Atlas and its source-inspection workflow. | Find one documented route, inspect its official sources, and choose one condition to investigate locally. |
| 19 to 22 | Calibrate, two implementation paths, and a ten-person intended-user investigation. | Connect a route hypothesis to observed positions, participant explanations, and one bounded owner handoff. |
| 23 to 24 | An optional attendee credit, contact, and a transparent Render careers link. | Help attendees continue the work without turning the workshop into a product or recruiting pitch. |

## What the research can support

1. **Ojus examined 224 developer platforms.** Each Atlas record covers one selected developer goal and one official documented route. Together, those records contain 2,359 documented route steps grounded in 949 official sources.
2. **Only 74 of the 224 routes explicitly name the first-success milestone.** The other 150 demonstrate a terminal result without naming that result as first success.
3. **The 224 routes contain 1,021 documented gates, with a median of 4 per route.** At least one credential requirement appears in 124 routes, at least one documented choice appears in 103, and at least one documented wait appears in 60. Those categories overlap.
4. **A separate blocker catalog contains 790 possible explanations: 466 universal and 324 platform-specific.** Zero are diagnosis-eligible. The catalog does not establish reasons for frustration, abandonment, or leaving.

These numbers describe a documentation snapshot generated on July 22, 2026. They are not conversion data, developer sentiment, product rankings, or evidence that one platform is better than another.

## What to take back to your team

1. Pick one developer intent and the route that is supposed to serve it.
2. Name the first useful outcome in words a developer can recognize.
3. Use Calibrate, existing analytics, logs, or careful notes to record where activity changes. The tool is optional.
4. Watch ten intended evaluators attempt that route without rescuing them, then ask what they expected.
5. Bring one observed position, the participants' explanations, and one next question to the team that owns the route.

Ten people support pattern discovery, not a representative conversion rate. The point is to find a route worth inspecting, not to manufacture a market statistic.

The goal is not to prove that onboarding is bad. The goal is to replace a broad complaint with a specific route, an observable stopping point, and the next question worth answering.

## How Calibrate fits

Calibrate is one way to move from a documented route hypothesis to named positions in an instrumented route. It records forward or backward movement, completion, elapsed time, bounded machine errors, configured copy or paste outcomes, and an explicit shipped event. It never reads form values, clipboard contents, DOM text, or full URLs.

The current sidecar provides a current-window aggregate, using memory by default and optional JSONL persistence. It is not general product analytics and does not claim trends, cohorts, time series, intent, emotion, or cause. The participant debrief supplies context, and the owner handoff turns the result into one bounded question or next check.

## Open and use the workshop

- [Live workshop deck](https://devrelcon.onrender.com/)
- [FakeGPT workshop exercise](https://fakesaaspi.onrender.com/fakegpt)
- [Developer Journey Atlas](https://developer-journey-atlas.onrender.com/)
- [Calibrate instrumentation project](https://github.com/ojusave/usecalibrate)
- [Request a Render credit code](https://credits-portal-mmdm.onrender.com/claim/devrelcon)
- [Ojus on X](https://x.com/ojusave)
- [Render careers through Ojus's referral link](https://render.com/careers?ashby_jid=4611bde4-47ac-45fc-ab56-235489e52682&utm_source=L51D6eVlVG)

The credit portal requires GitHub sign-in and reports whether a code is available or pending. It does not connect a repository or deploy an application. Calibrate is Apache-2.0 licensed open-source software. npm latest remains `usecalibrate@0.1.3`; the newer guided repository flow is not promoted by the deck. FakeSaaSPI is publicly inspectable source without a project license, so the repository does not grant reuse rights. Atlas software is Apache-2.0 and its original research data is CC BY 4.0. Atlas describes documented routes. It does not diagnose why a developer stopped.

| Control | Action |
| --- | --- |
| Right arrow, Space, or right-side click | Reveal the next item or move forward |
| Left arrow or left-side click | Hide the current item or move back |
| `D` | Switch between the exercise and the live dashboard |
| `F` | Enter or leave fullscreen |
| `N` | Open the synchronized speaker notes |

The speaker-notes view contains the complete script, room cues, timing, fallbacks, evidence boundaries, and sources for every slide. All seven fields are editable and saved in the current browser. Restoring defaults affects only the current slide.

The slide number in the URL matches the order in the deck: `#1` through `#24`.

Live-room dependency: the event-specific results surface on slide 11 is not connected yet. Normal stage navigation skips it safely. Use the live dashboard on slide 9 for the room debrief until the final results URL is available and rehearsed.

**What Makes Developers Actually Ship?** was prepared for DevRelCon NYC on July 22, 2026 by Ojus Save from Render.

The browser deck, live exercise, research interface, and instrumentation example are separate projects. Their licenses and evidence boundaries are stated above so a workshop resource is not mistaken for a production recommendation or a proven diagnosis.
