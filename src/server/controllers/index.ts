import type { RouteHandlers } from "../../generated/server/fastify.gen.js";

import { getPets } from "./getPets.js";
import { getPetById } from "./getPetById.js";

export default {
  getPets,
  getPetById,
} as const satisfies RouteHandlers;
