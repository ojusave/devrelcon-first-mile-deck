const { chromium, request } = require("playwright");
const { mkdtempSync } = require("node:fs");
const { tmpdir } = require("node:os");
const { join } = require("node:path");

const baseUrl = process.env.DECK_URL || "http://127.0.0.1:4173";
const slideIds = Array.from({ length: 23 }, (_, index) => index + 1);
const viewports = [
  { name: "projector", width: 1920, height: 1080 },
  { name: "laptop", width: 1280, height: 720 },
];
const unifiedPalette = new Map([
  [12, "rgb(20, 184, 241)"], [16, "rgb(20, 184, 241)"], [17, "rgb(20, 184, 241)"], [21, "rgb(20, 184, 241)"],
  [13, "rgb(112, 71, 235)"], [20, "rgb(112, 71, 235)"],
  [14, "rgb(255, 212, 77)"], [19, "rgb(255, 212, 77)"], [22, "rgb(255, 212, 77)"], [23, "rgb(255, 212, 77)"],
  [15, "rgb(255, 138, 102)"], [18, "rgb(255, 138, 102)"],
]);
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
      if (slideId === 9) {
        const dashboard = page.frameLocator(".dashboard-frame");
        await dashboard.locator("body").waitFor();
        await dashboard.getByText("What happened in this route?").waitFor();
      }
      if (slideId === 11) {
        await page.getByText("REAL-TIME RESULTS EMBED HERE").waitFor();
        await page.getByText("set CONFIG.resultsUrl").waitFor();
      }
      const state = await page.evaluate((expectedId) => {
        const slide = document.querySelector(`.slide[data-slide="${expectedId}"]`);
        const visible = [...document.querySelectorAll(".slide")].filter((item) => !item.hidden);
        const slideRect = slide.getBoundingClientRect();
        const brand = slide.querySelector(".slide-brand");
        const brandRect = brand?.getBoundingClientRect();
        const brandStyle = brand ? getComputedStyle(brand) : null;
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
          label: slide.getAttribute("aria-label"),
          backgroundColor: getComputedStyle(slide).backgroundColor,
          hasPrimaryText: Boolean(slide.querySelector("h1,.statement-line")),
          brand: brand ? {
            count: slide.querySelectorAll(".slide-brand").length,
            src: brand.getAttribute("src"),
            alt: brand.getAttribute("alt"),
            ariaHidden: brand.getAttribute("aria-hidden"),
            size: [brandRect.width, brandRect.height],
            placement: [brandStyle.right, brandStyle.bottom, brandStyle.width, brandStyle.height],
            inBounds: brandRect.left >= slideRect.left && brandRect.top >= slideRect.top && brandRect.right <= slideRect.right && brandRect.bottom <= slideRect.bottom,
          } : null,
          unnamedMedia: [...slide.querySelectorAll("canvas,iframe")]
            .filter((element) => !(element.getAttribute("aria-label") || element.getAttribute("title")))
            .map((element) => element.tagName),
          clipped,
        };
      }, slideId);
      assert(state.hash === `#${slideId}`, `${viewport.name} slide ${slideId}: wrong hash ${state.hash}`);
      assert(state.visibleCount === 1 && state.visibleId === slideId, `${viewport.name} slide ${slideId}: wrong visible slide`);
      assert(Boolean(state.label), `${viewport.name} slide ${slideId}: missing accessible label`);
      if (unifiedPalette.has(slideId)) {
        assert(state.backgroundColor === unifiedPalette.get(slideId), `${viewport.name} slide ${slideId}: palette drifted to ${state.backgroundColor}`);
      }
      assert(state.hasPrimaryText || [9, 11].includes(slideId), `${viewport.name} slide ${slideId}: missing primary slide text`);
      assert(state.brand?.count === 1, `${viewport.name} slide ${slideId}: expected exactly one repeated Render mark`);
      assert(state.brand.inBounds, `${viewport.name} slide ${slideId}: Render brand signature is out of bounds`);
      assert(state.brand.src === "assets/render-logomark.svg?v=1", `${viewport.name} slide ${slideId}: unexpected Render logomark asset ${state.brand.src}`);
      assert(Math.abs(state.brand.size[0] - state.brand.size[1]) < 0.1, `${viewport.name} slide ${slideId}: Render logomark is not square`);
      assert(state.brand.placement.join("|") === "24px|20px|88px|88px", `${viewport.name} slide ${slideId}: inconsistent Render logomark placement ${state.brand.placement.join("|")}`);
      assert(state.brand.alt === "" && state.brand.ariaHidden === "true", `${viewport.name} slide ${slideId}: decorative Render mark is exposed to assistive technology`);
      assert(state.unnamedMedia.length === 0, `${viewport.name} slide ${slideId}: unnamed media ${state.unnamedMedia.join(", ")}`);
      assert(state.clipped.length === 0, `${viewport.name} slide ${slideId}: clipped ${JSON.stringify(state.clipped)}`);
      await page.screenshot({ path: join(outputDir, `${viewport.name}-${String(slideId).padStart(2, "0")}.png`) });
    }

    await page.goto(`${baseUrl}/#8`, { waitUntil: "networkidle" });
    await page.keyboard.press("d");
    assert((await page.url()).endsWith("#9"), `${viewport.name}: D did not open dashboard`);
    await page.keyboard.press("d");
    assert((await page.url()).endsWith("#8"), `${viewport.name}: D did not return to slide 8`);
    await page.keyboard.press("b");
    assert(await page.locator("#blackout").isVisible(), `${viewport.name}: B did not show blackout`);
    await page.keyboard.press("b");
    assert(!(await page.locator("#blackout").isVisible()), `${viewport.name}: B did not hide blackout`);
    await page.keyboard.press("End");
    assert((await page.url()).endsWith("#23"), `${viewport.name}: End did not reach slide 23`);
    await page.keyboard.press("Home");
    assert((await page.url()).endsWith("#1"), `${viewport.name}: Home did not reach slide 1`);
    await page.mouse.click(viewport.width * 0.8, viewport.height / 2);
    assert((await page.url()).endsWith("#2"), `${viewport.name}: right-side click did not advance`);
    await page.mouse.click(viewport.width * 0.2, viewport.height / 2);
    assert((await page.url()).endsWith("#1"), `${viewport.name}: left-side click did not reverse`);
    await page.keyboard.press("ArrowRight");
    assert((await page.url()).endsWith("#2"), `${viewport.name}: ArrowRight did not advance`);
    await page.keyboard.press("ArrowLeft");
    assert((await page.url()).endsWith("#1"), `${viewport.name}: ArrowLeft did not reverse`);
    await page.touchscreen.tap(viewport.width * 0.8, viewport.height / 2);
    assert((await page.url()).endsWith("#2"), `${viewport.name}: right-side touch did not advance`);
    await page.touchscreen.tap(viewport.width * 0.2, viewport.height / 2);
    assert((await page.url()).endsWith("#1"), `${viewport.name}: left-side touch did not reverse`);

    await page.goto(`${baseUrl}/#9`, { waitUntil: "networkidle" });
    await page.mouse.click(viewport.width * 0.8, viewport.height / 2);
    assert((await page.url()).endsWith("#10"), `${viewport.name}: dashboard right-side click did not advance`);
    await page.mouse.click(viewport.width * 0.2, viewport.height / 2);
    assert((await page.url()).endsWith("#9"), `${viewport.name}: dashboard left-side click did not reverse`);

    if (viewport.name === "projector") {
      await page.goto(`${baseUrl}/#14`, { waitUntil: "networkidle" });
      const notesPage = await context.newPage();
      await notesPage.goto(`${baseUrl}/speaker-notes.html`, { waitUntil: "networkidle" });
      await notesPage.getByText("Slide 14").waitFor();
      await page.mouse.click(viewport.width * 0.8, viewport.height / 2);
      await notesPage.getByText("Slide 15").waitFor();
      await notesPage.getByRole("button", { name: "Previous" }).click();
      await page.waitForURL(/#14$/);
      await notesPage.close();
    }

    await context.close();
  }

  const reducedContext = await browser.newContext({
    viewport: viewports[0],
    reducedMotion: "reduce",
  });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.goto(`${baseUrl}/#4`, { waitUntil: "networkidle" });
  await reducedPage.waitForFunction(() => document.documentElement.dataset.deckReady === "true");
  const transitionDuration = await reducedPage.locator(".scene-image[data-art-fragment]").first().evaluate((element) => getComputedStyle(element).transitionDuration);
  assert(transitionDuration === "0s", `reduced motion: expected 0s transition, found ${transitionDuration}`);
  await reducedContext.close();

  const notesContext = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const notesPage = await notesContext.newPage();
  for (const slideId of slideIds) {
    await notesPage.goto(`${baseUrl}/speaker-notes.html?check=${slideId}#${slideId}`, { waitUntil: "networkidle" });
    await notesPage.locator("[data-note-slide]").getByText(String(slideId), { exact: true }).waitFor();
    const notesFit = await notesPage.evaluate(() => document.documentElement.scrollHeight <= window.innerHeight);
    assert(notesFit, `speaker notes slide ${slideId}: notes require scrolling at 1280x720`);
    if (slideId === 23) {
      await notesPage.screenshot({ path: join(outputDir, "speaker-notes-23.png") });
    }
  }

  await notesPage.goto(`${baseUrl}/speaker-notes.html?edit-check=1#14`, { waitUntil: "networkidle" });
  const talkingPoints = notesPage.getByLabel("Talking points");
  const defaultTalkingPoints = await talkingPoints.inputValue();
  const editedTalkingPoints = `${defaultTalkingPoints}\n• Browser-local edit test.`;
  await talkingPoints.fill(editedTalkingPoints);
  await notesPage.getByRole("status").getByText("Unsaved edits").waitFor();
  await notesPage.getByRole("button", { name: "Save notes" }).click();
  await notesPage.getByRole("status").getByText("Saved in this browser").waitFor();
  await notesPage.reload({ waitUntil: "networkidle" });
  assert(await notesPage.getByLabel("Talking points").inputValue() === editedTalkingPoints, "speaker notes: saved edit did not survive reload");
  notesPage.once("dialog", (dialog) => dialog.accept());
  await notesPage.getByRole("button", { name: "Restore defaults" }).click();
  assert(await notesPage.getByLabel("Talking points").inputValue() === defaultTalkingPoints, "speaker notes: restore defaults did not restore source note");
  await notesPage.reload({ waitUntil: "networkidle" });
  assert(await notesPage.getByLabel("Talking points").inputValue() === defaultTalkingPoints, "speaker notes: restored default did not survive reload");

  const legacyNote = {
    purpose: "Legacy purpose for the former slide 21.",
    say: "Legacy talking point that must follow the slide content.",
    transition: "Legacy transition into the exercise.",
  };
  await notesPage.evaluate((note) => {
    localStorage.removeItem("devrelcon.presenter.notes.v2");
    localStorage.setItem("devrelcon.presenter.notes.v1", JSON.stringify({ 21: note }));
  }, legacyNote);
  await notesPage.goto(`${baseUrl}/speaker-notes.html?migration-check=1#7`, { waitUntil: "networkidle" });
  assert(await notesPage.getByLabel("Purpose").inputValue() === legacyNote.purpose, "speaker notes: legacy purpose did not migrate from slide 21 to slide 7");
  assert(await notesPage.getByLabel("Talking points").inputValue() === legacyNote.say, "speaker notes: legacy talking points did not migrate from slide 21 to slide 7");
  assert(await notesPage.getByLabel("Transition").inputValue() === legacyNote.transition, "speaker notes: legacy transition did not migrate from slide 21 to slide 7");
  await notesPage.evaluate(() => {
    localStorage.removeItem("devrelcon.presenter.notes.v1");
    localStorage.removeItem("devrelcon.presenter.notes.v2");
  });
  await notesContext.close();

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
