import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        backgroundPrimary: "#FAFAFB",
        backgroundSecondary: '#E6E6E6',
        blue: '#50B5FF',
        blueButton: '#0062FF',
        redButton: '#FC5A5A',
        greenButton: '#70DE54',
        fontButton: '#FAFAFB',
        blueCustom: '#1E90FF',
        fontRegister: '#44444F'
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
        roboto: ['var(--font-roboto)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        rubik: ['var(--font-rubik)', 'sans-serif'],
      },
      boxShadow: {
        'loginForm': '3px -5px 40px 0px #CDCDD41A',
        'todoForm': '24px 24px 48px 0px #0000001F',
      },
      backgroundImage: {
        'two-color': 'linear-gradient(185deg, #ffffff 50%, #FAFAFB 50%)',
      },
      clipPath: {
        curved: 'path("M 0 0 Q 50% 100px 100% 0 L 100% 100% L 0 100% Z")',
      },
    },
  },
  plugins: [],
} satisfies Config;
