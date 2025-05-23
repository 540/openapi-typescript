import { createOpenApiHttp } from "../../generated/client/index.js";
import type { Pet } from "../../generated/client/index.js";

// Datos de ejemplo para los mocks
const mockPets: Pet[] = [
  { id: 1, name: "Goldie", tag: "fish" },
  { id: 2, name: "Tweety", tag: "bird" },
  { id: 3, name: "Rex", tag: "dog" },
  { id: 4, name: "Fluffy", tag: "cat" },
];

const http = createOpenApiHttp({ baseUrl: "http://localhost:3000" });

// Crear handlers utilizando createOpenApiHttp
export const handlers = [
  http.get("/pets", ({ response }) => {
    return response(200).json(mockPets);
  }),

  http.get("/pets/{petId}", ({ response, params }) => {
    const petId = Number(params.petId);
    const pet = mockPets.find((p) => p.id === petId);

    if (!pet) {
      return response(404).json({ error: "Pet not found" });
    }

    return response(200).json(pet);
  }),
];
