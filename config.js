const CONFIG = {
  // When null, slides render a labeled placeholder. When set, a QR code
  // auto-renders from the URL. No layout shift between states.
  fakegptUrl: null,

  // When null, the dashboard slide shows a labeled placeholder frame.
  // When set, it embeds this URL as a full-bleed iframe.
  dashboardUrl: null,

  // Takeaway links. Same placeholder-to-QR behavior as fakegptUrl.
  takeaways: {
    firstmile: null,       // open source instrumentation kit repo
    fakesaaspiKit: null,   // forkable fake-platform frontend repo
    comparison: null,      // comparison site (may become a waitlist page)
  },

  // Optional countdown on the holding slide. null hides it entirely.
  trapTimerMinutes: null,

  // Research stats. Placeholder values ship as written. The presenter
  // replaces these with real numbers from the 200-platform research.
  stats: [
    { value: "XX%", label: "placeholder: drop before the first successful API call" },
    { value: "XX%", label: "placeholder: never finish signup" },
    { value: "X of Y", label: "placeholder: platforms requiring a card before any value" },
  ],

  // Contact line for the closing slide.
  contact: "placeholder: name, handle, url",
};
