import { defineConfig } from "@hey-api/openapi-ts";
import { defineSpecPluginConfig } from './plugins/spec/index.js';

export default defineConfig({
  input: "./openapi.yaml",
  output: {
    format: "prettier",
    lint: "eslint",
    path: "./src/server/generated",
  },
  plugins: [
    {name: "fastify", exportFromIndex: true },
    defineSpecPluginConfig({ useSingleQuotes: true, exportFromIndex: true }), 
  ],
});
