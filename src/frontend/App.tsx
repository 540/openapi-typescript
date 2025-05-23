import { useQuery } from "@tanstack/react-query";
import {
  getPetByIdOptions,
  getPetsOptions,
} from "../generated/client/@tanstack/react-query.gen.js";
import type { Pet } from "../generated/client/index.js";

export const App = () => {
  const {
    data: pets,
    isLoading: loadingPets,
    error: errorPets,
  } = useQuery({
    ...getPetsOptions(),
  });

  const petId = 1;
  const {
    data: singlePet,
    isLoading: loadingPet,
    error: errorPet,
  } = useQuery({
    ...getPetByIdOptions({ path: { petId } }),
  });

  if (loadingPets || loadingPet) {
    return <p className="read-the-docs">Loading...</p>;
  }

  if (errorPets || errorPet) {
    return <p className="read-the-docs">Error loading data.</p>;
  }

  return (
    <div id="root">
      <header className="card">
        <h1 className="logo">🐾 Pet Showcase</h1>
        <p className="read-the-docs">Browse all pets and see one in detail</p>
      </header>

      <section className="card">
        <h2>All Pets</h2>
        {pets && pets.length > 0 ? (
          <ul>
            {pets.map((pet: Pet) => (
              <li key={pet.id}>
                <strong>{pet.name}</strong>{" "}
                {pet.tag && <span className="read-the-docs">({pet.tag})</span>}
              </li>
            ))}
          </ul>
        ) : (
          <p className="read-the-docs">No pets found.</p>
        )}
      </section>

      <section className="card">
        <h2>Single Pet</h2>
        {singlePet ? (
          <div>
            <p>
              <strong>ID:</strong> {singlePet.id}
            </p>
            <p>
              <strong>Name:</strong> {singlePet.name}
            </p>
            {singlePet.tag && (
              <p>
                <strong>Tag:</strong> {singlePet.tag}
              </p>
            )}
          </div>
        ) : (
          <p className="read-the-docs">No single pet data available.</p>
        )}
      </section>
    </div>
  );
};
