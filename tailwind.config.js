/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    fontFamily: {
      "jet-brains": ["JetBrains Mono", "monospace"],
    },
    extend: {
      colors: {
        "green-custom": "#A4FFAF",
      },
    },
    plugins: [],
  },
};
