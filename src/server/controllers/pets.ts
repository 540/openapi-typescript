import type { Pet } from "../../generated/server/types.gen.js";

export const pets: Pet[] = [
  { id: 1, name: "Fluffy", tag: "cat" },
  { id: 2, name: "Rex", tag: "dog" },
  { id: 3, name: "Tweety", tag: "bird" },
  { id: 4, name: "Goldie", tag: "fish" },
];

export const findPetById = (id: number): Pet | undefined => {
  return pets.find(pet => pet.id === id);
};
