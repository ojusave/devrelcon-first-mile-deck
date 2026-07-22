(function () {
  "use strict";

  const NOTES_STORAGE_KEY = "devrelcon.presenter.notes.v9";
  const PREVIOUS_NOTES_STORAGE_KEY = "devrelcon.presenter.notes.v8";
  const SECOND_PREVIOUS_NOTES_STORAGE_KEY = "devrelcon.presenter.notes.v7";
  const THIRD_PREVIOUS_NOTES_STORAGE_KEY = "devrelcon.presenter.notes.v6";
  const FOURTH_PREVIOUS_NOTES_STORAGE_KEY = "devrelcon.presenter.notes.v5";
  const FIFTH_PREVIOUS_NOTES_STORAGE_KEY = "devrelcon.presenter.notes.v4";
  const SIXTH_PREVIOUS_NOTES_STORAGE_KEY = "devrelcon.presenter.notes.v3";
  const SEVENTH_PREVIOUS_NOTES_STORAGE_KEY = "devrelcon.presenter.notes.v2";
  const LEGACY_NOTES_STORAGE_KEY = "devrelcon.presenter.notes.v1";
  const PRESENTER_SLIDE_STORAGE_KEY = "devrelcon.presenter.slide.v8";
  const PREVIOUS_PRESENTER_SLIDE_STORAGE_KEY = "devrelcon.presenter.slide.v7";
  const SECOND_PREVIOUS_PRESENTER_SLIDE_STORAGE_KEY = "devrelcon.presenter.slide.v6";
  const THIRD_PREVIOUS_PRESENTER_SLIDE_STORAGE_KEY = "devrelcon.presenter.slide.v5";
  const FOURTH_PREVIOUS_PRESENTER_SLIDE_STORAGE_KEY = "devrelcon.presenter.slide.v4";
  const FIFTH_PREVIOUS_PRESENTER_SLIDE_STORAGE_KEY = "devrelcon.presenter.slide.v3";
  const SIXTH_PREVIOUS_PRESENTER_SLIDE_STORAGE_KEY = "devrelcon.presenter.slide.v2";
  const LEGACY_PRESENTER_SLIDE_STORAGE_KEY = "devrelcon.presenter.slide";
  const ATLAS_INSERTION_SLIDE_ID_MAP = {
    1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8,
    9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15,
    16: 16, 17: 17, 18: 18, 19: 20, 20: 21, 21: 22,
    22: 23, 23: 24, 24: 25, 25: 26,
  };
  const SLIDE_22_REMOVAL_MAP = {
    1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8,
    9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15,
    16: 16, 17: 17, 18: 18, 19: 19, 20: 20, 21: 21,
    23: 22, 24: 23, 25: 24, 26: 25,
  };
  const PREVIOUS_SLIDE_ID_MAP = {
    1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8,
    9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15,
    16: 16, 17: 17, 18: 18, 19: 19,
    20: 21, 21: 22, 22: 23, 23: 24, 24: 25,
  };
  const SECOND_PREVIOUS_SLIDE_ID_MAP = {
    1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8,
    9: 9, 10: 10, 11: 11,
    13: 12, 14: 13, 15: 14, 16: 15, 17: 16, 18: 17,
    19: 18, 20: 19, 21: 21, 22: 22, 23: 23, 24: 24, 25: 25,
  };
  const THIRD_PREVIOUS_SLIDE_ID_MAP = {
    1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8,
    9: 9, 10: 10, 11: 11,
    13: 12, 14: 13, 15: 14, 16: 15, 17: 16, 18: 17,
    19: 18, 20: 19, 21: 21, 23: 24, 24: 25,
  };
  const FOURTH_PREVIOUS_SLIDE_ID_MAP = {
    1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8,
    9: 9, 10: 10, 11: 11,
    13: 12, 14: 13, 15: 14, 16: 15, 17: 16, 18: 17,
    19: 18, 20: 19, 21: 21, 22: 22, 23: 25,
  };
  const LEGACY_SLIDE_ID_MAP = {
    1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6,
    21: 7, 7: 8, 12: 9, 8: 10, 13: 11, 11: 12,
    14: 13, 15: 14, 23: 15, 24: 16, 25: 17, 19: 18,
    17: 19, 16: 22, 18: 23, 20: 25,
  };
  const channel = "BroadcastChannel" in window ? new BroadcastChannel("devrelcon-deck") : null;
  const slideElement = document.querySelector("[data-note-slide]");
  const purposeElement = document.querySelector("[data-note-purpose]");
  const scriptElement = document.querySelector("[data-note-script]");
  const roomCueElement = document.querySelector("[data-note-room-cue]");
  const timingElement = document.querySelector("[data-note-timing]");
  const fallbackElement = document.querySelector("[data-note-fallback]");
  const evidenceBoundaryElement = document.querySelector("[data-note-evidence-boundary]");
  const sourcesElement = document.querySelector("[data-note-sources]");
  const metadataElement = document.querySelector(".metadata");
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

  function normalizeNote(note, slideId) {
    const defaults = SPEAKER_NOTES[slideId];
    const previousScript = [note?.say, note?.transition].filter(Boolean).join("\n\n");
    return {
      purpose: note?.purpose ?? defaults.purpose,
      script: note?.script ?? (previousScript || defaults.script),
      roomCue: note?.roomCue ?? note?.watch ?? defaults.roomCue,
      timing: note?.timing ?? defaults.timing,
      fallback: note?.fallback ?? defaults.fallback,
      evidenceBoundary: note?.evidenceBoundary ?? defaults.evidenceBoundary,
      sources: note?.sources ?? defaults.sources,
    };
  }

  function remapSlideId(slideId, ...slideIdMaps) {
    let nextId = Number(slideId);
    for (const slideIdMap of slideIdMaps.filter(Boolean)) {
      nextId = slideIdMap[nextId];
      if (!Number.isFinite(nextId)) {
        return undefined;
      }
    }
    return nextId;
  }

  function migrateNotes(notes, ...slideIdMaps) {
    if (!notes || typeof notes !== "object" || Array.isArray(notes)) {
      return {};
    }
    const migrated = {};
    for (const [storedId, note] of Object.entries(notes)) {
      const nextId = remapSlideId(storedId, ...slideIdMaps);
      if (SPEAKER_ORDER.includes(nextId) && note && typeof note === "object" && !Array.isArray(note)) {
        migrated[nextId] = normalizeNote(note, nextId);
      }
    }
    return migrated;
  }

  function saveMigration(migrated) {
    if (Object.keys(migrated).length > 0) {
      window.localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(migrated));
    }
    return migrated;
  }

  function readSavedNotes() {
    try {
      const current = window.localStorage.getItem(NOTES_STORAGE_KEY);
      if (current) {
        const stored = JSON.parse(current);
        return migrateNotes(stored);
      }

      const previous = JSON.parse(window.localStorage.getItem(PREVIOUS_NOTES_STORAGE_KEY) || "{}");
      const previousMigration = migrateNotes(previous, ATLAS_INSERTION_SLIDE_ID_MAP);
      if (Object.keys(previousMigration).length > 0) {
        return saveMigration(previousMigration);
      }

      const secondPrevious = JSON.parse(window.localStorage.getItem(SECOND_PREVIOUS_NOTES_STORAGE_KEY) || "{}");
      const secondPreviousMigration = migrateNotes(secondPrevious, SLIDE_22_REMOVAL_MAP, ATLAS_INSERTION_SLIDE_ID_MAP);
      if (Object.keys(secondPreviousMigration).length > 0) {
        return saveMigration(secondPreviousMigration);
      }

      const thirdPrevious = JSON.parse(window.localStorage.getItem(THIRD_PREVIOUS_NOTES_STORAGE_KEY) || "{}");
      const thirdPreviousMigration = migrateNotes(thirdPrevious, PREVIOUS_SLIDE_ID_MAP, SLIDE_22_REMOVAL_MAP, ATLAS_INSERTION_SLIDE_ID_MAP);
      if (Object.keys(thirdPreviousMigration).length > 0) {
        return saveMigration(thirdPreviousMigration);
      }

      const fourthPrevious = JSON.parse(window.localStorage.getItem(FOURTH_PREVIOUS_NOTES_STORAGE_KEY) || "{}");
      const fourthPreviousMigration = migrateNotes(fourthPrevious, PREVIOUS_SLIDE_ID_MAP, SLIDE_22_REMOVAL_MAP, ATLAS_INSERTION_SLIDE_ID_MAP);
      if (Object.keys(fourthPreviousMigration).length > 0) {
        return saveMigration(fourthPreviousMigration);
      }

      const fifthPrevious = JSON.parse(window.localStorage.getItem(FIFTH_PREVIOUS_NOTES_STORAGE_KEY) || "{}");
      const fifthPreviousMigration = migrateNotes(fifthPrevious, SECOND_PREVIOUS_SLIDE_ID_MAP, SLIDE_22_REMOVAL_MAP, ATLAS_INSERTION_SLIDE_ID_MAP);
      if (Object.keys(fifthPreviousMigration).length > 0) {
        return saveMigration(fifthPreviousMigration);
      }

      const sixthPrevious = JSON.parse(window.localStorage.getItem(SIXTH_PREVIOUS_NOTES_STORAGE_KEY) || "{}");
      const sixthPreviousMigration = migrateNotes(sixthPrevious, THIRD_PREVIOUS_SLIDE_ID_MAP, SLIDE_22_REMOVAL_MAP, ATLAS_INSERTION_SLIDE_ID_MAP);
      if (Object.keys(sixthPreviousMigration).length > 0) {
        return saveMigration(sixthPreviousMigration);
      }

      const seventhPrevious = JSON.parse(window.localStorage.getItem(SEVENTH_PREVIOUS_NOTES_STORAGE_KEY) || "{}");
      const seventhPreviousMigration = migrateNotes(seventhPrevious, FOURTH_PREVIOUS_SLIDE_ID_MAP, SLIDE_22_REMOVAL_MAP, ATLAS_INSERTION_SLIDE_ID_MAP);
      if (Object.keys(seventhPreviousMigration).length > 0) {
        return saveMigration(seventhPreviousMigration);
      }

      const legacy = JSON.parse(window.localStorage.getItem(LEGACY_NOTES_STORAGE_KEY) || "{}");
      if (!legacy || typeof legacy !== "object" || Array.isArray(legacy)) {
        return {};
      }

      return saveMigration(migrateNotes(legacy, LEGACY_SLIDE_ID_MAP, SLIDE_22_REMOVAL_MAP, ATLAS_INSERTION_SLIDE_ID_MAP));
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
      script: scriptElement.value,
      roomCue: roomCueElement.value,
      timing: timingElement.value,
      fallback: fallbackElement.value,
      evidenceBoundary: evidenceBoundaryElement.value,
      sources: sourcesElement.value,
    };
  }

  function notesMatch(left, right) {
    return left.purpose === right.purpose
      && left.script === right.script
      && left.roomCue === right.roomCue
      && left.timing === right.timing
      && left.fallback === right.fallback
      && left.evidenceBoundary === right.evidenceBoundary
      && left.sources === right.sources;
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
    scriptElement.value = note.script;
    roomCueElement.value = note.roomCue;
    timingElement.value = note.timing;
    fallbackElement.value = note.fallback;
    evidenceBoundaryElement.value = note.evidenceBoundary;
    sourcesElement.value = note.sources;
    for (const field of [purposeElement, scriptElement, roomCueElement, timingElement, fallbackElement, evidenceBoundaryElement, sourcesElement]) {
      field.scrollTop = 0;
    }
    metadataElement.scrollTop = 0;
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

  for (const field of [purposeElement, scriptElement, roomCueElement, timingElement, fallbackElement, evidenceBoundaryElement, sourcesElement]) {
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
    const thirdPrevious = window.localStorage.getItem(THIRD_PREVIOUS_PRESENTER_SLIDE_STORAGE_KEY);
    const fourthPrevious = window.localStorage.getItem(FOURTH_PREVIOUS_PRESENTER_SLIDE_STORAGE_KEY);
    const fifthPrevious = window.localStorage.getItem(FIFTH_PREVIOUS_PRESENTER_SLIDE_STORAGE_KEY);
    const sixthPrevious = window.localStorage.getItem(SIXTH_PREVIOUS_PRESENTER_SLIDE_STORAGE_KEY);
    const legacy = window.localStorage.getItem(LEGACY_PRESENTER_SLIDE_STORAGE_KEY);
    const saved = JSON.parse(current || previous || secondPrevious || thirdPrevious || fourthPrevious || fifthPrevious || sixthPrevious || legacy || "null");
    if (!window.location.hash && saved?.slideId) {
      const savedSlideId = current
        ? saved.slideId
        : previous
          ? remapSlideId(saved.slideId, ATLAS_INSERTION_SLIDE_ID_MAP)
          : secondPrevious
            ? remapSlideId(saved.slideId, SLIDE_22_REMOVAL_MAP, ATLAS_INSERTION_SLIDE_ID_MAP)
            : thirdPrevious
              ? remapSlideId(saved.slideId, PREVIOUS_SLIDE_ID_MAP, SLIDE_22_REMOVAL_MAP, ATLAS_INSERTION_SLIDE_ID_MAP)
              : fourthPrevious
                ? remapSlideId(saved.slideId, SECOND_PREVIOUS_SLIDE_ID_MAP, SLIDE_22_REMOVAL_MAP, ATLAS_INSERTION_SLIDE_ID_MAP)
                : fifthPrevious
                  ? remapSlideId(saved.slideId, THIRD_PREVIOUS_SLIDE_ID_MAP, SLIDE_22_REMOVAL_MAP, ATLAS_INSERTION_SLIDE_ID_MAP)
                  : sixthPrevious
                    ? remapSlideId(saved.slideId, FOURTH_PREVIOUS_SLIDE_ID_MAP, SLIDE_22_REMOVAL_MAP, ATLAS_INSERTION_SLIDE_ID_MAP)
                    : remapSlideId(saved.slideId, LEGACY_SLIDE_ID_MAP, SLIDE_22_REMOVAL_MAP, ATLAS_INSERTION_SLIDE_ID_MAP);
      initialSlide = validSlide(savedSlideId);
    }
  } catch (_error) {
    initialSlide = validSlide(window.location.hash.slice(1));
  }

  showNote(initialSlide, channel ? "Waiting for deck" : "Notes only");
  channel?.postMessage({ type: "request-state" });
})();
