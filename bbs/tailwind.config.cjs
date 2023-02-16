module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
  corePlugins: {
    // use with mui
    preflight: false,
  },
  important: '#root',
}