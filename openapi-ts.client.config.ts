import { defineConfig } from "@hey-api/openapi-ts";
import { defineMswSchemaPluginConfig } from "./plugins/msw-schema/index.js";

export default defineConfig({
  input: "./openapi.yaml",
  output: {
    format: "prettier",
    lint: "eslint",
    path: "./src/frontend/client",
  },
  plugins: [
    "@hey-api/client-fetch",
    "@tanstack/react-query",
    "zod",
    {
      name: "@hey-api/sdk",
      validator: true,
    },
    defineMswSchemaPluginConfig({}),
  ],
});
