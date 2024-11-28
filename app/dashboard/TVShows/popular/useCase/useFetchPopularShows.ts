import { useQuery } from "@tanstack/react-query";
import { ShowRepositoryTMDB } from "@/repositories/implementations/ShowRepositoryTMDB";

const tvShowRepository = new ShowRepositoryTMDB();

export const useFetchPopularShows = (query: string) => {
  return useQuery({
    queryKey: ["popularShows", query], // Inclure `query` dans la clé du cache
    queryFn: async () => {
      const shows = await tvShowRepository.getPopular();
      // Filtrer les séries selon la recherche
      if (query) {
        return shows.filter((show) =>
          show.name.toLowerCase().includes(query.toLowerCase())
        );
      }
      return shows;
    },
  });
};
