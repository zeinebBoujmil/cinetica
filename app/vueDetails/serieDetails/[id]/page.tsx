'use client';

import React from "react";
import { useFetchShowsCredits } from "../useCase/useFetchShowsCredits"
import { formatDate } from "@/app/utils/dateFormatter";

const SeriesDetailsPage = ({ params }: { params: { id: string } }) => {
  const { series, credits, loading, error, handleBack } = useFetchShowsCredits(params.id);

  if (loading) {
    return <div className="text-center text-red-500">loading ...</div>;
  }

  if (error || !series) {
    return <div className="text-center text-red-500">{error || "Série introuvable."}</div>;
  }

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-md opacity-50"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${series.backdrop_path})`,
        }}
      ></div>
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 z-20 font-semibold py-2 px-4 rounded-md shadow-md transition duration-200"
      >
        Retour
      </button>
      <br />
      <br />
      <div className="relative z-10 flex flex-col lg:flex-row items-start p-8 lg:p-16">
        <div className="flex-shrink-0 w-full lg:w-1/3">
          <img
            src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
            alt={series.name}
            className="rounded-lg shadow-lg w-full"
          />
        </div>

        <div className="mt-8 lg:mt-0 lg:ml-16 flex-1">
          <h1 className="text-4xl font-bold mb-4">{series.name}</h1>
          <p className="text-sm text-gray-300 italic mb-4">{series.original_name}</p>
          <p className="text-lg">{series.overview}</p>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <div>
              <h3 className="text-gray-400 text-sm">Date de première diffusion</h3>
              <p>{formatDate(series.first_air_date)}</p>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm">Langue originale</h3>
              <p>{series.original_language.toUpperCase()}</p>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm">Popularité</h3>
              <p>{series.popularity.toFixed(1)}</p>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm">Nombre de votes</h3>
              <p>{series.vote_count}</p>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm">Pays d'origine</h3>
              <p>{series.origin_country}</p>
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

export default SeriesDetailsPage;
