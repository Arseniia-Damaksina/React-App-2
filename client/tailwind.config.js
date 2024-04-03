/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      xxl: "1536px",
      // => @media (min-width: 1536px) { ... }
    },

    extend: {
      colors: {
        background: "#EEF5F9",
        primary: "#FF4252",
        primaryVariant: "#FF6F51",
        secondary: "#14375A",
        secondaryVariant: "#5C7792",
        tertiary: "#6BBEB9",
        coolBlack: "#3A3C3D",
        tertiaryLight: "#E3F4F4",
        yellowPriority: "#F6F7C4",
        yellowSecondary: "#FFC700",
        closed: "#F5CFD6"
      },
      width: {
        "9/10": "95%",
      },
      height: {
        "9/10": "91%",
        "screen/90": "90vh",
      },
      maxWidth: {
        1: "100%",
        "3/4": "75%",
        "1/2": "50%",
        "1/4": "25%",
        "1/5": "20%",
        "1/3": "30%",
      },
      maxHeight: {
        1: "100%",
        "3/4": "75%",
        "1/2": "50%",
        "1/4": "25%",
        "1/5": "20%",
        "1/6": "10%",
      },
      minWidth: {
        1: "100%",
        "3/4": "75%",
        "1/2": "50%",
        "1/4": "25%",
        "1/5": "20%",
        "1/3": "33%"
      },
      minHeight: {
        "9/10": "90vh",
        "3/4": "75vh"
      }
    },
  },
  plugins: [],
};

//*  GRADIENT

// Tertiary gradient = bg-gradient-to-r from-[#6BBEB9] to-[#14375A]
// Secondary gradient = bg-gradient-to-r from-[#6F88A1] to-[#14375A]
// Try one = bg-gradient-to-r from-[#45BCB7] via-[#064566] via-[#1C373F] via-[#733C47] to-[#E73F4E]
// Try two = bg-gradient-to-r from-[#FF4353] via-[#803D57] to-[#14375A]
// Try three = bg-gradient-to-r from-[#88c9cd] via-[#7ba3b4] via-[#8c9ca0] via-[#b79ca2] to-[#dc9ba4]
