'use client';

import { useState, useEffect } from "react";
import { Movie } from "@/app/entities/Movie";
import { MovieCredits } from "@/app/entities/MovieCredits";
import Loading from "@/app/Loading";
import { useRouter } from "next/navigation";

const MovieDetails = ({ params }: { params: { id: string } }) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [credits, setCredits] = useState<MovieCredits[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleBack = () => {
    router.back(); 
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await fetch(`/api/movies/${params.id}`);
        const creditsResponse = await fetch(`/api/movies/${params.id}/credits`);

        if (!movieResponse.ok || !creditsResponse.ok) {
          throw new Error("Failed to fetch movie details or credits.");
        }

        const movieData = await movieResponse.json();
        const creditsData = await creditsResponse.json();

        setMovie(movieData);
        setCredits(creditsData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Une erreur s'est produite lors du chargement des données.");
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [params.id]);

  if (loading) {
    return <Loading />;
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

    {/* Bouton de retour */}
    <button
      onClick={handleBack}
      className="absolute top-4 left-4 z-20 font-semibold py-2 px-4 rounded-md shadow-md transition duration-200 "
    >
      Retour
    </button>
<br/>
<br/>
    {/* Contenu principal */}
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

        {/* Informations supplémentaires */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div>
            <h3 className="text-gray-400 text-sm">Date de sortie</h3>
            <p>{movie.release_date}</p>
          </div>
          <div>
            <h3 className="text-gray-400 text-sm">Langue originale</h3>
            <p>{movie.original_language.toUpperCase()}</p>
          </div>
          <div>
            <h3 className="text-gray-400 text-sm">Popularité</h3>
            <p>{movie.popularity.toFixed(1)} / 100</p>
          </div>
          <div>
            <h3 className="text-gray-400 text-sm">Votes</h3>
            <p>{movie.vote_count}</p>
          </div>
          <div>
            <h3 className="text-gray-400 text-sm">Note moyenne</h3>
            <p>{movie.vote_average}/10</p>
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
