import { defaultPlugins, defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "../openapi.yaml",
  output: "src/client",
  plugins: [
    ...defaultPlugins,
    "@hey-api/client-fetch",
    "@tanstack/react-query",
    "zod",
    {
      name: "@hey-api/sdk",
      validator: true,
    },
  ],
});
