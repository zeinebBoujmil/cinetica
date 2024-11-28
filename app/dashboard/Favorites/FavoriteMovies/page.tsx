'use client';
import React, { useEffect, useState } from 'react';
import { Movie } from '@/app/entities/Movie';
import { useSearch } from '../../contexts/searchContext';
import MovieCard from '../../cards/filmCard';

const FavoritesFilms = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]); 
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const { query } = useSearch();

  // Effet pour récupérer l'utilisateur courant
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    setCurrentUser(user);
  }, []);

  // Effet pour gérer les favoris
  useEffect(() => {
    if (!currentUser) return;

    const storedFavorites = JSON.parse(localStorage.getItem(`favorites_${currentUser}`) || '[]');
    const filteredFavorites = query 
      ? storedFavorites.filter((movie: Movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase())
        )
      : storedFavorites;

    setFavorites(filteredFavorites);
  }, [query, currentUser]);

  // Rendu conditionnel si pas d'utilisateur
  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-gray-400">Veuillez vous connecter pour voir vos favoris.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-6">
<h1 className="text-3xl font-extrabold mb-6 text-center relative">
                          Vos Films Favorites 
                          <span className="block h-1 w-24 bg-primary mx-auto mt-2 rounded-full"></span>
                      </h1>      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favorites.map((movie) => (
            <div key={movie.id} className="flex justify-center">
              <MovieCard 
                movie={movie} 
              />
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
