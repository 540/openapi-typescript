import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "../../openapi.yaml",
  output: {
    path: "./src",
  },
  plugins: [
    { name: '@hey-api/client-fetch', exportFromIndex: true },
    { name: '@tanstack/react-query', exportFromIndex: true }
  ],
});
