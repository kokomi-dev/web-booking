import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        yellow_main: "#FFB700",
        blue_main: "#003B96",
        blue_main_sub: "#006CE4",
        blue_sub: "#1E50A0",
        black_main: "#111",
        green_main: "#018235",
        black_sub: "#4C4C4C",
        black_sub_2: "#595959",
        error_color: "#DB0200",
      },
      // backgroundImage: {
      // 	bannerfix: 'url('../assets/images/banner2.jpg')',
      // 	bannerfix_hotel: 'url('../assets/images/banner-hotel.jpg')'
      // },
      backgroundColor: {
        bg_primary_main: "#003B96",
        bg_primary_active: "#1E50A0",
        bg_primary_hover: "#F1F6FE",
        bg_primary_blue_sub: "#006CE4",
        bg_primary_blue_sub2: "#F1F6FE",

        bg_primary_yellow: "#FFB700",
        bg_primary_green: "#018235",
        bg_primary_white: "#f0f0f0",
        bg_black_sub: "#F5F5F5",
        sub: "#f0f0f0",
      },
      borderRadius: {
        "8": "8px",
        "14": "14px",
        "24": "24px",
      },
      borderWidth: {
        "1": "1px",
        "0.5": "0.5px",
        "1.2": "1.2px",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "typing ": {
          from: {
            width: "0%",
          },
          to: {
            width: "100%",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 1s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        typing: "typing 1s infinite",
      },
      gridTemplateColumns: {
        "layout-2": "65% 35%",
        "layout-3": "35% 65%",
        "layout-4": "25% 75%",
      },
      fontSize: {
        smallest: "0.82rem",
        small: "0.92rem",
        normal: "1rem",
        "normal+": "1.1rem",
        medium: "1.3rem",
        large: "1.45rem",
        largest: "2.2rem",
      },
      padding: {},
      margin: {},
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({
      addUtilities,
    }: {
      addUtilities: (utilities: object, variants?: string[]) => void;
    }) {
      const newUtilities = {
        ".container-padding": {
          center: true,
          paddingLeft: "0.8rem", // tương đương với px-4
          paddingRight: "0.8rem", // tương đương với px-4
          "@screen sm": {
            paddingLeft: "2rem", // sm:px-6
            paddingRight: "2rem", // sm:px-6
          },
          "@screen md": {
            paddingLeft: "4rem", // md:px-12
            paddingRight: "4rem", // md:px-12
          },
          "@screen lg": {
            paddingLeft: "7rem", // lg:px-24
            paddingRight: "7rem", // lg:px-24
          },
          "@screen xl": {
            paddingLeft: "10rem", // xl:px-36
            paddingRight: "10rem", // xl:px-36
          },
          "@screen 2xl": {
            paddingLeft: "22rem",
            paddingRight: "22rem",
          },
        },
        ".no-container-padding": {
          center: true,
          marginLeft: "-0.8rem", // tương đương với px-4
          marginRight: "-0.8rem", // tương đương với px-4
          "@screen sm": {
            marginLeft: "-2rem", // sm:px-6
            marginRight: "-2rem", // sm:px-6
          },
          "@screen md": {
            marginLeft: "-4rem", // md:px-12
            marginRight: "-4rem", // md:px-12
          },
          "@screen lg": {
            marginLeft: "-7rem", // lg:px-24
            marginRight: "-7rem", // lg:px-24
          },
          "@screen xl": {
            marginLeft: "-10rem", // xl:px-36
            marginRight: "-10rem", // xl:px-36
          },
          "@screen 2xl": {
            marginLeft: "-22rem",
            marginRight: "-22rem",
          },
        },
      };

      addUtilities(newUtilities, ["responsive"]);
    },
  ],
} satisfies Config;

export default config;
