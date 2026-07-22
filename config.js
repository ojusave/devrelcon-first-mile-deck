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

  // Live Atlas UI shown on slide 19 for the on-stage search demo.
  atlasUrl: "https://developer-journey-atlas.onrender.com",

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

  // Counts verified against Developer Journey Atlas origin/main at 065e4fa
  // and the live data manifest generated on July 22, 2026.
  stats: {
    atlasPlatforms: "224",
    atlasSteps: "2,359",
    atlasSources: "949",
    totalGates: "1,021",
    medianGates: "4",
    namedMilestones: "74",
    demonstratedTerminals: "150",
    namedMilestoneRate: "33%",
    demonstratedTerminalRate: "67%",
    credentialRoutes: "124",
    choiceRoutes: "103",
    waitRoutes: "60",
    credentialRouteRate: "55%",
    choiceRouteRate: "46%",
    waitRouteRate: "27%",
    blockerHypotheses: "790",
    universalHypotheses: "466",
    platformHypotheses: "324",
  },

  // Contact line for the closing slide.
  contact: "Ojus Save · DevRelCon NYC · July 2026",
};
