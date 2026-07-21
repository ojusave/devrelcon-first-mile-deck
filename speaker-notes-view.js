(function () {
  "use strict";

  const channel = "BroadcastChannel" in window ? new BroadcastChannel("devrelcon-deck") : null;
  const slideElement = document.querySelector("[data-note-slide]");
  const purposeElement = document.querySelector("[data-note-purpose]");
  const sayElement = document.querySelector("[data-note-say]");
  const transitionElement = document.querySelector("[data-note-transition]");
  const statusElement = document.querySelector("[data-note-status]");
  let currentSlide = 1;

  function validSlide(value) {
    const slideId = Number(value);
    return SPEAKER_ORDER.includes(slideId) ? slideId : 1;
  }

  function showNote(slideId, status) {
    currentSlide = validSlide(slideId);
    const note = SPEAKER_NOTES[currentSlide];
    slideElement.textContent = String(currentSlide);
    purposeElement.textContent = note.purpose;
    sayElement.textContent = note.say;
    transitionElement.textContent = note.transition;
    statusElement.textContent = status;
    window.history.replaceState(null, "", `#${currentSlide}`);
  }

  function send(action) {
    channel?.postMessage({ type: "command", action });
    const index = SPEAKER_ORDER.indexOf(currentSlide);
    const nextIndex = action === "next"
      ? Math.min(index + 1, SPEAKER_ORDER.length - 1)
      : Math.max(index - 1, 0);
    showNote(SPEAKER_ORDER[nextIndex], channel ? "Controlling deck" : "Notes only");
  }

  document.querySelector("[data-note-previous]").addEventListener("click", () => send("previous"));
  document.querySelector("[data-note-next]").addEventListener("click", () => send("next"));

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" || event.key === " ") {
      event.preventDefault();
      send("next");
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      send("previous");
    }
  });

  channel?.addEventListener("message", (event) => {
    if (event.data?.type === "slide") {
      showNote(event.data.slideId, "Synced with deck");
    }
  });

  window.addEventListener("storage", (event) => {
    if (event.key !== "devrelcon.presenter.slide" || !event.newValue) {
      return;
    }
    try {
      const state = JSON.parse(event.newValue);
      showNote(state.slideId, "Synced with deck");
    } catch (_error) {
      return;
    }
  });

  let initialSlide = validSlide(window.location.hash.slice(1));
  try {
    const saved = JSON.parse(window.localStorage.getItem("devrelcon.presenter.slide") || "null");
    if (!window.location.hash && saved?.slideId) {
      initialSlide = validSlide(saved.slideId);
    }
  } catch (_error) {
    initialSlide = validSlide(window.location.hash.slice(1));
  }

  showNote(initialSlide, channel ? "Waiting for deck" : "Notes only");
  channel?.postMessage({ type: "request-state" });
})();
