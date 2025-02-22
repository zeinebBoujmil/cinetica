import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Movie } from "@/app/entities/Movie";
import { useRouter } from "next/navigation";
import { MovieRepositoryTMDB } from "@/repositories/implementations/MovieRepositoryTMDB";

const movieRepository = new MovieRepositoryTMDB();

export const useFetchMovieById = (id: number) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const currentUser = localStorage.getItem("currentUser");
  const favoritesKey = `favorites_${currentUser}`;

  const { data: movie, isLoading, error } = useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      return await movieRepository.getFilmById(id);
    },
  });


  useEffect(() => {
    if (!movie) return;

    const storedFavorites = JSON.parse(
      localStorage.getItem(favoritesKey) || "[]"
    ) as Movie[];

    const favoriteStatus = storedFavorites.some((fav) => fav.id === id);
    setIsFavorite(favoriteStatus); 
  }, [movie, favoritesKey, id]);


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
      localStorage.setItem("favoritesUpdated", Date.now().toString()); 
      setIsFavorite(!isFavorite); 
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
