import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fill-250': 'repeat(auto-fill, minmax(252px, 1fr))',
      },
      colors: {
        'border-primary': '#242424',
        'border-secondary': '#7F7F7F',
        'background-secondary': '#0a0a0a',
        'background-alert': 'rgba(0, 0, 0, 0.9)',
        'color-secondary': '#1A1A1A',
        'color-tertiary': '#888',
        '999': '#999'
      },
      height: {
        '60vh': '60vh',
        '80vh': '80vh',
        '260': '260px'
      },
      minWidth: {
        'grid-img': '560px',
        '250': '250px'
      },
      minHeight: {
        '150': '150px',
        '80vh': '80vh',
      },
      maxWidth: {
        'img': '850px',
        '350': '350px',
        '90': '90%',
        '180': '180px'
      },
      flexBasis: {
        '600': '600px',
        '800': '800px'
      },
      translate: {
        'hide': '-100%',
      },
      screens: {
        'xs': '350px'
      },
      flexGrow: {
        '999': '999'
      },
      inset: {
        'selected': '-7px',
      },
      fontSize: {
        '13': '13px',
      }
    },
  },
  plugins: [],
}
export default config
