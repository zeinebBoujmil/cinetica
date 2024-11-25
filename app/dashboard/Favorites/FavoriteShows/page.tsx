'use client';
import React, { useEffect, useState } from 'react';
import { TVShow } from '@/app/entities/TVShow';
import { useSearch } from '../../contexts/searchContext';
import ShowCard from '../../cards/showCard';
import ModalSerie from "../../Modals/modalShow"; // Modal pour les séries

const FavoritesSeries = () => {
  const [favoritesSeries, setFavorites] = useState<TVShow[]>([]); 
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [selectedSerie, setSelectedSerie] = useState<TVShow | null>(null); 
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

    const storedFavorites = JSON.parse(localStorage.getItem(`favoritesSeries_${currentUser}`) || '[]');
    const filteredFavorites = query 
      ? storedFavorites.filter((show: TVShow) =>
          show.name.toLowerCase().includes(query.toLowerCase())
        )
      : storedFavorites;

    setFavorites(filteredFavorites);
  }, [query, currentUser]);

  // Ouverture du modal
  const openModal = (serie: TVShow) => {
    setSelectedSerie(serie);
    setIsModalOpen(true);
  };

  // Fermeture du modal
  const closeModal = () => {
    setSelectedSerie(null);
    setIsModalOpen(false);
  };

  // Rendu conditionnel si pas d'utilisateur
  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-gray-400">Veuillez vous connecter pour voir vos séries favorites.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-700 py-8 px-6">
      <h2 className="text-4xl font-bold mb-6 text-center">Vos Séries Favorites</h2>
      {favoritesSeries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoritesSeries.map((serie) => (
            <div key={serie.id} className="flex justify-center">
              <ShowCard 
                serie={serie} 
                onClick={() => openModal(serie)} // Ouvre le modal quand une série est cliquée
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-gray-400">Aucune série n a été ajoutée aux favoris.</p>
        </div>
      )}
      
      {/* ModalSerie affiché si isModalOpen est true */}
      <ModalSerie 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        serie={selectedSerie} 
        isMovie={false} 
      />
    </div>
  );
};

export default FavoritesSeries;
