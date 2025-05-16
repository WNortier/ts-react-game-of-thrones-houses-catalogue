import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import EnvironmentPlugin from "vite-plugin-environment";

export default defineConfig({
  plugins: [react(), EnvironmentPlugin("all")],
  base: "/ts-react-game-of-thrones-houses-catalogue/",
  build: {
    target: "modules",
    define: {
      "process.env": {},
    },
    cssCodeSplit: true,
  },
  appType: "spa",
});