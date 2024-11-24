'use client';
import React, { useEffect, useState } from 'react';
import { TVShow } from '@/app/entities/TVShow';
import ShowCard from '../../cards/showCard';
import { useSearch } from '../../contexts/searchContext';

const FavoritesSeries = ({ onSerieClick }: { onSerieClick: (serie: TVShow) => void }) => {
  const [favoritesSeries, setFavorites] = useState<TVShow[]>([]);
  const { query } = useSearch();
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUser = localStorage.getItem('currentUser'); 
      if (currentUser) {
        const storedFavorites = JSON.parse(localStorage.getItem(`favoritesSeries_${currentUser}`) || '[]');
        
        if (query) {
          const filteredFavorites = storedFavorites.filter((show: TVShow) =>
            show.name.toLowerCase().includes(query.toLowerCase())
          );
          setFavorites(filteredFavorites);
        } else {
          setFavorites(storedFavorites);
        }
      }
    }
  }, [query]);

  return (
    <div className="min-h-screen text-gray-700 py-8 px-6">
      <h2 className="text-4xl font-bold mb-6 text-center">Vos Séries Favorites</h2>
      {favoritesSeries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoritesSeries.map((serie) => (
            <div key={serie.id} className="flex justify-center">
              <ShowCard
                serie={serie}
                onClick={() => onSerieClick(serie)}
              />
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