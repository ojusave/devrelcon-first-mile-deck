const CONFIG = {
  // When null, slides render a labeled placeholder. When set, a QR code
  // auto-renders from the URL. No layout shift between states.
  fakegptUrl: "https://fakesaaspi.onrender.com",

  // When null, the dashboard slide shows a labeled placeholder frame.
  // When set, it embeds this URL as a full-bleed iframe.
  dashboardUrl: "https://fakesaaspi.onrender.com/present",

  // Takeaway links. Same placeholder-to-QR behavior as fakegptUrl.
  takeaways: {
    firstmile: "https://devrelcon-research.onrender.com/#firstmile",
    fakesaaspiKit: "https://devrelcon-research.onrender.com/#fakesaaspi",
    comparison: "https://devrelcon-research.onrender.com",
  },

  // Optional countdown on the holding slide. null hides it entirely.
  trapTimerMinutes: null,

  // Coverage counts generated from the published research dataset.
  stats: [
    { value: "205", label: "platforms with one documented first-success route" },
    { value: "2,694", label: "transitions in the selected routes" },
    { value: "1,121", label: "official sources inspected" },
  ],

  // Contact line for the closing slide.
  contact: "Ojus Save · DevRelCon NYC · July 2026",
};
