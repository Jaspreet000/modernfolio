/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#0F0F1A",
        secondary: "#14142B",
        accent: {
          purple: "#6B2FD9",
          pink: "#FF2E93",
          cyan: "#00F0FF",
          violet: "#8A2BE2",
        },
        neon: {
          purple: "#B026FF",
          pink: "#FF10F0",
          blue: "#00FFFF",
          green: "#39FF14",
        },
        background: {
          DEFAULT: "#F7FAFC",
          dark: "#EDF2F7",
        },
      },
      animation: {
        glow: "glow 2s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        gridLineX: "gridLineX 3s linear infinite",
        gridLineY: "gridLineY 3s linear infinite",
        gridPulse: "gridPulse 3s ease-in-out infinite"
      },
      keyframes: {
        glow: {
          "0%": {
            textShadow: "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #B026FF",
          },
          "100%": {
            textShadow: "0 0 20px #fff, 0 0 30px #FF10F0, 0 0 40px #00FFFF",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        gridLineX: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" }
        },
        gridLineY: {
          "0%": { backgroundPosition: "0 200%" },
          "100%": { backgroundPosition: "0 -200%" }
        },
        gridPulse: {
          "0%, 100%": { opacity: 0.1 },
          "50%": { opacity: 0.2 }
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "cyber-grid":
          'linear-gradient(rgba(15, 15, 26, 0.9), rgba(15, 15, 26, 0.9)), url("/grid-pattern.svg")',
      },
      boxShadow: {
        neon: '0 0 5px theme("colors.neon.purple"), 0 0 20px theme("colors.neon.pink")',
        glow: "0 0 10px rgba(186, 37, 255, 0.5), 0 0 20px rgba(255, 16, 240, 0.3)",
        "inner-lg": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
