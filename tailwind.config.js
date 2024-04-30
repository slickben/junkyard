/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'content/**/*.md'
  ],
  theme: {
    extend: {
      backgroundImage: {
        "login-image":
          'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(31, 156, 0, 1)), url("/img/background.jpg")',
        "login-image2": 'url("/img/login-background.jpg")',
        "login-image3": 'url("/img/background.jpg")',
        "login-image4": 'url("/img/rectangle.png")',
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
        },
      },

      screens: {
        // 3X large screens
        custom: "1440px", // Custom screen size
      },

      colors: {
        primary: "#33FF00",
        secondary: "#1F9C00",
        unpaid: "#EB5757",
        error: "#FF0000",
        radialGradient: "#FFFFFFCC",
        textGray: "#828282",
        fakeWhite: "FEFEFE",
        dahboardText: "#515151",
        collectionBtn: "#F2F2F2",
        collectionText: "#A5A5A5",
        textGray: "#BDBDBD",
        textGray2: "#979797",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

