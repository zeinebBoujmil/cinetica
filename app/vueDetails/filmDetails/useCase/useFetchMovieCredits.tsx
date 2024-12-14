import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Movie } from "@/app/entities/Movie";
import { MovieCredits } from "@/app/entities/MovieCredits";

export const useFetchMovieCredits = (movieId: string) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [credits, setCredits] = useState<MovieCredits[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  // Fonction pour gérer le retour
  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await fetch(`/api/movies/${movieId}`);
        const creditsResponse = await fetch(`/api/movies/${movieId}/credits`);

        if (!movieResponse.ok || !creditsResponse.ok) {
          throw new Error("Failed to fetch movie details or credits.");
        }

        const movieData = await movieResponse.json();
        const creditsData = await creditsResponse.json();

        setMovie(movieData);
        setCredits(creditsData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Une erreur s'est produite lors du chargement des données.");
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return {
    movie,
    credits,
    loading,
    error,
    handleBack, // Inclure handleBack dans le retour
  };
};
