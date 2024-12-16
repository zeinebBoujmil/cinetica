'use client';
import React from 'react';
import MovieCard from '../../cards/filmCard/filmCard';
import { useFetchFavoriteMovies } from './useCase/useFetchFavoriteMovies';

const FavoritesFilms = () => {
  const { favorites, currentUser } = useFetchFavoriteMovies();

  if (!currentUser) {
    return ;
  }

  return (
    <div className="min-h-screen py-8 px-6">
      <h1 className="text-3xl font-extrabold mb-6 text-center relative">
        Your favorite Films
        <span className="block h-1 w-24 bg-primary mx-auto mt-2 rounded-full"></span>
      </h1>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favorites.map((movie) => (
            <div key={movie.id} className="flex justify-center">
              <MovieCard id={movie.id} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-gray-400">Aucun film n a été ajouté aux favoris.</p>
        </div>
      )}
    </div>
  );
};

export default FavoritesFilms;
