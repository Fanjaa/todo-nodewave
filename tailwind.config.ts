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
        blue: '#50B5FF',
        blueButton: '#0062FF',
        fontButton: '#FAFAFB',
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
        roboto: ['var(--font-roboto)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        'loginForm': '3px -5px 40px 0px #CDCDD41A',
      },
      backgroundImage: {
        'two-color': 'linear-gradient(185deg, #ffffff 50%, #FAFAFB 50%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
