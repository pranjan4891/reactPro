/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('daisyui')],
  daisyui: {
    themes: ['light'],
  },
  variants: {
    extend: {
      outline: ['focus'], // Extend the focus variant for outline
    },
  },
};
