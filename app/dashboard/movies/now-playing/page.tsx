'use client';

import { useFetchNowPlayingMovies } from "./useCase/useFetchNowPlayingMovies";
import Loading from "@/app/Loading";
import MovieCard from "../../cards/filmCard/filmCard";
import { useSearch } from "../../../contexts/searchContext";

export default function NowPlaying() {
  const { query } = useSearch();
  const { data, isLoading, error } = useFetchNowPlayingMovies(query);

  if (isLoading) return <Loading />;
  if (error) return <div>Erreur lors de la récupération des films</div>;

  return (
    <div className="flex flex-col container mx-auto px-4 py-8 overflow-x-hidden">
      <h1 className="text-3xl font-extrabold mb-6 text-center relative">
      Now Playing Films
      <span className="block h-1 w-24 bg-primary mx-auto mt-2 rounded-full"></span>
      </h1>
      <div className="flex flex-wrap justify-center gap-2 gap-y-4 ">
      {data?.map((movie) => (
          <MovieCard key={movie.id} id={movie.id} />
        ))}
      </div>
    </div>
  );
}
