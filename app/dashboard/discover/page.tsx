'use client';

import { useState, useEffect } from 'react';
import { Movie } from '../../entities/Movie';
import { TVShow } from '../../entities/TVShow';
import Loading from '../../Loading';
import MovieCard from '../../dashboard/cards/filmCard/page';
import ShowCard from '../../dashboard/cards/showCard/page';
import ModalFilm from '../Modals/modalFilm';
import ModalSerie from '../Modals/modalShow';
import { useSearch } from '../contexts/searchContext';
import { useSidebar } from '@/components/ui/sidebar';


export default function Discover() {
    const [data, setData] = useState<{ films: Movie[]; series: TVShow[] } | null>(null);
    const { query } = useSearch(); // Utilisation de la recherche
    const [selectedItem, setSelectedItem] = useState<Movie | TVShow | null>(null);
    const [isMovie, setIsMovie] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { state } = useSidebar(); // Importer le contexte de la sidebar


    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching movies and series data from /api/discover...');

                const response = await fetch('/api/discover');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Data received:', data);

                // Application du filtre pour les films
                const filteredMovies = data.films.filter((movie: Movie) =>
                    movie.title.toLowerCase().includes(query.toLowerCase())
                );

                // Application du filtre pour les séries
                const filteredSeries = data.series.filter((serie: TVShow) =>
                    serie.name.toLowerCase().includes(query.toLowerCase())
                );

                console.log('Filtered movies:', filteredMovies);
                console.log('Filtered series:', filteredSeries);

                setData({ films: filteredMovies, series: filteredSeries }); // Met à jour l'état avec les données filtrées
            } catch (error) {
                console.error('Error fetching movies and series data:', error);
            }
        };

        fetchData(); // Appel de la fonction asynchrone
    }, [query]); // Refiltrer à chaque modification de `query`

    // Gestion de l'ouverture et de la fermeture du modal
    const openModal = (item: Movie | TVShow, type: 'movie' | 'serie') => {
        setSelectedItem(item);
        setIsMovie(type === 'movie');
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedItem(null);
        setIsModalOpen(false);
    };

    return (
        <div
            className="flex flex-col container mx-auto px-4 py-4 sm:pr-0"
        >
            {data === null ? (
                <Loading />
            ) : (
                <div
                className={`relative flex flex-col px-4 py-4  overflow-x-hidden`} // Empêche les débordements horizontaux
                style={{
                    width: state === "expanded" ? "calc(100vw - 16rem)" : "100vw", // Ajuste la largeur en fonction de la sidebar
                  }}
              >
                {/* Section Films */}
                <div className="mt-8">
                  <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Films</h1>
                  <div
                    className="flex overflow-x-auto gap-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
                  >
                    {data.films.map((movie) => (
                      <div key={movie.id} className="flex-shrink-0 w-64">
                        <MovieCard
                          movie={movie}
                          onClick={() => openModal(movie, "movie")}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              
                {/* Section Séries */}
                <div className="mt-8">
                  <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Séries</h1>
                  <div
                    className="flex overflow-x-auto gap-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
                  >
                    {data.series.map((serie) => (
                      <div key={serie.id} className="flex-shrink-0 w-64">
                        <ShowCard
                          serie={serie}
                          onClick={() => openModal(serie, "serie")}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              
                {/* Modals */}
                <ModalFilm
                  isOpen={isModalOpen && isMovie}
                  onClose={closeModal}
                  item={selectedItem as Movie}
                  isMovie={true}
                />
                <ModalSerie
                  isOpen={isModalOpen && !isMovie}
                  onClose={closeModal}
                  serie={selectedItem as TVShow}
                  isMovie={false}
                />
              </div>
              

            )}
        </div>
    );
}
