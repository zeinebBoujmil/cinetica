import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Movie } from "@/app/entities/Movie";
import { useRouter } from "next/navigation";
import { MovieRepositoryTMDB } from "@/repositories/implementations/MovieRepositoryTMDB";

const movieRepository = new MovieRepositoryTMDB();

export const useFetchMovieById = (id: number) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false); // Ajout d'un état local pour isFavorite
  const currentUser = localStorage.getItem("currentUser");
  const favoritesKey = `favorites_${currentUser}`;

  const { data: movie, isLoading, error } = useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      return await movieRepository.getFilmById(id);
    },
  });

  // Met à jour isFavorite quand le film ou les favoris changent
  useEffect(() => {
    if (!movie) return;

    const storedFavorites = JSON.parse(
      localStorage.getItem(favoritesKey) || "[]"
    ) as Movie[];

    const favoriteStatus = storedFavorites.some((fav) => fav.id === id);
    setIsFavorite(favoriteStatus); // Met à jour l'état
  }, [movie, favoritesKey, id]);

  // Gérer l'ajout/suppression des favoris
  const toggleFavorite = () => {
    if (!currentUser) {
      console.error("Aucun utilisateur connecté.");
      return;
    }

    let updatedFavorites;
    const storedFavorites = JSON.parse(
      localStorage.getItem(favoritesKey) || "[]"
    ) as Movie[];

    if (isFavorite) {
      updatedFavorites = storedFavorites.filter((fav) => fav.id !== id);
    } else if (movie) {
      updatedFavorites = [...storedFavorites, movie];
    }

    if (updatedFavorites) {
      localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
      localStorage.setItem("favoritesUpdated", Date.now().toString()); // Clé temporaire pour notifier
      setIsFavorite(!isFavorite); // Met à jour immédiatement l'état
    }
  };

  const handleCardClick = () => {
    router.push(`/vueDetails/filmDetails/${id}`);
  };

  return {
    movie,
    isLoading,
    error,
    isFavorite,
    toggleFavorite,
    handleCardClick,
  };
};
