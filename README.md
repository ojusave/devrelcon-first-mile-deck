# DevRelCon NYC workshop deck

Keyboard-driven browser slides for “What Makes Developers Actually Ship?” at DevRelCon NYC on July 22, 2026.

[Open the live deck](https://devrelcon.onrender.com/) · [Try FakeSaaSPI](https://fakesaaspi.onrender.com/) · [Explore the First-Mile Atlas](https://devrelcon-research.onrender.com/)

## Workshop outcome

The workshop helps DevRel practitioners choose one first-success route, separate documentation evidence from observed behavior, and take a small instrumentation proposal to the team that owns the route.

The deck does not claim to diagnose why a developer stopped. It does not rank the researched platforms, treat documentation research as product telemetry, or claim that the live exercise represents developers outside the room.

## Present the deck

| Control | Action |
| --- | --- |
| Right arrow, Space, right-side click, or swipe left | Reveal the next fragment or advance |
| Left arrow, left-side click, or swipe right | Hide the current fragment or go back |
| `D` | Switch between the current slide and the live room route |
| `B` | Toggle a black screen |
| `F` | Toggle fullscreen |
| `N` | Open the synchronized speaker-notes window |
| Home or End | Jump to the first or last slide |

The URL hash stores the slide ID. Fragment state resets after refresh.

Open `speaker-notes.html` on the presenter display, or press `N` from the deck. The notes page follows the current slide and can move the deck with its Previous and Next controls when both windows share the same origin.

### Slide sequence

`1, 2, 3, 4, 5, 6, 21, 7, 12, 8, 13, 22, 11, 14, 15, 23, 24, 25, 19, 17, 16, 18, 20`

Slide 12 is immediately after the participant QR so the live dashboard can stay visible during the exercise. Slide 8 stops the room. Slide 13 is the separate real-time results surface used for the debrief. Slides 9 and 10 were removed.

## Run the 47-minute path

Keep eight minutes outside the planned material for a late start, room movement, technical recovery, or questions.

| Segment | Slides | Time | Speaker job |
| --- | --- | ---: | --- |
| Odyssey and developer intent | 1–6, 21 | 7 min | Tell the story quickly, get the laugh, then connect the destination to developer intent. |
| Exercise setup and live dashboard | 7, 12 | 11 min | Explain safety and the hard cutoff, start the room, keep the live dashboard visible, and stop after eight minutes. |
| Regroup, results, and evidence boundary | 8, 13, 22, 11 | 6 min | Stop the room, show the separate real-time results view, then explain what the tracker did and did not record. |
| Documented categories and method | 14, 15 | 5 min | Show four platform categories, then define what one of the 205 route records represents. |
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

### Slides 12, 8, 13, 22, and 11

Keep slide 12 visible during the exercise. At the cutoff, move to slide 8 and say:

> Stop where you are and keep your last screen open.

Move to slide 13 to show the separate real-time results view. Do not narrate position, time, retries, or errors as emotion or cause. Use slide 22 to name the three evidence types, then use slide 11 to state exactly what the tracker did and did not record.

### Slides 23 through 25

Use the consequence printed on each slide. Do not add a claim that the counts describe market frequency, developer emotion, conversion, or product quality.

Slide 23 describes whether the inspected documentation supplied one unambiguous route for the selected intent. Slide 24 describes whether that route explicitly named its first-success milestone. Slide 25 turns one stopping point into three concrete follow-up questions. The blocker hypothesis counts remain in this README, not on the projector.

### Slides 14 through 16

On slide 14, describe the categories first. The examples came from Airwallex for payments, Akamai Cloud for cloud infrastructure, Airtable for data platforms, and Ably for real-time messaging. They are examples, not the most frequent or difficult gates.

On slide 15, explain that every record uses the same unit: one platform, one selected developer intent, one documented route, and one observable end. Slides 23 and 24 use those 205 records.

On slide 16, say:

> Five people form a bounded pilot, not a representative sample. Route ownership is not causal ownership.

### Slide 20

End with the three Monday actions. Do not add a grand conclusion or reopen every resource.

## Recovery paths

| Situation | Fallback |
| --- | --- |
| Low participation | Keep the hard cutoff. Describe only the behavior actually visible. The research section still works without a large room sample. |
| No usable device | Invite the attendee to watch the projected route. Do not require pairing or public participation. |
| Participant network failure | Read `fakesaaspi.onrender.com` once. If the room cannot connect, skip the exercise and state that no room behavior was observed. |
| Dashboard failure | Press `D` to return to the previous slide. Use slide 8 as the holding screen. If slide 13 is also unavailable, debrief only what participants volunteer and do not claim aggregate observations. |
| Atlas failure | Read one of the four documented examples on slide 14 and ask participants which condition they would verify in their own route. |
| Running late | Preserve slides 7, 12, 8, 13, 22, 11, 15, 23–25, 16, and 20. Cut the Atlas activity first, then shorten the Odyssey to slides 1, 3, 6, and 21. |

## Evidence and source boundaries

Research counts were reproduced from the two local research repositories on July 21, 2026.

- 151 of 205 records explicitly state that the selected route needed the workshop selection policy. The sensitivity count is 82 of 136 after excluding 69 compact re-researched records.
- 83 of 205 records use an explicitly named first-success boundary. 122 use a demonstrated terminal state. The sensitivity counts are 59 of 136 and 77 of 136.
- The separate blocker hypothesis graph contains 11 universal cause families and 200 distinct universal candidate reasons for the combined setup and implementation position. Zero of 790 reason cards are currently eligible to report as a diagnosed cause. These are catalog candidates, not observed blockers or prevalence data.

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
| `dashboardUrl` | Full-bleed live dashboard on slide 12 |
| `resultsUrl` | Separate real-time results view on slide 13; null renders a labeled placeholder |
| `takeaways.firstmile` | Firstmile repository |
| `takeaways.fakesaaspiKit` | FakeSaaSPI repository reference |
| `takeaways.comparison` | First-Mile Atlas |
| `stats` | Reproduced findings shown on slides 23 through 25 |
| `contact` | Closing contact line |

A null URL renders a fixed-size placeholder. Configured QR codes are generated locally.

## Verify locally

Prerequisites: Python 3 for a static server and Node.js for the structural check.

Start the server in one terminal:

```sh
python3 -m http.server 4173
```

Run the checks in a second terminal:

```sh
node scripts/check-deck.mjs
NODE_PATH=/path/to/playwright/node_modules node scripts/check-browser.cjs
```

Open `http://localhost:4173`. Test both `1920x1080` and `1280x720`, every direct hash, ArrowRight, ArrowLeft, Home, End, `B`, `D`, click, and one swipe. Confirm the participant app, slide 12 dashboard iframe, slide 13 placeholder or configured results iframe, Atlas, and Firstmile destinations load.

## Deploy and operate

The production deck is an existing Render Static Site at [devrelcon.onrender.com](https://devrelcon.onrender.com/). It deploys automatically from `main`. Do not change the service configuration for deck content updates.

After deployment, verify the exact deployed commit, the root page, `/#7`, `/#12`, `/#8`, `/#13`, `/#22`, and the dashboard toggle.

## Project structure

| Path | Purpose |
| --- | --- |
| `index.html` | Slide content and semantic structure |
| `deck.js` | Navigation, fragments, QR codes, dashboard mode, and configuration rendering |
| `config.js` | Workshop URLs, evidence counts, timer, and contact text |
| `speaker-notes.js` | Purpose, delivery cue, and transition for every slide ID |
| `speaker-notes.html` and `speaker-notes-view.js` | Separate synchronized presenter-notes window |
| `styles.css` and `theme-bright.css` | Fixed 1920 by 1080 stage and visual theme |
| `scripts/check-deck.mjs` | Structural, wording, and configuration checks |
| `assets/` | Local visual assets |
| `licenses/` | Notices for vendored dependencies |

## Contributing and license

Open a focused pull request against `main` and list the viewport and control paths tested.

No project-level license has been chosen for this deck. Third-party notices in `licenses/` apply only to their respective vendored assets.
