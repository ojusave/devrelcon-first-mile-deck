# DevRelCon NYC workshop deck

Keyboard-driven browser slides for “What Makes Developers Actually Ship?” at DevRelCon NYC on July 22, 2026.

[Open the live deck](https://devrelcon.onrender.com/) · [Try FakeSaaSPI](https://fakesaaspi.onrender.com/) · [Explore the research](https://devrelcon-research.onrender.com/)

## Highlights

- **Stage-ready controls:** advance by keyboard, click, or swipe; jump to the live projector; blank the screen; or enter fullscreen.
- **Stable slide links:** the URL hash records the current slide, so refreshing or sharing `#7` returns to slide 7.
- **Configuration without layout edits:** workshop URLs, research counts, contact text, and the optional timer live in `config.js`.
- **No build step:** the deck is plain HTML, CSS, and JavaScript with vendored fonts and QR generation.

## Contents

- [Present the deck](#present-the-deck)
- [Run the 55-minute workshop](#run-the-55-minute-workshop)
- [Configure workshop assets](#configure-workshop-assets)
- [Preview locally](#preview-locally)
- [Deploy and operate](#deploy-and-operate)
- [Project structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Contributing and license](#contributing-and-license)

## Present the deck

Open [devrelcon.onrender.com](https://devrelcon.onrender.com/). The live configuration links the participant exercise, projector, and research Atlas used during the workshop.

| Control | Action |
| --- | --- |
| Right arrow, Space, click, or swipe left | Reveal the next fragment or advance |
| Left arrow or swipe right | Hide the current fragment or go back |
| `D` | Switch between the current slide and the live dashboard |
| `B` | Toggle a black screen |
| `F` | Toggle fullscreen |
| Home or End | Jump to the first or last slide |

The URL hash stores the current slide. Fragment state intentionally resets after refresh.

### Speaker cue: slides 6, 21, 7, and 12

After revealing “He came home alone and unrecognized,” say:

> The goal was simple. Getting there wasn’t.

Advance to “Developers don’t arrive to complete your onboarding. They arrive to build something.” Let the line land, then say:

> But the platform puts steps between wanting to build and actually building. Each choice, credential, wait, or configuration asks the developer to keep translating intent into setup. The documented route shows those demands. It does not show us where progress stopped, or why.

Then advance to “Let’s build something.” Do not explain the exercise before attendees scan the QR code. Once they have started, advance to the dashboard and leave it up while their progress appears live.

### Speaker cue: slides 10, 22, and 11

After “Okay, no.” advance to the missing-signal slide. Name the limits of documented paths before the room sees its data. This turns the reveal into solidarity instead of a gotcha. Then advance to the reveal.

### Speaker cue: slides 11 and 13

After the reveal, return to the bag-of-winds callback. The room has already seen the dashboard live.

## Run the 55-minute workshop

Plan 47 minutes of material and keep the final eight minutes available for a late start, room transitions, technical recovery, or questions.

| Segment | Slides | Realistic time | What the time includes |
| --- | --- | --- | --- |
| Odyssey opening and developer intent | 1–6, 21 | 8 minutes | Story, reveals, and the transition from the Odyssey to onboarding |
| Exercise setup | 7, 12 | 3 minutes | Instructions, QR scan, start check, and move to the live dashboard |
| Participant exercise | 8, with 12 via `D` | 10 minutes | Eight minutes to try the flow and two minutes to regroup; completion is not required |
| False ending, missing signal, and reveal | 9–11, 13 | 8 minutes | Fragments, the evidence boundary, dashboard debrief, and bag-of-winds callback |
| Research and implication | 14–16 | 9 minutes | Method, counting boundary, limitations, and the handoff to the team that owns that part of the route |
| Resources and close | 17–20 | 9 minutes | Three practical resources, final QR scan, and close |
| Recovery and questions | N/A | 8 minutes | Preserved buffer, not planned content |

Use a hard cutoff for the exercise. The point is to observe where progress reached, not to get every person through every step.

### Recovery paths

| Failure mode | Fallback |
| --- | --- |
| QR code does not scan | Read out `fakesaaspi.onrender.com` once. If the room still cannot connect, skip participation, keep slide 8 up, and state that room behavior was not observed today. Do not perform the reveal as if it was. |
| Dashboard does not load | Use slide 8 as the holding screen, end the exercise at the planned cutoff, and debrief only what attendees report seeing. Do not claim aggregate room data. |
| Few people participate or finish | Continue at the cutoff. Use the progress that exists and say that the dashboard shows position, not motivation or cause. |
| Someone has no usable device | Invite them to watch the projected room progress. During the debrief, narrate the first three gates and one later failure. Do not require pairing or speaking. |
| The room is running late | Protect the exercise, evidence boundary, research limitations, and final close. Reduce slides 17–19 to one sentence each before cutting any of those sections. |

## Configure workshop assets

Edit `config.js` when a workshop URL, statistic, timer, or contact line changes. Keep layout and presentation logic out of the configuration file.

| Value | Purpose |
| --- | --- |
| `fakegptUrl` | Participant exercise used by the onboarding slides |
| `dashboardUrl` | Full-bleed projector embedded by the dashboard slide |
| `takeaways.firstmile` | Firstmile instrumentation resource |
| `takeaways.fakesaaspiKit` | FakeSaaSPI resource |
| `takeaways.comparison` | Published First-Mile Atlas |
| `trapTimerMinutes` | Optional holding-slide countdown; `null` hides it |
| `stats` | Research values and labels shown in the deck |
| `contact` | Closing contact line |

A null URL renders a fixed-size labeled placeholder. A configured URL renders a locally generated QR code without changing the slide layout.

The Render logo is stored at `assets/render-logo.svg`. Replace it only with an approved asset while keeping the same filename.

## Preview locally

Prerequisite: Python 3 or another static file server.

```sh
python3 -m http.server 4173
```

Open `http://localhost:4173`. Test keyboard navigation, one touch gesture, the dashboard toggle, and at least one direct hash URL before presenting.

## Deploy and operate

The production deck is a Render Static Site at [devrelcon.onrender.com](https://devrelcon.onrender.com/).

| Setting | Value |
| --- | --- |
| Service type | Static Site |
| Build Command | None |
| Publish Directory | `.` |
| Required environment variables | None |

To create another copy, connect the repository from **New > Static Site** in the Render Dashboard and use the settings above. Leave the Build Command empty. The repository is public, so no private-repository access is required.

After deployment, verify the root page, a direct slide hash such as `/#7`, and the dashboard toggle. Build and request logs are available from the service in the Render Dashboard.

## Project structure

| Path | Purpose |
| --- | --- |
| `index.html` | Slide content and semantic structure |
| `deck.js` | Navigation, fragments, QR codes, dashboard mode, and fullscreen behavior |
| `config.js` | Workshop-specific URLs, data, timer, and contact text |
| `styles.css` and `theme-bright.css` | Layout and visual theme |
| `assets/` | Approved local visual assets |
| `licenses/` | Notices for vendored fonts and QR code software |

## Troubleshooting

- **A QR placeholder appears:** set the corresponding URL in `config.js`, then refresh.
- **The dashboard slide is blank:** verify `CONFIG.dashboardUrl` returns `200` and permits iframe embedding.
- **A direct slide opens at the wrong place:** use the numeric slide ID in the hash, such as `#7`.
- **Remote assets appear in a network trace:** investigate before stage use. The configured dashboard iframe is the only intended runtime network request.

## Contributing and license

Open a focused pull request against `main`. Include the browser and control paths you exercised.

No project-level license has been chosen yet; open an issue before building on this. Third-party notices in `licenses/` apply only to their respective vendored assets.
