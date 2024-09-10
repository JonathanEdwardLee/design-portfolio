/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        copper: {
          100: '#ffd0b0',
          300: '#e6a972',
        },
        'neon-cyan': '#0ff',
      },
      backgroundImage: {
        'wood-pattern': "url('/images/woodBoard1024_2.png')",
      },
    },
  },
  plugins: [],
}

