import { defineConfig } from "@hey-api/openapi-ts";
import { defineSpecPluginConfig } from '../../plugins/spec/index.js';

export default defineConfig({
  input: "../../openapi.yaml",
  output: {
    path: "./src/generated",
  },
  plugins: [
    defineSpecPluginConfig({ useSingleQuotes: true, exportFromIndex: true }), 
    {name: "fastify", exportFromIndex: true },
  ],
});
