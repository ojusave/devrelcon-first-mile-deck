# What Makes Developers Actually Ship?

[Open the live deck](https://devrelcon.onrender.com/) and use the right side of the screen to move forward.

This is Ojus Save's DevRelCon NYC workshop about the first mile of developer onboarding: the route between arriving with an idea and reaching the first usable result.

The workshop does not grade onboarding by how short the quickstart looks. It asks whether a developer can find one sensible route, recognize progress, recover from a wrong turn, and tell when the first useful outcome has happened.

## What happens in the deck

| Slides | What you will see | Why it is there |
| --- | --- | --- |
| 1 to 7 | Odysseus takes ten years to get home after Troy. | A clear destination does not guarantee a usable route. Developers also arrive with a destination of their own. |
| 8 to 11 | You try an intentionally difficult onboarding flow while the room dashboard records progress. | Experience the route before discussing it. The dashboard separates the intended route, observed movement, bypassed stages, and backtracking. Slide 11 is reserved for event-specific results and is skipped automatically until its URL is configured. |
| 12 | The deck states exactly what the workshop tracker recorded. | A stopping point tells us where to investigate. It does not tell us why someone stopped. |
| 13 to 17 | Research from 205 documented developer onboarding routes. | See where route choice and unclear success boundaries appear in the inspected documentation. |
| 18 to 24 | The First-Mile Atlas, Calibrate, a developer-champions session, a route-owner handoff, an optional attendee credit, and a Monday action. | Compare one documented route, observe where activity changes, ask what the developer expected, and take one bounded question to the owning team. |

## The three research findings

1. **In 151 of 205 routes, the inspected documentation did not supply one unambiguous default for the selected developer intent.** The workshop policy selected one documented route for those records. The documentation selected one directly in the other 54 records.
2. **Only 83 of 205 routes explicitly named the first-success milestone.** The other 122 reached a demonstrable end without naming that end as the milestone.
3. **A stopping point is not a diagnosis.** The separate blocker inventory contains hundreds of possible explanations. Zero of 790 reason cards is currently eligible to report as a diagnosed cause.

These numbers describe documented routes and a hypothesis inventory. They are not conversion data, developer sentiment, product rankings, or evidence that one platform is better than another.

## What to take back to your team

1. Pick one developer intent and the route that is supposed to serve it.
2. Name the first useful outcome in words a developer can recognize.
3. Use Calibrate to record positions, retries, bounded errors, and completion without storing or sending form values.
4. Watch three to five developer champions attempt that route without rescuing them, then ask what they expected.
5. Bring one stopping point, the champions' explanations, and one next question to the team that owns the route.

Five people form a bounded pilot, not a representative sample. The point is to find a route worth inspecting, not to manufacture a market statistic.

The goal is not to prove that onboarding is bad. The goal is to replace a broad complaint with a specific route, an observable stopping point, and the next question worth answering.

## How Calibrate fits

Calibrate is one way to move from “we think this route is difficult” to “we can see where activity changed.” The deck covers two parts:

1. The browser SDK observes standard DOM routes and field interactions, with manual events available for custom controls.
2. Its closed event contract records interaction state without storing or sending form values, DOM copy, clipboard contents, or full URLs.

Calibrate cannot explain what a developer expected or why a step was not worth continuing. The developer-champions session supplies that context, and the route-owner handoff turns it into one bounded question or change.

## Open and use the workshop

- [Live workshop deck](https://devrelcon.onrender.com/)
- [FakeGPT workshop exercise](https://fakesaaspi.onrender.com/fakegpt)
- [First-Mile Atlas](https://devrelcon-research.onrender.com/)
- [Calibrate instrumentation project](https://github.com/ojusave/usecalibrate)
- [Claim your Render credit code](https://credits-portal-mmdm.onrender.com/claim/devrelcon)
- [Render careers through Ojus's referral link](https://render.com/careers?ashby_jid=4611bde4-47ac-45fc-ab56-235489e52682&utm_source=L51D6eVlVG)

Eligible DevRelCon attendees can sign in with GitHub to check access to the $100 Render credit. Calibrate is Apache-2.0 licensed public source. The published `usecalibrate` package is the manifest-driven workshop kit. The repository also contains the newer DOM-autocapture browser client shown in slides 20 to 22, but that workspace package is not yet published to npm. FakeSaaSPI is publicly inspectable source without a project license, so the repository does not grant reuse rights. The Atlas compares documented routes. It does not diagnose why a developer stopped.

| Control | Action |
| --- | --- |
| Right arrow, Space, or right-side click | Reveal the next item or move forward |
| Left arrow or left-side click | Hide the current item or move back |
| `D` | Switch between the exercise and the live dashboard |
| `F` | Enter or leave fullscreen |
| `N` | Open the synchronized speaker notes |

The slide number in the URL matches the order in the deck: `#1` through `#24`.

Live-room dependency: the event-specific results surface on slide 11 is not connected yet. Normal stage navigation skips it safely. Use the live dashboard on slide 9 for the room debrief until the final results URL is available and rehearsed.

**What Makes Developers Actually Ship?** was prepared for DevRelCon NYC on July 22, 2026 by Ojus Save from Render.

The browser deck, live exercise, research interface, and instrumentation example are separate projects. Their licenses and evidence boundaries are stated above so a workshop resource is not mistaken for a production recommendation or a proven diagnosis.
