/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "480px", // Extra small screens
        xxs: "360px", // Very small screens
        xxxs: "320px", // Ultra small screens
      },
    },
  },
  plugins: [],
};
