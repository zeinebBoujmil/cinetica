import { useState, useEffect } from 'react';
import { TVShow } from '@/app/entities/TVShow';
import { useSearch } from '@/app/contexts/searchContext';

export const useFetchFavoriteShows = () => {
  const [favoritesSeries, setFavorites] = useState<TVShow[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const { query } = useSearch();

  // Récupérer l'utilisateur courant
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    setCurrentUser(user);
  }, []);

  // Charger les séries favorites
  useEffect(() => {
    if (!currentUser) return;

    const storedFavorites = JSON.parse(localStorage.getItem(`favoritesSeries_${currentUser}`) || '[]');
    const filteredFavorites = query
      ? storedFavorites.filter((show: TVShow) =>
          show.name.toLowerCase().includes(query.toLowerCase())
        )
      : storedFavorites;

    setFavorites(filteredFavorites);
  }, [query, currentUser]);

  return { favoritesSeries, currentUser };
};
