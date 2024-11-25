'use client';
import React, { useEffect, useState } from 'react';
import { Movie } from '@/app/entities/Movie';
import { useSearch } from '../../contexts/searchContext';
import MovieCard from '../../cards/filmCard';
import ModalFilm from "../../Modals/modalFilm";

const FavoritesFilms = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]); 
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour gérer l'ouverture du modal
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

  // Ouverture du modal
  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  // Fermeture du modal
  const closeModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  // Rendu conditionnel si pas d'utilisateur
  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-gray-400">Veuillez vous connecter pour voir vos favoris.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-700 py-8 px-6">
      <h2 className="text-4xl font-bold mb-6 text-center">Vos Films Favoris</h2>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favorites.map((movie) => (
            <div key={movie.id} className="flex justify-center">
              <MovieCard 
                movie={movie} 
                onClick={() => openModal(movie)} // Ouvre le modal quand un film est cliqué
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-gray-400">Aucun film n'a été ajouté aux favoris.</p>
        </div>
      )}
      
      {/* ModalFilm affiché si isModalOpen est true */}
      <ModalFilm 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        item={selectedMovie} 
        isMovie={true} 
      />
    </div>
  );
};

export default FavoritesFilms;
