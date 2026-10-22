/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#FAF7F2',
        paperLight: '#FDFBF7',
        paperCard: '#FFFFFF',
        terracotta: {
          50: '#FDF6F3',
          100: '#FAEAE3',
          200: '#F5D4C4',
          300: '#EEB197',
          400: '#DE7E56',
          500: '#C85A32',
          600: '#B54924',
          700: '#963919',
          800: '#7B2F17',
          900: '#652917',
        },
        emeraldBrand: {
          50: '#F0F7F4',
          100: '#DEEEE7',
          200: '#BEDECF',
          300: '#94C6B1',
          400: '#64A68E',
          500: '#3D866E',
          600: '#2A6B56',
          700: '#1F5243',
          800: '#1A4337',
          900: '#15382E',
        },
        brand: {
          50: '#FAF7F2',
          100: '#F5EFEB',
          200: '#EBDEC8',
          300: '#DEC59E',
          400: '#CCA36D',
          500: '#B88647',
          600: '#9E6D35',
          700: '#7F5229',
          800: '#684325',
          900: '#553721',
        },
        accent: {
          50: '#FDF6F3',
          100: '#FAEAE3',
          200: '#F5D4C4',
          500: '#C85A32',
          600: '#B54924',
          700: '#963919',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
