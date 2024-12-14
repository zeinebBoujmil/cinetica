// components/MovieDetails.tsx
'use client';

import React from "react";
import { useFetchMovieCredits } from "../useCase/useFetchMovieCredits" ;
import Loading from "@/app/Loading";
import { formatDate } from "@/app/utils/dateFormatter";

const MovieDetails = ({ params }: { params: { id: string } }) => {
  const { movie, credits, loading, error, handleBack } = useFetchMovieCredits(params.id);

  if (loading) {
    return <div className="text-center text-red-500">loading ...</div>;
  }

  if (error || !movie) {
    return <div className="text-center text-red-500">{error || "Film introuvable."}</div>;
  }

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      {/* Arrière-plan flou */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-md opacity-50"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
        }}
      ></div>

<br/>
<br/>

     <button
        onClick={handleBack}
        className="absolute top-4 left-4 z-20 font-semibold py-2 px-4 rounded-md shadow-md transition duration-200"
      >
        Retour
      </button>

      <div className="relative z-10 flex flex-col lg:flex-row items-start p-8 lg:p-16">
        {/* Image */}
        <div className="flex-shrink-0 w-full lg:w-1/3">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg shadow-lg w-full"
          />
        </div>

        {/* Informations */}
        <div className="mt-8 lg:mt-0 lg:ml-16 flex-1">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-sm text-gray-300 italic mb-4">{movie.original_title}</p>
          <p className="text-lg">{movie.overview}</p>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <div>
              <h3 className="text-gray-400 text-sm">Date de sortie</h3>
              <p>{formatDate(movie.release_date)}</p>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm">Langue originale</h3>
              <p>{movie.original_language.toUpperCase()}</p>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm">Popularité</h3>
              <p>{movie.popularity.toFixed(1)} / 100</p>
            </div>
          </div>

          {/* Liste des acteurs */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Acteurs</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {credits?.map((actor) => (
                <div key={actor.id} className="flex flex-col items-center">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                        : "/images/default-profile.png"
                    }
                    alt={actor.name}
                    className="rounded-full w-24 h-24 object-cover mb-2"
                  />
                  <p className="text-center text-sm font-semibold">{actor.name}</p>
                  <p className="text-center text-xs text-gray-400">
                    {actor.character || "N/A"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
