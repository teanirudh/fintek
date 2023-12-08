/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{html,js,jsx,tsx}",
  "./out/renderer/index.html",
];
export const theme = { extend: {} };
export const plugins = [require("tailwindcss"), require("autoprefixer")];
