import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cosmic: {
          50: '#fdf6fd',
          100: '#f9e8fc',
          200: '#f5d1f9',
          300: '#ead4f0',
          400: '#d89cc7',
          500: '#d89cc7',
          600: '#c87da8',
          700: '#b45d8e',
          800: '#9d4973',
          900: '#6b4d66',
          950: '#4a3a52',
        },
        nebula: {
          50: '#fff5f8',
          100: '#ffecf1',
          200: '#ffd9e5',
          300: '#f5bcd1',
          400: '#edb3c3',
          500: '#edb3c3',
          600: '#e599b0',
          700: '#d67f9d',
          800: '#c25f82',
          900: '#a34966',
          950: '#7a364a',
        },
        galaxy: {
          50: '#f3f0ff',
          100: '#ebe5ff',
          200: '#d9ccff',
          300: '#dcc9f5',
          400: '#cdb5ed',
          500: '#cdb5ed',
          600: '#b99ce0',
          700: '#a583d3',
          800: '#916ac6',
          900: '#6d4f94',
          950: '#4a3a68',
        },
        dark: {
          50: '#18181b',
          100: '#27272a',
          200: '#3f3f46',
          300: '#52525b',
          400: '#71717a',
          500: '#a1a1aa',
          600: '#d4d4d8',
          700: '#e4e4e7',
          800: '#f4f4f5',
          900: '#fafafa',
        },
        'dark-bg': '#1F1D24',
      },
      fontFamily: {
        sans: ['Ubuntu', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #6b4d66 0%, #d89cc7 100%)',
        'nebula-gradient': 'linear-gradient(135deg, #d89cc7 0%, #edb3c3 100%)',
        'galaxy-gradient': 'linear-gradient(135deg, #4a3a68 0%, #6b4d66 100%)',
        'dark-cosmic': 'linear-gradient(135deg, #4a3a68 0%, #6b4d66 50%, #d89cc7 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
