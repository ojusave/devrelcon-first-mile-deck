const { chromium, request } = require("playwright");
const { mkdtempSync } = require("node:fs");
const { tmpdir } = require("node:os");
const { join } = require("node:path");

const baseUrl = process.env.DECK_URL || "http://127.0.0.1:4173";
const slideIds = Array.from({ length: 24 }, (_, index) => index + 1);
const viewports = [
  { name: "projector", width: 1920, height: 1080 },
  { name: "laptop", width: 1280, height: 720 },
];
const unifiedPalette = new Map([
  [12, "rgb(20, 184, 241)"], [16, "rgb(20, 184, 241)"], [17, "rgb(20, 184, 241)"], [21, "rgb(20, 184, 241)"],
  [13, "rgb(112, 71, 235)"], [20, "rgb(112, 71, 235)"], [23, "rgb(112, 71, 235)"],
  [14, "rgb(255, 212, 77)"], [19, "rgb(255, 212, 77)"], [22, "rgb(255, 212, 77)"], [24, "rgb(255, 212, 77)"],
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
        await page.getByText("RESULTS VIEW IS NOT CONNECTED").waitFor();
        await page.getByText("Stage navigation skips this slide until the event results URL is added").waitFor();
      }
      if (slideId === 23) {
        const creditQr = page.locator('[data-qr-frame="credits"] canvas');
        await creditQr.waitFor();
        const creditQrState = await creditQr.evaluate((canvas) => ({
          label: canvas.getAttribute("aria-label"),
          size: [canvas.width, canvas.height],
          cssSize: [getComputedStyle(canvas).width, getComputedStyle(canvas).height],
        }));
        assert(creditQrState.label === "QR code for CONFIG.takeaways.credits", `${viewport.name}: credit QR is not labeled`);
        assert(creditQrState.size.join("x") === "400x400", `${viewport.name}: credit QR canvas is not 400px square`);
        assert(creditQrState.cssSize.join("x") === "400pxx400px", `${viewport.name}: credit QR CSS size is incorrect`);
        assert(await page.locator('[data-qr-caption="credits"]').textContent() === "credits-portal-mmdm.onrender.com/claim/devrelcon", `${viewport.name}: credit QR caption is incorrect`);
      }
      const state = await page.evaluate((expectedId) => {
        const slide = document.querySelector(`.slide[data-slide="${expectedId}"]`);
        const visible = [...document.querySelectorAll(".slide")].filter((item) => !item.hidden);
        const slideRect = slide.getBoundingClientRect();
        const brand = slide.querySelector(".slide-brand,.render-logo");
        const brandRect = brand?.getBoundingClientRect();
        const brandStyle = brand ? getComputedStyle(brand) : null;
        const brandOverlaps = brand?.classList.contains("slide-brand")
          ? [...slide.querySelectorAll(".story-surface,.dashboard-frame,.dashboard-placeholder,.instruction-card,.regroup-card,.statement,.fragment-stack,.moral-copy,.slide-heading,.exercise-grid")]
            .filter((element) => {
              const rect = element.getBoundingClientRect();
              const overlapWidth = Math.min(brandRect.right, rect.right) - Math.max(brandRect.left, rect.left);
              const overlapHeight = Math.min(brandRect.bottom, rect.bottom) - Math.max(brandRect.top, rect.top);
              return overlapWidth > 2 && overlapHeight > 2;
            })
            .map((element) => element.className)
          : [];
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
            count: slide.querySelectorAll(".slide-brand,.render-logo").length,
            kind: brand.classList.contains("slide-brand") ? "footer" : "title",
            src: brand.getAttribute("src"),
            alt: brand.getAttribute("alt"),
            ariaHidden: brand.getAttribute("aria-hidden"),
            size: [brandRect.width, brandRect.height],
            placement: [brandStyle.right, brandStyle.bottom, brandStyle.width, brandStyle.height],
            inBounds: brandRect.left >= slideRect.left && brandRect.top >= slideRect.top && brandRect.right <= slideRect.right && brandRect.bottom <= slideRect.bottom,
            overlaps: brandOverlaps,
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
      assert(state.brand?.count === 1, `${viewport.name} slide ${slideId}: expected exactly one Render wordmark`);
      assert(state.brand.inBounds, `${viewport.name} slide ${slideId}: Render brand signature is out of bounds`);
      if (state.brand.kind === "footer") {
        const expectedBrandAsset = [2, 3, 4, 5, 6].includes(slideId)
          ? "assets/brand/render-logo-white.svg?v=1"
          : "assets/brand/render-logo-black.svg?v=1";
        assert(state.brand.src === expectedBrandAsset, `${viewport.name} slide ${slideId}: unexpected Render wordmark asset ${state.brand.src}`);
        assert(state.brand.placement.join("|") === "0px|0px|218px|90px", `${viewport.name} slide ${slideId}: inconsistent Render wordmark placement ${state.brand.placement.join("|")}`);
        assert(state.brand.overlaps.length === 0, `${viewport.name} slide ${slideId}: Render wordmark overlaps ${state.brand.overlaps.join(", ")}`);
        assert(state.brand.alt === "" && state.brand.ariaHidden === "true", `${viewport.name} slide ${slideId}: decorative Render wordmark is exposed to assistive technology`);
      } else {
        assert(slideId === 1, `${viewport.name} slide ${slideId}: only the title may use the speaker-row wordmark`);
        assert(state.brand.src === "assets/render-logo.svg?v=2", `${viewport.name} title: unexpected Render wordmark asset ${state.brand.src}`);
        assert(state.brand.alt === "Render", `${viewport.name} title: speaker-row Render wordmark needs an accessible name`);
      }
      assert(state.unnamedMedia.length === 0, `${viewport.name} slide ${slideId}: unnamed media ${state.unnamedMedia.join(", ")}`);
      assert(state.clipped.length === 0, `${viewport.name} slide ${slideId}: clipped ${JSON.stringify(state.clipped)}`);
      await page.screenshot({ path: join(outputDir, `${viewport.name}-${String(slideId).padStart(2, "0")}.png`) });

      const fragmentCount = await page.locator(`.slide[data-slide="${slideId}"] .fragment`).count();
      for (let fragmentState = 1; fragmentState <= fragmentCount; fragmentState += 1) {
        await page.waitForTimeout(650);
        const revealState = await page.evaluate(({ expectedId, expectedState }) => {
          const slide = document.querySelector(`.slide[data-slide="${expectedId}"]`);
          const fragments = [...slide.querySelectorAll(".fragment")];
          const currentArt = [...slide.querySelectorAll("[data-art-fragment].is-current")]
            .map((element) => Number(element.dataset.artFragment));
          return {
            shown: Number(slide.dataset.fragmentsShown),
            visible: fragments.filter((fragment) => fragment.classList.contains("is-visible")).length,
            current: fragments.filter((fragment) => fragment.classList.contains("is-current")).length,
            currentArt,
            expectedState,
          };
        }, { expectedId: slideId, expectedState: fragmentState });
        assert(revealState.shown === fragmentState, `${viewport.name} slide ${slideId}: fragment state ${revealState.shown}, expected ${fragmentState}`);
        assert(revealState.visible === fragmentState && revealState.current === 1, `${viewport.name} slide ${slideId}: invalid visible fragment state ${JSON.stringify(revealState)}`);
        if ([4, 5, 6].includes(slideId)) {
          assert(revealState.currentArt.length === 1 && revealState.currentArt[0] === fragmentState, `${viewport.name} slide ${slideId}: artwork did not follow fragment ${fragmentState}`);
        }
        await page.screenshot({ path: join(outputDir, `${viewport.name}-${String(slideId).padStart(2, "0")}-fragment-${fragmentState}.png`) });
        if (fragmentState < fragmentCount) await page.keyboard.press("ArrowRight");
      }
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
    assert((await page.url()).endsWith("#24"), `${viewport.name}: End did not reach slide 24`);
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

    await page.goto(`${baseUrl}/#10`, { waitUntil: "networkidle" });
    await page.mouse.click(viewport.width * 0.8, viewport.height / 2);
    await page.waitForURL(/#12$/);
    assert((await page.url()).endsWith("#12"), `${viewport.name}: unconfigured results slide was not skipped going forward`);
    await page.mouse.click(viewport.width * 0.2, viewport.height / 2);
    await page.waitForURL(/#10$/);
    assert((await page.url()).endsWith("#10"), `${viewport.name}: unconfigured results slide was not skipped going backward`);

    if (viewport.name === "projector") {
      await page.goto(`${baseUrl}/#14`, { waitUntil: "networkidle" });
      const notesPage = await context.newPage();
      await notesPage.goto(`${baseUrl}/speaker-notes.html`, { waitUntil: "networkidle" });
      await notesPage.getByText("Slide 14").waitFor();
      await page.mouse.click(viewport.width * 0.8, viewport.height / 2);
      await notesPage.getByText("Slide 15").waitFor();
      await notesPage.getByRole("button", { name: "Previous" }).click();
      await page.waitForURL(/#14$/);

      await page.goto(`${baseUrl}/#10`, { waitUntil: "networkidle" });
      await notesPage.goto(`${baseUrl}/speaker-notes.html#10`, { waitUntil: "networkidle" });
      await notesPage.getByRole("button", { name: "Next" }).click();
      await page.waitForURL(/#12$/);
      await notesPage.getByText("Slide 12").waitFor();
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
    assert((await notesPage.getByLabel("Timing and room cue").inputValue()).trim().length > 0, `speaker notes slide ${slideId}: missing timing and room cue`);
    assert((await notesPage.getByLabel("Fallback").inputValue()).trim().length > 0, `speaker notes slide ${slideId}: missing fallback`);
    const notesFit = await notesPage.evaluate(() => document.documentElement.scrollHeight <= window.innerHeight);
    assert(notesFit, `speaker notes slide ${slideId}: notes require scrolling at 1280x720`);
    const noteFieldsAreUsable = await notesPage.locator("textarea").evaluateAll((fields) => fields.every((field) => {
      if (field.scrollHeight <= field.clientHeight) return true;
      return getComputedStyle(field).overflowY === "auto";
    }));
    assert(noteFieldsAreUsable, `speaker notes slide ${slideId}: overflowing note field is not independently scrollable`);
    if ([8, 16, 22, 24].includes(slideId)) {
      await notesPage.screenshot({ path: join(outputDir, `speaker-notes-${String(slideId).padStart(2, "0")}.png`) });
    }
  }

  await notesPage.goto(`${baseUrl}/speaker-notes.html?edit-check=1#14`, { waitUntil: "networkidle" });
  const editableNotes = ["Purpose", "Talking points", "Transition", "Timing and room cue", "Fallback"];
  const defaultNotes = {};
  const editedNotes = {};
  for (const label of editableNotes) {
    const field = notesPage.getByLabel(label);
    defaultNotes[label] = await field.inputValue();
    editedNotes[label] = `${defaultNotes[label]}\nBrowser-local ${label.toLowerCase()} edit test.`;
    await field.fill(editedNotes[label]);
  }
  await notesPage.getByRole("status").getByText("Unsaved edits").waitFor();
  await notesPage.getByRole("button", { name: "Save notes" }).click();
  await notesPage.getByRole("status").getByText("Saved in this browser").waitFor();
  await notesPage.reload({ waitUntil: "networkidle" });
  for (const label of editableNotes) {
    assert(await notesPage.getByLabel(label).inputValue() === editedNotes[label], `speaker notes: saved ${label.toLowerCase()} edit did not survive reload`);
  }
  notesPage.once("dialog", (dialog) => dialog.accept());
  await notesPage.getByRole("button", { name: "Restore defaults" }).click();
  for (const label of editableNotes) {
    assert(await notesPage.getByLabel(label).inputValue() === defaultNotes[label], `speaker notes: restore defaults did not restore ${label.toLowerCase()}`);
  }
  await notesPage.reload({ waitUntil: "networkidle" });
  for (const label of editableNotes) {
    assert(await notesPage.getByLabel(label).inputValue() === defaultNotes[label], `speaker notes: restored ${label.toLowerCase()} default did not survive reload`);
  }

  const previousNote = {
    purpose: "Saved purpose for the previous closing slide.",
    say: "Saved talking point that must stay with the closing slide.",
    transition: "Saved closing transition.",
  };
  await notesPage.evaluate((note) => {
    localStorage.removeItem("devrelcon.presenter.notes.v3");
    localStorage.setItem("devrelcon.presenter.notes.v2", JSON.stringify({ 23: note }));
  }, previousNote);
  await notesPage.goto(`${baseUrl}/speaker-notes.html?previous-migration-check=1#24`, { waitUntil: "networkidle" });
  assert(await notesPage.getByLabel("Purpose").inputValue() === previousNote.purpose, "speaker notes: previous closing purpose did not migrate from slide 23 to slide 24");
  assert(await notesPage.getByLabel("Talking points").inputValue() === previousNote.say, "speaker notes: previous closing talking points did not migrate from slide 23 to slide 24");
  assert(await notesPage.getByLabel("Transition").inputValue() === previousNote.transition, "speaker notes: previous closing transition did not migrate from slide 23 to slide 24");

  const legacyNote = {
    purpose: "Legacy purpose for the former slide 21.",
    say: "Legacy talking point that must follow the slide content.",
    transition: "Legacy transition into the exercise.",
  };
  await notesPage.evaluate((note) => {
    localStorage.removeItem("devrelcon.presenter.notes.v3");
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
    localStorage.removeItem("devrelcon.presenter.notes.v3");
  });
  await notesContext.close();

  const requestContext = await request.newContext();
  for (const url of [
    "https://fakesaaspi.onrender.com",
    "https://fakesaaspi.onrender.com/present",
    "https://github.com/ojusave/usecalibrate",
    "https://github.com/ojusave/fakesaaspi",
    "https://devrelcon-research.onrender.com",
    "https://credits-portal-mmdm.onrender.com/claim/devrelcon",
  ]) {
    const response = await requestContext.get(url);
    assert(response.ok(), `${url} returned ${response.status()}`);
  }
  const creditInfoResponse = await requestContext.get("https://credits-portal-mmdm.onrender.com/api/v1/claim/devrelcon/info");
  assert(creditInfoResponse.ok(), `credit portal info returned ${creditInfoResponse.status()}`);
  const creditInfo = await creditInfoResponse.json();
  assert(creditInfo?.data?.slug === "devrelcon" && creditInfo?.data?.status === "active", "DevRelCon credit claim is not active");
  await requestContext.dispose();
  await browser.close();

  assert(errors.length === 0, errors.join("\n"));
  console.log(`Browser verification passed. Screenshots: ${outputDir}`);
})().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
