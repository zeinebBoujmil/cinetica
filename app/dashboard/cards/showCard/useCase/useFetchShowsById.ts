import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ShowRepositoryTMDB } from "@/repositories/implementations/ShowRepositoryTMDB";
import { TVShow } from "@/app/entities/TVShow";
import { useRouter } from "next/navigation";

const showRepository = new ShowRepositoryTMDB();

export const useFetchShowById = (id: number) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false); // État local pour les favoris
  const currentUser = localStorage.getItem("currentUser");
  const favoritesKey = `favoritesSeries_${currentUser}`;

  const { data: series, isLoading, error } = useQuery({
    queryKey: ["show", id],
    queryFn: async () => {
      return await showRepository.getShowById(id);
    },
  });

  // Effet pour synchroniser l'état `isFavorite` avec `localStorage`
  useEffect(() => {
    if (!series) return;

    const storedFavorites = JSON.parse(
      localStorage.getItem(favoritesKey) || "[]"
    ) as TVShow[];

    const favoriteStatus = storedFavorites.some((fav) => fav.id === id);
    setIsFavorite(favoriteStatus); // Met à jour l'état local
  }, [series, favoritesKey, id]);

  // Fonction pour ajouter ou retirer des favoris
  const toggleFavorite = () => {
    if (!currentUser) {
      console.error("Aucun utilisateur connecté.");
      return;
    }

    let updatedFavorites;
    const storedFavorites = JSON.parse(
      localStorage.getItem(favoritesKey) || "[]"
    ) as TVShow[];

    if (isFavorite) {
      updatedFavorites = storedFavorites.filter((fav) => fav.id !== id);
    } else if (series) {
      updatedFavorites = [...storedFavorites, series];
    }

    if (updatedFavorites) {
      localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
      setIsFavorite(!isFavorite); // Met à jour immédiatement l'état local
    }
  };

  const handleCardClick = () => {
    router.push(`/vueDetails/serieDetails/${id}`);
  };

  return {
    series,
    isLoading,
    error,
    isFavorite,
    toggleFavorite,
    handleCardClick,
  };
};
