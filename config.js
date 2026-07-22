const CONFIG = {
  // When null, slides render a labeled placeholder. When set, a QR code
  // auto-renders from the URL. No layout shift between states.
  fakegptUrl: "https://fakesaaspi.onrender.com/fakegpt",

  // When null, the dashboard slide shows a labeled placeholder frame.
  // When set, it embeds this URL as a full-bleed iframe.
  dashboardUrl: "https://fakesaaspi.onrender.com/present",

  // Real-time debrief view shown on slide 11. Keep null until its final
  // event-specific URL is ready; the slide preserves the full-size frame.
  resultsUrl: null,

  // Takeaway links. Same placeholder-to-QR behavior as fakegptUrl.
  takeaways: {
    firstmile: "https://github.com/ojusave/usecalibrate",
    fakesaaspiKit: "https://github.com/ojusave/fakesaaspi",
    comparison: "https://developer-journey-atlas.onrender.com",
    credits: "https://credits-portal-mmdm.onrender.com/claim/devrelcon",
    contact: "https://x.com/ojusave",
    careers: "https://render.com/careers?ashby_jid=4611bde4-47ac-45fc-ab56-235489e52682&utm_source=L51D6eVlVG",
  },

  // Optional countdown on the holding slide. null hides it entirely.
  trapTimerMinutes: null,

  // Counts reproduced from the frozen 205-record workshop snapshot on July 21, 2026.
  stats: {
    averageActions: "12.5",
    medianActions: "10",
    medianGates: "6",
    totalActions: "2,569",
    totalGates: "1,270",
    totalAutomaticEvents: "125",
    totalTransitions: "2,694",
    blockerHypotheses: "790",
    universalHypotheses: "466",
    platformHypotheses: "324",
  },

  // Contact line for the closing slide.
  contact: "Ojus Save · DevRelCon NYC · July 2026",
};
