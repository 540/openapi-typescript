import type { Plugin } from '@hey-api/openapi-ts';

import { handler } from './plugin.js';
import type { Config } from './types.js';

export const defaultConfig: Plugin.Config<Config> = {
  _dependencies: [],
  _handler: handler,
  _handlerLegacy: () => {},
  name: 'msw-schema',
  output: 'msw-schema',
};

export const defineConfig: Plugin.DefineConfig<Config> = (config) => ({
  ...defaultConfig,
  ...config,
});
