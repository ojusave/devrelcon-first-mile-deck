(function () {
  "use strict";

  const STAGE_WIDTH = 1920;
  const STAGE_HEIGHT = 1080;
  const DASHBOARD_SLIDE = 9;
  const HOLDING_SLIDE = 10;
  const RESULTS_SLIDE = 11;
  const QR_QUIET_ZONE_MODULES = 4;
  const PRESENTER_SLIDE_STORAGE_KEY = "devrelcon.presenter.slide.v5";

  const root = document.documentElement;
  const blackout = document.getElementById("blackout");
  const slides = Array.from(document.querySelectorAll(".slide"));
  const slideIds = slides.map((slide) => Number(slide.dataset.slide));
  const presenterChannel = "BroadcastChannel" in window ? new BroadcastChannel("devrelcon-deck") : null;

  let currentIndex = 0;
  let lastNonDashboardState = { index: 0, fragmentCount: 0 };
  let touchStart = null;
  let timerEndsAt = null;
  let timerInterval = null;

  function fitStage() {
    const scale = Math.min(window.innerWidth / STAGE_WIDTH, window.innerHeight / STAGE_HEIGHT);
    const left = (window.innerWidth - STAGE_WIDTH * scale) / 2;
    const top = (window.innerHeight - STAGE_HEIGHT * scale) / 2;
    root.style.setProperty("--stage-scale", String(scale));
    root.style.setProperty("--stage-left", `${left}px`);
    root.style.setProperty("--stage-top", `${top}px`);
  }

  function addSlideBrandMarks() {
    slides.forEach((slide) => {
      if (slide.querySelector(".render-logo")) {
        return;
      }

      const logo = document.createElement("img");
      logo.className = "slide-brand";
      logo.src = slide.classList.contains("slide--odyssey")
        ? "assets/brand/render-logo-white.svg?v=1"
        : "assets/brand/render-logo-black.svg?v=1";
      logo.alt = "";
      logo.setAttribute("aria-hidden", "true");
      slide.append(logo);
    });
  }

  function getFragments(slide) {
    return Array.from(slide.querySelectorAll(".fragment"));
  }

  function visibleFragmentCount(slide) {
    return getFragments(slide).filter((fragment) => fragment.classList.contains("is-visible")).length;
  }

  function syncSlideArtwork(slide, fragmentCount) {
    slide.querySelectorAll("[data-art-fragment]").forEach((art) => {
      const trigger = Number(art.dataset.artFragment || 0);
      art.classList.toggle("is-visible", trigger <= fragmentCount);
      art.classList.toggle("is-current", trigger === fragmentCount);
    });
  }

  function setFragmentCount(slide, count) {
    const fragments = getFragments(slide);
    const minimumCount = fragments.length > 0 ? 1 : 0;
    const safeCount = Math.max(minimumCount, Math.min(count, fragments.length));

    fragments.forEach((fragment, index) => {
      const visible = index < safeCount;
      fragment.classList.toggle("is-visible", visible);
      fragment.classList.toggle("is-current", visible && index === safeCount - 1);
      fragment.setAttribute("aria-hidden", String(!visible || index !== safeCount - 1));
    });

    slide.dataset.fragmentsShown = String(safeCount);
    syncSlideArtwork(slide, safeCount);
  }

  function updateHash(slideId) {
    const nextUrl = `${window.location.pathname}${window.location.search}#${slideId}`;
    window.history.replaceState(null, "", nextUrl);
  }

  function announceSlide(slideId) {
    const state = { slideId, updatedAt: Date.now() };
    try {
      window.localStorage.setItem(PRESENTER_SLIDE_STORAGE_KEY, JSON.stringify(state));
    } catch (_error) {
      // BroadcastChannel still keeps an open notes window synchronized.
    }
    presenterChannel?.postMessage({ type: "slide", slideId });
  }

  function updateTimer() {
    const timer = document.querySelector("[data-trap-timer]");
    if (!timer || timerEndsAt === null) {
      return;
    }

    const remaining = Math.max(0, Math.ceil((timerEndsAt - Date.now()) / 1000));
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    timer.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    if (remaining === 0 && timerInterval !== null) {
      window.clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function startTimerIfNeeded(slideId) {
    const timer = document.querySelector("[data-trap-timer]");
    if (slideId !== HOLDING_SLIDE || !timer || timerEndsAt !== null) {
      return;
    }

    timerEndsAt = Date.now() + Number(CONFIG.trapTimerMinutes) * 60 * 1000;
    updateTimer();
    timerInterval = window.setInterval(updateTimer, 250);
  }

  function showSlide(index, fragmentCount, shouldUpdateHash) {
    const safeIndex = Math.max(0, Math.min(index, slides.length - 1));
    currentIndex = safeIndex;

    slides.forEach((slide, slideIndex) => {
      const isCurrent = slideIndex === currentIndex;
      slide.hidden = !isCurrent;
      slide.setAttribute("aria-hidden", String(!isCurrent));
      slide.inert = !isCurrent;
    });

    const currentSlide = slides[currentIndex];
    setFragmentCount(currentSlide, fragmentCount);
    startTimerIfNeeded(slideIds[currentIndex]);

    if (slideIds[currentIndex] !== DASHBOARD_SLIDE) {
      lastNonDashboardState = {
        index: currentIndex,
        fragmentCount: visibleFragmentCount(currentSlide),
      };
    }

    if (shouldUpdateHash) {
      updateHash(slideIds[currentIndex]);
    }
    announceSlide(slideIds[currentIndex]);
  }

  function showFromHash() {
    const requestedId = Number(window.location.hash.slice(1));
    const requestedIndex = slideIds.indexOf(requestedId);
    const nextIndex = requestedIndex >= 0 ? requestedIndex : 0;
    showSlide(nextIndex, 0, requestedIndex < 0);
  }

  function isSkippedDuringStageNavigation(index) {
    return slideIds[index] === RESULTS_SLIDE && !CONFIG.resultsUrl;
  }

  function adjacentStageIndex(startIndex, direction) {
    let nextIndex = startIndex + direction;
    while (nextIndex >= 0 && nextIndex < slides.length && isSkippedDuringStageNavigation(nextIndex)) {
      nextIndex += direction;
    }
    return nextIndex;
  }

  function advance() {
    const currentSlide = slides[currentIndex];
    const fragments = getFragments(currentSlide);
    const shown = visibleFragmentCount(currentSlide);

    if (shown < fragments.length) {
      setFragmentCount(currentSlide, shown + 1);
      if (slideIds[currentIndex] !== DASHBOARD_SLIDE) {
        lastNonDashboardState = { index: currentIndex, fragmentCount: shown + 1 };
      }
      return;
    }

    const nextIndex = adjacentStageIndex(currentIndex, 1);
    if (nextIndex < slides.length) {
      showSlide(nextIndex, 0, true);
    }
  }

  function reverse() {
    const currentSlide = slides[currentIndex];
    const shown = visibleFragmentCount(currentSlide);
    const minimumCount = getFragments(currentSlide).length > 0 ? 1 : 0;

    if (shown > minimumCount) {
      setFragmentCount(currentSlide, shown - 1);
      if (slideIds[currentIndex] !== DASHBOARD_SLIDE) {
        lastNonDashboardState = { index: currentIndex, fragmentCount: shown - 1 };
      }
      return;
    }

    const previousIndex = adjacentStageIndex(currentIndex, -1);
    if (previousIndex >= 0) {
      showSlide(previousIndex, getFragments(slides[previousIndex]).length, true);
    }
  }

  function jumpToBoundary(index) {
    showSlide(index, 0, true);
  }

  function toggleDashboard() {
    const dashboardIndex = slideIds.indexOf(DASHBOARD_SLIDE);
    if (dashboardIndex < 0) {
      return;
    }

    if (slideIds[currentIndex] === DASHBOARD_SLIDE) {
      showSlide(lastNonDashboardState.index, lastNonDashboardState.fragmentCount, true);
      return;
    }

    lastNonDashboardState = {
      index: currentIndex,
      fragmentCount: visibleFragmentCount(slides[currentIndex]),
    };
    showSlide(dashboardIndex, 0, true);
  }

  function toggleBlackout() {
    const willShow = blackout.hidden;
    blackout.hidden = !willShow;
    blackout.setAttribute("aria-hidden", String(!willShow));
  }

  function openSpeakerNotes() {
    const notesUrl = new URL("speaker-notes.html", window.location.href);
    notesUrl.hash = String(slideIds[currentIndex]);
    window.open(notesUrl, "devrelcon-speaker-notes", "popup,width=900,height=900");
  }

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    } catch (_error) {
      return;
    }
  }

  function shortUrl(value) {
    return String(value).replace(/^https?:\/\//i, "").replace(/\/$/, "");
  }

  function makeQrCanvas(value, label, size) {
    const code = qrcode(0, "M");
    code.addData(value);
    code.make();

    const moduleCount = code.getModuleCount();
    const units = moduleCount + QR_QUIET_ZONE_MODULES * 2;
    const moduleSize = Math.floor(size / units);
    const renderedSize = moduleSize * units;
    const offset = Math.floor((size - renderedSize) / 2);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = size;
    canvas.height = size;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    canvas.setAttribute("role", "img");
    canvas.setAttribute("aria-label", `QR code for ${label}`);

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, size, size);
    context.fillStyle = "#0b1b2a";

    for (let row = 0; row < moduleCount; row += 1) {
      for (let column = 0; column < moduleCount; column += 1) {
        if (code.isDark(row, column)) {
          context.fillRect(
            offset + (column + QR_QUIET_ZONE_MODULES) * moduleSize,
            offset + (row + QR_QUIET_ZONE_MODULES) * moduleSize,
            moduleSize,
            moduleSize,
          );
        }
      }
    }

    return canvas;
  }

  function setQrPlaceholder(frame, label) {
    const placeholderLabel = document.createElement("span");
    placeholderLabel.textContent = `QR: ${label}`;
    frame.replaceChildren(placeholderLabel);
    frame.classList.remove("is-ready");
    frame.classList.add("asset-placeholder");
  }

  function renderQr(frame, caption, value, label) {
    const size = Number(frame.dataset.qrSize || 512);
    caption.textContent = "";
    caption.classList.add("is-empty");
    caption.setAttribute("aria-hidden", "true");

    if (!value) {
      setQrPlaceholder(frame, label);
      return;
    }

    try {
      frame.replaceChildren(makeQrCanvas(value, label, size));
      frame.classList.remove("asset-placeholder");
      frame.classList.add("is-ready");
      caption.textContent = caption.dataset.qrDisplay || shortUrl(value);
      caption.classList.remove("is-empty");
      caption.setAttribute("aria-hidden", "false");
    } catch (_error) {
      setQrPlaceholder(frame, `ERROR: ${label}`);
      caption.textContent = caption.dataset.qrDisplay || shortUrl(value);
      caption.classList.remove("is-empty");
      caption.setAttribute("aria-hidden", "false");
    }
  }

  function renderQrSet(key, value, label) {
    const frames = Array.from(document.querySelectorAll(`[data-qr-frame="${key}"]`));
    const captions = Array.from(document.querySelectorAll(`[data-qr-caption="${key}"]`));
    frames.forEach((frame, index) => {
      renderQr(frame, captions[index], value, label);
    });
  }

  function renderLiveFrame(slideId, value, label, configKey, placeholderTitle) {
    const slide = slides[slideIds.indexOf(slideId)];
    if (!slide) {
      return;
    }

    if (!value) {
      const placeholder = document.createElement("div");
      const title = document.createElement("span");
      const instruction = document.createElement("span");
      placeholder.className = "dashboard-placeholder asset-placeholder";
      title.textContent = placeholderTitle;
      instruction.textContent = slideId === RESULTS_SLIDE
        ? "Stage navigation skips this slide until the event results URL is added"
        : `set CONFIG.${configKey}`;
      placeholder.append(title, instruction);
      slide.replaceChildren(placeholder);
      slide.dataset.liveReady = "false";
      return;
    }

    const iframe = document.createElement("iframe");
    iframe.className = "dashboard-frame";
    iframe.src = value;
    iframe.title = label;
    iframe.loading = "eager";
    iframe.tabIndex = -1;
    slide.replaceChildren(iframe);
    slide.dataset.liveReady = "true";
  }

  function renderLiveViews() {
    renderLiveFrame(DASHBOARD_SLIDE, CONFIG.dashboardUrl, "Live dashboard", "dashboardUrl", "LIVE DASHBOARD EMBEDS HERE");
    renderLiveFrame(RESULTS_SLIDE, CONFIG.resultsUrl, "Real-time results", "resultsUrl", "RESULTS VIEW IS NOT CONNECTED");
  }

  function renderNumberCards(selector, stats) {
    const container = document.querySelector(selector);
    if (!container) {
      return;
    }
    container.replaceChildren();

    stats.forEach((stat) => {
      const block = document.createElement("div");
      const value = document.createElement("p");
      const label = document.createElement("p");
      block.className = "number-card";
      value.className = "number-value";
      label.className = "number-label";
      value.textContent = stat.value;
      label.textContent = stat.label;
      block.append(value, label);
      container.append(block);
    });
  }

  function renderStats() {
    const stats = CONFIG.stats || {};
    document.querySelectorAll("[data-stat]").forEach((element) => {
      element.textContent = stats[element.dataset.stat] || "";
    });
    renderNumberCards("[data-boundary-stats]", Array.isArray(stats.boundaries) ? stats.boundaries : []);
  }

  function renderTimer() {
    const timer = document.querySelector("[data-trap-timer]");
    const minutes = Number(CONFIG.trapTimerMinutes);
    if (!timer) {
      return;
    }

    if (CONFIG.trapTimerMinutes === null || !Number.isFinite(minutes) || minutes <= 0) {
      timer.remove();
      return;
    }

    timer.hidden = false;
    const totalSeconds = Math.ceil(minutes * 60);
    const wholeMinutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    timer.textContent = `${String(wholeMinutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  }

  function renderConfiguredAssets() {
    renderQrSet("fakegpt", CONFIG.fakegptUrl, "CONFIG.fakegptUrl");
    renderQrSet("firstmile", CONFIG.takeaways.firstmile, "CONFIG.takeaways.firstmile");
    renderQrSet("fakesaaspiKit", CONFIG.takeaways.fakesaaspiKit, "CONFIG.takeaways.fakesaaspiKit");
    renderQrSet("comparison", CONFIG.takeaways.comparison, "CONFIG.takeaways.comparison");
    renderQrSet("credits", CONFIG.takeaways.credits, "CONFIG.takeaways.credits");
    renderQrSet("contact", CONFIG.takeaways.contact, "CONFIG.takeaways.contact");
    renderQrSet("careers", CONFIG.takeaways.careers, "CONFIG.takeaways.careers");
    renderLiveViews();
    renderStats();
    renderTimer();
    document.querySelector("[data-contact]").textContent = CONFIG.contact;
  }

  function handleKeydown(event) {
    if (event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }

    const key = event.key;
    if (key === "b" || key === "B") {
      event.preventDefault();
      toggleBlackout();
      return;
    }

    if (key === "f" || key === "F") {
      event.preventDefault();
      toggleFullscreen();
      return;
    }

    if (key === "n" || key === "N") {
      event.preventDefault();
      openSpeakerNotes();
      return;
    }

    if (!blackout.hidden) {
      return;
    }

    if (key === "ArrowRight" || key === " ") {
      event.preventDefault();
      advance();
    } else if (key === "ArrowLeft") {
      event.preventDefault();
      reverse();
    } else if (key === "Home") {
      event.preventDefault();
      jumpToBoundary(0);
    } else if (key === "End") {
      event.preventDefault();
      jumpToBoundary(slides.length - 1);
    } else if (key === "d" || key === "D") {
      event.preventDefault();
      toggleDashboard();
    }
  }

  function handleClick(event) {
    if (event.button !== 0 || !blackout.hidden || event.target.closest("a, button, input, textarea, select")) {
      return;
    }
    if (event.clientX < window.innerWidth / 2) {
      reverse();
    } else {
      advance();
    }
  }

  function handleTouchStart(event) {
    if (!blackout.hidden || event.touches.length !== 1) {
      touchStart = null;
      return;
    }

    touchStart = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
      time: window.performance.now(),
    };
  }

  function handleTouchEnd(event) {
    if (!touchStart || event.changedTouches.length !== 1) {
      touchStart = null;
      return;
    }

    const deltaX = event.changedTouches[0].clientX - touchStart.x;
    const deltaY = event.changedTouches[0].clientY - touchStart.y;
    const elapsed = window.performance.now() - touchStart.time;
    touchStart = null;

    if (elapsed > 900 || Math.abs(deltaX) < 60 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) {
      return;
    }

    event.preventDefault();
    if (deltaX < 0) {
      advance();
    } else {
      reverse();
    }
  }

  window.addEventListener("resize", fitStage);
  window.addEventListener("hashchange", showFromHash);
  document.addEventListener("keydown", handleKeydown);
  document.addEventListener("click", handleClick);
  document.addEventListener("touchstart", handleTouchStart, { passive: true });
  document.addEventListener("touchend", handleTouchEnd, { passive: false });
  blackout.addEventListener("click", (event) => event.stopPropagation());
  presenterChannel?.addEventListener("message", (event) => {
    if (event.data?.type === "request-state") {
      announceSlide(slideIds[currentIndex]);
    } else if (event.data?.type === "command" && event.data.action === "next") {
      advance();
    } else if (event.data?.type === "command" && event.data.action === "previous") {
      reverse();
    }
  });

  renderConfiguredAssets();
  addSlideBrandMarks();
  fitStage();
  showFromHash();
  root.dataset.deckReady = "true";
})();
