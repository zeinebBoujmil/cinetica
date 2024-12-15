import { useState, useEffect } from 'react';
import { Movie } from '@/app/entities/Movie';
import { useSearch } from '@/app/contexts/searchContext';
export const useFetchFavoriteMovies = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const { query } = useSearch();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    setCurrentUser(user);
  }, []);

  useEffect(() => {

    if (!currentUser) return;

    const storedFavorites = JSON.parse(localStorage.getItem(`favorites_${currentUser}`) || '[]');
    const filteredFavorites = query
      ? storedFavorites.filter((movie: Movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase())
        )
      : storedFavorites;

    setFavorites(filteredFavorites);
  }, [query, currentUser]);

  return { favorites, currentUser };
};
