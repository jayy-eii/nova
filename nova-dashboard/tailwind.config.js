/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#08080D",
          100: "#0C0C13",
          200: "#111118",
          300: "#16161F",
          400: "#1C1C27",
        },
        line: "rgba(255,255,255,0.07)",
        ink: {
          DEFAULT: "#F3F3F7",
          soft: "#B9B9C6",
          faint: "#7B7B8A",
        },
        iris: {
          DEFAULT: "#6E56F8",
          50: "#EFEBFF",
          400: "#8B76FA",
          500: "#6E56F8",
          600: "#5540DE",
          700: "#3F2CB0",
        },
        jade: {
          DEFAULT: "#1FE0C2",
          500: "#1FE0C2",
          600: "#14B39A",
        },
        amber: {
          DEFAULT: "#FFB454",
        },
        coral: {
          DEFAULT: "#FF6B7A",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      backgroundImage: {
        "mesh-1":
          "radial-gradient(60% 50% at 15% 10%, rgba(110,86,248,0.20) 0%, rgba(110,86,248,0) 60%), radial-gradient(50% 40% at 90% 20%, rgba(31,224,194,0.14) 0%, rgba(31,224,194,0) 60%)",
        "card-sheen":
          "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 40%)",
      },
      boxShadow: {
        panel: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 50px -20px rgba(0,0,0,0.6)",
        glow: "0 0 0 1px rgba(110,86,248,0.4), 0 8px 30px -8px rgba(110,86,248,0.5)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
