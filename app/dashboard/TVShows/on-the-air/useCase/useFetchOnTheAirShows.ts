import { useQuery } from "@tanstack/react-query";
import { ShowRepositoryTMDB } from "@/repositories/implementations/ShowRepositoryTMDB";

const tvShowRepository = new ShowRepositoryTMDB();

export const useFetchOnTheAirShows = (query: string) => {
  return useQuery({
    queryKey: ["onTheAirShows", query], // Inclure la query dans le cache key
    queryFn: async () => {
      const shows = await tvShowRepository.getOnTheAir();
      // Filtrer les séries selon la recherche
      if (query) {
        return shows.filter((serie) =>
          serie.name.toLowerCase().includes(query.toLowerCase())
        );
      }
      return shows;
    },
  });
};
