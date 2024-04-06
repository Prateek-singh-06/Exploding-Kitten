/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        costom: "#F7F7F8",
        525965: "#525965",
        A9ACB2: "#A9ACB2",
        "2C9CF0": "#2C9CF0",
        "292B32": "#292B32",
        "3B3E47": "#3B3E47",
        DFDFDF: "#DFDFDF",
        "818A97": "#818A97",
        "18282A": "#18282A",
        "221A2C": "#221A2C",
        mix: "rgb(31,30,43)",
      },
    },
  },
  plugins: [require("tw-elements/plugin.cjs"), require("daisyui")],
};
