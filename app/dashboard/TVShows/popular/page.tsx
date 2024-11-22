'use client'
import { TVShow } from "@/app/entities/TVShow";
import Loading from "@/app/Loading";
import { useState, useEffect } from "react";
import ShowCard from "../../cards/showCard/page";
import { useSearch } from "../../contexts/searchContext";
import ModalSerie from "../../Modals/modalShow";
import { Movie } from "@/app/entities/Movie";

export default function Popular() {
    const [data, setData] = useState<{ series: TVShow[] } | null>(null);

    const { query } = useSearch();
    const [selectedItem, setSelectedItem] = useState<Movie | TVShow | null>(null);
    const [isMovie, setIsMovie] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchShows = async () => {
            try {
                console.log("Fetching TV shows data from /api/shows/on-the-air...");
                const response = await fetch('/api/shows/on-the-air');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Data received:", data); // Vérifiez les données brutes

                // Application du filtre
                const filteredSeries = data.filter((show: TVShow) =>
                    show.name.toLowerCase().includes(query.toLowerCase())
                );
                console.log("Filtered series:", filteredSeries);

                setData({ series: filteredSeries }); // Stockez les données filtrées

            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchShows(); // Appel de la fonction asynchrone
    }, [query]); // Ajout de searchQuery comme dépendance
    
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
        <div className="flex flex-col container mx-auto px-4 py-8">
            {data === null ? (
                <Loading />
            ) : (
                <>
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Popular Series</h1>
                    <div className="flex flex-wrap justify-center gap-2">
                        {data.series?.map((serie) => (
                            <ShowCard key={serie.id}
                                serie={serie} onClick={() => openModal(serie, 'serie')}/>
                        ))}
                    </div>
                </>
            )}
                      <ModalSerie
            isOpen={isModalOpen && !isMovie}
            onClose={closeModal}
            serie={selectedItem as TVShow}
            isMovie={false}
          />
        </div>
    );
}