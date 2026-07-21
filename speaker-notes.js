const SPEAKER_ORDER = [1, 2, 3, 4, 5, 6, 21, 7, 12, 8, 13, 22, 11, 14, 15, 23, 24, 25, 19, 17, 16, 18, 20];

const SPEAKER_NOTES = {
  1: {
    purpose: "Set the workshop question.",
    say: "This is about the work between developer intent and the first result they can actually use.",
    transition: "A clear destination does not guarantee a short route. Odysseus is the useful warning.",
  },
  2: {
    purpose: "Establish the apparently simple journey.",
    say: "Troy to Ithaca is roughly 565 nautical miles. Under ordinary conditions, it is not a ten-year trip.",
    transition: "But the trip did take ten years.",
  },
  3: {
    purpose: "Create the comic gap between plan and reality.",
    say: "The destination stayed the same. The route became the story.",
    transition: "And the route was not merely long. It kept removing people from it.",
  },
  4: {
    purpose: "Make the route failures memorable.",
    say: "Advance each beat separately. Do not explain the developer analogy yet.",
    transition: "Even when Ithaca came back into view, the route still failed.",
  },
  5: {
    purpose: "Set up the wrong-bag callback.",
    say: "Pause after 'in sight,' then reveal the wrong bag.",
    transition: "By the time he arrived, the route had changed the outcome completely.",
  },
  6: {
    purpose: "Finish the Odyssey story with its cost.",
    say: "He left with a fleet. He returned alone, and nobody recognized him.",
    transition: "Developers also arrive with a destination. It is rarely your onboarding flow.",
  },
  21: {
    purpose: "Translate the story into developer intent.",
    say: "Developers tolerate setup only while it still looks connected to what they came to build.",
    transition: "Try the next route with your own attention and patience.",
  },
  7: {
    purpose: "Start the live exercise safely.",
    say: "Use fake details. Completion is not required. Stop when time is called or the next step is no longer worth it.",
    transition: "Keep slide 12 visible while the room works.",
  },
  12: {
    purpose: "Show the live dashboard during the exercise.",
    say: "Let the dashboard update without interpreting early counts. Keep the eight-minute cutoff.",
    transition: "When time is up, advance once and stop the room.",
  },
  8: {
    purpose: "Create a clean stop before the debrief.",
    say: "Stop where you are. Keep your last screen open.",
    transition: "Now show the separate results view on slide 13.",
  },
  13: {
    purpose: "Show what happened during this exercise in real time.",
    say: "Describe only the displayed sample, positions, retries, bounded errors, timing, and terminal states. The URL remains a placeholder until the final results surface is ready.",
    transition: "Those observations tell us where activity changed. They do not tell us why.",
  },
  22: {
    purpose: "Separate documentation, room behavior, and missing evidence.",
    say: "The documented route, the observed room behavior, and the explanation for that behavior are three different evidence types.",
    transition: "Before interpreting the results, be explicit about what the tracker recorded.",
  },
  11: {
    purpose: "State the tracker scope and privacy boundary.",
    say: "The tracker recorded named steps, timestamps, retries, bounded errors, and terminal completion. It did not record form text or the fake account and card values.",
    transition: "The live exercise is one route. Next, compare it with documented routes across platform categories.",
  },
  14: {
    purpose: "Show that setup gates recur across different platform categories.",
    say: "These four examples come from payments, cloud infrastructure, data platforms, and real-time messaging. They are examples, not frequency or difficulty rankings.",
    transition: "To compare unlike platforms, the research used one consistent record shape.",
  },
  15: {
    purpose: "Define the unit behind the 205-route findings.",
    say: "Each record contains one platform, one developer intent, one selected documented route, and one observable end.",
    transition: "The first question was whether the documentation supplied one obvious route for that intent.",
  },
  23: {
    purpose: "Explain the route-choice finding.",
    say: "In 151 of 205 records, the documentation did not present one unambiguous default route for the selected intent, so I used the same tie-break rule to choose one. In 54, the docs identified one directly.",
    transition: "Choosing a route is only half the problem. The finish line must also be clear.",
  },
  24: {
    purpose: "Explain the named-success finding.",
    say: "Only 83 of 205 routes explicitly named the first-success milestone. The other 122 demonstrated an end without naming that milestone.",
    transition: "Even with a route and an ending, a stopping point still does not explain its cause.",
  },
  25: {
    purpose: "Turn a stopping point into follow-up questions.",
    say: "These are plausible questions, not diagnosed causes. Ask what evidence would separate permissions confusion, the card requirement, and error recovery.",
    transition: "The Atlas helps you find a documented comparison worth investigating next.",
  },
  19: {
    purpose: "Give the room one short comparison activity.",
    say: "Find your platform, category, or nearest comparison. Choose one documented condition worth checking in your own route.",
    transition: "Once you know what to check, you need named positions that make progress visible.",
  },
  17: {
    purpose: "Show the instrumentation example and its real limits.",
    say: "Firstmile records named positions and bounded events, not form contents. It is public Apache-2.0 source, but it is not published to npm.",
    transition: "The engineering request is smaller than adopting a full analytics program.",
  },
  16: {
    purpose: "Give the audience a bounded engineering request.",
    say: "Bring a route, an outcome, observable positions, and the missing evidence. Do not bring a verdict about the cause.",
    transition: "If engineering cannot instrument the production route yet, build a bounded evidence prototype.",
  },
  18: {
    purpose: "Provide a fallback that still produces inspectable evidence.",
    say: "Mirror only documented steps, use fake data, review every generated step, and keep the prototype separate from production claims.",
    transition: "The Monday action is the smallest version of this entire workshop.",
  },
  20: {
    purpose: "End with one concrete next move.",
    say: "Pick one route. Define first success and its observable positions. Watch five intended developers, then bring the stopping points and missing evidence to the route owner.",
    transition: "Stop here.",
  },
};
