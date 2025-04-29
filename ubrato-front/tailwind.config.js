/** @type {import('tailwindcss').Config} */

import { nextui } from '@nextui-org/react';

export default {
  content: [
    './index.html', './src/**/*.{js,ts,jsx,tsx}',
    // "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#0084FF",
        "light-gray": "#ECF0F3",
      }
    },
  },
  plugins: [
    // nextui()
  ],
};
