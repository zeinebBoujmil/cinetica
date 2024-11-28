'use client';

import { useSearchParams } from 'next/navigation';
import { TVShow } from '@/app/entities/TVShow';

const TVShowDetails = () => {
  const searchParams = useSearchParams();

  // Convertir les query parameters en objet TVShow
  const serie: TVShow = {
    id: parseInt(searchParams.get('id') || '0'),
    name: searchParams.get('name') || '',
    original_name: searchParams.get('original_name') || '',
    overview: searchParams.get('overview') || '',
    first_air_date: searchParams.get('first_air_date') || '',
    poster_path: searchParams.get('poster_path') || '',
    backdrop_path: searchParams.get('backdrop_path') || '',
    genre_ids: JSON.parse(searchParams.get('genre_ids') || '[]'), // Conversion en tableau
    original_language: searchParams.get('original_language') || '',
    origin_country: JSON.parse(searchParams.get('origin_country') || '[]'), // Conversion en tableau
    popularity: parseFloat(searchParams.get('popularity') || '0'),
    vote_average: parseFloat(searchParams.get('vote_average') || '0'),
    vote_count: parseInt(searchParams.get('vote_count') || '0'),
    adult: false, // Valeur par défaut si non incluse dans les query parameters
  };

  if (!serie.name) {
    return <div>Erreur : Aucune série trouvée.</div>;
  }

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      {/* Arrière-plan flou */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-md opacity-50"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${serie.backdrop_path})`,
        }}
      ></div>

      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col lg:flex-row items-start p-8 lg:p-16">
        {/* Image */}
        <div className="flex-shrink-0 w-full lg:w-1/3">
          <img
            src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
            alt={serie.name}
            className="rounded-lg shadow-lg w-full"
          />
        </div>

        {/* Informations */}
        <div className="mt-8 lg:mt-0 lg:ml-16 flex-1">
          <h1 className="text-4xl font-bold mb-4">{serie.name}</h1>
          <p className="text-sm text-gray-300 italic mb-4">
            {serie.original_name}
          </p>
          <p className="text-lg">{serie.overview}</p>

          {/* Informations supplémentaires */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <div>
              <h3 className="text-gray-400 text-sm">Première diffusion</h3>
              <p>{serie.first_air_date}</p>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm">Langue originale</h3>
              <p>{serie.original_language.toUpperCase()}</p>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm">Pays d'origine</h3>
              <p>{serie.origin_country.join(', ') || 'Inconnu'}</p>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm">Popularité</h3>
              <p>{serie.popularity.toFixed(1)} / 100</p>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm">Votes</h3>
              <p>{serie.vote_count}</p>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm">Note moyenne</h3>
              <p>{serie.vote_average}/10</p>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm">Genres</h3>
              <p>{serie.genre_ids.join(', ') || 'Aucun'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVShowDetails;
