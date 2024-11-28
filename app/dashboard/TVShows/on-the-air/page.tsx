'use client'

import { TVShow } from "@/app/entities/TVShow";
import Loading from "@/app/Loading";
import { useEffect, useState } from "react";
import ShowCard from "../../cards/showCard";
import { useSearch } from "../../contexts/searchContext";


export default function OnTheAir() {
    const [data, setData] = useState<{ series: TVShow[] } | null>(null);
    const { query } = useSearch();

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

    return (
        <div className="flex flex-col container mx-auto px-4 py-8">
            {data === null ? (
                <Loading />
            ) : (
                <>
                     <h1 className="text-3xl font-extrabold mb-6 text-center relative">
                          On The Air Shows
                          <span className="block h-1 w-24 bg-primary mx-auto mt-2 rounded-full"></span>
                          </h1>
                    <div className="flex flex-wrap justify-center gap-2">
                        {data.series?.map((serie) => (
                            <ShowCard key={serie.id}
                                serie={serie} 
                            />))}
                    </div>
                </>

            )}

        </div>
        
    );
}