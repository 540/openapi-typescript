import type { RouteHandlers } from "../generated/fastify.gen.js";

export const getPets: RouteHandlers["getPets"] = async (request, reply) => {
    await reply.status(200).send([]);
};
