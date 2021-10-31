module.exports = {
  purge: [   
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "logo-blue": "#14279B",
        "deep-blue": "#3D56B2",
        "lite-blue": "#5C7AEA",
        "gray-custom":"#E6E6E6",
      },
      fontSize: {
        "text-xxs":"0.5rem",
        "text-xxxs":"0.25rem"
      },
      minWidth: {
        "6xl":"72rem/* 1152px */",
        "7xl": "80rem/* 1280px */"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
