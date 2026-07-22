(function () {
  "use strict";

  const NOTES_STORAGE_KEY = "devrelcon.presenter.notes.v4";
  const PREVIOUS_NOTES_STORAGE_KEY = "devrelcon.presenter.notes.v3";
  const SECOND_PREVIOUS_NOTES_STORAGE_KEY = "devrelcon.presenter.notes.v2";
  const LEGACY_NOTES_STORAGE_KEY = "devrelcon.presenter.notes.v1";
  const PRESENTER_SLIDE_STORAGE_KEY = "devrelcon.presenter.slide.v4";
  const PREVIOUS_PRESENTER_SLIDE_STORAGE_KEY = "devrelcon.presenter.slide.v3";
  const SECOND_PREVIOUS_PRESENTER_SLIDE_STORAGE_KEY = "devrelcon.presenter.slide.v2";
  const LEGACY_PRESENTER_SLIDE_STORAGE_KEY = "devrelcon.presenter.slide";
  const PREVIOUS_SLIDE_ID_MAP = {
    1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8,
    9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15,
    16: 16, 17: 17, 18: 18, 19: 19, 20: 20, 21: 21,
    23: 24, 24: 25,
  };
  const SECOND_PREVIOUS_SLIDE_ID_MAP = {
    1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8,
    9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15,
    16: 16, 17: 17, 18: 18, 19: 19, 20: 20, 21: 21,
    23: 25,
  };
  const LEGACY_SLIDE_ID_MAP = {
    1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6,
    21: 7, 7: 8, 12: 9, 8: 10, 13: 11, 22: 12, 11: 13,
    14: 14, 15: 15, 23: 16, 24: 17, 25: 18, 19: 19,
    17: 20, 16: 21, 18: 22, 20: 25,
  };
  const channel = "BroadcastChannel" in window ? new BroadcastChannel("devrelcon-deck") : null;
  const slideElement = document.querySelector("[data-note-slide]");
  const purposeElement = document.querySelector("[data-note-purpose]");
  const sayElement = document.querySelector("[data-note-say]");
  const transitionElement = document.querySelector("[data-note-transition]");
  const watchElement = document.querySelector("[data-note-watch]");
  const fallbackElement = document.querySelector("[data-note-fallback]");
  const statusElement = document.querySelector("[data-note-status]");
  let currentSlide = 1;
  let renderedNote = null;
  let savedNotes = readSavedNotes();

  function validSlide(value) {
    const slideId = Number(value);
    return SPEAKER_ORDER.includes(slideId) ? slideId : 1;
  }

  function shouldSkipDuringStageNavigation(slideId) {
    return slideId === 11 && !CONFIG.resultsUrl;
  }

  function adjacentNoteIndex(startIndex, direction) {
    let nextIndex = startIndex + direction;
    while (nextIndex >= 0 && nextIndex < SPEAKER_ORDER.length && shouldSkipDuringStageNavigation(SPEAKER_ORDER[nextIndex])) {
      nextIndex += direction;
    }
    return Math.max(0, Math.min(nextIndex, SPEAKER_ORDER.length - 1));
  }

  function readSavedNotes() {
    try {
      const current = window.localStorage.getItem(NOTES_STORAGE_KEY);
      if (current) {
        const stored = JSON.parse(current);
        return stored && typeof stored === "object" && !Array.isArray(stored) ? stored : {};
      }

      const previous = JSON.parse(window.localStorage.getItem(PREVIOUS_NOTES_STORAGE_KEY) || "{}");
      if (previous && typeof previous === "object" && !Array.isArray(previous)) {
        const migrated = {};
        for (const [previousId, note] of Object.entries(previous)) {
          const nextId = PREVIOUS_SLIDE_ID_MAP[previousId];
          if (nextId && note && typeof note === "object" && !Array.isArray(note)) {
            migrated[nextId] = note;
          }
        }
        if (Object.keys(migrated).length > 0) {
          window.localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(migrated));
          return migrated;
        }
      }

      const secondPrevious = JSON.parse(window.localStorage.getItem(SECOND_PREVIOUS_NOTES_STORAGE_KEY) || "{}");
      if (secondPrevious && typeof secondPrevious === "object" && !Array.isArray(secondPrevious)) {
        const migrated = {};
        for (const [previousId, note] of Object.entries(secondPrevious)) {
          const nextId = SECOND_PREVIOUS_SLIDE_ID_MAP[previousId];
          if (nextId && note && typeof note === "object" && !Array.isArray(note)) {
            migrated[nextId] = note;
          }
        }
        if (Object.keys(migrated).length > 0) {
          window.localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(migrated));
          return migrated;
        }
      }

      const legacy = JSON.parse(window.localStorage.getItem(LEGACY_NOTES_STORAGE_KEY) || "{}");
      if (!legacy || typeof legacy !== "object" || Array.isArray(legacy)) {
        return {};
      }

      const migrated = {};
      for (const [legacyId, note] of Object.entries(legacy)) {
        const nextId = LEGACY_SLIDE_ID_MAP[legacyId];
        if (nextId && note && typeof note === "object" && !Array.isArray(note)) {
          migrated[nextId] = note;
        }
      }
      if (Object.keys(migrated).length > 0) {
        window.localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(migrated));
      }
      return migrated;
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
      watch: watchElement.value,
      fallback: fallbackElement.value,
    };
  }

  function notesMatch(left, right) {
    return left.purpose === right.purpose
      && left.say === right.say
      && left.transition === right.transition
      && left.watch === right.watch
      && left.fallback === right.fallback;
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
    watchElement.value = note.watch;
    fallbackElement.value = note.fallback;
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
    const nextIndex = adjacentNoteIndex(index, action === "next" ? 1 : -1);
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

  for (const field of [purposeElement, sayElement, transitionElement, watchElement, fallbackElement]) {
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
    if (event.key !== PRESENTER_SLIDE_STORAGE_KEY || !event.newValue) {
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
    const current = window.localStorage.getItem(PRESENTER_SLIDE_STORAGE_KEY);
    const previous = window.localStorage.getItem(PREVIOUS_PRESENTER_SLIDE_STORAGE_KEY);
    const secondPrevious = window.localStorage.getItem(SECOND_PREVIOUS_PRESENTER_SLIDE_STORAGE_KEY);
    const legacy = window.localStorage.getItem(LEGACY_PRESENTER_SLIDE_STORAGE_KEY);
    const saved = JSON.parse(current || previous || secondPrevious || legacy || "null");
    if (!window.location.hash && saved?.slideId) {
      const savedSlideId = current
        ? saved.slideId
        : previous
          ? PREVIOUS_SLIDE_ID_MAP[saved.slideId]
          : secondPrevious
            ? SECOND_PREVIOUS_SLIDE_ID_MAP[saved.slideId]
            : LEGACY_SLIDE_ID_MAP[saved.slideId];
      initialSlide = validSlide(savedSlideId);
    }
  } catch (_error) {
    initialSlide = validSlide(window.location.hash.slice(1));
  }

  showNote(initialSlide, channel ? "Waiting for deck" : "Notes only");
  channel?.postMessage({ type: "request-state" });
})();
