import React from "react";
import { DogCard } from "./DogCard";
import { useDogs } from "../providers/dog_provider";

export const Dogs = () => {
  const {filteredDogs, deleteDog, unfavoriteDog, favoriteDog} = useDogs();
  return (
    <>
      {filteredDogs.map((dog) => (
        <DogCard
          dog={dog}
          key={dog.id}
          onTrashIconClick={() => deleteDog(dog.id)}
          onHeartClick={() => unfavoriteDog(dog.id)}
          onEmptyHeartClick={() => favoriteDog(dog.id)}
        />
      ))}
    </>
  );
};
