import { defaultPlugins, defineConfig } from "@hey-api/openapi-ts";
import { defineMswSchemaPluginConfig } from "../plugins/msw-schema/index.js";

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
    defineMswSchemaPluginConfig({}),
  ],
});
