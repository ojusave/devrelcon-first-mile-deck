import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import vm from "node:vm";

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
requireCondition((files.html.match(/class="story-surface(?:\s|\")/g) || []).length === 13, "The thirteen evidence, resource, workshop-action, credit, and closing slides must use the shared story surface");

const noteIds = [...files.notes.matchAll(/^\s+(\d+): \{/gm)].map((match) => Number(match[1]));
requireCondition(JSON.stringify(noteIds) === JSON.stringify(expectedOrder), `Speaker notes do not match slide order: ${noteIds.join(", ")}`);
requireCondition((files.notes.match(/purpose:/g) || []).length === expectedOrder.length, "Every slide needs one speaker-note purpose");
requireCondition((files.notes.match(/script:/g) || []).length === expectedOrder.length, "Every slide needs one complete speaker script");
requireCondition((files.notes.match(/roomCue:/g) || []).length === expectedOrder.length, "Every slide needs a room cue");
requireCondition((files.notes.match(/timing:/g) || []).length === expectedOrder.length, "Every slide needs timing guidance");
requireCondition((files.notes.match(/fallback:/g) || []).length === expectedOrder.length, "Every slide needs a fallback");
requireCondition((files.notes.match(/evidenceBoundary:/g) || []).length === expectedOrder.length, "Every slide needs an evidence boundary");
requireCondition((files.notes.match(/sources:/g) || []).length === expectedOrder.length, "Every slide needs sources");
requireCondition((files.notesHtml.match(/<textarea data-note-/g) || []).length === 7, "The full script and all six delivery fields must be editable");
requireCondition(files.notesHtml.includes("Save notes"), "Speaker notes need an explicit save action");
requireCondition(files.notesHtml.includes("Restore defaults"), "Speaker notes need a restore-defaults action");
requireCondition(files.notesView.includes("devrelcon.presenter.notes.v6"), "Speaker-note edits must use versioned browser storage");
requireCondition(files.notesView.includes("devrelcon.presenter.notes.v5"), "Speaker-note edits must migrate the previous field shape");
requireCondition(files.notesView.includes("LEGACY_SLIDE_ID_MAP"), "Speaker-note edits must migrate from the previous slide numbering");
requireCondition(files.notesView.includes("PREVIOUS_SLIDE_ID_MAP"), "Speaker-note edits must preserve current slide edits when credits and closing move");
requireCondition(files.notesView.includes("SECOND_PREVIOUS_SLIDE_ID_MAP"), "Speaker-note edits must preserve the earlier closing-slide migration");
requireCondition(files.notesView.includes("THIRD_PREVIOUS_SLIDE_ID_MAP"), "Speaker-note edits must preserve older slide-note migrations");

const notesContext = {};
vm.createContext(notesContext);
vm.runInContext(`${files.notes}\nthis.__speakerNotes = SPEAKER_NOTES;`, notesContext);
const parsedNotes = notesContext.__speakerNotes;
const spokenWordCount = Object.values(parsedNotes).reduce((total, note) => {
  const spoken = note.script.replace(/\[[^\]]+\]/g, " ").replace(/https?:\/\/\S+/g, " ");
  return total + (spoken.match(/[A-Za-z0-9][A-Za-z0-9'’.-]*/g) || []).length;
}, 0);
requireCondition(spokenWordCount >= 3900 && spokenWordCount <= 4500, `Speaker script must contain 3900 to 4500 spoken words, found ${spokenWordCount}`);
requireCondition(Object.values(parsedNotes).every((note) => note.script.includes("[")), "Every slide script needs at least one stage direction");

for (const requiredText of [
  "It does not tell us why",
  "151 / 205",
  "records mention the workshop policy",
  "records do not mention that policy",
  "83 / 205",
  "122 / 205",
  "TRACKER SCOPE",
  "196 / 205",
  "routes combined at least three documented gate types",
  "routes included a choice gate",
  "routes included an account gate",
  "routes included a credential gate",
  "routes included a billing gate",
  "Gate types describe documented requirements or transitions, not observed drop-off",
  "ROUTE-SELECTION METHOD · 205 DOCUMENTED ROUTES",
  "SUCCESS SIGNALS · 205 DOCUMENTED ROUTES",
  "ONE STOPPING POINT, THREE QUESTIONS",
  "One selected path for one developer intent",
  "Stage navigation skips this slide until the event results URL is added",
  "83 of 205 routes named the first-success milestone",
  "records document a workshop selection or normalization decision",
  "Five people form a bounded pilot, not a representative sample",
  "CALIBRATE · MAKE ONE ROUTE OBSERVABLE",
  "I built Calibrate, a privacy-conscious onboarding signal SDK",
  "It captures interaction state, not field contents",
  "Run the route with your developer champions",
  "A small session finds useful questions",
  "Bring one question, not a verdict",
  "@usecalibrate/browser",
  "Autocapture",
  "data-fm",
  "No form values",
  "not published to npm",
  "Request the DevRelCon Render credit code",
  "If a code is available, the portal assigns it",
  "Continue with GitHub",
  "redeem it from Render Billing",
  "WE’RE HIRING",
  "This link includes my referral",
  "DM me if you have questions",
]) {
  const corpus = Object.values(files).join("\n");
  requireCondition(corpus.includes(requiredText), `Missing required text: ${requiredText}`);
}

for (const requiredUrl of [
  "https://fakesaaspi.onrender.com/fakegpt",
  "https://fakesaaspi.onrender.com/present",
  "https://github.com/ojusave/usecalibrate",
  "https://github.com/ojusave/fakesaaspi",
  "https://developer-journey-atlas.onrender.com",
  "https://credits-portal-mmdm.onrender.com/claim/devrelcon",
  "https://render.com/careers?ashby_jid=4611bde4-47ac-45fc-ab56-235489e52682&utm_source=L51D6eVlVG",
]) {
  requireCondition(files.config.includes(requiredUrl), `Missing configured URL: ${requiredUrl}`);
}

const forbiddenPatterns = [
  ["em dash character", /\u2014/],
  ["old transition count", /2,694/],
  ["old source count", /1,121/],
  ["unsupported frustration claim", /(?:shows?|proves?|measures?) frustration|frustration (?:rate|score)/i],
  ["unsupported open-source label for FakeSaaSPI", /open[- ]source FakeSaaSPI/i],
  ["unsupported credit-portal eligibility flow", /sign in with GitHub to check eligibility/i],
  ["unsupported credit-portal deployment flow", /Connect a repository you are authorized to deploy|Create the Render service and run the prototype/i],
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
