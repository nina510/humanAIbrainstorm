import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#20314d",
        mist: "#eef5ff",
        line: "#d6e4f5",
        panel: "#f8fbff",
        accent: "#4d7fff",
        accentDeep: "#315ad4",
      },
      boxShadow: {
        soft: "0 18px 50px rgba(65, 93, 148, 0.12)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
