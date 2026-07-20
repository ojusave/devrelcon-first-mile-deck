(function () {
  "use strict";

  const STAGE_WIDTH = 1920;
  const STAGE_HEIGHT = 1080;
  const DASHBOARD_SLIDE = 12;
  const HOLDING_SLIDE = 8;
  const QR_QUIET_ZONE_MODULES = 4;
  const SVG_NS = "http://www.w3.org/2000/svg";

  const root = document.documentElement;
  const blackout = document.getElementById("blackout");
  const slides = Array.from(document.querySelectorAll(".slide"));
  const slideIds = slides.map((slide) => Number(slide.dataset.slide));

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

  function getFragments(slide) {
    return Array.from(slide.querySelectorAll(".fragment"));
  }

  function visibleFragmentCount(slide) {
    return getFragments(slide).filter((fragment) => fragment.classList.contains("is-visible")).length;
  }

  function syncRouteState(slide, fragmentCount) {
    slide.querySelectorAll("[data-art-fragment]").forEach((art) => {
      const trigger = Number(art.dataset.artFragment || 0);
      art.classList.toggle("is-visible", trigger <= fragmentCount);
      art.classList.toggle("is-current", trigger === fragmentCount);
    });

    const route = slide.querySelector(".route");
    if (!route) {
      return;
    }

    const animatedDots = Array.from(route.querySelectorAll("[data-route-motion]"));
    animatedDots.forEach((dot) => {
      dot.classList.remove("is-falling", "is-returning");
    });

    void route.offsetWidth;

    animatedDots.forEach((dot) => {
      const trigger = Number(dot.dataset.routeFragment || 0);
      if (trigger > fragmentCount) {
        return;
      }

      if (dot.dataset.routeMotion === "fall") {
        dot.classList.add("is-falling");
      } else if (dot.dataset.routeMotion === "return") {
        dot.classList.add("is-returning");
      }
    });
  }

  function setFragmentCount(slide, count) {
    const fragments = getFragments(slide);
    const minimumCount = slide.classList.contains("slide--odyssey") && fragments.length > 0 ? 1 : 0;
    const safeCount = Math.max(minimumCount, Math.min(count, fragments.length));

    fragments.forEach((fragment, index) => {
      const visible = index < safeCount;
      fragment.classList.toggle("is-visible", visible);
      fragment.classList.toggle("is-current", visible && index === safeCount - 1);
      fragment.setAttribute("aria-hidden", String(!visible || index !== safeCount - 1));
    });

    slide.dataset.fragmentsShown = String(safeCount);
    syncRouteState(slide, safeCount);
  }

  function updateHash(slideId) {
    const nextUrl = `${window.location.pathname}${window.location.search}#${slideId}`;
    window.history.replaceState(null, "", nextUrl);
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
  }

  function showFromHash() {
    const requestedId = Number(window.location.hash.slice(1));
    const requestedIndex = slideIds.indexOf(requestedId);
    const nextIndex = requestedIndex >= 0 ? requestedIndex : 0;
    showSlide(nextIndex, 0, requestedIndex < 0);
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

    if (currentIndex < slides.length - 1) {
      showSlide(currentIndex + 1, 0, true);
    }
  }

  function reverse() {
    const currentSlide = slides[currentIndex];
    const shown = visibleFragmentCount(currentSlide);
    const minimumCount = currentSlide.classList.contains("slide--odyssey") && getFragments(currentSlide).length > 0 ? 1 : 0;

    if (shown > minimumCount) {
      setFragmentCount(currentSlide, shown - 1);
      if (slideIds[currentIndex] !== DASHBOARD_SLIDE) {
        lastNonDashboardState = { index: currentIndex, fragmentCount: shown - 1 };
      }
      return;
    }

    if (currentIndex > 0) {
      const previousIndex = currentIndex - 1;
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
      caption.textContent = shortUrl(value);
      caption.classList.remove("is-empty");
      caption.setAttribute("aria-hidden", "false");
    } catch (_error) {
      setQrPlaceholder(frame, `ERROR: ${label}`);
      caption.textContent = shortUrl(value);
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

  function renderDashboard() {
    const dashboardSlide = slides[slideIds.indexOf(DASHBOARD_SLIDE)];
    if (!CONFIG.dashboardUrl) {
      const placeholder = document.createElement("div");
      const title = document.createElement("span");
      const instruction = document.createElement("span");
      placeholder.className = "dashboard-placeholder asset-placeholder";
      title.textContent = "DASHBOARD EMBEDS HERE";
      instruction.textContent = "set CONFIG.dashboardUrl";
      placeholder.append(title, instruction);
      dashboardSlide.replaceChildren(placeholder);
      return;
    }

    const iframe = document.createElement("iframe");
    iframe.className = "dashboard-frame";
    iframe.src = CONFIG.dashboardUrl;
    iframe.title = "Live dashboard";
    iframe.loading = "eager";
    iframe.tabIndex = -1;
    dashboardSlide.replaceChildren(iframe);
  }

  function renderStats() {
    const container = document.querySelector("[data-stats]");
    const stats = Array.isArray(CONFIG.stats) ? CONFIG.stats.slice(0, 3) : [];
    container.replaceChildren();

    stats.forEach((stat) => {
      const block = document.createElement("div");
      const value = document.createElement("p");
      const label = document.createElement("p");
      block.className = "stat-block";
      value.className = "stat-value";
      label.className = "stat-label";
      value.textContent = stat.value;
      label.textContent = stat.label;
      block.append(value, label);
      container.append(block);
    });
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
    renderDashboard();
    renderStats();
    renderTimer();
    document.querySelector("[data-contact]").textContent = CONFIG.contact;
  }

  function svgElement(name, attributes) {
    const element = document.createElementNS(SVG_NS, name);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, String(value)));
    return element;
  }

  function addDot(svg, x, y, options) {
    const dot = svgElement("circle", { cx: x, cy: y, r: options.radius || 11, class: "route-dot" });
    if (options.motion) {
      dot.dataset.routeMotion = options.motion;
      dot.dataset.routeFragment = String(options.fragment || 0);
    }
    if (options.delay) {
      dot.style.animationDelay = `${options.delay}ms`;
    }
    if (options.returnDistance) {
      dot.style.setProperty("--return-distance", `${options.returnDistance}px`);
    }
    svg.append(dot);
  }

  function journeyPoint(progress) {
    return {
      x: 50 + 660 * progress,
      y: 174 - Math.sin(Math.PI * progress) * 118,
    };
  }

  function addJourneyDot(svg, progress, options) {
    const point = journeyPoint(progress);
    addDot(svg, point.x, point.y, options);
  }

  function addRouteLabel(svg, x, y, anchor, value) {
    const label = svgElement("text", { x, y, class: "route-label", "text-anchor": anchor });
    label.textContent = value;
    svg.append(label);
  }

  function renderRoute(route) {
    const type = route.dataset.route;
    const isClosing = type === "closing";
    const svg = svgElement("svg", { viewBox: isClosing ? "0 0 1664 270" : "0 0 760 260", focusable: "false" });

    if (isClosing) {
      const y = 54;
      const endX = 1580;
      svg.append(svgElement("line", { x1: 72, y1: y, x2: endX, y2: y, class: "route-line" }));
      svg.append(svgElement("circle", { cx: 72, cy: y, r: 9, class: "route-marker" }));
      svg.append(svgElement("circle", { cx: endX, cy: y, r: 9, class: "route-marker" }));
      addDot(svg, endX, y, { radius: 12 });
      route.replaceChildren(svg);
      return;
    }

    const start = journeyPoint(0);
    const end = journeyPoint(1);
    svg.append(svgElement("path", {
      d: "M 50 174 C 228 8, 532 8, 710 174",
      class: "route-line route-line--odyssey",
      fill: "none",
    }));
    svg.append(svgElement("circle", { cx: start.x, cy: start.y, r: 10, class: "route-marker" }));
    svg.append(svgElement("circle", { cx: end.x, cy: end.y, r: 10, class: "route-marker" }));
    addRouteLabel(svg, 50, 224, "start", "TROY");
    addRouteLabel(svg, 710, 224, "end", "ITHACA");

    if (type === "departure") {
      for (let index = 0; index < 12; index += 1) {
        addJourneyDot(svg, 0.04 + index * 0.024, {});
      }
    } else if (type === "attrition") {
      for (let index = 0; index < 10; index += 1) {
        addJourneyDot(svg, 0.18 + index * 0.058, index % 2 === 0 ? { motion: "fall", delay: index * 110 } : {});
      }
    } else if (type === "losses") {
      for (let index = 0; index < 9; index += 1) {
        addJourneyDot(svg, 0.24 + index * 0.064, {
          motion: "fall",
          fragment: Math.floor(index / 3) + 1,
          delay: (index % 3) * 90,
        });
      }
    } else if (type === "return") {
      for (let index = 0; index < 7; index += 1) {
        addJourneyDot(svg, 0.72 + index * 0.04, {
          motion: "return",
          fragment: 2,
          delay: index * 22,
          returnDistance: -500,
        });
      }
    } else if (type === "survivor") {
      for (let index = 0; index < 7; index += 1) {
        addJourneyDot(svg, 0.62 + index * 0.05, {
          motion: "fall",
          fragment: 2,
          delay: index * 70,
        });
      }
      addJourneyDot(svg, 1, { radius: 14 });
    }

    route.replaceChildren(svg);
  }

  function renderRoutes() {
    document.querySelectorAll("[data-route]").forEach(renderRoute);
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
    if (event.button !== 0 || !blackout.hidden) {
      return;
    }
    advance();
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

  renderRoutes();
  renderConfiguredAssets();
  fitStage();
  showFromHash();
  root.dataset.deckReady = "true";
})();
