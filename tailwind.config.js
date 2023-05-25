import plugin from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      widephone: '480px',
      tablet: '640px',
      laptop: '1024px',
    },
    extend: {
      backgroundImage: {
        border: "url('/src/assets/images/border.webp')",
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 0px 4px var(--tw-shadow-color)',
        lg: '0 0px 8px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
}
