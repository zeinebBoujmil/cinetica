'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Importer le router pour la redirection
import { TVShow } from '@/app/entities/TVShow';
import { Star } from 'lucide-react';

interface ShowCardProps {
  serie: TVShow;
}

const ShowCard: React.FC<ShowCardProps> = ({ serie }) => {
  const router = useRouter(); // Initialiser le router
  const [isFavorite, setIsFavorite] = useState(false);
  const currentUser = localStorage.getItem('currentUser'); // Récupérer l'utilisateur connecté

  useEffect(() => {
    if (currentUser) {
      // Vérifier si la série est déjà dans les favoris de l'utilisateur
      const favoritesKey = `favoritesSeries_${currentUser}`;
      const favorites = JSON.parse(localStorage.getItem(favoritesKey) || '[]');
      setIsFavorite(favorites.some((fav: TVShow) => fav.id === serie.id));
    }
  }, [serie.id, currentUser]);

  const toggleFavorite = () => {
    if (!currentUser) {
      console.error("Aucun utilisateur connecté.");
      return;
    }

    const favoritesKey = `favoritesSeries_${currentUser}`;
    const favorites = JSON.parse(localStorage.getItem(favoritesKey) || '[]');

    if (isFavorite) {
      // Supprime la série des favoris
      const updatedFavorites = favorites.filter((fav: TVShow) => fav.id !== serie.id);
      localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      // Ajoute la série aux favoris
      favorites.push(serie);
      localStorage.setItem(favoritesKey, JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  const handleCardClick = () => {
    // Redirection vers la page des détails avec des query parameters
    const queryParams = new URLSearchParams({
      id: serie.id.toString(),
      name: serie.name,
      original_name: serie.original_name,
      overview: serie.overview,
      first_air_date: serie.first_air_date,
      poster_path: serie.poster_path,
      backdrop_path: serie.backdrop_path,
      genre_ids: JSON.stringify(serie.genre_ids), // Sérialisation des genres
      origin_country: JSON.stringify(serie.origin_country), // Sérialisation des pays
      original_language: serie.original_language,
      popularity: serie.popularity.toString(),
      vote_average: serie.vote_average.toString(),
      vote_count: serie.vote_count.toString(),
    }).toString();

    router.push(`/vueDetails/serieDetails?${queryParams}`);
  };

  return (
    <div
      className="hover:scale-105 transition-transform duration-300 hover:shadow-lg hover:shadow-gray-500/50 rounded-lg overflow-hidden w-64 h-96 mx-auto flex flex-col"
      onClick={handleCardClick} // Redirection au clic sur la carte
    >
      <img
        src={`https://image.tmdb.org/t/p/w300${serie.poster_path}`}
        alt={serie.name}
        className="w-full h-2/3 object-cover"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{serie.name}</h3>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {serie.first_air_date
              ? serie.first_air_date.split('-').reverse().join('-')
              : 'Inconnue'}
          </p>
          <div className="relative flex items-center justify-center w-8 h-8 ml-2">
            <div className="absolute w-full h-full rounded-full border-2 border-gray-300"></div>
            <div
              className="absolute w-full h-full rounded-full border-2"
              style={{
                borderColor:
                  serie.vote_average >= 7
                    ? 'green'
                    : serie.vote_average >= 4
                    ? 'orange'
                    : 'red',
                borderTopColor: 'transparent',
                transform: `rotate(${(serie.vote_average / 10) * 360}deg)`,
              }}
            ></div>
            <span className="absolute font-bold text-gray-800 text-xs">
              {serie.vote_average.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation(); // Empêche le clic sur l'étoile de déclencher `handleCardClick`
          toggleFavorite();
        }}
        className={`text-lg self-end p-2 ${isFavorite ? 'text-yellow-400' : 'text-gray-400'}`}
      >
        <Star />
      </button>
    </div>
  );
};

export default ShowCard;
