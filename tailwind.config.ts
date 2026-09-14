import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "#05070C",
          soft: "#0A0E18",
          raised: "#10141F",
        },
        signal: {
          cyan: "#4DE8E0",
          violet: "#8B7CFA",
          blue: "#4F7CFF",
          amber: "#F5A855",
          rose: "#F17CA6",
          magenta: "#C15FE8",
        },
        midnight: "#0B1024",
        mist: {
          DEFAULT: "#A9B2C3",
          bright: "#E7ECF7",
        },
        line: "rgba(167, 182, 214, 0.14)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-lines":
          "linear-gradient(rgba(167,182,214,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(167,182,214,0.06) 1px, transparent 1px)",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(77, 232, 224, 0.35)",
        "glow-violet": "0 0 40px -8px rgba(139, 124, 250, 0.35)",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(3%, -4%, 0) scale(1.08)" },
        },
        driftReverse: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(-3%, 4%, 0) scale(1.05)" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        floatParticle: {
          "0%, 100%": { transform: "translateY(0) translateX(0)", opacity: "0.2" },
          "50%": { transform: "translateY(-24px) translateX(8px)", opacity: "0.8" },
        },
        floatGlass: {
          "0%, 100%": { transform: "translate3d(0,0,0) rotate(0deg)" },
          "50%": { transform: "translate3d(-2%, -3%, 0) rotate(4deg)" },
        },
        ribbonFlow: {
          "0%, 100%": { strokeDashoffset: "0", opacity: "0.55" },
          "50%": { strokeDashoffset: "-40", opacity: "0.85" },
        },
        pulseline: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        drift: "drift 18s ease-in-out infinite",
        "drift-reverse": "driftReverse 22s ease-in-out infinite",
        "spin-slow": "spinSlow 60s linear infinite",
        float: "floatParticle 6s ease-in-out infinite",
        "float-glass": "floatGlass 14s ease-in-out infinite",
        "ribbon-flow": "ribbonFlow 8s ease-in-out infinite",
        pulseline: "pulseline 2.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
