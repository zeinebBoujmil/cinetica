'use client';

import { useFetchPopularShows } from "../../TVShows/popular/useCase/useFetchPopularShows"
import Loading from "@/app/Loading";
import ShowCard from "../../cards/showCard/showCard";
import { useSearch } from "../../contexts/searchContext";

export default function Popular() {
  const { query } = useSearch();
  const { data: filteredSeries, isLoading, error } = useFetchPopularShows(query);

  if (isLoading) return <Loading />;
  if (error) return <div>Erreur lors de la récupération des séries populaires</div>;

  return (
    <div className="flex flex-col container mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold mb-6 text-center relative">
        Popular Shows
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
