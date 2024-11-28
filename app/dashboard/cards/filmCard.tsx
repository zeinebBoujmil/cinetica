'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Importer le router de Next.js
import { Movie } from '@/app/entities/Movie';
import { Star } from 'lucide-react';

interface FilmCardProps {
  movie: Movie;
}

const MovieCard: React.FC<FilmCardProps> = ({ movie }) => {
  const router = useRouter(); 
  const [isFavorite, setIsFavorite] = useState(false);
  const currentUser = localStorage.getItem('currentUser'); 

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem(`favorites_${currentUser}`) || '[]');
    setIsFavorite(favorites.some((fav: Movie) => fav.id === movie.id));
  }, [movie.id, currentUser]);

  const toggleFavorite = () => {
    if (!currentUser) {
      console.error("Aucun utilisateur connecté.");
      return;
    }

    const favoritesKey = `favorites_${currentUser}`;
    const favorites = JSON.parse(localStorage.getItem(favoritesKey) || '[]');

    if (isFavorite) {
      // Supprime le film des favoris
      const updatedFavorites = favorites.filter((fav: Movie) => fav.id !== movie.id);
      localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      // Ajoute le film aux favoris
      favorites.push(movie);
      localStorage.setItem(favoritesKey, JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };
  const handleCardClick = () => {
    const queryParams = new URLSearchParams({
      id: movie.id.toString(),
      title: movie.title,
      original_title: movie.original_title,
      overview: movie.overview,
      release_date: movie.release_date,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      genre_ids: JSON.stringify(movie.genre_ids), // Sérialisation des genres
      original_language: movie.original_language,
      popularity: movie.popularity.toString(),
      vote_average: movie.vote_average.toString(),
      vote_count: movie.vote_count.toString(),
    }).toString();
  
    router.push(`/dashboard/details/filmDetails?${queryParams}`);
  };
  

  return (
    <div
      className="hover:scale-105 transition-transform duration-300 hover:shadow-lg hover:shadow-gray-500/50 rounded-lg overflow-hidden w-64 h-96 mx-auto flex flex-col"
      onClick={handleCardClick}
    >
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-2/3 object-cover"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{movie.title}</h3>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {movie.release_date
              ? movie.release_date.split('-').reverse().join('-')
              : 'Inconnue'}
          </p>
          <div className="relative flex items-center justify-center w-8 h-8 ml-2">
            <div className="absolute w-full h-full rounded-full border-2 border-gray-300"></div>

            <div
              className="absolute w-full h-full rounded-full border-2"
              style={{
                borderColor:
                  movie.vote_average >= 7
                    ? 'green'
                    : movie.vote_average >= 4
                    ? 'orange'
                    : 'red',
                borderTopColor: 'transparent',
                transform: `rotate(${(movie.vote_average / 10) * 360}deg)`,
              }}
            ></div>

            <span className="absolute font-bold text-gray-800 text-xs">
              {movie.vote_average.toFixed(2)}
            </span>
          </div>
        </div>
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

export default MovieCard;
