'use client';

import React from 'react';
import { useFetchShowById } from './useCase/useFetchShowsById';
import { Star } from 'lucide-react';
import { formatDate } from "@/app/utils/dateFormatter"

interface ShowCardProps {
  id: number;
}

const ShowCard: React.FC<ShowCardProps> = ({ id }) => {
  const { series, isLoading, error, isFavorite, toggleFavorite, handleCardClick } = useFetchShowById(id);

  if (isLoading) {
    return ;
  }

  if (error || !series) {
    return (
      <div className="w-64 h-96 mx-auto flex items-center justify-center text-red-500">
        Série introuvable.
      </div>
    );
  }

  return (
    <div
      className="hover:scale-105 transition-transform duration-300 hover:shadow-lg hover:shadow-gray-500/50 rounded-lg overflow-hidden w-64 h-96 mx-auto flex flex-col"
      onClick={handleCardClick}
    >
      <img
        src={`https://image.tmdb.org/t/p/w300${series.poster_path}`}
        alt={series.name}
        className="w-full h-2/3 object-cover"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <h3 className="text-lg font-semibold">{series.name}</h3>
        <p className="text-sm">{formatDate(series.first_air_date)}</p>

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

export default ShowCard;
