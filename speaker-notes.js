const SPEAKER_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

const SPEAKER_NOTES = {
  1: {
    purpose: "Open with the practical question, establish the two-part workshop contract, and earn trust with a real self-own.",
    script: `[Pause. Look at the room before speaking.]

Hi, I am Ojus. I built three small applications, several repositories, and a custom speaker-notes editor for a workshop about making onboarding simpler.

[Pause for laugh.]

I know. I could have made a PDF.

The question behind all of this is simple: what makes a developer keep going long enough to ship something?

I call the beginning the first mile. It starts when a developer arrives with an outcome in mind. It ends when they get the first result they can actually use. Everything between those points is the route: the docs, account setup, permissions, keys, billing, errors, and the moments when the next step stops looking worth the effort.

We are going to do this in two parts. First, you will experience a route and we will inspect what happened. Then we will choose one small way to investigate a route you own. You do not need a laptop or a new analytics program.

I am also going to be careful about the evidence. A dashboard can show a recorded position. Documentation can show what a route asks for. Neither one can read a developer's mind.

The useful question for the next hour is: can a developer keep making visible progress toward the thing they came to build?

[Advance]

To explain why the destination is not enough, I want to borrow a product journey from someone with famously bad onboarding: Odysseus.`,
    roomCue: "Look for recognition when you define the first mile. Let the opening self-own breathe. Do not rush into the myth while people are still settling.",
    timing: "2 minutes. Cut the list of route components if the room starts late, but keep the two-part contract and evidence boundary.",
    fallback: "If the room is cold, skip the second joke and ask: 'What is one thing you tried to build this week?' Take one answer, connect it to first success, and advance.",
    evidenceBoundary: "Do not use the earlier unverified story about a collaborator quitting after more than 20 steps unless Ojus personally confirms it before rehearsal.",
    sources: "Workshop session contract: accepted-session-contract.md\nDeck repositories and current 24-slide structure\nPresenter-authored first-mile definition",
  },
  2: {
    purpose: "Give the Odyssey a clear destination and a modest scale before showing how badly the route expanded.",
    script: `Odysseus is trying to get home from Troy to Ithaca.

One modern sailor's estimate puts it at about 565 nautical miles. Treat that as orientation, not GPS data from the Bronze Age. The geography of the Odyssey is still debated.

The important part is that the destination is clear. Home is Ithaca. The route sounds finite.

[Advance]

The estimate gives us the planned scale. The story gives us the actual one.`,
    roomCue: "Keep this brisk. If someone reacts to the number, acknowledge that it is one modern sailing estimate and move on.",
    timing: "35 seconds.",
    fallback: "If the distance is challenged, say: 'Fair. The exact itinerary is debated. I only need the contrast between a bounded trip and a ten-year return.'",
    evidenceBoundary: "Do not call 565 nautical miles a straight-line distance or claim a verified two-week sailing time.",
    sources: "Smithsonian Magazine, We Followed Odysseus: https://www.smithsonianmag.com/arts-culture/we-followed-odysseus-49839113/",
  },
  3: {
    purpose: "Create the comic gap between the expected journey and the lived route.",
    script: `The homecoming took ten years.

[Pause.]

At that point it is less a journey and more a legacy migration.

[Pause for laugh.]

That decade was not ten years of continuous sailing. The story includes detours, long stays, bad decisions, gods, monsters, and the ancient Greek equivalent of a dependency that nobody can remove.

For this workshop, I care about the gap. The destination stayed simple. The lived route did not.

[Advance]

And the extra time was not the only cost. Look at what happened to the people attempting the route.`,
    roomCue: "Pause after the decade reveal and again after the legacy-migration line. If the first joke lands, do not add another one.",
    timing: "40 seconds.",
    fallback: "If the joke misses, use the plain point: 'A clear destination did not make the route short or safe.'",
    evidenceBoundary: "Say 'homecoming took ten years.' Do not imply ten years of uninterrupted sailing.",
    sources: "Homer, Odyssey Books 7, 10, and 21\nPerseus Digital Library: https://www.perseus.tufts.edu/hopper/",
  },
  4: {
    purpose: "Make the interruptions concrete, funny, and accurate without pretending every incident permanently reduced the crew.",
    script: `I will reveal these one at a time because the incident report gets worse.

[Advance. Wait for the first reveal.]

The Cyclops Polyphemus ate six of Odysseus's companions. Six men did not leave the cave.

[Advance. Wait for the second reveal.]

Circe turned 22 men into pigs. Their minds stayed human. She later restored them, so this was terrifying interruption, not permanent loss.

[Advance. Wait for the third reveal.]

And Elpenor got drunk, slept on a roof, woke suddenly, forgot the ladder, fell, and broke his neck.

[Pause.]

Not a monster. Not a god. A roof.

That is the onboarding failure I could not map to a settings page.

[Advance]

The next incident is the one I want you to remember. The destination was already visible.`,
    roomCue: "Reveal only after the room has read the current line. Let 'A roof' land. Keep the distinction between interruption and permanent loss clear.",
    timing: "1 minute 15 seconds.",
    fallback: "If fragments fail, narrate eaten, temporarily transformed, and roof in that order. If time is short, cut the account-migration joke.",
    evidenceBoundary: "Circe restored the transformed men. Do not use all three events as permanent attrition evidence.",
    sources: "Homer, Odyssey Book 9, Polyphemus\nHomer, Odyssey Books 10 and 11, Circe and Elpenor\nTheoi translations: https://www.theoi.com/Text/HomerOdyssey9.html and https://www.theoi.com/Text/HomerOdyssey10.html",
  },
  5: {
    purpose: "Explain the Bag of Winds clearly and create a memorable example of progress reversed by a misunderstood object.",
    script: `[Advance. Wait for Ithaca to appear.]

At one point they could see Ithaca's beacon fires. Home was right there.

Aeolus had given Odysseus the winds tied inside an ox-hide bag with a silver cord. Odysseus knew what it was. His crew thought it contained gold and silver that he was hiding from them.

The bag was tied with a silver cord. That was the entire access-control policy.

[Advance.]

They opened it. The winds escaped and blew them all the way back to Aeolus.

The label is on the slide because an early reviewer's response to 'wrong bag' was, reasonably, 'Which bag?' In the first version I apparently expected everyone to arrive with a detailed memory of Book 10. That was optimistic even for a developer conference.

Odysseus knew what the bag did. His crew guessed. They were not supposed to open it, and their wrong guess reversed the journey when home was visible.

[Advance]

By the time Odysseus finally reached Ithaca, the route had changed the outcome completely.`,
    roomCue: "Make sure the room hears the bag explanation before the second reveal. Save Dylan's formal acknowledgment for the close.",
    timing: "1 minute 15 seconds.",
    fallback: "If the myth reference is unfamiliar, use one sentence: 'They saw home, opened what they thought was treasure, and released winds that blew them backward.'",
    evidenceBoundary: "The crew believed the bag held treasure. The story says they could see their homeland and beacon fires before opening it.",
    sources: "Homer, Odyssey Book 10: https://www.theoi.com/Text/HomerOdyssey10.html\nDylan dry-run feedback supplied by Ojus",
  },
  6: {
    purpose: "Close the myth with a truthful statement about the route's cost, without inventing a conversion denominator.",
    script: `[Advance.]

Odysseus left Troy with 12 ships.

Homer does not give us a clean starting headcount, so I am not calculating Bronze Age conversion. Twelve ships is enough to understand the scale.

[Advance.]

He reached Ithaca without his crew. The Phaeacians carried him home while he slept. Athena covered the island in mist and then disguised him as an old beggar.

He finally reached home and immediately entered an identity-verification flow.

[Pause for laugh.]

The arrival counts as completion. It does not establish that the route was good.

That is the pattern I am borrowing: a destination can remain clear while the route repeatedly interrupts or reverses progress.

[Advance]

Developers also arrive with a destination, and that destination is almost never your onboarding flow.`,
    roomCue: "Let the fleet reveal register before advancing. Pause after identity verification. Keep the evidence qualification short and conversational.",
    timing: "1 minute 10 seconds.",
    fallback: "If time is tight, say: 'Twelve ships left. Odysseus reached Ithaca without his crew. Completion alone does not make a route good.'",
    evidenceBoundary: "Do not use 600 as a Homeric denominator. Athena deliberately disguised Odysseus, so explain the unrecognized state rather than treating it as spontaneous.",
    sources: "Homer, Odyssey Books 9, 12, and 13\nPerseus Digital Library, Odyssey Book 13",
  },
  7: {
    purpose: "State the workshop premise in developer language and prepare the room for the exercise without revealing the trap.",
    script: `Developers do not arrive to complete our onboarding. They arrive because they want something on the other side of it.

Maybe they want the first valid API response. Maybe they want a deployed service, a payment, a message, or one record in a database. Account creation, permissions, keys, and billing are tolerated while they still look connected to that result.

Nobody has ever put 'complete vendor onboarding' on a vision board.

The premise I want to test is not that every required step is bad. Some gates protect money, infrastructure, privacy, or other people. The question is whether the developer can tell why the step exists, what progress it creates, and how to recover when it goes wrong.

[Advance]

Take out your phone if you want to participate. The next slide tells you exactly how to begin.`,
    roomCue: "Look for phones coming out only after you finish. Do not hint that the route is intentionally bad.",
    timing: "1 minute 15 seconds.",
    fallback: "If the room is hesitant, say participation is optional and they can watch the projected route. Do not explain what happens after FakeGPT.",
    evidenceBoundary: "Frame the connection between visible progress and continued effort as the workshop premise, not a universal law about all developers.",
    sources: "Workshop session contract\nPresenter-authored first-mile thesis",
  },
  8: {
    purpose: "Launch the exercise with enough clarity and safety to begin while preserving the surprise.",
    script: `The QR opens FakeGPT. Give it one small thing you would like to build, then follow the prompts.

Keep it small. 'Send a message' is good. 'Replace our entire payments architecture before lunch' is somebody else's workshop.

You have eight minutes. Use fake details only. Do not enter personal, company, customer, card, or secret information.

You do not have to finish. If the next step stops feeling worth it, stop there. Leave your last screen open, because we will use that position when we debrief.

If you do not want to use a device, watch the route I keep on screen. You will still be able to take part in the discussion.

I will explain what the workshop collected after time is called. For now, give FakeGPT one small outcome and follow what it asks you to do.

[Pause. Check that the room can see the QR.]

Does anyone need the instructions again?

[Answer only setup or safety questions.]

All right. Eight minutes starts now.

[Advance to the live dashboard. Start the timer.]`,
    roomCue: "Confirm that attendees understand what to type, the fake-data rule, the stopping rule, and leaving the last screen open. Answer setup questions only. Do not reveal the route design.",
    timing: "1 minute 30 seconds for setup, followed by the 8-minute attempt on slide 9.",
    fallback: "If the QR fails, read fakesaaspi.onrender.com/fakegpt aloud. If the app is down, skip the attempt and any room-data claim, then continue to tracker scope on slide 12.",
    evidenceBoundary: "Before the scan, do not say intentionally bad, deliberately frustrating, FakeSaaSPI token route, onboarding trap, friction experiment, or designed to fail.",
    sources: "FakeSaaSPI deployed entry route: https://fakesaaspi.onrender.com/fakegpt\nFakeSaaSPI README and route implementation\nUser-approved surprise protocol",
  },
  9: {
    purpose: "Let attendees work while the live dashboard acts as a quiet room mirror, then stop at the agreed cutoff.",
    script: `[AFTER THE REVEAL: If you returned here by pressing D from slide 10, use this debrief. Otherwise skip to DURING THE EXERCISE below.]

The denominator is the sessions whose events reached this workshop service. The curves show recorded movement between named stage groups. Width is the number of distinct sessions observed on each connection. One session counts once per connection, even if it repeats that movement.

[Point to one visible connection before Deploy.]

This connection changed by the cutoff. That gives us a place to ask a question. It does not tell us why.

I am not going to interpret Deploy reach or the complete end-to-end chronology today. The production app currently misses one Deploy page-view event and duplicates one starting view.

If this was your last screen, what did you expect to happen next?

[Take one or two answers. Keep them attached to those participants.]

Those answers give us plausible explanations, not a cause for everyone in the room.

[Press D to return to slide 10. Then advance. Slide 11 appears only if a verified results URL is configured. Otherwise the deck advances to slide 12.]

[DURING THE EXERCISE: Keep this slide visible. Do not narrate continuously.]

[After about 60 seconds, if people are still looking at the QR:]

The timer is running. If FakeGPT has responded, follow the prompt on your phone. Remember to use fake details.

[Remain quiet. Watch the dashboard and the room. Do not coach anyone past a step.]

[At four minutes, only if the room needs a time cue:]

Four minutes left. Finishing is optional. Stop whenever the next step is no longer worth it, and keep that screen open.

[Remain quiet.]

[At one minute:]

One minute left. Do not rush through a screen you would normally stop at.

[At eight minutes:]

Time. Stop where you are and keep the last screen open.

[Wait until tapping slows down. Advance to slide 10 for the reveal.]`,
    roomCue: "First arrival: run the exercise cues. Second arrival by pressing D from slide 10: run the debrief at the top. During the attempt, help only with access or safety. During debrief, avoid Deploy reach and take at most two explanations.",
    timing: "8 minutes hard stop for the attempt, then about 2 minutes when you return after the reveal for the dashboard debrief.",
    fallback: "If the dashboard fails, let the exercise continue. At the cutoff, use participants' last screens or ask for a show of hands by named screen. If FakeGPT fails, skip the room-data claim and continue to tracker scope on slide 12. Do not troubleshoot telemetry from the stage.",
    evidenceBoundary: "The Sankey-style curves show recorded transitions, not drop-off, abandonment, frustration, or cause. Current production duplicates the FakeGPT start view and omits the deploy page view, so do not interpret full route chronology or deploy reach until that separate fix is deployed and verified.",
    sources: "FakeSaaSPI flow aggregation: apps/demo/src/people.js\nFakeSaaSPI event schema: packages/kit/src/event-validation.ts\nLive dashboard: https://fakesaaspi.onrender.com/present\nDylan dry-run feedback on the curve visualization",
  },
  10: {
    purpose: "Reveal the exercise design, release tension, and establish that the last screen is evidence of position rather than motivation.",
    script: `Stop where you are. Keep your last screen open. The form cannot hurt you anymore.

[Wait for eyes to return to the projector.]

Okay, confession: that route was bad on purpose.

FakeGPT gave you a destination. FakeSaaSPI put obstacles between you and that destination. I combined several onboarding conditions into one exaggerated route so we could experience them in the same room.

If you are annoyed with me, that means the demonstration worked. Please hold that energy for the dashboard and not the post-event survey.

[Pause for laugh.]

Your last screen gives us a position. It does not tell us why you stopped there. Maybe the requirement was unclear. Maybe the fake card was one step too far. Maybe the service errored. Maybe you got a Slack message. Maybe the eight minutes ended.

We need the dashboard and your explanation. Either one alone is incomplete.

[Advance]

Let us look at what the room recorded, using observation words before explanation words.

[Press D to reopen the live dashboard on slide 9. Use its AFTER THE REVEAL debrief. Press D again to return here, then advance.]`,
    roomCue: "Wait until phones are down before the confession. Expect laughter, groans, or both. Do not defend the route. Thank the room for playing along.",
    timing: "1 minute.",
    fallback: "If participants are still working, repeat the stop instruction once. If the exercise barely ran, disclose the design, skip any room-data claim, and continue to tracker scope on slide 12.",
    evidenceBoundary: "Do not describe a last screen as failure, abandonment, or frustration unless the participant says so.",
    sources: "User-approved post-exercise reveal\nWorkshop evidence contract",
  },
  11: {
    purpose: "Debrief an event-specific results view only when a real URL is configured, with sample size and evidence boundaries stated first.",
    script: `[This slide is automatically skipped while the results URL is not configured. Do not force it into the live sequence.]

[If it is configured and verified before the workshop:]

Before we read any number, the denominator is the people who participated in this room and whose events reached this view. This is not a representative sample of developers.

I am going to describe what is visible. I can say a session reached a named step, recorded a bounded error, repeated a connection, or emitted the explicit shipped event. I cannot say the person was confused, frustrated, or unwilling without asking them.

[Point to one visible pattern only.]

Here is one change worth investigating: activity changed around this named point.

[Ask the room.]

If that was your last screen, what did you expect to happen next?

[Take one or two answers. Do not generalize them to everyone.]

Those answers give us candidate explanations. They do not prove one universal cause.

[Advance]

Before we use any of this, I want to show exactly what the workshop tracker recorded and what it left alone.`,
    roomCue: "Use only after the event-specific results URL has been tested. State the sample size first. Take at most two participant explanations.",
    timing: "1 minute 30 seconds when configured. Zero minutes while skipped.",
    fallback: "If the results view is missing or fails, skip to slide 12 and debrief from the live dashboard or participants' last screens. Never apologize at length or debug the embed on stage.",
    evidenceBoundary: "Room telemetry is a bounded workshop sample. Use reached, retried, recorded an error, and completed. Do not use gave up, dropped off, or was frustrated without participant evidence.",
    sources: "CONFIG.resultsUrl, currently null\nWorkshop evidence contract\nFakeSaaSPI aggregate schema",
  },
  12: {
    purpose: "Explain the workshop tracker's real data contract so the room understands both its usefulness and its limits.",
    script: `Here is what this workshop tracker knows.

It receives a session identifier, named step, timestamp, direction, bounded error codes, attempts, selected copy or paste outcomes, visibility signals, and explicit completion or close events.

It does not receive the fake names, fake company, fake card details, or the text you typed into those forms. The generated test token does return to the workshop service because the later step has to verify it.

So I will not receive a sales lead for Acme Banana Holdings.

[Pause for laugh.]

Events enter a local queue and go to the service in batches. Failed delivery retries. Delivery when the page closes is best effort. The service currently keeps the room aggregate in the running process, so a restart can clear it.

That is enough to describe recorded position and a few bounded events. It is not enough to infer emotion, intent, or cause. The tracker cannot distinguish 'I hated this' from 'my child called' or 'conference Wi-Fi remembered its purpose.'

[Advance]

This route was exaggerated. The ingredients were not invented from nowhere. I pulled them from documented platform routes.`,
    roomCue: "Watch for privacy questions. Answer from the actual contract. Do not speculate about what a larger analytics stack might collect.",
    timing: "1 minute 30 seconds.",
    fallback: "If someone wants code-level proof, point them to the public tracker contract after the session and continue. Do not turn the talk into a live security review.",
    evidenceBoundary: "Do not say the tracker collects nothing identifiable. A session identifier is stored. Do not claim guaranteed delivery, durable storage, WebSockets, or sendBeacon for this FakeSaaSPI tracker.",
    sources: "FakeSaaSPI event validation: packages/kit/src/event-validation.ts\nFakeSaaSPI tracker delivery: packages/kit/src/tracker.ts\nFakeSaaSPI deployment configuration: render.yaml",
  },
  13: {
    purpose: "Connect the exaggerated workshop route to a reproducible relationship across the frozen Atlas snapshot without implying user behavior or causation.",
    script: `The route you just tried exaggerated the sequence. It did not invent the categories.

In the frozen 205-record Atlas snapshot, 196 routes contain at least three distinct documented gate types.

The categories overlap inside the same route. Choice appears in 162 records. Account appears in 129. Credential appears in 115. Billing appears in 42.

That is the relationship I want you to notice. The first mile is often not one bad screen. A selected documented route can combine several different classes of requirement before the developer reaches the first result.

Some of those requirements are necessary. Credentials protect access. Billing can protect expensive infrastructure. A choice can be real product capability, not accidental clutter.

This count does not say that 196 developers struggled. It does not say these gates caused abandonment. It says the documentation records several kinds of setup condition on the same selected route.

FakeSaaSPI compressed those categories into one absurd trip so we could feel the coordination problem.

[Pause.]

Also, nobody wants my legal strategy to be 'but the card was fictional.'

[Advance]

Before I show another number, I need to define what one Atlas record represents.`,
    roomCue: "Let the 196 of 205 relationship land before reading the four category counts. Do not turn a gate category into criticism of any named platform.",
    timing: "1 minute 35 seconds.",
    fallback: "If time is short, state only that 196 of 205 records contain at least three distinct documented gate types, then give the evidence boundary and advance.",
    evidenceBoundary: "Gate types are researcher-coded documented requirements or transitions. Counts can overlap within a route. They do not measure prevalence among users, completion, frustration, product quality, drop-off, or cause.",
    sources: "Frozen Atlas snapshot: platform-first-mile-kb commit dd23053647944efefc1bec68d1897a369b495055\nDerived from distinct frictionGates.type values in 205 platform_journey records\nDeveloper Journey Atlas research method",
  },
  14: {
    purpose: "Define the frozen research unit before any aggregate counts appear.",
    script: `The preserved workshop analysis contains 205 records.

One record means one platform, one selected developer intent, one documented route, and one research snapshot. The source is official documentation. The end is either a milestone the documentation names or a terminal state it demonstrates.

That unit is narrower than 'a company's onboarding.' A platform can have many products, entry points, languages, account states, and routes. This research follows one selected path. It does not claim to represent every way into that platform.

I also did not complete onboarding on 205 production accounts. I retain a small amount of self-preservation and a finite number of credit cards.

[Pause for laugh.]

This is documentation evidence. It can show what the inspected source asks for and how the route was represented. It cannot show whether real developers completed it, how long they took, what they felt, or why they stopped.

Please keep that boundary in your head for the next two numbers. Large type does not upgrade the evidence.

[Advance]

The first number is actually about my research method, because the dataset records when the workshop had to make a selection decision.`,
    roomCue: "Make sure the room can repeat the unit: one platform, one intent, one documented route, one snapshot. Slow down before the evidence boundary.",
    timing: "1 minute 30 seconds.",
    fallback: "If the method feels dense, say only the unit and boundary. The Atlas and README contain the detail.",
    evidenceBoundary: "Do not call these 205 tested onboarding experiences, verified shortest paths, users, sessions, or companies with measured behavior.",
    sources: "Frozen corpus: platform-first-mile-kb commit dd23053647944efefc1bec68d1897a369b495055\nMeasurement contract: research/platform-first-mile-kb/MEASUREMENT-CONTRACT.md\nDeveloper Journey Atlas research guide",
  },
  15: {
    purpose: "Disclose how often workshop policy affected route selection or normalization, and prevent that method count from becoming a platform-performance claim.",
    script: `This number needs a careful reading.

In 151 of the 205 source records, the selection-basis text says workshop policy affected route selection or normalization. The other 54 do not use that policy language.

The earlier slide turned that phrase count into a much stronger claim: that 151 platforms failed to present one unambiguous default route. The records do not support that conclusion. In some cases the policy chose among routes. In others it normalized signup or how the route was represented for the research.

So this number is a method disclosure. It tells you that a researcher made many route decisions while producing one comparable record per platform. It does not tell you that 151 groups of developers were confused, or even that 151 documentation sets lacked a recommendation.

The practical consequence is caution. When you inspect a route in the Atlas, read the selection basis and the source. Do not turn a normalized research route into a universal product truth.

If a statistic becomes less exciting when its denominator is explained, that is not a presentation failure. That is the statistic returning to its natural habitat.

[Advance]

The next count is stronger because its two categories are explicitly recorded for every item in the frozen corpus.`,
    roomCue: "Make the method boundary explicit. Expect questions about why the count remains visible and keep the answer tied to the selection-basis field.",
    timing: "1 minute 45 seconds.",
    fallback: "If time is short, say: '151 records mention a workshop policy decision. That is method metadata, not proof that platform documentation confused developers.'",
    evidenceBoundary: "Do not say 151 platforms lacked an unambiguous default route. Do not use the generated 94 classifier as a substitute. The supported fact is the 151-record phrase count and its limited meaning.",
    sources: "Frozen corpus: platform-first-mile-kb commit dd23053647944efefc1bec68d1897a369b495055\nFrozen selection_basis fields\nRoute-selection classifier audit\nIndependent exercise and research review completed July 22, 2026",
  },
  16: {
    purpose: "Explain the 83/122 terminal classification and turn it into a concrete route-design question.",
    script: `This count uses the same frozen set of 205 documented routes.

Eighty-three records classify the terminal as an explicitly named first-success milestone. The other 122 classify it as a demonstrated terminal state without that milestone being named.

The second group still has an observable end. It might show a valid response, a deployed service, or a completed configuration. The classification says the documentation did not explicitly label that end as the first-success milestone for this record.

It does not mean 122 platforms have no success. It does not mean developers failed to recognize success. We did not observe developers here.

The useful question is local: for the route you own, what result can the developer see and say, 'Yes, the thing works'?

A finish line should not require escape-room logic.

[Pause for laugh.]

Name that signal before you instrument activation. Otherwise the internal metric may say 'activated' while the developer is still asking whether anything happened.

[Ask the room.]

What is one visible first result in a route you work on?

[Take one short answer.]

[Advance]

Even with a named finish line, a stopping point still leaves us with competing explanations.`,
    roomCue: "Take one concrete audience answer. Push gently for something a developer can observe, not an internal lifecycle label.",
    timing: "1 minute 40 seconds.",
    fallback: "If nobody answers, use 'the first valid API response appears' and continue.",
    evidenceBoundary: "The 83 and 122 counts are documentation classifications. Do not describe the 122 as routes with no success, unclear onboarding, or failed users.",
    sources: "Frozen corpus: platform-first-mile-kb commit dd23053647944efefc1bec68d1897a369b495055\nFrozen boundary_evidence.type fields\nDeveloper Journey Atlas evidence contract",
  },
  17: {
    purpose: "Show how one observed position becomes a discriminating question instead of a confident diagnosis.",
    script: `Suppose the tracker says activity changed around 'Create app.'

We have at least three plausible explanations on screen. The developer may not know which permissions to choose. The card requirement may change whether the route feels worth continuing. An error may block recovery.

There are others. Time ran out. The browser lost state. The developer opened another tab. Someone asked where the coffee was.

The stopping point does not choose among them for us.

So ask the smallest question, or collect the smallest additional observation, that separates the plausible explanations.

For permissions: what did you think this choice would allow? For the card: what changed when payment appeared? For the error: what did you try next, and could you recover?

[Ask the room.]

Give me one other explanation for stopping at 'Create app.'

[Take one answer.]

Good. What would we need to observe or ask to tell that explanation apart from the others?

[Take one answer or supply a short example.]

This is the end of the problem half. We have experienced a route, located activity changes, and protected the difference between a position and a cause.

[Advance]

The action half starts smaller than a redesign. Pick one documented route, one condition to inspect, and one person who can explain what they expected.`,
    roomCue: "Take one explanation and one discriminating question. Stop the discussion before it becomes a full diagnosis of the fake route.",
    timing: "2 minutes.",
    fallback: "If the room is quiet, use 'the developer did not know whether creating the app would incur a charge' and ask what evidence would distinguish it.",
    evidenceBoundary: "Treat every proposed cause as a hypothesis until an observation or participant account separates it from alternatives.",
    sources: "Developer Journey Atlas diagnosis evidence contract\nWorkshop evidence boundary",
  },
  18: {
    purpose: "Make the transition into action concrete by using the Atlas as a source-inspection tool rather than a leaderboard.",
    script: `This is the turn from describing the problem to deciding what to inspect.

The Developer Journey Atlas is one resource you can use. Open one platform you know, or browse a relevant category. Choose one source-grounded route and inspect the conditions documented along it.

Do not begin by asking, 'What is our score?' The Atlas does not score product quality. It does not report conversion, time to value, sentiment, or a verified cause. Official documentation is evidence. It is not sworn testimony from the developer who rage-closed the tab.

The live Atlas changes as records are added and reviewed. The two counts I just showed came from a frozen 205-record workshop snapshot. The live total may be different. Most shortest-route audits still need human judgment, so open the sources rather than treating the generated route as authority.

Your action is small: choose one documented condition to verify in your own route. Maybe it is account state, a permission choice, a billing gate, a credential warning, or the language used for first success.

If your platform is missing, record the missing case. Do not ask the tool to invent a benchmark.

[Allow a brief scan if the room has devices out.]

[Advance]

Once you have a condition worth checking, you need a way to observe where activity changes in your route.`,
    roomCue: "Confirm that attendees understand this as source inspection, not peer ranking. If scanning would steal time, point out that the URL remains in the deck and move on.",
    timing: "2 minutes 30 seconds, including a short scan window.",
    fallback: "If the Atlas is unavailable, return to one documented condition on slide 13 and ask attendees to name the equivalent condition in their own route. Conference Wi-Fi is not the learning objective.",
    evidenceBoundary: "The live Atlas currently differs from the frozen 205-record snapshot and most route audits need human judgment. It describes official documentation, not observed developer behavior.",
    sources: "Developer Journey Atlas: https://developer-journey-atlas.onrender.com\nRepository README and research method\nSoftware Apache 2.0, original research and generated views CC BY 4.0",
  },
  19: {
    purpose: "Introduce Calibrate as one optional observation tool, clearly separating the published package from the experimental repository client.",
    script: `I built Calibrate because I wanted a small way to mark where activity changes without collecting the contents people type into a route.

Apparently my response to too many onboarding tools was one more onboarding tool.

[Pause for laugh.]

The code on this slide is the experimental browser client in the public repository. The visible label matters: it is not published to npm.

For standard browser fields, this repository client can observe routes and field state without a framework-specific adapter because React, Vue, Svelte, Angular, and plain HTML ultimately render DOM controls. Custom controls may still need manual instrumentation. Autocapture does not understand user intent.

The published package is called usecalibrate. It uses stable route and step IDs supplied by the application. It can record position, bounded errors, retries, named copy or paste outcomes, and an explicit shipped event.

Use Calibrate only if it helps answer your route question. Existing analytics, server logs, or a small manual observation may already be enough.

[Advance]

Forget the import for a moment. The useful design decision is the data contract.`,
    roomCue: "Watch for npm or framework questions. Answer the publication distinction immediately. Keep the SDK subordinate to the workshop method.",
    timing: "2 minutes 30 seconds.",
    fallback: "If the code is unreadable, say only: 'This repository client observes standard DOM controls. The published package uses named steps. Neither one automatically understands intent.'",
    evidenceBoundary: "@usecalibrate/browser is an experimental repository package and is not published to npm. The published usecalibrate package is manifest-driven. Custom controls can require manual events. Do not mix the two collector implementations.",
    sources: "Calibrate README: /Users/ojusave/Desktop/Samples/usecalibrate/README.md\nPublished package README: packages/kit/README.md\nExperimental browser client: packages/browser/src\nApache 2.0 license",
  },
  20: {
    purpose: "Explain what Calibrate can record, what it deliberately excludes, and why those signals still do not explain motivation.",
    script: `The contract is: interaction state, not field contents.

For the experimental browser client, a session can record a normalized route, field focus, whether a field became empty or non-empty, validation state, named flow steps, manual copy or paste outcomes from the application, shipped, and a browser exit signal.

For standard fields, the identifier order is data-fm, then name, then id. If a route matters, give the step a stable data-fm label. Do not trust an autogenerated component ID to survive Tuesday.

The client checks value length to derive empty or filled. It does not store or transmit the value. It does not collect DOM text, labels, placeholders, query strings, hashes, or clipboard contents. Password and hidden fields are ignored. Unknown event fields are rejected by the closed schema. Review route path labels before deployment, and use identify only with an approved opaque identifier.

Copy and paste outcomes are named application signals. The SDK does not inspect the clipboard. Your production password remains between you, your password manager, and your incident review.

[Pause for laugh.]

Events enter a local queue, normally flush after about two seconds or ten queued events, and are sent in batches of up to 50. Failed requests retry. Exit delivery is best effort.

The SDK knows a field changed. It does not know whether the developer was confused, interrupted, or checking Slack for emotional support.

That is the central limit. Telemetry can tell us where activity changed. It cannot tell us what the developer expected.

[Advance]

For that, we need to watch a small number of people attempt the route and then ask.`,
    roomCue: "Ask for one stable data-fm label only if time allows. If privacy questions arise, answer from the closed schema and defer code review.",
    timing: "2 minutes 30 seconds.",
    fallback: "If the room cannot read the diagram, state three boundaries: no field content, stable named signals, and no motive inference. Offer the schema after the session.",
    evidenceBoundary: "Do not say the client never reads a form value. It checks length to derive state. Path segments need review and identify accepts an optional opaque ID. Do not claim automatic clipboard capture, guaranteed real-time or exit delivery, total framework independence, or production-ready horizontal scale.",
    sources: "Calibrate field observer: packages/browser/src/fields.ts\nCalibrate transport: packages/browser/src/transport.ts\nCalibrate collector: packages/collector/src/server.ts\nCalibrate security policy: SECURITY.md",
  },
  21: {
    purpose: "Restore the practical developer-champions exercise so attendees can add human context to route telemetry.",
    script: `Pick three to five developer champions who resemble the developer this route is meant to serve.

Think of one person who would be a good fit for that small pilot.

[Pause for five seconds.]

Do not recruit only the people who helped build the platform and already speak every internal acronym. Five friendly insiders are not five new developers. They are a very polite control group.

Give them the outcome, not step-by-step instructions. Say, for example, 'Create an app and get the first valid response.' Then watch.

Do not rescue them during the attempt. If I explain every click, I have tested my ability to give directions.

[Pause for laugh.]

Record where activity changes. Calibrate can help with a named position when the route is instrumented and delivery succeeds. You can also take careful notes. The tool is optional. The observation is the work.

After the attempt, ask what they expected at that point, what they tried, and what made the next step uncertain or no longer worthwhile. Ask after observing, because a feedback survey alone tends to flatten the sequence into a general opinion.

Use fake or approved test data. Do not put customer, company, payment, or secret information into a pilot.

Three to five people can expose useful questions. They cannot establish a representative conversion rate. If all three stop at the same place, that is worth investigating. It is not '60 percent of developers abandon onboarding.'

[Advance]

Now we have the documented route, the recorded position, and the participant's explanation. That is enough to take one useful question to the person who owns the route.`,
    roomCue: "Ask attendees to name one suitable champion, not an internal expert. Listen for people planning to coach participants and correct that gently.",
    timing: "3 minutes 30 seconds to teach the method. A real pilot needs the route time plus a short debrief and happens after the workshop.",
    fallback: "If attendees cannot recruit champions now, ask them to name three candidates and schedule one 20-minute observation. If no telemetry is available, use notes and the participant's last screen.",
    evidenceBoundary: "A three-to-five-person pilot produces qualitative observations and useful questions, not a representative rate. Calibrate records a position only when instrumentation and delivery work.",
    sources: "GOV.UK moderated usability testing: https://www.gov.uk/service-manual/user-research/using-moderated-usability-testing\nGOV.UK participant recruitment and session analysis\nNielsen Norman Group, Usability Testing 101",
  },
  22: {
    purpose: "Turn the route evidence into a bounded cross-functional handoff with an owner and one next check.",
    script: `The route owner does not need a 40-page diagnosis. They need enough evidence to decide what to inspect or change next.

Bring four things.

First, the expected route and the first useful result you agreed to test.

Second, the position where recorded activity changed. Describe what happened without assigning a cause.

Third, what the champions expected, tried, and found uncertain. If their explanations disagree, keep the disagreement. Do not iron it into one neat story for the slide deck.

Fourth, one next check. Maybe the team compares two permission explanations, tests recovery from one error, moves a billing explanation earlier, or observes another person with a different background.

DevRel contributes the documented route, developer language, and evidence from the attempt. The owning team decides what changes. That keeps the handoff useful and respects who carries the product risk.

If everyone owns the route, write down who can actually change Tuesday's step.

[Ask the room.]

Who owns one route you care about, and what single question would you bring them?

[Take one concise answer.]

If ownership is unclear, identifying the owner is the next action. An unowned route does not become cross-functional merely because we put four functions in a meeting.

[Advance]

That is the workshop method. The next resource is optional and much simpler.`,
    roomCue: "Take one owner and one question from the room. Stop any answer that expands into a full transformation program and bring it back to one route.",
    timing: "2 minutes 30 seconds.",
    fallback: "If nobody knows the owner, say that finding the person who can change the route is the action. Use the FakeSaaSPI card step as a worked example.",
    evidenceBoundary: "This handoff is a recommended operating pattern, not a validated framework. The owner decides whether the evidence supports a change.",
    sources: "Developer Journey Atlas action-brief model: src/action-brief.ts\nWorkshop session contract on DevRel cross-functional input",
  },
  23: {
    purpose: "Offer the Render credit portal accurately without turning the close into a deployment tutorial or guarantee.",
    script: `This resource is optional.

The QR opens the DevRelCon claim portal. Continue with GitHub and follow the status the portal gives you. If a promotional code is available, copy it and redeem it from Billing in your Render Dashboard.

The portal does not connect a repository, deploy an application, or mint credits on the spot. If it says codes are pending, believe the portal rather than the person with a microphone.

I cannot promise availability or timing from this slide. The same link is in the deck README if conference Wi-Fi decides to join the Odyssey.

This is the part where I offer you money and still assign homework.

[Pause briefly for scanning.]

Use the credit for an approved prototype or another project you are authorized to deploy. You do not need it to run the observation method from this workshop.

[Advance]

Credit or no credit, there is one action I want you to take on Monday.`,
    roomCue: "Give the room a brief scan window. Keep the credit optional. Do not improvise an amount, deadline, eligibility rule, or delivery time.",
    timing: "1 minute 30 seconds, including the QR scan pause.",
    fallback: "If the portal fails, say the link is in the README and continue. Do not troubleshoot sign-in or promise that a code will arrive later.",
    evidenceBoundary: "The portal requires GitHub sign-in, can show an assigned code or pending state, and directs redemption to Render Billing. It does not deploy code. No repository-level license was found for the portal.",
    sources: "Live portal: https://credits-portal-mmdm.onrender.com/claim/devrelcon\nPortal ClaimPage and claimService implementation\nRender Dashboard docs: https://render.com/docs/render-dashboard",
  },
  24: {
    purpose: "End with one bounded Monday action, a transparent careers invitation, and a verbal acknowledgment without manufacturing grandeur.",
    script: `On Monday, pick one route. Not the entire developer journey. One route.

Write down the first-success outcome in words a developer can recognize. Name the team that owns the route. Schedule the next observation with a developer champion who resembles the intended user.

[Give the room 10 seconds to write down the route and owner.]

Use the Atlas if you need a documented condition to inspect. Use Calibrate, your existing analytics, logs, or careful notes to mark where activity changes. Then ask what the developer expected. Bring the owner one question and one next check.

Do not return on Monday with a transformation program and a 46-tab spreadsheet.

[Pause for laugh.]

If all you leave with is 'our onboarding has friction,' I have given you a true sentence that is almost useless. Leave with a named route, a visible first result, an owner, and a scheduled observation.

The QR on the right opens Render's current careers page and highlights the role if it is still open. The link includes my referral. That does not promise an interview or a hiring outcome. If a role looks relevant, DM me with questions about the team or application. If the highlighted role has closed, the link still opens our current roles.

One last thank-you to Dylan for the dry run. The Bag of Winds label, the clearer problem-to-action turn, and the route curve are here because he was willing to say, 'I do not understand what this means.' That is excellent feedback and, conveniently, the method of this workshop.

[Pause.]

Pick one route. I am happy to take questions.

[Leave this slide visible.]`,
    roomCue: "Ask attendees to write down their one route before packing up. Leave the QR visible during questions. Thank Dylan by name only after the workshop content is complete.",
    timing: "2 minutes 30 seconds, then questions. Protect at least 3 minutes of schedule recovery before this slide so the ending is not rushed.",
    fallback: "If time is gone, state the Monday action in three sentences, say the careers QR includes the referral link, thank Dylan, and stop. Do not add a grand conclusion.",
    evidenceBoundary: "The careers role can close. A referral link does not guarantee an interview or hiring outcome. The workshop artifact is verified, but workshop impact requires rehearsal and observation with a representative room.",
    sources: "Render careers: https://render.com/careers?ashby_jid=4611bde4-47ac-45fc-ab56-235489e52682&utm_source=L51D6eVlVG\nUser confirmation that the link contains Ojus's referral\nDylan dry-run feedback supplied by Ojus",
  },
};
