import type { RouteHandlers } from "../../generated/server/fastify.gen.js";

export const getPets: RouteHandlers["getPets"] = async (request, reply) => {
  await reply.status(200).send([
    { id: 1, name: "Fluffy", tag: "cat" },
    { id: 2, name: "Rex", tag: "dog" },
    { id: 3, name: "Tweety", tag: "bird" },
    { id: 4, name: "Goldie", tag: "fish" },
  ]);
};
