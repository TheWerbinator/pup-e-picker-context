import React, { useState, useEffect, createContext, useContext } from "react"
import { addDogToDb } from "../fetch/add-dog";
import { updateFavoriteForDog } from "../fetch/update-favorite";
import { deleteDogFromDb } from "../fetch/delete-dog-from-db";

const DogsContext = createContext({});

// eslint-disable-next-line react/prop-types
export const DogsProvider = ({children}) => {
  const [dogs, setDogs] = useState([]);
  const [showComponent, setShowComponent] = useState("all-dogs");

  const refetchDogs = () => {
    fetch("http://localhost:3000/dogs")
      .then((response) => response.json())
      .then(setDogs);
  };

  const addDog = (dog) => {
    addDogToDb({
      name: dog.name,
      description: dog.description,
      image: dog.image,
    }).then(() => {
      refetchDogs();
    });
  };

  const deleteDog = (dogId) => {
    deleteDogFromDb(dogId).then(() => refetchDogs());
  };

  const unfavoriteDog = (dogId) => {
    updateFavoriteForDog({ dogId, isFavorite: false }).then(() =>
      refetchDogs()
    );
  };

  const favoriteDog = (dogId) => {
    updateFavoriteForDog({ dogId, isFavorite: true }).then(() => refetchDogs());
  };

  useEffect(() => {
    refetchDogs();
  }, []);

  const unfavorited = dogs.filter((dog) => dog.isFavorite === false);
  const favorited = dogs.filter((dog) => dog.isFavorite === true);

  let filteredDogs = (() => {
    if (showComponent === "favorite-dogs") {
      return favorited;
    }

    if (showComponent === "unfavorite-dogs") {
      return unfavorited;
    }
    return dogs;
  })();

  const onClickFavorited = () => {
    if (showComponent === "favorite-dogs") {
      setShowComponent("all-dogs")
      return;
    }
    setShowComponent("favorite-dogs")
  };

  const onClickUnfavorited = () => {
    if (showComponent === "unfavorite-dogs") {
      setShowComponent("all-dogs")
      return;
    }
    setShowComponent("unfavorite-dogs")
  };

  const onClickCreateDog = () => {
    if (showComponent === "create-dog-form") {
      setShowComponent("all-dogs")
      return;
    }
    setShowComponent("create-dog-form")
  };

  return (
    <DogsContext.Provider 
      value={{
        filteredDogs, 
        addDog,
        deleteDog, 
        unfavoriteDog, 
        favoriteDog,
        showComponent, 
        onClickFavorited,
        onClickUnfavorited,
        onClickCreateDog,
        favorited,
        unfavorited,
      }}>
      {children}
    </DogsContext.Provider>
  )
}

export const useDogs = () => {
  const context = useContext(DogsContext);
  return {
    filteredDogs: context.filteredDogs, 
    deleteDog: context.deleteDog, 
    unfavoriteDog: context.unfavoriteDog, 
    favoriteDog: context.favoriteDog,
    
    addDog: context.addDog,

    showComponent: context.showComponent, 
    onClickFavorited: context.onClickFavorited,
    onClickUnfavorited: context.onClickUnfavorited,
    onClickCreateDog: context.onClickCreateDog,
    favorited: context.favorited,
    unfavorited: context.unfavorited,
  }
}