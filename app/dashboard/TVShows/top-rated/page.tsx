'use client';

import { useFetchTopRatedShows } from "../top-rated/useCase/useFetchTopRatedShows"
import Loading from "@/app/Loading";
import ShowCard from "../../cards/showCard";
import { useSearch } from "../../contexts/searchContext";

export default function TopRatedSeries() {
  const { query } = useSearch();
  const { data: filteredSeries, isLoading, error } = useFetchTopRatedShows(query);

  if (isLoading) return <Loading />;
  if (error) return <div>Erreur lors de la récupération des séries top-rated</div>;

  return (
    <div className="flex flex-col container mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold mb-6 text-center relative">
        Top Rated Shows
        <span className="block h-1 w-24 bg-primary mx-auto mt-2 rounded-full"></span>
      </h1>
      <div className="flex flex-wrap justify-center gap-2">
        {filteredSeries?.map((serie) => (
          <ShowCard key={serie.id} id={serie.id} />
        ))}
      </div>
    </div>
  );
}
