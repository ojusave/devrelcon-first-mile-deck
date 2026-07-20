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

To create another copy, connect the repository from **New > Static Site** in the Render Dashboard and use the settings above. Leave the Build Command empty. The repository is private, so the Render GitHub App and the deploying user both need access.

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

This workshop repository has no public license. Third-party notices in `licenses/` apply only to their respective vendored assets.
