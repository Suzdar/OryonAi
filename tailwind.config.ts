import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          50: '#fdf6fd',
          100: '#f9e8fc',
          200: '#f5d1f9',
          300: '#f0adf6',
          400: '#e45a92',
          500: '#e45a92',
          600: '#d64584',
          700: '#c23070',
          800: '#a3265c',
          900: '#5d2f77',
          950: '#3E1E68',
        },
        nebula: {
          50: '#fff5f8',
          100: '#ffecf1',
          200: '#ffd9e5',
          300: '#ffb8d1',
          400: '#ffacac',
          500: '#ffacac',
          600: '#ff8c8c',
          700: '#ff6b6b',
          800: '#e84d4d',
          900: '#cc3333',
          950: '#991f1f',
        },
        galaxy: {
          50: '#f3f0ff',
          100: '#ebe5ff',
          200: '#d9ccff',
          300: '#c7b3ff',
          400: '#b599ff',
          500: '#a380ff',
          600: '#9166ff',
          700: '#7f4dff',
          800: '#6d33ff',
          900: '#5b1aff',
          950: '#3E1E68',
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
      },
      fontFamily: {
        sans: ['Ubuntu', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #5D2F77 0%, #E45A92 100%)',
        'nebula-gradient': 'linear-gradient(135deg, #E45A92 0%, #FFACAC 100%)',
        'galaxy-gradient': 'linear-gradient(135deg, #3E1E68 0%, #5D2F77 100%)',
        'dark-cosmic': 'linear-gradient(135deg, #3E1E68 0%, #5D2F77 50%, #E45A92 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
