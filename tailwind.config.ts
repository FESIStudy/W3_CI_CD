import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          800: "#1E293B",
          900: "#0F172A",
        },
        violet: {
          100: "#EDE9FE",
          600: "#7C3AED",
        },
        rose: {
          500: "#F43F5E",
        },
        lime: {
          300: "#BEF264",
        },
        amber: {
          800: "#92400E",
        },
      },
      fontFamily: {
        "nanumsquare-bold": ['"NanumSquareBold"', "sans-serif"],
        "nanumsquare-regular": ['"NanumSquareRegular"', "sans-serif"],
      },
      fontSize: {
        "20px": ["20px", "22.7px"],
        "18px": ["18px", "20.43px"],
        "16px": ["16px", "18.16px"],
      },

      boxShadow: {
        "2px-slate-900": "2px 2px 0px #0F172A",
      },

      // 반응형 BreakPoints
      screens: {
        tablet: "480px",
        pc: "768px",
      },
    },
  },
  plugins: [],
} satisfies Config;
