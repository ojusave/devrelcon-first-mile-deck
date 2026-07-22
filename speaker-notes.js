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
    purpose: "Introduce the Atlas research and land the recomputed route-length finding for the 224-route snapshot.",
    script: `I built the fictional exercise from patterns I kept seeing while examining real developer-platform documentation.

I examined 224 developer platforms, selecting one developer goal and one official documented route per platform.

Across those records, I counted 2,240 actions performed by a developer or administrator before the recorded first-success boundary.

That is 10 actions on average. The median is 7.

The records also contain 82 automatic platform events, such as a build or provisioning transition. Those events are not included in the action average.

The routes are grounded in 949 official sources. This is not 224 mystery companies generated by a spreadsheet having a productive afternoon.

[Pause for laugh.]

One platform does not equal one whole company journey. A company may have several products, interfaces, and sensible starting points. Each Atlas record covers one selected route for one selected developer goal.

I also did not watch 224 developers complete these routes. I inspected what the official documentation asks a developer to do. This is a map of documented routes, not conversion data and not a ranking.

[Advance]

Once I had the route lengths, I looked at a basic question: does the documentation clearly tell the developer what first success is?`,
    roomCue: "Pause after 10 average actions. Then add the median, the 224-route scope, and the documentation boundary.",
    timing: "1 minute 30 seconds.",
    fallback: "Say: 'Across 224 selected routes, the average was 10 developer or administrator actions and the median was 7.' Give the documentation boundary and advance.",
    evidenceBoundary: "The 224 records are source-grounded route records, but they are not user sessions, complete company journeys, product rankings, or verified shortest paths. The current audit manifest marks all 224 as needing human judgment.",
    sources: "Developer Journey Atlas snapshot generated July 22, 2026\n224 selected routes, 2,240 developer or administrator actions, average 10, median 7, and 82 automatic platform events\n949 official sources in the live Atlas manifest\nDeveloper Journey Atlas commit 065e4fa5b2d2ab38fd9fe965f5a6d7a1d1362edf",
  },
  14: {
    purpose: "State the clearest current Atlas finding: most inspected routes demonstrate an endpoint without explicitly naming first success.",
    script: `I found only 74 of the 224 routes explicitly named the first-success milestone.

The other 150 routes demonstrated a terminal result, but the documentation did not name that result as first success.

Only 56 of the 224 documentation sets made any time-to-first-success claim. That is 25 percent.

That does not mean those 150 routes are broken. It means the developer may have to infer when the setup work has produced the first useful outcome.

If the end of onboarding is basically 'you will know it when you see it,' congratulations, we have built a haunted house.

[Pause for laugh.]

The practical fix is small enough to test. Name the first usable result in plain language. Show the developer the signal that proves they reached it. Then check whether a first-time developer recognizes the same boundary.

A time claim may describe reading time, a tutorial, or an already-authenticated subpath. It is not automatically a complete first-mile estimate.

This finding is about documentation language. It does not tell us whether people completed, how long they took, or whether naming the milestone changes conversion.

[Advance]

Next I looked at the requirements and transitions inside those routes.`,
    roomCue: "Let 74 and 150 register as one split. Then add the separate 56-route time-claim finding and its caveat.",
    timing: "1 minute 30 seconds.",
    fallback: "Say: '74 named first success, 150 showed an endpoint without naming it, and 56 made any time claim.' Then give the documentation boundary.",
    evidenceBoundary: "Boundary type is a documentation classification. It does not measure completion, comprehension, conversion, or product quality.",
    sources: "Developer Journey Atlas commit 065e4fa5b2d2ab38fd9fe965f5a6d7a1d1362edf\n74 records use boundary_evidence.type explicitly-named\n150 records use boundary_evidence.type demonstrated-terminal-state\n56 records contain a vendor time-to-first-success claim\n224 records total",
  },
  15: {
    purpose: "Make route-condition data concrete while defining a gate as documentation structure rather than proven friction.",
    script: `I use the word gate for a documented requirement or transition in the route. It may be necessary. It may be avoidable. The record alone cannot decide that.

The median route contained four documented gates.

One hundred twenty-four of 224 routes included at least one credential requirement. One hundred three included at least one documented choice. Sixty included at least one documented wait.

Those counts overlap. A route can ask for a credential, force a product choice, and include a provisioning wait. Some routes looked at the checklist and said, 'Yes.'

[Pause for laugh.]

Please do not take this slide to your security team and announce that I said credentials are bad. I enjoy being invited back to buildings.

The useful question is narrower. Is this requirement necessary at this point? Does the developer understand why it is here? Can they see progress? Can they recover if it fails?

These are documented conditions. They are not measured difficulty, drop-off, frustration, or cause.

[Advance]

A documented gate tells us what exists. It still does not tell us why one person stopped there.`,
    roomCue: "Define gate before reading the counts. Stress that the three route counts overlap.",
    timing: "1 minute 45 seconds.",
    fallback: "State the median of four and one example count, then say that documented gates are not proven causes.",
    evidenceBoundary: "Gate counts are route-level presence counts derived from friction_gates.type. Categories overlap. A documented gate can be necessary and does not establish effort, severity, abandonment, or cause.",
    sources: "Developer Journey Atlas commit 065e4fa5b2d2ab38fd9fe965f5a6d7a1d1362edf\n1,021 documented gates across 224 records, median 4 per route\n124 routes include credential, 103 include choice, and 60 include wait",
  },
  16: {
    purpose: "Introduce the blocker catalog as a hypothesis inventory and explicitly prevent it from becoming a list of diagnosed causes.",
    script: `A recorded stopping point creates a place to investigate. It does not select an explanation.

To help with that investigation, I documented 790 plausible blocker hypotheses. Four hundred sixty-six are universal hypotheses. Three hundred twenty-four are platform-specific.

Zero are diagnosis-eligible.

That zero matters more than the impressive-looking 790. I documented 790 explanations worth checking. I did not document 790 proven reasons developers leave.

The catalog is intentionally broad because the same observed position can follow from identity rules, permissions, billing, unclear prerequisites, a generic error, a slow asynchronous process, an interruption, or something the tracker cannot see.

Do not connect this inventory directly to the 224 routes as if every route experienced every hypothesis. They are separate research structures.

[Advance]

Let me make the hypothesis language concrete with a few examples.`,
    roomCue: "Pause on zero diagnosis-eligible. Say the distinction between worth checking and proven reason slowly.",
    timing: "1 minute 30 seconds.",
    fallback: "Say: '790 hypotheses, zero diagnosed causes.' Then explain that the route study and blocker catalog are separate structures.",
    evidenceBoundary: "The catalog is not telemetry, prevalence, frequency, sentiment, abandonment, or causal evidence. No explicit mapping connects all 790 cards to the 224 route records.",
    sources: "Developer Journey Atlas generated blocker catalog\n790 cards: 466 universal and 324 platform-specific\nAll cards marked not_diagnosis_eligible\npackages/generated-views/blockers.md and src/generated/catalog.json",
  },
  17: {
    purpose: "Give the audience representative blocker hypotheses they can recognize and test without presenting them as common or proven.",
    script: `Here are eight examples from the catalog.

Account and identity includes a work-email requirement and verification that is delayed, filtered, or expired.

Billing and access includes a card appearing before evaluation, or a developer who cannot create the required key, certificate, service account, or OAuth application.

Setup and recovery includes prerequisites appearing after the step that needs them, and routes with no reset, undo, rollback, or clean restart.

Errors and waits includes a generic error, and provisioning, build, deploy, indexing, or model loading that takes longer than expected.

These examples are useful because each one suggests a different question and a different owner. They are not a ranking of common frustrations. Some may be intentional controls.

The next job is to locate one condition in a real documented route, then decide whether it is worth inspecting locally.

[Advance]

That is why I built Atlas.`,
    roomCue: "Read one example per quadrant first. Add the second only if the room is following. Do not invite vendor name-and-shame.",
    timing: "2 minutes.",
    fallback: "Read one example from each quadrant and land the line that every hypothesis needs a local check.",
    evidenceBoundary: "Examples are catalog entries, not measured frequency, platform quality, developer emotion, abandonment, or cause.",
    sources: "Developer Journey Atlas blocker catalog\nUniversal hypotheses U04.02, U04.04, U06.01, U07.04, U08.08, U17.05, U17.17, and U18.04\npackages/generated-views/blockers.md",
  },
  18: {
    purpose: "Introduce Atlas and give attendees a short source-inspection activity that produces one locally testable condition.",
    script: `So I built Atlas as an open-source helper for peers who work on developer platforms.

The current snapshot contains 224 documented journeys. Each record follows one selected route for one developer intent and presents prerequisites, actions, friction gates, a first-success boundary, and official sources.

The useful unit is deliberately narrow. This is not everything a company calls onboarding. It is one documented route that gives us a concrete starting hypothesis.

Scan the QR and find a platform you know, or browse a peer cohort. A peer cohort means platforms in a similar category with compatible route and success-boundary definitions, not an anonymous leaderboard.

Open one documented route and its official sources. Your task is to write down one condition you will inspect in your own product. It might be an account rule, installation, a permission choice, billing, credential creation, documentation navigation, a wait, or the language used for first success.

You are not looking for a score. You are looking for one route hypothesis.

[Allow three minutes. Help only with access.]

If the route is wrong, correct it through a pull request. If your platform is missing, write down the name and contribute it after the session rather than waiting for an unrehearsed result on stage.

[Regroup.]

Atlas is Apache-2.0 open-source software, and the original research data is CC BY 4.0. The current product maps the first mile. The direction is to map the broader developer journey and evidence-backed pain points.

Keep the condition you selected. Atlas gives us the documented route hypothesis. The next question is how to observe where activity changes in the route you actually own.

[Advance]`,
    roomCue: "Keep the product introduction brief, then give the room three quiet minutes. Regroup with one attendee example if time permits.",
    timing: "5 minutes, including introduction, instructions, and regroup.",
    fallback: "If Atlas or Wi-Fi fails, ask attendees to choose one condition from slide 15 and locate its equivalent in a route they own.",
    evidenceBoundary: "Atlas maps documentation, not observed behavior, conversion, sentiment, platform quality, or cause. Missing-platform research is not a stage promise. Do not add per-result evidence-status badges.",
    sources: "https://developer-journey-atlas.onrender.com\nLive /api/meta response reviewed July 22, 2026: 224 routes, 2,359 canonical steps, 949 official sources\nAtlas commit 065e4fa5b2d2ab38fd9fe965f5a6d7a1d1362edf\nApache-2.0 software and CC BY 4.0 original research data",
  },
  19: {
    purpose: "Introduce Calibrate as the bounded observation layer between an Atlas route hypothesis and a human explanation.",
    script: `Atlas gives us a documented route hypothesis. Calibrate can mark named positions and bounded events in the route we actually own. The participant debrief supplies what the person expected and tried.

I built Calibrate as a self-hosted, privacy-bounded onboarding signal tool. It is Apache-2.0 open-source software.

The important unit is one route. Agree on the first useful result, name the positions, and decide what bounded machine events are worth recording.

Do not install a tool merely because its author is standing near a QR code. Ask engineering and product to evaluate the repository against your privacy, reliability, and route requirements.

The current npm release is usecalibrate 0.1.3. The newer guided installer in the repository is not the stage path until its package release is complete.

Existing analytics, logs, or careful observation may already answer your question. Calibrate is one option, not a required layer.

[Advance]

The deciding factor is the data contract.`,
    roomCue: "Give the room time to scan the repository QR. Keep the tool subordinate to the evidence method.",
    timing: "1 minute 30 seconds.",
    fallback: "State the three-layer handoff: Atlas route, Calibrate position, human explanation.",
    evidenceBoundary: "Do not promote the unreleased 0.1.4 guided installer or the experimental unpublished workspace package. Do not call Calibrate general product analytics.",
    sources: "Calibrate README: /Users/ojusave/Desktop/Samples/usecalibrate/README.md\nhttps://github.com/ojusave/usecalibrate\nApache-2.0 license\nnpm latest reviewed as usecalibrate 0.1.3 on July 22, 2026",
  },
  20: {
    purpose: "State the current Calibrate position-only contract, privacy exclusions, storage boundary, and inference limit.",
    script: `Calibrate records named route positions, forward and backward navigation, completion, elapsed time, bounded machine errors, configured copy or paste outcomes, and an explicit shipped event.

It never reads form or textarea values, clipboard contents, DOM text, or full URLs, query strings, and hashes.

Copy and paste are named outcomes emitted by the application. The tool does not inspect the clipboard.

The sidecar keeps a current-window aggregate in memory by default. Optional JSONL persistence can preserve events. Without persistence, a restart resets the aggregate.

That means the current dashboard is not a general analytics system. Do not claim trends, cohorts, time series, or representative conversion rates from it.

Most importantly, position tells you where to ask. It does not tell you why. Calibrate cannot infer intent, motivation, emotion, or cause.

[Advance]

With that contract understood, there are two responsible ways to begin.`,
    roomCue: "Read the Records and Never Reads columns, then land the inference limit. Answer technical questions from the current README.",
    timing: "2 minutes.",
    fallback: "State three boundaries: named positions, no content, no cause inference.",
    evidenceBoundary: "Do not claim guaranteed delivery, durable storage by default, live trends, cohorts, time series, intent, emotion, or causal diagnosis.",
    sources: "Calibrate current README and event schema\nPosition-only event contract\nSidecar current-window aggregate and optional JSONL persistence\nSECURITY.md",
  },
  21: {
    purpose: "Offer two bounded implementation paths without shaming engineering or granting unsupported reuse rights for FakeSaaSPI.",
    script: `The first path is a production evaluation. Agree on the first useful result, review the event and privacy contract with engineering and product, instrument a test or staging route, and validate the emitted positions with fake data.

The second path is a disposable replica. Use this when production integration is not approved or practical yet. Recreate the route with fake credentials and no customer or production data. Instrument the same named positions.

The replica is a research aid. It is not proof of production behavior.

FakeSaaSPI is the workshop reference pattern, but I am not telling the audience to copy that repository today. It is publicly inspectable source without a project license, and its embedded SDK still needs reconciliation with current Calibrate.

The point of the fallback is not to go around engineering. It is to reduce the cost of asking a better question before requesting production work.

[Advance]

Whichever path you choose, the next step is a small intended-user investigation.`,
    roomCue: "Present both paths as legitimate. Avoid adversarial language about engineering approval.",
    timing: "2 minutes.",
    fallback: "State production evaluation, disposable replica, and no-production-proof boundary.",
    evidenceBoundary: "Do not call FakeSaaSPI open source or grant reuse rights. A replica does not validate production behavior, reliability, or conversion.",
    sources: "Calibrate README and Apache-2.0 license\nFakeSaaSPI repository license audit, July 22, 2026\nFakeSaaSPI embedded @firstmile/sdk review",
  },
  22: {
    purpose: "Give attendees a concrete ten-person take-home investigation that ends with one owner, one question, and one next check.",
    script: `When you go back, choose one developer intent and one visible first useful result.

Recruit ten intended evaluators. Include people who are new to the route, not only developer champions who already know every internal term.

Give them the outcome, not step-by-step instructions. Tell them what signals the route records. Use fake or approved test data. Do not rescue them during the attempt.

Observe the recorded position, then ask what they expected, what they tried, and what made the next action uncertain.

Bring the route owner one question, one piece of evidence, and one next check. Keep disagreements between participants rather than flattening them into one neat story.

Ten people can reveal patterns and useful questions. They cannot establish a representative conversion rate.

This is promotion-shaped work. You turned developer anecdotes into evidence and gave product, engineering, and documentation one concrete decision. If you are interviewing, bring the same analysis. It shows how you think before you have the title.

[Advance]

If you need somewhere to host the disposable replica, the next resource may help.`,
    roomCue: "Ask attendees to write down one route, one intended user, and the likely owner. Keep the career line grounded in useful work.",
    timing: "3 minutes.",
    fallback: "Reduce the plan to route, participant, observation, debrief, and owner handoff.",
    evidenceBoundary: "Ten sessions support pattern discovery, not representative statistics. Participation must be informed and use fake or approved test data.",
    sources: "GOV.UK moderated usability testing guidance\nWorkshop evidence contract\nDeveloper Journey Atlas action-brief model",
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

The take-home action is already written down. I will close with the two ways to stay connected.`,
    roomCue: "Give the room a brief scan window. Keep the credit optional. Do not improvise an amount, deadline, eligibility rule, or delivery time.",
    timing: "1 minute 30 seconds, including the QR scan pause.",
    fallback: "If the portal fails, say the link is in the README and continue. Do not troubleshoot sign-in or promise that a code will arrive later.",
    evidenceBoundary: "The portal requires GitHub sign-in, can show an assigned code or pending state, and directs redemption to Render Billing. It does not deploy code. No repository-level license was found for the portal.",
    sources: "Live portal: https://credits-portal-mmdm.onrender.com/claim/devrelcon\nPortal ClaimPage and claimService implementation\nRender Dashboard docs: https://render.com/docs/render-dashboard",
  },
  24: {
    purpose: "Close with the workshop method, an invitation to contribute, and a transparent Render careers link.",
    script: `One route. One useful question. One owner.

The left QR is my X account. Use it for questions, corrections, or to tell me what happened when you ran the investigation.

Atlas and Calibrate are open source, so pull requests are welcome. The best contribution is a correction with an official source or a concrete improvement to the bounded event contract.

The right QR opens Render's careers page through my referral link. The referral does not guarantee an interview or hiring outcome. If a role is relevant, you can ask me about the team or application.

Thank you to Dylan for the dry run and to everyone here for attempting the intentionally terrible route.

[Pause.]

You already wrote down the next action: one route, ten intended users, and one evidence-backed question for the owner.

Thank you. I am happy to take questions.

[Leave this slide visible.]`,
    roomCue: "Leave both QRs visible during questions. Keep the careers invitation transparent and brief.",
    timing: "1 minute, then questions.",
    fallback: "Thank the room, identify the two QRs, disclose the referral, and stop.",
    evidenceBoundary: "A referral link does not guarantee an interview or hiring outcome. Artifact verification is not evidence that the workshop or tools improve onboarding outcomes.",
    sources: "https://x.com/ojusave\nhttps://github.com/ojusave/developer-journey-atlas\nhttps://github.com/ojusave/usecalibrate\nRender careers referral URL in CONFIG.takeaways.careers",
  },
};
