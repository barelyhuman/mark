module.exports = {
  purge: {
    enabled: true,
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    safelist: {
      deep: [/hljs-/],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
