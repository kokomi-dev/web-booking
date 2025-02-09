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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
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
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
    require("tailwind-scrollbar"),
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
        ".posing-vertical-1": {
          "& > * + *": { marginTop: "1rem" },
          "@screen lg": { "& > * + *": { marginTop: "1.5rem" } },
        },
        ".posing-vertical-2": {
          "& > * + *": { marginTop: "0.8rem" },
          "@screen lg": { "& > * + *": { marginTop: "1.3rem" } },
        },
        ".posing-vertical-3": {
          "& > * + *": { marginTop: "0.6rem" },
          "@screen lg": { "& > * + *": { marginTop: "1.1rem" } },
        },
        ".posing-vertical-4": {
          "& > * + *": { marginTop: "0.4rem" },
          "@screen lg": { "& > * + *": { marginTop: "0.9rem" } },
        },
        ".posing-vertical-5": {
          "& > * + *": { marginTop: "0.3rem" },
          "@screen lg": { "& > * + *": { marginTop: "0.7rem" } },
        },
        ".posing-horizontal-1": {
          "& > * + *": { marginRight: "1rem" },
          "@screen lg": { "& > * + *": { marginRight: "1.5rem" } },
        },
        ".posing-horizontal-2": {
          "& > * + *": { marginRight: "0.8rem" },
          "@screen lg": { "& > * + *": { marginRight: "1.3rem" } },
        },
      };

      addUtilities(newUtilities, ["responsive"]);
    },
  ],
} satisfies Config;

export default config;
