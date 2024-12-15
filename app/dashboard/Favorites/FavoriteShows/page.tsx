'use client';
import React from 'react';
import ShowCard from '../../cards/showCard/showCard';
import { useFetchFavoriteShows } from './useCase/useFetchFavoriteShows';

const FavoritesSeries = () => {
  const { favoritesSeries, currentUser } = useFetchFavoriteShows();


  if (!currentUser) {
    return;
  }

  return (
    <div className="min-h-screen py-8 px-6">
      <h1 className="text-3xl font-extrabold mb-6 text-center relative">
        Vos Series Favorites
        <span className="block h-1 w-24 bg-primary mx-auto mt-2 rounded-full"></span>
      </h1>
      {favoritesSeries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoritesSeries.map((serie) => (
            <div key={serie.id} className="flex justify-center">
              <ShowCard id={serie.id} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-gray-400">Aucune série n a été ajoutée aux favoris.</p>
        </div>
      )}
    </div>
  );
};

export default FavoritesSeries;
