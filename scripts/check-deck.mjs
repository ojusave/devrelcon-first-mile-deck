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

const expectedOrder = Array.from({ length: 26 }, (_, index) => index + 1);
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
requireCondition((files.html.match(/class="story-surface(?:\s|\")/g) || []).length === 15, "The fifteen evidence, resource, workshop-action, credit, and closing slides must use the shared story surface");

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
requireCondition(files.notesView.includes("devrelcon.presenter.notes.v7"), "Speaker-note edits must use versioned browser storage");
requireCondition(files.notesView.includes("devrelcon.presenter.notes.v6"), "Speaker-note edits must migrate the previous slide order");
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
requireCondition(spokenWordCount >= 3400 && spokenWordCount <= 4200, `Speaker script must contain 3400 to 4200 spoken words, found ${spokenWordCount}`);
requireCondition(Object.values(parsedNotes).every((note) => note.script.includes("[")), "Every slide script needs at least one stage direction");

for (const requiredText of [
  "It does not tell us why",
  "TRACKER SCOPE",
  "I examined",
  "developer platforms",
  "one selected developer goal and one official documented route per platform",
  "2,359",
  "documented steps indexed in Atlas",
  "2,322 primary-path steps",
  "37 candidate-path steps",
  "949",
  "Only",
  "33%",
  "67%",
  "explicitly named the first-success milestone",
  "showed a terminal result without naming the milestone",
  "I documented",
  "1,021",
  "included at least one credential requirement",
  "included at least one documented choice",
  "included at least one documented wait",
  "55%",
  "46%",
  "27%",
  "124",
  "103",
  "60",
  "790",
  "466",
  "324",
  "diagnosis-eligible",
  "I cataloged",
  "None is a diagnosis",
  "These are hypotheses I would test, not assume",
  "Work email required",
  "No reset, undo, rollback, or clean restart",
  "I built Atlas for peers improving developer platforms",
  "peer cohort",
  "Stage navigation skips this slide until the event results URL is added",
  "Atlas maps the route. Calibrate observes positions in yours",
  "Ask engineering and product to evaluate one bounded onboarding route",
  "npm install usecalibrate@0.1.3",
  "npx usecalibrate plan --dir .",
  "npx usecalibrate apply",
  "npx usecalibrate verify --dir . --json",
  "Position tells you where to ask. It does not tell you why",
  "NEVER READS",
  "npm run calibrate:sidecar",
  "VITE_CALIBRATE_WRITE_KEY",
  "Run ten intended users through one route",
  "Request the DevRelCon Render credit code",
  "Continue with GitHub",
  "redeem it from Render Billing",
  "Connect with me",
  "Render is hiring",
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
  "https://x.com/ojusave",
  "https://render.com/careers?ashby_jid=4611bde4-47ac-45fc-ab56-235489e52682&utm_source=L51D6eVlVG",
]) {
  requireCondition(files.config.includes(requiredUrl), `Missing configured URL: ${requiredUrl}`);
}

const forbiddenPatterns = [
  ["em dash character", /\u2014/],
  ["old source count", /1,121/],
  ["stale Atlas relation label", /ATLAS RELATION/i],
  ["stale 205-route count", /205[- ](?:record|route)|205 documented routes|205 selected routes/i],
  ["stale route-length framing", /12\.5 actions|2,569|1,270 friction gates/i],
  ["obvious account metric", /(?:89|91)%[^\n]{0,80}required an account/i],
  ["unsupported frustration claim", /(?:shows?|proves?|measures?) frustration|frustration (?:rate|score)/i],
  ["unsupported open-source label for FakeSaaSPI", /open[- ]source FakeSaaSPI/i],
  ["unsupported credit-portal eligibility flow", /sign in with GitHub to check eligibility/i],
  ["unsupported credit-portal deployment flow", /Connect a repository you are authorized to deploy|Create the Render service and run the prototype/i],
  ["old research boundary wording", /One documented path to a first usable result/i],
  ["old participant wording", /Put five developer champions through it/i],
  ["old handoff wording", /Share aggregate stopping points with the owning team/i],
  ["cross-dataset implication", /205 routes (?:contain|produced|caused|map to) 790|790 (?:reasons|blockers) across 205 routes/i],
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
