import { createOpenApiHttp as baseCreateOpenApiHttp } from "openapi-msw";
import type { Paths } from "../generated/client/msw-schema.gen.js";

export const createOpenApiHttp = baseCreateOpenApiHttp<Paths>;
