const config = {
  content: [
    "./app/**/*.{js,jsx,mdx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "rgb(var(--color-cream) / <alpha-value>)",
        ivory: "rgb(var(--color-ivory) / <alpha-value>)",
        parchment: "rgb(var(--color-parchment) / <alpha-value>)",
        espresso: "rgb(var(--color-espresso) / <alpha-value>)",
        charcoal: "rgb(var(--color-charcoal) / <alpha-value>)",
        camel: "rgb(var(--color-camel) / <alpha-value>)",
        caramel: "rgb(var(--color-caramel) / <alpha-value>)",
        burgundy: "rgb(var(--color-burgundy) / <alpha-value>)",
        olive: "rgb(var(--color-olive) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "Cambria", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        editorial: "0.18em",
        loose: "0.08em",
      },
      maxWidth: {
        editorial: "88rem",
        reading: "46rem",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 700ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 500ms ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
