/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#2563eb', // blue-600
          'hover': '#1d4ed8', // blue-700
          'light': '#dbeafe', // blue-100
        },
        'success': {
          DEFAULT: '#16a34a', // green-600
          'hover': '#15803d', // green-700
        },
        'danger': {
          DEFAULT: '#dc2626', // red-600
          'hover': '#b91c1c', // red-700
        },
      },
    },
  },
  plugins: [],
};
