'use client'
import { useState, useEffect } from "react";
import { Movie } from "@/app/entities/Movie";
import Loading from "@/app/Loading";
import MovieCard from "../../cards/filmCard";
import { useSearch } from "../../contexts/searchContext";


export default function NowPlaying() {
    const [data, setData] = useState<{ films: Movie[] } | null>(null);
    const { query } = useSearch();




    useEffect(() => {
        const fetchMovies = async () => {
            try {
                console.log("Fetching movies data from /api/movies/now_playing...");
    
                const response = await fetch('/api/movies/now_playing');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const data = await response.json();
                console.log("Data received:", data); // Vérifiez les données reçues avant le filtrage
    
                // Application du filtre
                const filteredMovies = data.filter((movie: Movie) =>
                    movie.title.toLowerCase().includes(query.toLowerCase())
                );
                console.log("Filtered movies:", filteredMovies);
    
                setData({ films: filteredMovies }); // Stockez les données filtrées
    
            } catch (error) {
                console.error("Error fetching movies data:", error); // Gestion des erreurs
            }
        };
    
        fetchMovies(); // Appel de la fonction asynchrone
    }, [query]); // Ajout de searchQuery comme dépendance
    

    return (
        <div className="flex flex-col container mx-auto px-4 py-8">
            {/* Section Films */}
            <div>
                {data === null ? (
                    <Loading />
                ) : (
                    <>
                       <h1 className="text-3xl font-extrabold mb-6 text-center relative">
                          Now Playing Films
                          <span className="block h-1 w-24 bg-primary mx-auto mt-2 rounded-full"></span>
                          </h1>
                        <div className="flex flex-wrap justify-center gap-2">
                            {data?.films?.map((movie) => (
                                <MovieCard key={movie.id}
                                    movie={movie} 
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
                 
    );
}