import {tailwindcss} from '@tailwindcss/vite';
import type {Config} from 'tailwindcss';

const config: Config = {
  prefix: 'tw-',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: {
          600: '#B83700',
          500: '#E7620A',
          400: '#F89A00',
          300: '#FFDCA2',
          50: '#FFFBEF',
        },
        green: {
          light: '#9EF9E8',
          main: '#03D8B1',
          dark: '#00A083',
        },
        purple: {
          light: '#DBB5FF',
          main: '#B05BFF',
          dark: '#813DC1',
        },
        sky: {
          light: '#9DE8FB',
          main: '#00BDEC',
          dark: '#10819C',
        },
        pink: {
          light: '#FFA7B0',
          main: '#F25267',
          dark: '#AA2E3F',
        },
        mono: {
          900: '#0C0A09',
          800: '#1C1917',
          700: '#292524',
          600: '#44403B',
          500: '#57534D',
          400: '#79716B',
          300: '#A6A09B',
          200: '#E7E5E4',
          100: '#F5F5F4',
          '050': '#FAFAF9',
        },
      },
    },
  },
  plugins: [],
};

export default config;
