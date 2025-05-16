import fp from 'fastify-plugin';
import openapiGlue from 'fastify-openapi-glue';

import { spec, type RouteHandlers } from './generated/index.js';

export interface ApiOptions {
    handlers: RouteHandlers;
}

export const apiPlugin =  fp<ApiOptions>(async (fastify, opts) => {
    fastify.register(openapiGlue, {
        specification: spec,
        serviceHandlers: opts.handlers,
    });
});

export default apiPlugin;