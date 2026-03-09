/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './turnos_app/templates/**/*.html',
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      body: ["Roboto", "sans-serif"],
      mono: ["ui-monospace", "monospace"],
    },
    extend: {},
  },
  plugins: [],
}
