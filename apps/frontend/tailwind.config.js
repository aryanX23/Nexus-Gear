/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl":
          "20px 15px 15px -15px rgb(109 40 217 / var(--tw-border-opacity))",
      },
    },
  },
  plugins: [],
};
