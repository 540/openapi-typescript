import type { Plugin } from "@hey-api/openapi-ts";

import { handler } from "./plugin.js";
import type { Config } from "./types.js";

export const defaultConfig: Plugin.Config<Config> = {
  _dependencies: [],
  _handler: handler,
  _handlerLegacy: () => {},
  name: "spec",
  output: "spec",
  useSingleQuotes: false,
  exportFromIndex: false,
};

/**
 * Type helper for `spec` plugin, returns {@link Plugin.Config} object
 */
export const defineConfig: Plugin.DefineConfig<Config> = (config) => ({
  ...defaultConfig,
  ...config,
});
