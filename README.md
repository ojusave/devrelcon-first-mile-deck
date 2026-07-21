# What Makes Developers Actually Ship?

[Open the live deck](https://devrelcon.onrender.com/) and use the right side of the screen to move forward.

This is Ojus Save's DevRelCon NYC workshop about the first mile of developer onboarding: the route between arriving with an idea and reaching the first usable result.

The workshop does not grade onboarding by how short the quickstart looks. It asks whether a developer can find one sensible route, recognize progress, recover from a wrong turn, and tell when the first useful outcome has happened.

## What happens in the deck

| Slides | What you will see | Why it is there |
| --- | --- | --- |
| 1 to 7 | Odysseus takes ten years to get home after Troy. | A clear destination does not guarantee a usable route. Developers also arrive with a destination of their own. |
| 8 to 11 | You try an intentionally difficult onboarding flow while the room dashboard records progress. | Experience the route before discussing it. Slide 11 is reserved for event-specific results and may show a placeholder outside the live workshop. |
| 12 to 13 | The deck separates the documented route, observed behavior, and the explanation that is still missing. | A stopping point tells us where to investigate. It does not tell us why someone stopped. |
| 14 to 18 | Research from 205 documented developer onboarding routes. | See where route choice and unclear success boundaries appear in the inspected documentation. |
| 19 to 23 | The First-Mile Atlas, a small instrumentation example, an engineering handoff, and a Monday action. | Turn one onboarding concern into a route the owning team can inspect and improve. |

## The three research findings

1. **151 of 205 routes needed a selection rule.** For these records, the inspected documentation did not supply one unambiguous default route for the chosen developer intent.
2. **Only 83 of 205 routes explicitly named the first-success milestone.** The other 122 reached a demonstrable end without naming that end as the milestone.
3. **A stopping point is not a diagnosis.** The separate blocker inventory contains hundreds of possible explanations. Zero of 790 reason cards is currently eligible to report as a diagnosed cause.

These numbers describe documented routes and a hypothesis inventory. They are not conversion data, developer sentiment, product rankings, or evidence that one platform is better than another.

## What to take back to your team

1. Pick one developer intent and the route that is supposed to serve it.
2. Name the first useful outcome in words a developer can recognize.
3. Record positions, retries, bounded errors, and completion without recording form contents.
4. Put a small number of intended developers through that route.
5. Bring the stopping points and missing evidence to the team that owns the route.

Five people form a bounded pilot, not a representative sample. The point is to find a route worth inspecting, not to manufacture a market statistic.

The goal is not to prove that onboarding is bad. The goal is to replace a broad complaint with a specific route, an observable stopping point, and the next question worth answering.

## Open and use the workshop

- [Live workshop deck](https://devrelcon.onrender.com/)
- [FakeSaaSPI exercise](https://fakesaaspi.onrender.com/)
- [First-Mile Atlas](https://devrelcon-research.onrender.com/)
- [Calibrate instrumentation project](https://github.com/ojusave/usecalibrate)
- [FakeSaaSPI reference repository](https://github.com/ojusave/fakesaaspi)

Calibrate is Apache-2.0 licensed public source and is published to npm as `usecalibrate`. The deck's “Firstmile” instrumentation example now lives in Calibrate's workshop kit. FakeSaaSPI is publicly inspectable source without a project license, so the repository does not grant reuse rights. The Atlas compares documented routes. It does not diagnose why a developer stopped.

| Control | Action |
| --- | --- |
| Right arrow, Space, or right-side click | Reveal the next item or move forward |
| Left arrow or left-side click | Hide the current item or move back |
| `D` | Switch between the exercise and the live dashboard |
| `F` | Enter or leave fullscreen |
| `N` | Open the synchronized speaker notes |

The slide number in the URL matches the order in the deck: `#1` through `#23`.

**What Makes Developers Actually Ship?** was prepared for DevRelCon NYC on July 22, 2026 by Ojus Save from Render.

The browser deck, live exercise, research interface, and instrumentation example are separate projects. Their licenses and evidence boundaries are stated above so a workshop resource is not mistaken for a production recommendation or a proven diagnosis.
