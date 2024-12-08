'use client';

import { useState, useEffect } from "react";
import { ShowCredits } from "@/app/entities/ShowCredits";
import Loading from "@/app/Loading";
import { TVShow } from "@/app/entities/TVShow";

const SeriesDetailsPage = ({ params }: { params: { id: string } }) => {
  const [series, setSeries] = useState<TVShow | null>(null);
  const [credits, setCredits] = useState<ShowCredits[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  console.log("Series ID:", params.id);

  // Récupération des détails de la série
  useEffect(() => {
    const fetchSeriesDetails = async () => {
      try {
        const seriesResponse = await fetch(`/api/shows/${params.id}`);
        const creditsResponse = await fetch(`/api/shows/${params.id}/credits`);

        if (!seriesResponse.ok || !creditsResponse.ok) {
          throw new Error("Failed to fetch series details or credits.");
        }

        const seriesData = await seriesResponse.json();
        const creditsData = await creditsResponse.json();
        console.log("Series details:", seriesData);
        console.log("Actors:", creditsData);

        setSeries(seriesData);
        setCredits(creditsData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Une erreur s est produite lors du chargement des données.");
        setLoading(false);
      }
    };

    fetchSeriesDetails();
  }, [params.id]);

  if (loading) {
    return <Loading />;
  }

  if (error || !series) {
    return <div className="text-center text-red-500">{error || "Série introuvable."}</div>;
  }

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      {/* Arrière-plan flou */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-md opacity-50"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${series.backdrop_path})`,
        }}
      ></div>

      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col lg:flex-row items-start p-8 lg:p-16">
        {/* Image */}
        <div className="flex-shrink-0 w-full lg:w-1/3">
          <img
            src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
            alt={series.name}
            className="rounded-lg shadow-lg w-full"
          />
        </div>

        {/* Informations */}
        <div className="mt-8 lg:mt-0 lg:ml-16 flex-1">
          <h1 className="text-4xl font-bold mb-4">{series.name}</h1>
          <p className="text-sm text-gray-300 italic mb-4">{series.original_name}</p>
          <p className="text-lg">{series.overview}</p>

          {/* Informations supplémentaires */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <div>
              <h3 className="text-gray-400 text-sm">Date de première diffusion</h3>
              <p>{series.first_air_date}</p>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm">Langue originale</h3>
              <p>{series.original_language.toUpperCase()}</p>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm">Popularité</h3>
              <p>{series.popularity.toFixed(1)} / 100</p>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm">Nombre de votes</h3>
              <p>{series.vote_count}</p>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm">Pays d origine</h3>
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