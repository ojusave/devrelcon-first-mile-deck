const { chromium, request } = require("playwright");
const { mkdtempSync } = require("node:fs");
const { tmpdir } = require("node:os");
const { join } = require("node:path");

const baseUrl = process.env.DECK_URL || "http://127.0.0.1:4173";
const slideIds = [1, 2, 3, 4, 5, 6, 21, 7, 12, 8, 22, 11, 14, 15, 23, 24, 25, 19, 17, 16, 18, 20];
const viewports = [
  { name: "projector", width: 1920, height: 1080 },
  { name: "laptop", width: 1280, height: 720 },
];
const outputDir = mkdtempSync(join(tmpdir(), "devrelcon-deck-"));

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const errors = [];

  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport, hasTouch: true });
    const page = await context.newPage();
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(`${viewport.name} console: ${message.text()}`);
    });
    page.on("pageerror", (error) => errors.push(`${viewport.name} page: ${error.message}`));

    for (const slideId of slideIds) {
      await page.goto(`${baseUrl}/#${slideId}`, { waitUntil: "networkidle" });
      await page.waitForFunction(() => document.documentElement.dataset.deckReady === "true");
      if (slideId === 12) {
        const dashboard = page.frameLocator(".dashboard-frame");
        await dashboard.locator("body").waitFor();
        await dashboard.getByText("What happened in this route?").waitFor();
      }
      const state = await page.evaluate((expectedId) => {
        const slide = document.querySelector(`.slide[data-slide="${expectedId}"]`);
        const visible = [...document.querySelectorAll(".slide")].filter((item) => !item.hidden);
        const slideRect = slide.getBoundingClientRect();
        const selectors = "h1,h2,p,li,pre,canvas,iframe";
        const clipped = [...slide.querySelectorAll(selectors)]
          .filter((element) => {
            const style = getComputedStyle(element);
            return style.visibility !== "hidden" && style.display !== "none" && element.getBoundingClientRect().width > 0;
          })
          .map((element) => ({ element, rect: element.getBoundingClientRect() }))
          .filter(({ rect }) => rect.left < slideRect.left - 2 || rect.top < slideRect.top - 2 || rect.right > slideRect.right + 2 || rect.bottom > slideRect.bottom + 2)
          .map(({ element, rect }) => ({
            tag: element.tagName,
            text: element.textContent.trim().slice(0, 80),
            rect: [rect.left, rect.top, rect.right, rect.bottom],
          }));
        return {
          hash: location.hash,
          visibleCount: visible.length,
          visibleId: visible[0] ? Number(visible[0].dataset.slide) : null,
          clipped,
        };
      }, slideId);
      assert(state.hash === `#${slideId}`, `${viewport.name} slide ${slideId}: wrong hash ${state.hash}`);
      assert(state.visibleCount === 1 && state.visibleId === slideId, `${viewport.name} slide ${slideId}: wrong visible slide`);
      assert(state.clipped.length === 0, `${viewport.name} slide ${slideId}: clipped ${JSON.stringify(state.clipped)}`);
      await page.screenshot({ path: join(outputDir, `${viewport.name}-${String(slideId).padStart(2, "0")}.png`) });
    }

    await page.goto(`${baseUrl}/#7`, { waitUntil: "networkidle" });
    await page.keyboard.press("d");
    assert((await page.url()).endsWith("#12"), `${viewport.name}: D did not open dashboard`);
    await page.keyboard.press("d");
    assert((await page.url()).endsWith("#7"), `${viewport.name}: D did not return to slide 7`);
    await page.keyboard.press("b");
    assert(await page.locator("#blackout").isVisible(), `${viewport.name}: B did not show blackout`);
    await page.keyboard.press("b");
    assert(!(await page.locator("#blackout").isVisible()), `${viewport.name}: B did not hide blackout`);
    await page.keyboard.press("End");
    assert((await page.url()).endsWith("#20"), `${viewport.name}: End did not reach slide 20`);
    await page.keyboard.press("Home");
    assert((await page.url()).endsWith("#1"), `${viewport.name}: Home did not reach slide 1`);
    await page.mouse.click(viewport.width / 2, viewport.height / 2);
    assert((await page.url()).endsWith("#2"), `${viewport.name}: click did not advance`);
    await page.keyboard.press("ArrowLeft");
    assert((await page.url()).endsWith("#1"), `${viewport.name}: ArrowLeft did not reverse`);
    await page.touchscreen.tap(viewport.width / 2, viewport.height / 2);
    assert((await page.url()).endsWith("#2"), `${viewport.name}: touch did not advance`);

    await context.close();
  }

  const requestContext = await request.newContext();
  for (const url of [
    "https://fakesaaspi.onrender.com",
    "https://fakesaaspi.onrender.com/present",
    "https://github.com/ojusave/firstmile",
    "https://github.com/ojusave/fakesaaspi",
    "https://devrelcon-research.onrender.com",
  ]) {
    const response = await requestContext.get(url);
    assert(response.ok(), `${url} returned ${response.status()}`);
  }
  await requestContext.dispose();
  await browser.close();

  assert(errors.length === 0, errors.join("\n"));
  console.log(`Browser verification passed. Screenshots: ${outputDir}`);
})().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
