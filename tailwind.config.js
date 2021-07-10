module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        'dashboard': '20rem 1fr',
        'repositories': '1fr',
        'authors-requests': 'minmax(7rem, auto) 1fr 7rem 7rem',
      },
      gridTemplateRows: {
        'dashboard': 'auto-fit minmax(0, 1fr)',
        'dashboard-template': 'auto-fit minmax(0, 1fr)',
        'dashboard-layout': 'auto minmax(0, 1fr)'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
