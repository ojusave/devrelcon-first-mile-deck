const SPEAKER_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

const SPEAKER_NOTES = {
  1: {
    purpose: "Open with the practical problem and tell the room what kind of workshop this is.",
    say: `• I built three apps, several repositories, and a speaker-notes editor for a workshop about simplifying onboarding. I am aware of the irony.
• Developers arrive with something they want to build. The first mile is everything between that intent and the first result they can use.
• This workshop has two halves. First, we will experience and inspect a deliberately bad route. Then we will turn the evidence into a small action for a real platform.
• This came from a real collaboration I watched fail. The route required more than 20 steps before the first API call, and the collaborator decided the integration was not worth continuing.
• Today we will ask one question: “Can a developer keep making visible progress toward what they came to build?”`,
    watch: "2 minutes. Watch for recognition when you define the first mile. If the room looks unsure, ask for one thing they tried to build this week.",
    fallback: "If time is tight, keep the self-own, define the first mile, and state the two halves. Cut the backstory, not the workshop contract.",
    transition: "A destination can be perfectly clear while the route still defeats the traveler. Odysseus is the useful example.",
  },
  2: {
    purpose: "Establish how simple the journey looked before anything went wrong.",
    say: `• Odysseus is trying to get home from Troy to Ithaca.
• The straight-line distance is roughly 565 nautical miles.
• Under ordinary sailing conditions, think in weeks, not years.
• The destination is clear, and the plan sounds reasonable.`,
    watch: "30 seconds. The room only needs the destination and expected duration, not a geography lesson.",
    fallback: "If the number prompts debate, say it is an orientation estimate and move to the ten-year contrast.",
    transition: "The planned route was short. The actual route took ten years.",
  },
  3: {
    purpose: "Create the comic gap between the expected route and the lived route.",
    say: `• The trip took ten years. At that point it is less a journey and more a legacy migration.
• Do not turn this into a history lecture. The useful point is the gap between a simple destination and a route full of interruptions.
• In onboarding, teams often describe the destination while developers experience the route.`,
    watch: "30 seconds. Pause after “legacy migration” long enough for the laugh, then move on.",
    fallback: "If the joke misses, use the plain point: the advertised destination and lived route were radically different.",
    transition: "The extra time was not the only cost. The route kept removing people from the journey.",
  },
  4: {
    purpose: "Make the route failures concrete and memorable.",
    say: `• Reveal one beat at a time and let the room react.
• Some of his crew were eaten. Some were turned into pigs. One man fell from a roof.
• The examples are funny at mythological distance, but the pattern matters: every interruption reduces the number of people still moving toward the destination.
• The roof incident is the one onboarding step I could not map to a settings page.
• Do not explain the developer analogy yet. Let the sequence do its work.`,
    watch: "1 minute. Reveal each beat only after the room has read the previous one. Watch which example gets the strongest reaction.",
    fallback: "If reveals or art fail, say the three beats aloud and continue. The sequence matters more than the animation.",
    transition: "Even when home was visible, one more mistake sent the journey backward.",
  },
  5: {
    purpose: "Explain the bag of winds and establish the recoverable wrong-turn idea.",
    say: `• Aeolus gave Odysseus a tied Bag of Winds.
• Near Ithaca, the crew opened it because they thought it contained treasure.
• The released winds blew the ship away from home.
• It was basically an unlabeled production credential, except wetter.
• They could see the destination, but one misunderstood object reversed their progress.`,
    watch: "1 minute. Make sure the room hears “Bag of Winds” before the second reveal. The label carries the joke and the meaning.",
    fallback: "If the myth reference is unfamiliar, explain it in one sentence: the crew opened the bag near home and released the winds that blew them backward.",
    transition: "By the time Odysseus finally arrived, the route had changed the outcome completely.",
  },
  6: {
    purpose: "Close the Odyssey story with the human cost of the route.",
    say: `• He left with 12 ships and roughly 600 men.
• He returned alone, and at first nobody recognized him.
• That is one successful completion out of roughly 600 starters. I am not putting that number in a benchmark.
• A completed journey can still be a terrible journey.
• In developer onboarding, celebrating the one person who finished can hide everyone who stopped earlier.`,
    watch: "1 minute. Let the alone-and-unrecognized reveal land. Do not crowd it with another visual joke.",
    fallback: "If the room is quiet, skip the ratio line and use the simpler point: completion alone does not tell you whether the route worked well.",
    transition: "Developers also arrive with a destination, and that destination is rarely your onboarding flow.",
  },
  7: {
    purpose: "State the workshop thesis before asking the room to participate.",
    say: `• Nobody has ever put “complete vendor onboarding” on a vision board.
• Developers do not wake up wanting to create an account, configure permissions, or copy credentials.
• They tolerate that work while it still looks connected to the thing they came to build.
• When the connection becomes unclear, another required step feels more expensive than it looks in a flowchart.
• The next exercise makes that route visible.`,
    watch: "45 seconds. Look for nods on the account, permission, and credential examples. That is enough before the exercise.",
    fallback: "If time is short, say the headline and one example. Keep the exercise setup and safety instructions on the next slide.",
    transition: "You are about to try a workshop exercise. FakeGPT gives you a place to start, then you follow the prompts.",
  },
  8: {
    purpose: "Start the live exercise with clear intent, safety, and stopping rules.",
    say: `• “The QR opens FakeGPT. Give it one small thing you would like to build, then follow the prompts.”
• “You have eight minutes, but finishing is not the goal.”
• “Use fake details only. If the next step stops feeling worth it, stop there and leave that screen open.”
• “I will explain what we are collecting after time is called.”
• Do not hint that difficulty, stopping, or failure is the intended outcome.`,
    watch: "Allow 60 seconds for setup, then 8 minutes for the attempt. Do not start the clock until the room understands what to type, the safety rule, and the stopping rule.",
    fallback: "If the QR or participant app fails, narrate the route from the prepared dashboard and ask the room where they would stop. Do not collect real details.",
    transition: "Start the eight-minute clock, move to the live dashboard, and let the room work without coaching them through the route.",
  },
  9: {
    purpose: "Use the live dashboard as a room mirror while the exercise runs.",
    say: `• Keep this screen visible while participants work.
• “Observed route movement” groups the route into a few readable stages. The dotted line is the intended route. Solid blue paths are observed forward movement. Dashed amber paths are backtracking.
• Each path width is the number of distinct sessions observed moving between two stages. One session counts once per path, so retries do not make it wider.
• If a blue path arcs over a stage, the session reached the later stage without a recorded visit to the stage underneath it. That can happen when someone enters from a different URL.
• “Named route reach” counts explicit page-view events for each named step. It is not a conversion rate for a real product.
• The other panels show bounded validation errors, retries, timing, and terminal states recorded by this workshop route.
• A thinner path says fewer observed sessions traversed that edge by the cutoff. It does not tell us whether they stopped, switched tabs, ran out of time, or decided the next step was not worth it.
• There is no prize for being first through a fake card form.
• Do not announce an early winner or assign a reason to a pause. Counts can change until the cutoff.
• At eight minutes, stop even if few people have finished.`,
    watch: "8 minutes. Watch the observed path narrow, note any bypass arc or dashed backtracking path, but do not narrate a cause while people are still moving.",
    fallback: "If the dashboard fails, keep the exercise running, ask people to hold their last screen, and use a quick show of hands by named step after time is called.",
    transition: "Time is up. Advance once, stop the room, and ask everyone to keep the last screen open.",
  },
  10: {
    purpose: "Create a clean break between participating and interpreting.",
    say: `• Say: “Stop where you are. Keep your last screen open. The form cannot hurt you anymore.”
• Give the room a few seconds to stop tapping and look back at the projector.
• “Okay, confession: that route was bad on purpose. FakeGPT gave you a destination. FakeSaaSPI put obstacles between you and that destination.”
• “I combined several onboarding obstacles into one exaggerated route so we could experience them together.”
• “If you are annoyed with me, that means the demo worked. Please hold that energy for the dashboard.”
• “Your last screen tells us where activity changed. It does not tell us why you stopped. We still have to ask.”`,
    watch: "30 seconds. Wait until hands and eyes are off phones before moving into interpretation.",
    fallback: "If people keep working, repeat the stop instruction once and move on. Completion is not required.",
    transition: "Now look at the final room results as observations, not explanations.",
  },
  11: {
    purpose: "Debrief the final real-time results without turning behavior into a cause claim.",
    say: `• Use this slide only after CONFIG.resultsUrl points to the final event results view. Normal stage navigation skips it automatically until then.
• State the sample size first. This is the people who participated in this room, not a representative developer population.
• Describe the visible positions, retries, bounded errors, timing, and terminal states.
• Use neutral language: “reached,” “retried,” “recorded an error,” and “completed.”
• Do not assign emotion or intent, and do not say someone “gave up” or “dropped off” unless they tell you that directly.`,
    watch: "2 minutes when configured. State the room sample size before any count and watch for audience members volunteering explanations too early.",
    fallback: "If the results URL or embed fails, skip this slide and debrief from the live dashboard or the last screens in the room.",
    transition: "The dashboard tells us where activity changed, not why. Before we interpret it, be precise about what the tracker actually recorded.",
  },
  12: {
    purpose: "State the tracker scope and privacy boundary in plain language.",
    say: `• The tracker recorded named steps, timestamps, retries, bounded machine errors, and terminal completion.
• It did not record the text entered in forms or the fake account and card values.
• Your fictional company name is safe. Acme Banana Holdings will not receive a sales email.
• The generated test token is sent back to the workshop service so the later step can verify it.
• This is enough to describe route position and selected events. It is not enough to infer emotion, intent, or cause.`,
    watch: "90 seconds. Look for privacy questions. Answer what the tracker records before discussing what a larger analytics system might record.",
    fallback: "If the room needs proof, open the public tracker contract after the session. Do not turn the slide into a code review.",
    transition: "That was one deliberately constructed route. Next, compare its setup work with examples drawn from documented routes across platform categories.",
  },
  13: {
    purpose: "Connect the simulation to recognizable setup gates found in official documentation.",
    say: `• These are four examples from the 205 documented routes, not four rankings.
• Payments example, Airwallex: business email and sandbox account.
• Cloud infrastructure example, Akamai Cloud: SMS verification and a payment method.
• Data platform example, Airtable: token scopes and resource selection.
• Real-time messaging example, Ably: capability choice and a production credential warning.
• The FakeSaaSPI route borrows patterns like these. It is a tribute album, not a cover of one company’s onboarding.`,
    watch: "2 minutes. Ask which category feels closest to the attendee’s platform. Do not debate whether one gate is universally bad.",
    fallback: "If one named example is challenged, return to the cited record after the session and keep the projector claim at the category level.",
    transition: "To compare unlike platforms without pretending they are identical, every research record used the same basic unit.",
  },
  14: {
    purpose: "Define exactly what one record means before showing aggregate findings.",
    say: `• The denominator is 205 platforms, with one documented route recorded for each platform.
• Each record begins with official documentation for that platform.
• The route is one selected path for one specific developer intent, not every possible onboarding path.
• The endpoint is either an explicitly named milestone or a terminal state demonstrated by the documentation.
• This is documentation research. I did not enter a credit card into 205 signup forms. I retain a small amount of self-preservation.
• It does not measure real completion, elapsed effort, product quality, or developer sentiment.`,
    watch: "90 seconds. The audience should be able to repeat the unit: one platform, one selected intent, one documented route, one documented end.",
    fallback: "If the method feels dense, say only the unit and the boundary. Keep the detailed provenance in the README and Atlas.",
    transition: "With that unit defined, the first finding asks whether the documentation supplied one obvious route for the selected intent.",
  },
  15: {
    purpose: "Explain the route-choice finding and its practical consequence.",
    say: `• In 151 of the 205 canonical records, the selection basis explicitly says the workshop policy chose among documented routes.
• The generated route-selection classifier reports 94 because it recognizes “Workshop selection policy” but misses 57 records worded as “Under the workshop policy.” Do not use that generated field until its phrase detector is corrected.
• In the other 54 records, the documentation selected one route directly for the chosen intent.
• When the docs did not choose, someone still had to. In this dataset, that someone was unfortunately me.
• This does not prove that developers failed or found the choice difficult. It describes what the inspected documentation supplied for this research intent.
• Practical action: for one named developer intent, recommend one next route and make recovery from the wrong route cheap.`,
    watch: "2 minutes. Say the denominator and both complementary counts. Watch for anyone treating the number as user behavior and correct that immediately.",
    fallback: "If the count is questioned, show the two raw selection-basis phrases and the 94 plus 57 reconciliation. The generated classifier undercounts this finding.",
    transition: "Selecting a route is only half of the job. The developer also needs to recognize the finish line.",
  },
  16: {
    purpose: "Explain the named-success finding without describing the other routes as failures.",
    say: `• Only 83 of 205 routes explicitly named the first-success milestone.
• The other 122 routes still demonstrated an observable end, but the documentation did not name that end as the milestone.
• The two counts are complementary and use the same 205-route denominator.
• This does not mean 122 routes had no successful outcome. It means the developer had to infer what counted as the first useful finish.
• A finish line should not require escape-room logic.
• Practical action: agree on one developer-visible completion signal before instrumenting activation.`,
    watch: "2 minutes. Ask for the finish line in one attendee’s route. Push for something the developer can see, not an internal business label.",
    fallback: "If nobody volunteers, use “the first valid API response appears” as the example and continue.",
    transition: "Even when the route and finish line are visible, a stopping point still does not tell us what caused it.",
  },
  17: {
    purpose: "Turn one observed stopping point into discriminating follow-up questions.",
    say: `• Imagine the tracker shows that someone stopped at “Create app.”
• Permissions, a card requirement, and an unrecoverable error are three plausible explanations.
• They would require different owners and different fixes.
• Do not select the explanation that best fits your existing opinion.
• Ask the smallest question or collect the smallest observation that separates the plausible causes.`,
    watch: "2 minutes. Let the room suggest one additional explanation, then ask what observation would distinguish it.",
    fallback: "If the room is quiet, use the three on-screen questions and state the owner each answer would implicate.",
    transition: "That finishes the problem half. Now we move from identifying a useful question to taking a bounded action.",
  },
  18: {
    purpose: "Begin the solution half with one documented comparison the attendee can use.",
    say: `• Say: “We have a stopping point. Now we need one useful comparison and one condition we can check.”
• Open the First-Mile Atlas and find your platform, category, or the nearest useful comparison.
• Choose one documented condition worth checking in your own route.
• This is not a leaderboard. Nobody wins for having the ninth-hardest signup form.
• If your platform is missing, record the mismatch instead of asking the tool to invent a benchmark.
• The Atlas does not score product quality, rank competitors, diagnose a cause, or automatically research a missing platform.`,
    watch: "3 to 4 minutes. Confirm the room has switched from discussing the problem to choosing one inspectable condition.",
    fallback: "If the Atlas is unavailable, ask attendees to write down their developer intent, first useful result, and one uncertain condition in the route.",
    transition: "A comparison gives you something specific to inspect. Named positions make that inspection observable in your own route.",
  },
  19: {
    purpose: "Introduce Calibrate as the product Ojus built, while separating the current repository API from the published workshop-kit package.",
    say: `• This is the part where I admit I built another SDK. Apparently my response to too many onboarding tools was one more onboarding tool.
• Calibrate watches browser-level signals around one onboarding or funnel route. The example on screen is the DOM-autocapture client in the public repository.
• It uses native input, textarea, select, and History API behavior. That means standard DOM rendered by React, Vue, Svelte, Angular, or plain HTML does not need a framework adapter.
• That is an architecture claim, not a promise that I certified every framework version and component library before breakfast.
• Autocapture is on by default. Custom controls still need a small manual call because a div pretending to be a select is still a div.
• Initialization and event handling are guarded so instrumentation disables itself instead of breaking the application it is observing.
• Important release boundary: the DOM-autocapture workspace package shown here is not published to npm yet. The published usecalibrate package is the earlier manifest-driven workshop kit. Do not tell the room to install the package name on this slide from npm today.
• Calibrate can complement an existing analytics system. I have not established that it should replace one.`,
    watch: "2 minutes. Watch for framework questions. Keep the claim scoped to standard DOM controls, not every component library.",
    fallback: "If the code is too small in the room, read only the import and endpoint. The public repository can carry the implementation details later.",
    transition: "The integration is short. The more important question is what crosses that boundary and what deliberately stays behind.",
  },
  20: {
    purpose: "Explain Calibrate's event contract and privacy boundary without implying that behavior reveals motivation.",
    say: `• Calibrate records a closed set of lifecycle and interaction events: session start, normalized route, field state, validation, named copy or paste outcomes, flow steps, shipped, and page close.
• For standard fields, the identifier order is data-fm, then name, then id. If you care about a stable funnel label, set data-fm deliberately instead of hoping an autogenerated id survives Tuesday.
• The field observer checks value length only to distinguish empty from non-empty. It does not store or send the value.
• It does not collect DOM text, labels, placeholders, clipboard contents, query strings, or hashes. Routes are normalized before they are sent, and password and hidden fields are ignored.
• Copy and paste events are named signals from the application. Calibrate does not inspect the clipboard. Your copied production password remains between you, your password manager, and your incident review.
• The strict schema rejects unknown event fields rather than accepting arbitrary payloads.
• “Shipped” is an explicit event. “Abandoned” is an inference from lifecycle and presence. The SDK does not know whether someone was confused, angry, interrupted, or making tea.
• This tells a team where activity changed. It still does not tell the team why.`,
    watch: "2 minutes. Ask which identifier they would set with data-fm in their own route. Listen for a stable step name, not user content.",
    fallback: "If privacy questions take over, state the three boundaries on screen and offer the strict event schema for inspection after the session.",
    transition: "The dashboard can show us where activity changed. It cannot tell us what the developer expected. For that, we need to watch and ask.",
  },
  21: {
    purpose: "Use developer champions to add the context that route telemetry cannot provide.",
    say: `• Choose three to five champions who resemble the developer this route is meant to serve. Do not recruit only experts who already speak the platform's internal language.
• Give them the outcome, not the route. If I tell them every turn, I have tested my ability to give directions.
• Watch the attempt before asking questions. Do not coach them through the route, and do not replace observation with a feedback survey.
• Calibrate can show where activity changed. It cannot tell us what the developer expected or why the next step stopped feeling worthwhile.
• After the attempt, ask what they expected, what they tried, and what made the next step uncertain or no longer worth it.
• Use fake or approved test data. Do not put customer, company, card, or secret information into the session.
• Three to five people form a bounded pilot, not a representative sample or a conversion benchmark.
• Bring the route owner one observed stopping point, the champions' explanations, and one next change or investigation.`,
    watch: "3 minutes to explain the method. During a real pilot, allow enough time for the route plus a short debrief. Watch for attendees choosing internal experts instead of intended users.",
    fallback: "If attendees cannot recruit champions immediately, ask them to name three suitable people and schedule one 20-minute observation before changing the route.",
    transition: "Now we have the documented route, the observed position, and the developer's explanation. That is enough to take one useful question to the team that owns the route.",
  },
  22: {
    purpose: "Turn the documented route, observed position, and champion context into a bounded route-owner handoff.",
    say: `• Bring the expected route and the developer-visible first-success outcome.
• Show the position where activity changed. Describe what happened without assigning a cause.
• Add what the champions expected, tried, and found uncertain. Keep disagreements visible instead of forcing one tidy explanation.
• Ask the owning team for one next check, change, or observation. Do not arrive with a verdict about the entire onboarding system.
• The route owner decides what changes. DevRel supplies the evidence, the developer language, and the follow-up question.
• If the evidence is still thin, say that. A useful question is a better handoff than a confident guess.`,
    watch: "2 minutes. Ask one attendee to name the owner of their route and the single question they would bring to that person.",
    fallback: "If ownership is unclear, make identifying the route owner the next action. Do not let an unowned route become a fake cross-functional initiative.",
    transition: "That is the practical handoff. The next slide is an optional workshop resource, not another required step.",
  },
  23: {
    purpose: "Explain exactly what the credit QR does without implying an eligibility screen or deployment workflow.",
    say: `• This is optional. You can do the workshop follow-up without deploying anything.
• The QR opens the DevRelCon claim portal. It does not connect a repository or deploy an application.
• Scan the code, continue with GitHub, and copy the promotional code shown by the portal when one is available.
• Redeem the code from the Billing page in your Render Dashboard.
• If the portal cannot issue a code immediately, read the status it gives you instead of promising a code from the stage.
• This is the part where I give you money and still assign homework.
• The public claim page does not list a deadline. Do not invent one from the stage.`,
    watch: "1 minute. Keep this optional. Give people enough time to scan without turning it into a deployment tutorial.",
    fallback: "If the portal is unavailable, tell attendees the link is in the deck README and continue. Do not promise availability or timing.",
    transition: "The credit is optional. The Monday action is not.",
  },
  24: {
    purpose: "End with one action the attendee can start without a new program or framework, then leave an optional path to Render's open roles.",
    say: `• Pick one real first-mile route, not the entire onboarding system.
• Define its first-success outcome in language the developer can recognize.
• Name the team that owns the route and schedule the next observation.
• Use the champion session and route-owner handoff we just covered. Do not replace them with a new analytics program.
• Do not promise a diagnosis. Bring one clearer question and one next observation.
• Please do not return on Monday with a transformation program and a 46-tab spreadsheet.
• Render is hiring. The QR goes to our current openings through my referral link.
• If a role looks relevant, DM me with questions. The link does not promise an interview or hiring outcome.
• Thank Dylan for the dry-run feedback after the workshop content is complete.`,
    watch: "Leave this slide up for questions and scanning. Ask attendees to write down the one route they will inspect before they pack up.",
    fallback: "If time is gone, state the Monday action, mention that the QR links to Render's open roles, thank Dylan, and end. Do not add a grand conclusion.",
    transition: "Stop here. Leave the Monday action and careers QR on screen for questions.",
  },
};
