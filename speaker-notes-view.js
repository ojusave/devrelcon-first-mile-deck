(function () {
  "use strict";

  const NOTES_STORAGE_KEY = "devrelcon.presenter.notes.v1";
  const channel = "BroadcastChannel" in window ? new BroadcastChannel("devrelcon-deck") : null;
  const slideElement = document.querySelector("[data-note-slide]");
  const purposeElement = document.querySelector("[data-note-purpose]");
  const sayElement = document.querySelector("[data-note-say]");
  const transitionElement = document.querySelector("[data-note-transition]");
  const statusElement = document.querySelector("[data-note-status]");
  let currentSlide = 1;
  let renderedNote = null;
  let savedNotes = readSavedNotes();

  function validSlide(value) {
    const slideId = Number(value);
    return SPEAKER_ORDER.includes(slideId) ? slideId : 1;
  }

  function readSavedNotes() {
    try {
      const stored = JSON.parse(window.localStorage.getItem(NOTES_STORAGE_KEY) || "{}");
      return stored && typeof stored === "object" && !Array.isArray(stored) ? stored : {};
    } catch (_error) {
      return {};
    }
  }

  function defaultNote(slideId) {
    return SPEAKER_NOTES[slideId];
  }

  function noteFor(slideId) {
    return { ...defaultNote(slideId), ...(savedNotes[slideId] || {}) };
  }

  function currentDraft() {
    return {
      purpose: purposeElement.value,
      say: sayElement.value,
      transition: transitionElement.value,
    };
  }

  function notesMatch(left, right) {
    return left.purpose === right.purpose && left.say === right.say && left.transition === right.transition;
  }

  function hasUnsavedChanges() {
    return renderedNote !== null && !notesMatch(currentDraft(), renderedNote);
  }

  function persistSavedNotes() {
    try {
      window.localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(savedNotes));
      return true;
    } catch (_error) {
      statusElement.textContent = "Could not save in this browser";
      return false;
    }
  }

  function saveCurrent(status = "Saved in this browser") {
    const draft = currentDraft();
    const defaults = defaultNote(currentSlide);
    if (notesMatch(draft, defaults)) {
      delete savedNotes[currentSlide];
    } else {
      savedNotes[currentSlide] = draft;
    }
    if (!persistSavedNotes()) {
      return false;
    }
    renderedNote = { ...draft };
    statusElement.textContent = status;
    return true;
  }

  function showNote(slideId, status) {
    const nextSlide = validSlide(slideId);
    if (nextSlide !== currentSlide && hasUnsavedChanges()) {
      saveCurrent("Saved before slide change");
    }
    currentSlide = nextSlide;
    const note = noteFor(currentSlide);
    slideElement.textContent = String(currentSlide);
    purposeElement.value = note.purpose;
    sayElement.value = note.say;
    transitionElement.value = note.transition;
    renderedNote = { ...note };
    statusElement.textContent = status;
    window.history.replaceState(null, "", `#${currentSlide}`);
  }

  function send(action) {
    if (hasUnsavedChanges() && !saveCurrent("Saved before slide change")) {
      return;
    }
    channel?.postMessage({ type: "command", action });
    const index = SPEAKER_ORDER.indexOf(currentSlide);
    const nextIndex = action === "next"
      ? Math.min(index + 1, SPEAKER_ORDER.length - 1)
      : Math.max(index - 1, 0);
    showNote(SPEAKER_ORDER[nextIndex], channel ? "Controlling deck" : "Notes only");
  }

  function restoreDefaults() {
    const confirmed = window.confirm(`Restore the deck defaults for slide ${currentSlide}?`);
    if (!confirmed) {
      return;
    }
    delete savedNotes[currentSlide];
    if (!persistSavedNotes()) {
      return;
    }
    showNote(currentSlide, "Deck defaults restored");
  }

  for (const field of [purposeElement, sayElement, transitionElement]) {
    field.addEventListener("input", () => {
      statusElement.textContent = "Unsaved edits";
    });
  }

  document.querySelector("[data-note-previous]").addEventListener("click", () => send("previous"));
  document.querySelector("[data-note-next]").addEventListener("click", () => send("next"));
  document.querySelector("[data-note-save]").addEventListener("click", () => saveCurrent());
  document.querySelector("[data-note-reset]").addEventListener("click", restoreDefaults);

  document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
      event.preventDefault();
      saveCurrent();
      return;
    }
    if (event.target instanceof HTMLTextAreaElement) {
      return;
    }
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
    if (event.key === NOTES_STORAGE_KEY) {
      savedNotes = readSavedNotes();
      if (!hasUnsavedChanges()) {
        showNote(currentSlide, "Saved notes updated");
      }
      return;
    }
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

  window.addEventListener("beforeunload", (event) => {
    if (!hasUnsavedChanges()) {
      return;
    }
    event.preventDefault();
    event.returnValue = "";
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
