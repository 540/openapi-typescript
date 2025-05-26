import { defineConfig } from "@hey-api/openapi-ts";
import { defineMswSchemaPluginConfig } from "./plugins/msw-schema/index.js";

export default defineConfig({
  input: "./openapi.yaml",
  output: {
    format: "prettier",
    lint: "eslint",
    path: "./src/generated/client",
  },
  plugins: [
    { name: "@hey-api/client-fetch", exportFromIndex: true },
    { name: "@tanstack/react-query", exportFromIndex: true },
    "zod",
    {
      name: "@hey-api/sdk",
      validator: true,
    },
    defineMswSchemaPluginConfig({ exportFromIndex: true }),
  ],
});
