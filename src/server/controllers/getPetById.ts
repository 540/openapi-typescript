import type { RouteHandlers } from "../../generated/server/fastify.gen.js";
import { findPetById } from "./pets.js";

export const getPetById: RouteHandlers["getPetById"] = (request, reply) => {
  const petId = request.params.petId;
  const pet = findPetById(petId);

  if (!pet) {
    reply.status(404).send({
      error: "Pet not found",
    });
    return;
  }

  reply.status(200).send(pet);
};
