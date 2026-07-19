# DevRelCon NYC workshop deck

Keyboard-driven browser slides for the DevRelCon NYC workshop on July 22, 2026. The deployable artifact is this folder. It uses plain HTML, CSS, and JavaScript with no build step.

## Configure the deck

Edit only `config.js` when moving from rehearsal placeholders to live assets.

| Value | Purpose |
| --- | --- |
| `fakegptUrl` | Primary exercise URL used on slides 7 and 8 |
| `dashboardUrl` | Dashboard URL embedded on slide 12 |
| `takeaways.firstmile` | Link for the firstmile instrumentation kit |
| `takeaways.fakesaaspiKit` | Link for the forkable fake-platform kit |
| `takeaways.comparison` | Link for the comparison site or waitlist |
| `trapTimerMinutes` | Optional holding-slide countdown in minutes. `null` removes it from the page |
| `stats` | Three research values and labels used on slide 15 |
| `contact` | Closing contact line |

Any null URL renders a fixed-size labeled placeholder. Setting a URL replaces that placeholder with a locally generated QR code without changing the layout.

Replace `assets/render-logo.svg` with the approved Render logo before stage use. Keep the same filename.

## Present

Open `index.html` from a local web server:

```sh
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

Controls:

- Right arrow, Space, click, or swipe left: reveal the next fragment or advance
- Left arrow or swipe right: hide the current fragment or go back
- `D`: switch between the current slide and the dashboard
- `B`: toggle a black screen
- `F`: toggle fullscreen
- Home: first slide
- End: last slide

The URL hash records the current slide, such as `#7`. Refreshing or opening that URL restores the slide. Fragment state intentionally resets.

## Deploy to Render

1. Push this folder as the root of a Git repository.
2. In the Render Dashboard, create a new Static Site and connect the repository.
3. Set the Build Command to `true`.
4. Set the Publish Directory to `.`.
5. Create the site and wait for the deploy to finish.

Choose a neutral site name so the public URL does not expose the workshop mechanic. Render redeploys the site from the linked branch when new commits are pushed unless automatic deploys are disabled.

## Runtime boundary

Fonts and the QR library are vendored locally. The configured dashboard iframe is the only permitted runtime network request. The deck contains no analytics or remote asset dependencies.

Third-party license notices are in `licenses/`.
