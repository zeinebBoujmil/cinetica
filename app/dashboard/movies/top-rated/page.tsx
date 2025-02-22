'use client';

import { useFetchTopRatedMovies } from "./useCase/useFetchTopRatedMovies"; 
import Loading from "@/app/Loading";
import MovieCard from "../../cards/filmCard/filmCard";
import { useSearch } from "../../../contexts/searchContext";

export default function TopRated() {
  const { query } = useSearch(); 
  const { data, isLoading, error } = useFetchTopRatedMovies(); 

  if (isLoading) return <Loading />;
  if (error) return <div>Erreur lors de la récupération des films</div>;


  const filteredMovies = data?.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col container mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold mb-6 text-center relative">
      Top Rated Films
      <span className="block h-1 w-24 bg-primary mx-auto mt-2 rounded-full"></span>
      </h1>
      <div className="flex flex-wrap justify-center gap-2 gap-y-4">
      {filteredMovies?.map((movie) => (
          <MovieCard key={movie.id} id={movie.id} />
        ))}
      </div>
    </div>
  );
}
