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
| 13 to 17 | A frozen research snapshot of 205 documented developer onboarding routes. | Understand how the records were selected, how terminal states were classified, and why a stopping point still needs another observation. |
| 18 to 24 | The Developer Journey Atlas, Calibrate, a developer-champions session, a route-owner handoff, an optional attendee credit, and a Monday action. | Inspect one documented route, observe where activity changes, ask what the developer expected, and take one bounded question to the owning team. |

## What the research can support

1. **In 151 of 205 source records, the selection basis says workshop policy affected route selection or normalization.** This is a research-method disclosure, not evidence that 151 platforms lacked a default route.
2. **Eighty-three of 205 records classify the terminal as an explicitly named first-success milestone.** The other 122 classify it as a demonstrated terminal state without that milestone being named.
3. **A stopping point is not a diagnosis.** Permissions, billing, an error, time, or another condition can produce the same recorded position. One more observation or question is required.

These numbers describe a frozen documentation snapshot. They are not conversion data, developer sentiment, product rankings, or evidence that one platform is better than another.

## What to take back to your team

1. Pick one developer intent and the route that is supposed to serve it.
2. Name the first useful outcome in words a developer can recognize.
3. Use Calibrate, existing analytics, logs, or careful notes to record where activity changes. The tool is optional.
4. Watch three to five developer champions attempt that route without rescuing them, then ask what they expected.
5. Bring one stopping point, the champions' explanations, and one next question to the team that owns the route.

Five people form a bounded pilot, not a representative sample. The point is to find a route worth inspecting, not to manufacture a market statistic.

The goal is not to prove that onboarding is bad. The goal is to replace a broad complaint with a specific route, an observable stopping point, and the next question worth answering.

## How Calibrate fits

Calibrate is one way to move from “we think this route is difficult” to “we can see where activity changed.” The deck distinguishes two implementations:

1. The published `usecalibrate` package uses stable route and step IDs supplied by the application.
2. The repository also contains an experimental DOM-autocapture browser client. It derives empty or filled state without storing or sending the value. Custom controls can require manual instrumentation.

Calibrate cannot explain what a developer expected or why a step was not worth continuing. The developer-champions session supplies that context, and the route-owner handoff turns it into one bounded question or change.

## Open and use the workshop

- [Live workshop deck](https://devrelcon.onrender.com/)
- [FakeGPT workshop exercise](https://fakesaaspi.onrender.com/fakegpt)
- [Developer Journey Atlas](https://developer-journey-atlas.onrender.com/)
- [Calibrate instrumentation project](https://github.com/ojusave/usecalibrate)
- [Request a Render credit code](https://credits-portal-mmdm.onrender.com/claim/devrelcon)
- [Render careers through Ojus's referral link](https://render.com/careers?ashby_jid=4611bde4-47ac-45fc-ab56-235489e52682&utm_source=L51D6eVlVG)

The credit portal requires GitHub sign-in and reports whether a code is available or pending. It does not connect a repository or deploy an application. Calibrate is Apache-2.0 licensed public source. The published `usecalibrate` package is the manifest-driven workshop kit. The repository also contains the experimental DOM-autocapture browser client shown on slides 19 and 20, but that workspace package is not published to npm. FakeSaaSPI is publicly inspectable source without a project license, so the repository does not grant reuse rights. The Atlas describes documented routes. It does not diagnose why a developer stopped.

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
