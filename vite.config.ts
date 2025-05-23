import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname, "./src/frontend"),
  envDir: resolve(__dirname, "./"),
  publicDir: resolve(__dirname, "./src/frontend/public"),
  build: {
    outDir: resolve(__dirname, "dist"),
  },
  resolve: {
    alias: {
      "@src": resolve(__dirname, "./src"),
      "@frontend": resolve(__dirname, "./src/frontend"),
    },
  },
});
