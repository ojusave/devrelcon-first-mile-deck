const CONFIG = {
  // When null, slides render a labeled placeholder. When set, a QR code
  // auto-renders from the URL. No layout shift between states.
  fakegptUrl: "https://fakesaaspi.onrender.com",

  // When null, the dashboard slide shows a labeled placeholder frame.
  // When set, it embeds this URL as a full-bleed iframe.
  dashboardUrl: "https://fakesaaspi.onrender.com/present",

  // Takeaway links. Same placeholder-to-QR behavior as fakegptUrl.
  takeaways: {
    firstmile: "https://github.com/ojusave/firstmile",
    fakesaaspiKit: "https://github.com/ojusave/fakesaaspi",
    comparison: "https://devrelcon-research.onrender.com",
  },

  // Optional countdown on the holding slide. null hides it entirely.
  trapTimerMinutes: null,

  // Counts reproduced from the research repositories on July 21, 2026.
  stats: {
    selectionPrimary: "151 / 205",
    selectionPolicy: "151",
    selectionDocs: "54",
    selectionSensitivity: "Sensitivity: 82 / 136 after excluding 69 compact re-researched records",
    boundaries: [
      { value: "83 / 205", label: "routes with an explicitly named first-success milestone" },
      { value: "122 / 205", label: "routes with a demonstrated terminal state" },
    ],
    ambiguity: [
      { value: "11", label: "universal cause families" },
      { value: "200", label: "distinct universal candidate reasons before one follow-up question" },
      { value: "0 / 790", label: "reason cards currently eligible to report as a diagnosed cause" },
    ],
  },

  // Contact line for the closing slide.
  contact: "Ojus Save · DevRelCon NYC · July 2026",
};
