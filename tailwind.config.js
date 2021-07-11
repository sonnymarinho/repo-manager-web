module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        'dashboard': '20rem 1fr',
        'authors-requests': 'minmax(14rem, auto) 1fr 7rem 7rem',
        'add-repository': 'minmax(2rem, 9rem) 2rem 1fr'
      },
      gridTemplateRows: {
        'dashboard-layout': 'auto minmax(0, 1fr)'
      },
      rotate: {
        '-85': '-85deg'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
