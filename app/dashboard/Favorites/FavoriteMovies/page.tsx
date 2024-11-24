'use client'
import React, { useEffect, useState } from 'react';
import { Movie } from '@/app/entities/Movie';
import { useSearch } from '../../contexts/searchContext';
import MovieCard from '../../cards/filmCard';

interface FFProps {
    onMovieClick: (movie: Movie) => void;
}

const FavoritesFilms: React.FC<FFProps> = ({ onMovieClick }) => {
    const [favorites, setFavorites] = useState<Movie[]>([]);
    const currentUser = localStorage.getItem('currentUser'); // Récupérer l'utilisateur connecté
    const { query } = useSearch();

    useEffect(() => {
        if (!currentUser) {
            console.error("Aucun utilisateur connecté.");
            return;
        }

        // Récupérer les favoris de l'utilisateur actuel depuis localStorage
        const storedFavorites = JSON.parse(localStorage.getItem(`favorites_${currentUser}`) || '[]');

        if (query) {
            // Filtrer les favoris en fonction de la requête de recherche
            const filteredFavorites = storedFavorites.filter((movie: Movie) =>
                movie.title.toLowerCase().includes(query.toLowerCase())
            );
            setFavorites(filteredFavorites);
        } else {
            setFavorites(storedFavorites);
        }
    }, [query, currentUser]);

    return (
        <div className="min-h-screen text-gray-700 py-8 px-6">
            <h2 className="text-4xl font-bold mb-6 text-center">Vos Films Favoris</h2>
            {favorites.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {favorites.map((movie) => (
                        <div key={movie.id} className="flex justify-center">
                            <MovieCard movie={movie} onClick={() => {
                                onMovieClick(movie);
                            }}
                            />
                        </div>

                    ))}
                </div>
            ) : (
                <div className="flex justify-center items-center h-64">
                    <p className="text-lg text-gray-400">Aucun film n a été ajouté aux favoris.</p>
                </div>
            )}
        </div>
    );
};

export default FavoritesFilms; // Assurez-vous que c'est bien exporté
