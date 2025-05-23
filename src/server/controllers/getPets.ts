import type { RouteHandlers } from "../../generated/server/fastify.gen.js";
import { pets } from "./pets.js";

export const getPets: RouteHandlers["getPets"] = (request, reply) => {
   reply.status(200).send(pets);
};
