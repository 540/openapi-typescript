import { createOpenApiHttp as baseCreateOpenApiHttp } from "openapi-msw";
import type { Paths } from "../../frontend/src/client/msw-schema.gen.js";

export const createOpenApiHttp = baseCreateOpenApiHttp<Paths>;
