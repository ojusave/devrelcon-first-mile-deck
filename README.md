# DevRelCon NYC workshop deck

Keyboard-driven browser slides for “What Makes Developers Actually Ship?” at DevRelCon NYC on July 22, 2026.

[Open the live deck](https://devrelcon.onrender.com/) · [Try FakeSaaSPI](https://fakesaaspi.onrender.com/) · [Explore the First-Mile Atlas](https://devrelcon-research.onrender.com/)

## Workshop outcome

The workshop helps DevRel practitioners choose one first-success route, separate documentation evidence from observed behavior, and take a small instrumentation proposal to the team that owns the route.

The deck does not claim to diagnose why a developer stopped. It does not rank the researched platforms, treat documentation research as product telemetry, or claim that the live exercise represents developers outside the room.

## Present the deck

| Control | Action |
| --- | --- |
| Right arrow, Space, click, or swipe left | Reveal the next fragment or advance |
| Left arrow or swipe right | Hide the current fragment or go back |
| `D` | Switch between the current slide and the live room route |
| `B` | Toggle a black screen |
| `F` | Toggle fullscreen |
| Home or End | Jump to the first or last slide |

The URL hash stores the slide ID. Fragment state resets after refresh.

### Slide sequence

`1, 2, 3, 4, 5, 6, 21, 7, 12, 8, 22, 11, 14, 15, 23, 24, 25, 19, 17, 16, 18, 20`

Slide 12 is immediately after the participant QR so the room route can stay visible during the live exercise. Slides 9, 10, and 13 were removed.

## Run the 47-minute path

Keep eight minutes outside the planned material for a late start, room movement, technical recovery, or questions.

| Segment | Slides | Time | Speaker job |
| --- | --- | ---: | --- |
| Odyssey and developer intent | 1–6, 21 | 7 min | Tell the story quickly, get the laugh, then connect the destination to developer intent. |
| Exercise setup and live route | 7, 12 | 11 min | Explain safety and the hard cutoff, start the room, keep the projector visible, and stop after eight minutes. |
| Regroup and evidence boundary | 8, 22, 11 | 6 min | Ask people to keep the last screen open. Separate documented route, observed behavior, and missing evidence before discussing collection scope. |
| Documented gates and method | 14, 15 | 5 min | Show four attributable examples. Explain the route selection and comparison limits. |
| Research findings | 23–25 | 7 min | Explain route selection, success boundaries, and diagnostic ambiguity without turning counts into causes. |
| Atlas activity | 19 | 4 min | Ask each person to pick one documented condition worth checking. |
| Instrumentation and team handoff | 17, 16 | 4 min | Show the current SDK state and the five-step engineering ask. |
| Prototype fallback and Monday action | 18, 20 | 3 min | Explain the bounded prototype path, its guardrails, and one concrete next action. |

Hard cutoff: end the live exercise at eight minutes even when few people finish. Completion is not the goal.

## Speaker cues

### Slides 6, 21, and 7

After “He came home alone and unrecognized,” say:

> The destination was clear. The route kept getting in the way.

On slide 21, connect that directly to the room:

> Developers arrive with something they want to build. Setup is work they accept only while it still looks connected to that result.

On slide 7, read the safety instruction aloud. Say that completion is not required and that participants may stop when the next step is no longer worth it.

### Slides 12, 8, and 22

Do not narrate the live route as emotion or cause. At the cutoff, move to slide 8 and say:

> Keep your last screen open. The projector showed where this room reached and what the app recorded. It did not tell us why anyone stopped.

Then use slide 22 to name the three evidence types before explaining collection scope on slide 11.

### Slides 23 through 25

Use the consequence printed on each slide. Do not add a claim that the counts describe market frequency, developer emotion, conversion, or product quality.

### Slide 20

End with the four Monday actions. Do not add a grand conclusion or reopen every resource.

## Recovery paths

| Situation | Fallback |
| --- | --- |
| Low participation | Keep the hard cutoff. Describe only the behavior actually visible. The research section still works without a large room sample. |
| No usable device | Invite the attendee to watch the projected route. Do not require pairing or public participation. |
| Participant network failure | Read `fakesaaspi.onrender.com` once. If the room cannot connect, skip the exercise and state that no room behavior was observed. |
| Dashboard failure | Press `D` to return to the previous slide. Use slide 8 as the holding screen and debrief only what participants volunteer. Do not claim aggregate observations. |
| Atlas failure | Read one of the four documented examples on slide 14 and ask participants which condition they would verify in their own route. |
| Running late | Preserve slides 7, 8, 22, 11, 15, 23–25, 16, and 20. Cut the Atlas activity first, then shorten the Odyssey to slides 1, 3, 6, and 21. |

## Evidence and source boundaries

Research counts were reproduced from the two local research repositories on July 21, 2026.

- 151 of 205 records explicitly state that the selected route needed the workshop selection policy. The sensitivity count is 82 of 136 after excluding 69 compact re-researched records.
- 83 of 205 records use an explicitly named first-success boundary. 122 use a demonstrated terminal state. The sensitivity counts are 59 of 136 and 77 of 136.
- The reason inventory contains 11 universal families and 200 hypotheses mapped to learning/setup or implementation. Zero of 790 individual reason cards are eligible to diagnose a cause.

The gate examples use current official pages:

- [Airwallex sandbox environment](https://www.airwallex.com/docs/developer-tools/sandbox-environment)
- [Akamai Cloud getting started](https://techdocs.akamai.com/cloud-computing/docs/getting-started)
- [Airtable personal access tokens](https://support.airtable.com/docs/creating-personal-access-tokens)
- [Ably JavaScript getting started](https://ably.com/docs/getting-started/javascript) and [Ably authentication](https://ably.com/docs/auth)

## Resource state

- [Firstmile](https://github.com/ojusave/firstmile) is public Apache-2.0 source. The SDK is not published to npm. It currently requires Node 20 or newer and is ESM-only.
- [FakeSaaSPI](https://github.com/ojusave/fakesaaspi) is publicly inspectable source without a project license. No public reuse rights are granted.
- [First-Mile Atlas](https://devrelcon-research.onrender.com/) publishes documented route comparisons. It is not a diagnostic tool.
- The separate reasons repository supports the ambiguity finding. It is intentionally not linked from the slides.

## Configure workshop assets

Edit `config.js` when a workshop URL, evidence count, timer, or contact line changes.

| Value | Purpose |
| --- | --- |
| `fakegptUrl` | Participant exercise |
| `dashboardUrl` | Full-bleed live room route |
| `takeaways.firstmile` | Firstmile repository |
| `takeaways.fakesaaspiKit` | FakeSaaSPI repository reference |
| `takeaways.comparison` | First-Mile Atlas |
| `stats` | Reproduced findings shown on slides 23 through 25 |
| `contact` | Closing contact line |

A null URL renders a fixed-size placeholder. Configured QR codes are generated locally.

## Verify locally

Prerequisites: Python 3 for a static server and Node.js for the structural check.

```sh
node scripts/check-deck.mjs
python3 -m http.server 4173
```

Open `http://localhost:4173`. Test both `1920x1080` and `1280x720`, every direct hash, ArrowRight, ArrowLeft, Home, End, `B`, `D`, click, and one swipe. Confirm the participant app, dashboard iframe, Atlas, and Firstmile destinations load.

## Deploy and operate

The production deck is an existing Render Static Site at [devrelcon.onrender.com](https://devrelcon.onrender.com/). It deploys automatically from `main`. Do not change the service configuration for deck content updates.

After deployment, verify the exact deployed commit, the root page, `/#7`, `/#12`, `/#22`, and the dashboard toggle.

## Project structure

| Path | Purpose |
| --- | --- |
| `index.html` | Slide content and semantic structure |
| `deck.js` | Navigation, fragments, QR codes, dashboard mode, and configuration rendering |
| `config.js` | Workshop URLs, evidence counts, timer, and contact text |
| `styles.css` and `theme-bright.css` | Fixed 1920 by 1080 stage and visual theme |
| `scripts/check-deck.mjs` | Structural, wording, and configuration checks |
| `assets/` | Local visual assets |
| `licenses/` | Notices for vendored dependencies |

## Contributing and license

Open a focused pull request against `main` and list the viewport and control paths tested.

No project-level license has been chosen for this deck. Third-party notices in `licenses/` apply only to their respective vendored assets.
