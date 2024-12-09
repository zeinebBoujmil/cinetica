'use client';

import { useFetchOnTheAirShows } from "./useCase/useFetchOnTheAirShows";
import Loading from "@/app/Loading";
import ShowCard from "../../cards/showCard/showCard";
import { useSearch } from "../../contexts/searchContext";

export default function OnTheAir() {
  const { query } = useSearch();
  const { data: filteredSeries, isLoading, error } = useFetchOnTheAirShows(query);

  if (isLoading) return <Loading />;
  if (error) return <div>Erreur lors de la récupération des séries</div>;

  return (
    <div className="flex flex-col container mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold mb-6 text-center relative">
        On The Air Shows
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
