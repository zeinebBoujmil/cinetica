'use client';

import { useSearchParams } from 'next/navigation';
import { Movie } from '@/app/entities/Movie';

const MovieDetails = () => {
  const searchParams = useSearchParams();

  // Convertir les query parameters en objet Movie
  const movie: Movie = {
    id: parseInt(searchParams.get('id') || '0'),
    title: searchParams.get('title') || '',
    original_title: searchParams.get('original_title') || '',
    overview: searchParams.get('overview') || '',
    release_date: searchParams.get('release_date') || '',
    poster_path: searchParams.get('poster_path') || '',
    backdrop_path: searchParams.get('backdrop_path') || '',
    genre_ids: JSON.parse(searchParams.get('genre_ids') || '[]'), // Conversion en tableau
    original_language: searchParams.get('original_language') || '',
    popularity: parseFloat(searchParams.get('popularity') || '0'),
    vote_average: parseFloat(searchParams.get('vote_average') || '0'),
    vote_count: parseInt(searchParams.get('vote_count') || '0'),
    adult: false, // Valeur par défaut si non incluse dans les query parameters
    video: false, // Valeur par défaut si non incluse dans les query parameters
  };

  if (!movie.title) {
    return <div>Erreur : Aucun film trouvé.</div>;
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
          <p className="text-sm text-gray-300 italic mb-4">
            {movie.original_title}
          </p>
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
            <div>
              <h3 className="text-gray-400 text-sm">Genres</h3>
              <p>{movie.genre_ids.join(', ') || 'Aucun'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
