import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const files = {
  html: readFileSync(resolve(root, "index.html"), "utf8"),
  config: readFileSync(resolve(root, "config.js"), "utf8"),
  deck: readFileSync(resolve(root, "deck.js"), "utf8"),
  readme: readFileSync(resolve(root, "README.md"), "utf8"),
  notes: readFileSync(resolve(root, "speaker-notes.js"), "utf8"),
  notesView: readFileSync(resolve(root, "speaker-notes-view.js"), "utf8"),
  notesHtml: readFileSync(resolve(root, "speaker-notes.html"), "utf8"),
  theme: readFileSync(resolve(root, "theme-bright.css"), "utf8"),
};

const expectedOrder = Array.from({ length: 24 }, (_, index) => index + 1);
const actualOrder = [...files.html.matchAll(/data-slide="(\d+)"/g)].map((match) => Number(match[1]));
const errors = [];

function requireCondition(condition, message) {
  if (!condition) {
    errors.push(message);
  }
}

requireCondition(JSON.stringify(actualOrder) === JSON.stringify(expectedOrder), `Unexpected slide order: ${actualOrder.join(", ")}`);
requireCondition(new Set(actualOrder).size === actualOrder.length, "Slide IDs must be unique");
requireCondition(actualOrder.every((id, index) => id === index + 1), "Slide IDs must match their chronological position");
requireCondition((files.html.match(/class="story-surface(?:\s|\")/g) || []).length === 13, "The thirteen evidence, resource, workflow, credit, and closing slides must use the shared story surface");

const noteIds = [...files.notes.matchAll(/^\s+(\d+): \{/gm)].map((match) => Number(match[1]));
requireCondition(JSON.stringify(noteIds) === JSON.stringify(expectedOrder), `Speaker notes do not match slide order: ${noteIds.join(", ")}`);
requireCondition((files.notes.match(/purpose:/g) || []).length === expectedOrder.length, "Every slide needs one speaker-note purpose");
requireCondition((files.notes.match(/say:/g) || []).length === expectedOrder.length, "Every slide needs one speaker-note delivery cue");
requireCondition((files.notes.match(/transition:/g) || []).length === expectedOrder.length, "Every slide needs one speaker-note transition");
requireCondition((files.notes.match(/• /g) || []).length >= expectedOrder.length * 3, "Every slide needs detailed speaker-note talking points");
requireCondition((files.notesHtml.match(/<textarea data-note-/g) || []).length === 3, "Purpose, talking points, and transition must be editable");
requireCondition(files.notesHtml.includes("Save notes"), "Speaker notes need an explicit save action");
requireCondition(files.notesHtml.includes("Restore defaults"), "Speaker notes need a restore-defaults action");
requireCondition(files.notesView.includes("devrelcon.presenter.notes.v3"), "Speaker-note edits must use versioned browser storage");
requireCondition(files.notesView.includes("LEGACY_SLIDE_ID_MAP"), "Speaker-note edits must migrate from the previous slide numbering");
requireCondition(files.notesView.includes("PREVIOUS_SLIDE_ID_MAP"), "Speaker-note edits must preserve slide 23 edits when the closing slide moves to slide 24");

for (const requiredText of [
  "Completion is not required",
  "It does not tell us why",
  "Keep the evidence separate",
  "151 / 205",
  "we had to choose one route",
  "the docs identified one directly",
  "83 / 205",
  "122 / 205",
  "Zero of 790",
  "TRACKER SCOPE",
  "Payments APIs",
  "Cloud infrastructure",
  "Data platforms",
  "Real-time messaging",
  "ROUTE CHOICE · 205 DOCUMENTED ROUTES",
  "SUCCESS SIGNALS · 205 DOCUMENTED ROUTES",
  "ONE STOPPING POINT, THREE QUESTIONS",
  "One selected path for one developer intent",
  "set CONFIG.resultsUrl",
  "Only 83 routes explicitly named the first-success milestone",
  "did not present one unambiguous default route for the selected intent",
  "Five people form a bounded pilot, not a representative sample",
  "HOW CALIBRATE CAPTURES PRODUCT FRICTION",
  "I built Calibrate, a privacy-conscious onboarding signal SDK",
  "It captures behavior, not content",
  "Simple delivery, clear scale boundary",
  "@usecalibrate/browser",
  "Autocapture by default",
  "data-fm",
  "No form values are stored or sent",
  "sendBeacon()",
  "/api/events",
  "10 events",
  "50 events",
  "shared queue or aggregation layer",
  "not yet published to npm",
  "Claim $100 in Render credits",
  "Eligible DevRelCon attendees",
  "sign in with GitHub to check eligibility",
  "repository you are authorized to deploy",
]) {
  const corpus = Object.values(files).join("\n");
  requireCondition(corpus.includes(requiredText), `Missing required text: ${requiredText}`);
}

for (const requiredUrl of [
  "https://fakesaaspi.onrender.com",
  "https://fakesaaspi.onrender.com/present",
  "https://github.com/ojusave/usecalibrate",
  "https://github.com/ojusave/fakesaaspi",
  "https://devrelcon-research.onrender.com",
  "https://credits-portal-mmdm.onrender.com/claim/devrelcon",
]) {
  requireCondition(files.config.includes(requiredUrl), `Missing configured URL: ${requiredUrl}`);
}

const forbiddenPatterns = [
  ["em dash character", /—/],
  ["old transition count", /2,694/],
  ["old source count", /1,121/],
  ["unsupported frustration claim", /frustrat(?:ion|ing)/i],
  ["unsupported open-source label for FakeSaaSPI", /open[- ]source FakeSaaSPI/i],
  ["old research boundary wording", /One documented path to a first usable result/i],
  ["old participant wording", /Put five developer champions through it/i],
  ["old handoff wording", /Share aggregate stopping points with the owning team/i],
  ["cross-dataset implication", /205[^\n]{0,80}(?:790|candidate reasons)|790[^\n]{0,80}205/i],
  ["audit-style source label", /WORKSHOP MEASUREMENT BOUNDARY|DOCUMENTED ROUTE DATA ·|BLOCKER HYPOTHESIS GRAPH · SEPARATE DATASET/i],
  ["generic greatest-hits framing", /greatest hits/i],
  ["slop phrase", /at its core|here(?:'|’)s the thing|now more than ever|let that sink in|game-changing|meaningful impact/i],
  ["unsupported raw-value collection", /captures? raw (?:form )?values?/i],
  ["unsupported WebSocket dependency", /depends? on WebSockets?/i],
  ["unsupported horizontal scale claim", /(?:is|fully) horizontally scalable|scales horizontally today/i],
];

for (const [label, pattern] of forbiddenPatterns) {
  for (const [name, source] of Object.entries(files).filter(([name]) => name !== "scripts")) {
    requireCondition(!pattern.test(source), `${label} found in ${name}`);
  }
}

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`FAIL: ${error}`);
  }
  process.exitCode = 1;
} else {
  console.log(`Deck structure verified: ${actualOrder.length} slides in the approved order.`);
}
