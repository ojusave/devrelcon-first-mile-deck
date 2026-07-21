import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const files = {
  html: readFileSync(resolve(root, "index.html"), "utf8"),
  config: readFileSync(resolve(root, "config.js"), "utf8"),
  deck: readFileSync(resolve(root, "deck.js"), "utf8"),
  readme: readFileSync(resolve(root, "README.md"), "utf8"),
  theme: readFileSync(resolve(root, "theme-bright.css"), "utf8"),
};

const expectedOrder = [1, 2, 3, 4, 5, 6, 21, 7, 12, 8, 22, 11, 14, 15, 23, 24, 25, 19, 17, 16, 18, 20];
const actualOrder = [...files.html.matchAll(/data-slide="(\d+)"/g)].map((match) => Number(match[1]));
const errors = [];

function requireCondition(condition, message) {
  if (!condition) {
    errors.push(message);
  }
}

requireCondition(JSON.stringify(actualOrder) === JSON.stringify(expectedOrder), `Unexpected slide order: ${actualOrder.join(", ")}`);
requireCondition(new Set(actualOrder).size === actualOrder.length, "Slide IDs must be unique");
requireCondition(!actualOrder.some((id) => [9, 10, 13].includes(id)), "Removed slides 9, 10, and 13 must stay removed");
requireCondition(actualOrder.indexOf(12) === actualOrder.indexOf(7) + 1, "Slide 12 must immediately follow slide 7");
requireCondition((files.html.match(/class="story-surface(?:\s|\")/g) || []).length === 12, "The twelve evidence, resource, workflow, and closing slides must use the shared story surface");

for (const requiredText of [
  "Completion is not required",
  "It does not tell us why",
  "Keep the evidence separate",
  "151 / 205",
  "documentation-selected routes",
  "83 / 205",
  "122 / 205",
  "0 / 790",
  "ROUTE SELECTION · 205 RECORDS",
  "SUCCESS BOUNDARIES · 205 RECORDS",
  "HYPOTHESIS MAP",
  "One documented path to an observable terminal state",
  "Observe five intended developers without rescuing them",
  "Five people form a bounded pilot, not a representative sample",
  "No public reuse rights are granted",
]) {
  const corpus = Object.values(files).join("\n");
  requireCondition(corpus.includes(requiredText), `Missing required text: ${requiredText}`);
}

for (const requiredUrl of [
  "https://fakesaaspi.onrender.com",
  "https://fakesaaspi.onrender.com/present",
  "https://github.com/ojusave/firstmile",
  "https://github.com/ojusave/fakesaaspi",
  "https://devrelcon-research.onrender.com",
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
