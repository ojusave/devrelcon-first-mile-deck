const SPEAKER_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

const SPEAKER_NOTES = {
  1: {
    purpose: "Open with the practical problem and tell the room what kind of workshop this is.",
    say: `• I built three apps, several repositories, and a speaker-notes editor for a workshop about simplifying onboarding. I am aware of the irony.
• Developers arrive with something they want to build. The first mile is everything between that intent and the first result they can use.
• This workshop has two halves. First, we will experience and inspect a deliberately bad route. Then we will turn the evidence into a small action for a real platform.
• This came from a real collaboration I watched fail. The route required more than 20 steps before the first API call, and the collaborator decided the integration was not worth continuing.
• Today we will ask one question: “Can a developer keep making visible progress toward what they came to build?”`,
    transition: "A destination can be perfectly clear while the route still defeats the traveler. Odysseus is the useful example.",
  },
  2: {
    purpose: "Establish how simple the journey looked before anything went wrong.",
    say: `• Odysseus is trying to get home from Troy to Ithaca.
• The straight-line distance is roughly 565 nautical miles.
• Under ordinary sailing conditions, think in weeks, not years.
• The destination is clear, and the plan sounds reasonable.`,
    transition: "The planned route was short. The actual route took ten years.",
  },
  3: {
    purpose: "Create the comic gap between the expected route and the lived route.",
    say: `• The trip took ten years. At that point it is less a journey and more a legacy migration.
• Do not turn this into a history lecture. The useful point is the gap between a simple destination and a route full of interruptions.
• In onboarding, teams often describe the destination while developers experience the route.`,
    transition: "The extra time was not the only cost. The route kept removing people from the journey.",
  },
  4: {
    purpose: "Make the route failures concrete and memorable.",
    say: `• Reveal one beat at a time and let the room react.
• Some of his crew were eaten. Some were turned into pigs. One man fell from a roof.
• The examples are funny at mythological distance, but the pattern matters: every interruption reduces the number of people still moving toward the destination.
• The roof incident is the one onboarding step I could not map to a settings page.
• Do not explain the developer analogy yet. Let the sequence do its work.`,
    transition: "Even when home was visible, one more mistake sent the journey backward.",
  },
  5: {
    purpose: "Explain the bag of winds and establish the recoverable wrong-turn idea.",
    say: `• Aeolus gave Odysseus a tied bag containing the winds.
• Near Ithaca, the crew opened it because they thought it contained treasure.
• The released winds blew the ship away from home.
• It was basically an unlabeled production credential, except wetter.
• They could see the destination, but one misunderstood object reversed their progress.`,
    transition: "By the time Odysseus finally arrived, the route had changed the outcome completely.",
  },
  6: {
    purpose: "Close the Odyssey story with the human cost of the route.",
    say: `• He left with 12 ships and roughly 600 men.
• He returned alone, and at first nobody recognized him.
• That is one successful completion out of roughly 600 starters. I am not putting that number in a benchmark.
• A completed journey can still be a terrible journey.
• In developer onboarding, celebrating the one person who finished can hide everyone who stopped earlier.`,
    transition: "Developers also arrive with a destination, and that destination is rarely your onboarding flow.",
  },
  7: {
    purpose: "State the workshop thesis before asking the room to participate.",
    say: `• Nobody has ever put “complete vendor onboarding” on a vision board.
• Developers do not wake up wanting to create an account, configure permissions, or copy credentials.
• They tolerate that work while it still looks connected to the thing they came to build.
• When the connection becomes unclear, another required step feels more expensive than it looks in a flowchart.
• The next exercise makes that route visible.`,
    transition: "You are about to try a workshop simulation designed to be difficult. FakeGPT is only the starting screen, not the app you are being asked to build.",
  },
  8: {
    purpose: "Start the live exercise with clear intent, safety, and stopping rules.",
    say: `• Say this before anyone scans: “This route is intentionally bad. It is a workshop simulation, not a product demo.”
• If people hate it, the feature is working. I built it, so complaints can come directly to me after the eight-minute timer.
• In FakeGPT, type any small thing you want to build. FakeGPT will ask you to obtain a FakeSaaSPI token. Follow that link and continue from there.
• Use fake details only. Do not enter real personal, company, customer, card, or secret information.
• Completion is not required. Stop when time is called or when the next step is no longer worth it.
• Keep the final screen open because we will use the room’s positions for the debrief.`,
    transition: "Start the eight-minute clock, move to the live dashboard, and let the room work without coaching them through the route.",
  },
  9: {
    purpose: "Use the live dashboard as a room mirror while the exercise runs.",
    say: `• Keep this screen visible while participants work.
• “Named route reach” shows how many distinct sessions reached each named step. It is not a conversion rate for a real product.
• The other panels show bounded validation errors, retries, timing, and terminal states recorded by this workshop route.
• There is no prize for being first through a fake card form.
• Do not announce an early winner or assign a reason to a pause. Counts can change until the cutoff.
• At eight minutes, stop even if few people have finished.`,
    transition: "Time is up. Advance once, stop the room, and ask everyone to keep the last screen open.",
  },
  10: {
    purpose: "Create a clean break between participating and interpreting.",
    say: `• Say: “Stop where you are. Keep your last screen open. The form cannot hurt you anymore.”
• Give the room a few seconds to stop tapping and look back at the projector.
• Do not ask yet why they stopped. First establish what the route and tracker can actually show.`,
    transition: "Now look at the final room results as observations, not explanations.",
  },
  11: {
    purpose: "Debrief the final real-time results without turning behavior into a cause claim.",
    say: `• Use this slide only after CONFIG.resultsUrl points to the final event results view. If it still shows the configuration placeholder, skip it.
• State the sample size first. This is the people who participated in this room, not a representative developer population.
• Describe the visible positions, retries, bounded errors, timing, and terminal states.
• Use neutral language: “reached,” “retried,” “recorded an error,” and “completed.”
• Do not assign emotion or intent, and do not say someone “gave up” or “dropped off” unless they tell you that directly.`,
    transition: "The dashboard tells us where activity changed. It does not tell us why, so we need to separate the evidence types.",
  },
  12: {
    purpose: "Separate documented intent, observed behavior, and the explanation that is still missing.",
    say: `• The documented route is what the official instructions ask someone to do.
• Observed behavior is what this room reached, retried, or completed in the workshop route.
• Missing evidence includes intent, interpretation, reason for stopping, and whether the same pattern occurs outside this room.
• These evidence types can inform one another, but they are not interchangeable.
• A stopping point is a useful lead for investigation. It is not a diagnosis.`,
    transition: "Before we use the dashboard, be precise about what the tracker recorded and what stayed outside it.",
  },
  13: {
    purpose: "State the tracker scope and privacy boundary in plain language.",
    say: `• The tracker recorded named steps, timestamps, retries, bounded machine errors, and terminal completion.
• It did not record the text entered in forms or the fake account and card values.
• Your fictional company name is safe. Acme Banana Holdings will not receive a sales email.
• The generated test token is sent back to the workshop service so the later step can verify it.
• This is enough to describe route position and selected events. It is not enough to infer emotion, intent, or cause.`,
    transition: "That was one deliberately constructed route. Next, compare its setup work with examples drawn from documented routes across platform categories.",
  },
  14: {
    purpose: "Connect the simulation to recognizable setup gates found in official documentation.",
    say: `• These are four examples from the 205 documented routes, not four rankings.
• Payments example, Airwallex: business email and sandbox account.
• Cloud infrastructure example, Akamai Cloud: SMS verification and a payment method.
• Data platform example, Airtable: token scopes and resource selection.
• Real-time messaging example, Ably: capability choice and a production credential warning.
• The FakeSaaSPI route borrows patterns like these. It is a tribute album, not a cover of one company’s onboarding.`,
    transition: "To compare unlike platforms without pretending they are identical, every research record used the same basic unit.",
  },
  15: {
    purpose: "Define exactly what one record means before showing aggregate findings.",
    say: `• The denominator is 205 platforms, with one documented route recorded for each platform.
• Each record begins with official documentation for that platform.
• The route is one selected path for one specific developer intent, not every possible onboarding path.
• The endpoint is either an explicitly named milestone or a terminal state demonstrated by the documentation.
• This is documentation research. I did not enter a credit card into 205 signup forms. I retain a small amount of self-preservation.
• It does not measure real completion, elapsed effort, product quality, or developer sentiment.`,
    transition: "With that unit defined, the first finding asks whether the documentation supplied one obvious route for the selected intent.",
  },
  16: {
    purpose: "Explain the route-choice finding and its practical consequence.",
    say: `• In 151 of the 205 records, the inspected documentation did not present one unambiguous default route for the selected intent.
• I therefore used the same documented tie-break rule to choose one route for those records.
• When the docs did not choose, someone still had to. In this dataset, that someone was unfortunately me.
• In the remaining 54 records, the documentation identified one route directly.
• This does not prove that developers failed or found the choice difficult. It shows that the docs left route selection unresolved for this research intent.
• Practical action: for one named developer intent, recommend one next route and make recovery from the wrong route cheap.`,
    transition: "Selecting a route is only half of the job. The developer also needs to recognize the finish line.",
  },
  17: {
    purpose: "Explain the named-success finding without describing the other routes as failures.",
    say: `• Only 83 of 205 routes explicitly named the first-success milestone.
• The other 122 routes still demonstrated an observable end, but the documentation did not name that end as the milestone.
• The two counts are complementary and use the same 205-route denominator.
• This does not mean 122 routes had no successful outcome. It means the developer had to infer what counted as the first useful finish.
• A finish line should not require escape-room logic.
• Practical action: agree on one developer-visible completion signal before instrumenting activation.`,
    transition: "Even when the route and finish line are visible, a stopping point still does not tell us what caused it.",
  },
  18: {
    purpose: "Turn one observed stopping point into discriminating follow-up questions.",
    say: `• Imagine the tracker shows that someone stopped at “Create app.”
• Permissions, a card requirement, and an unrecoverable error are three plausible explanations.
• They would require different owners and different fixes.
• Do not select the explanation that best fits your existing opinion.
• Ask the smallest question or collect the smallest observation that separates the plausible causes.`,
    transition: "That finishes the problem half. Now we move from identifying a useful question to taking a bounded action.",
  },
  19: {
    purpose: "Begin the solution half with one documented comparison the attendee can use.",
    say: `• Say: “We have moved from what is wrong to what we can do next.”
• Open the First-Mile Atlas and find your platform, category, or the nearest useful comparison.
• Choose one documented condition worth checking in your own route.
• This is not a leaderboard. Nobody wins for having the ninth-hardest signup form.
• If your platform is missing, record the mismatch instead of asking the tool to invent a benchmark.
• The Atlas does not score product quality, rank competitors, diagnose a cause, or automatically research a missing platform.`,
    transition: "A comparison gives you something specific to inspect. Named positions make that inspection observable in your own route.",
  },
  20: {
    purpose: "Show the smallest instrumentation example and state its current limits.",
    say: `• This Firstmile example now lives in Calibrate's workshop kit. The public Calibrate project is Apache-2.0 licensed and the usecalibrate package is on npm.
• The first line initializes a manifest, write key, and route definitions.
• The second line records one bounded machine-readable error at a named position. It does not send the entered email value.
• The third line marks the agreed terminal event as shipped.
• The workshop-kit API shown here is the small teaching example used by this deck. Review the Calibrate package API before using it in another application.
• I managed to publish Calibrate before this talk, which ruins one of my better jokes about never reaching my own final mile.
• This can complement an existing analytics system. Do not present it as a validated replacement for PostHog or another product.`,
    transition: "The request to engineering can stay small because the goal is one observable route, not a new analytics program.",
  },
  21: {
    purpose: "Give DevRel a bounded, credible request to take to the route owner.",
    say: `• Start with one route and define the first-success outcome.
• Name only the positions required to see progress toward that outcome.
• Record bounded events that help distinguish what happened without collecting form contents.
• Observe five intended developers without rescuing them. Five is a pilot, not a representative sample.
• Five people is enough to find a useful next question. It is not enough to summon a statistically significant roadmap.
• Bring stopping points, missing evidence, and one next observation to the team that owns the route.
• DevRel supplies evidence and translation. The owning team decides and implements the product change.`,
    transition: "If the production route cannot be instrumented yet, use a disposable prototype to collect better questions, not to fake production evidence.",
  },
  22: {
    purpose: "Offer a fallback when production instrumentation is unavailable.",
    say: `• Start from the public FakeSaaSPI reference app only as an inspectable example.
• Give a coding agent the official documentation, the intended developer outcome, and the route you are authorized to test.
• Ask it to mirror documented steps. Review every generated step and remove anything the source does not support.
• Coding agents type much faster than they read your documentation. Review the route before a human has to suffer through the hallucinated version.
• Add named positions, use fake data, and test with a small invited group.
• Keep the prototype separate from production telemetry and usability-research claims.
• FakeSaaSPI is source available for inspection but has no public project license. Do not promise reuse rights, publish, or deploy without approval.`,
    transition: "If you want to run that bounded prototype after the workshop, the next slide has the attendee credit.",
  },
  23: {
    purpose: "Give eligible attendees a concrete way to deploy their own bounded prototype without turning the workshop into a sales pitch.",
    say: `• This is optional. You can do the workshop follow-up without deploying anything.
• Eligible DevRelCon attendees can claim $100 in Render credits. Scan the code and sign in with GitHub to check eligibility.
• Use the credit for your own code or a resource whose license allows deployment.
• Connect the repository, choose the appropriate Render service type, and deploy it from the Dashboard, CLI, or a coding agent.
• Do not deploy FakeSaaSPI from its public repository. It is inspectable, but the repository does not grant public reuse rights.
• This is the part where I give you money and still assign homework.
• The portal is active, but the public sign-in screen does not list a deadline or full eligibility terms. Do not promise either from the stage.`,
    transition: "The credit is optional. The Monday action is not.",
  },
  24: {
    purpose: "End with one action the attendee can start without a new program or framework.",
    say: `• Pick one real first-mile route, not the entire onboarding system.
• Define its first-success outcome and the positions that make progress visible.
• Watch five intended developers attempt it without rescuing them.
• Bring the stopping points and missing evidence to the team that owns the route.
• Do not promise a diagnosis. Bring one clearer question and one next observation.
• Please do not return on Monday with a transformation program and a 46-tab spreadsheet.
• Thank Dylan for the dry-run feedback after the workshop content is complete.`,
    transition: "Stop here. Leave the Monday action on screen for questions.",
  },
};
