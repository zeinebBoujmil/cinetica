'use client';

import React from 'react';
import { useFetchMovieById  } from "../filmCard/useCase/useFetchMovieById";
import { Star } from 'lucide-react';
import { formatDate } from "@/app/utils/dateFormatter"
interface FilmCardProps {
  id: number;
}

const MovieCard: React.FC<FilmCardProps> = ({ id }) => {
  const { movie, isLoading, error, isFavorite, toggleFavorite, handleCardClick } = useFetchMovieById(id);

  if (isLoading) {
    return ;
  }

  if (error || !movie) {
    return (
      <div className="w-64 h-96 mx-auto flex items-center justify-center text-red-500">
        Erreur lors de la récupération des données.
      </div>
    );
  }

  return (
    <div
      className="hover:scale-105 transition-transform duration-300 hover:shadow-lg hover:shadow-gray-500/50 rounded-lg overflow-hidden w-64 h-96 mx-auto flex flex-col "
      onClick={handleCardClick}
    >
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-2/3 object-cover"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <h3 className="text-lg font-semibold">{movie.title}</h3>
        <div className="flex items-center justify-between">
        <p className="text-sm">{formatDate(movie.release_date)}</p>

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
            <span className="absolute font-bold text-xs">
              {movie.vote_average.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
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
