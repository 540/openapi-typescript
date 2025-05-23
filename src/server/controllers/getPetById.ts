import type { RouteHandlers } from "../../generated/server/fastify.gen.js";

export const getPetById: RouteHandlers["getPetById"] = async (request, reply) => {
  const petId = request.params.petId;

  await reply.status(200).send({
    id: petId,
    name: "Fluffy",
    tag: "cat",
  });
};
