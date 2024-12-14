'use client';

import { useFetchPopularMovies } from "./useCase/useFetchPopularMovies";
import Loading from "@/app/Loading";
import MovieCard from "../../cards/filmCard/filmCard";
import { useSearch } from "../../../contexts/searchContext";

export default function Popular() {
  const { query } = useSearch();
  const { data, isLoading, error } = useFetchPopularMovies(query);

  if (isLoading) return <Loading />;
  if (error) return <div>Erreur lors de la récupération des films populaires</div>;

  return (
    <div className="flex flex-col container mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold mb-6 text-center relative">
      Popular Films
      <span className="block h-1 w-24 bg-primary mx-auto mt-2 rounded-full"></span>
      </h1>
      <div className="flex flex-wrap justify-center gap-2 gap-y-4">
      {data?.map((movie) => (
          <MovieCard key={movie.id} id={movie.id} />
        ))}
      </div>
    </div>
  );
}
