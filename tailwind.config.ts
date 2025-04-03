import { overflow } from "html2canvas/dist/types/css/property-descriptors/overflow";
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
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "3rem",
        xl: "3.5rem",
        "2xl": "0",
      },
      screens: {
        DEFAULT: "1100px",
      },
    },
    extend: {
      height: {
        "screen-dvh": "100dvh",
      },
      colors: {
        white: "#FFFFFF",
        yellow: "#FFB700",
        blue: "#003B96",
        blue_main_sub: "#006CE4",
        blue_sub: "#1E50A0",
        black: "#222222",
        black_main_blur: "#333",
        green: "#018235",
        black_sub: "#333333",
        black_sub_2: "#555555",
        red_main: "#FF0034",
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
        blue_active: "#1E50A0",
        blue_hover: "#F1F6FE",
        blue: "#003B96",
        blue_sub: "#006CE4",
        bg_primary_blue_sub2: "#F1F6FE",
        yellow: "#FFB700",
        green: "#018235",
        black_sub: "#F5F5F5",
        bg_sub: "#f0f0f0",
        bg_footer: "#F9FAFB",
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
        "animate-fade-in": "fade-in 0.3s ease-out",
      },
      gridTemplateColumns: {
        "layout-2": "65% 35%",
        "layout-3": "35% 65%",
        "layout-4": "25% 75%",
      },
      fontSize: {
        xs: "0.75rem", // 12px
        sm: "0.875rem", // 14px
        base: "1rem", // 16px
        lg: "1.125rem", // 18px
        xl: "1.25rem", // 20px
        "2xl": "1.5rem", // 24px
        "3xl": "1.875rem", // 30px
        "4xl": "2.25rem",
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
        ".section-spacing > * + *": {
          marginTop: "2rem",
          "@screen md": { marginTop: "2.5rem" },
          "@screen lg": { marginTop: "3rem" },
          "@screen xl": { marginTop: "3.5rem" },
        },
        ".container-spacing > * + *": {
          marginTop: "1.5rem",
          "@screen lg": { marginTop: "2rem" },
          "@screen xl": { marginTop: "2.5rem" },
        },
        ".list-spacing > * + *": {
          marginTop: "0.8rem",
          "@screen sm": { marginTop: "0.9rem" },
          "@screen md": { marginTop: "1rem" },
          "@screen lg": { marginTop: "1.2rem" },
          "@screen xl": { marginTop: "1.2rem" },
        },
        ".heading-spacing": {
          marginBottom: "0.75rem", // 12px
          "@screen sm": { marginBottom: "1rem" }, // 16px
          "@screen md": { marginBottom: "1.25rem" }, // 20px
          "@screen lg": { marginBottom: "1.5rem" }, // 24px
          "@screen xl": { marginBottom: "1.75rem" }, // 28px
          "@screen 2xl": { marginBottom: "2rem" }, // 32px
        },
        ".form-spacing > * + *": {
          marginTop: "0.8rem",
          "@screen sm": { marginTop: "1rem" },
          "@screen md": { marginTop: "1.2rem" },
          "@screen lg": { marginTop: "1.5rem" },
          "@screen xl": { marginTop: "1.75rem" },
          "@screen 2xl": { marginTop: "2rem" },
        },
        ".container-padding-y": {
          paddingTop: "2rem",
          paddingBottom: "2rem",
          "@screen md": { paddingTop: "2.5rem", paddingBottom: "2.5rem" },
          "@screen lg": { paddingTop: "3rem", paddingBottom: "3rem" },
          "@screen xl": { paddingTop: "3rem", paddingBottom: "3rem" },
        },
      };
      addUtilities(newUtilities, ["responsive"]);
    },
  ],
} satisfies Config;

export default config;
