'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShowDetails } from '@/app/entities/ShowDetails';
import { Star } from 'lucide-react';

interface ShowCardProps {
  id: number; // L'ID de la série
}

const ShowCard: React.FC<ShowCardProps> = ({ id }) => {
  const router = useRouter();
  const [series, setSeries] = useState<ShowDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const currentUser = localStorage.getItem('currentUser');

  useEffect(() => {
    const fetchSeriesDetails = async () => {
      try {
        const response = await fetch(`/api/shows/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch series details.");
        }

        const data = await response.json();
        setSeries(data);
        setLoading(false);

        const favorites = JSON.parse(localStorage.getItem(`favorites_${currentUser}`) || '[]');
        setIsFavorite(favorites.some((fav: ShowDetails) => fav.id === id));
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de la série :", error);
        setLoading(false);
      }
    };

    fetchSeriesDetails();
  }, [id, currentUser]);

  const toggleFavorite = () => {
    if (!currentUser) {
      console.error("Aucun utilisateur connecté.");
      return;
    }

    const favoritesKey = `favorites_${currentUser}`;
    const favorites = JSON.parse(localStorage.getItem(favoritesKey) || '[]');

    if (isFavorite) {
      const updatedFavorites = favorites.filter((fav: ShowDetails) => fav.id !== id);
      localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(series!);
      localStorage.setItem(favoritesKey, JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  if (loading) {
    return (
      <div className="w-64 h-96 mx-auto flex items-center justify-center text-gray-400">
        Chargement...
      </div>
    );
  }

  if (!series) {
    return (
      <div className="w-64 h-96 mx-auto flex items-center justify-center text-red-500">
        Série introuvable.
      </div>
    );
  }

  return (
    <div
      className="hover:scale-105 transition-transform duration-300 hover:shadow-lg hover:shadow-gray-500/50 rounded-lg overflow-hidden w-64 h-96 mx-auto flex flex-col"
      onClick={() => router.push(`/vueDetails/serieDetails/${id}`)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w300${series.poster_path}`}
        alt={series.name}
        className="w-full h-2/3 object-cover"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <h3 className="text-lg font-semibold">{series.name}</h3>
        <p className="text-sm">
          {series.first_air_date
            ? series.first_air_date.split('-').reverse().join('-')
            : 'Inconnue'}
        </p>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation(); // Empêche le clic sur l'étoile de déclencher `onClick`
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
