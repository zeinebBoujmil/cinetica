'use client';

import { useFetchNowPlayingMovies } from "./useCase/useFetchNowPlayingMovies";
import Loading from "@/app/Loading";
import MovieCard from "../../cards/filmCard";
import { useSearch } from "../../contexts/searchContext";

export default function NowPlaying() {
  const { query } = useSearch();
  const { data, isLoading, error } = useFetchNowPlayingMovies(query);

  if (isLoading) return <Loading />;
  if (error) return <div>Erreur lors de la récupération des films</div>;

  return (
    <div className="min-h-screen py-8 px-6">
      <h1 className="text-3xl font-extrabold mb-6 text-center relative">
      Now Playing Films
        <span className="block h-1 w-24 bg-primary mx-auto mt-2 rounded-full"></span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {data?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
