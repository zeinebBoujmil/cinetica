import { useQuery } from "@tanstack/react-query";
import { ShowRepositoryTMDB } from "@/repositories/implementations/ShowRepositoryTMDB";

const tvShowRepository = new ShowRepositoryTMDB();

export const useFetchTopRatedShows = (query: string) => {
  return useQuery({
    queryKey: ["topRatedShows", query], // Inclure `query` dans la clé du cache
    queryFn: async () => {
      const shows = await tvShowRepository.getTopRated();
      // Appliquer le filtre dans le useCase
      if (query) {
        return shows.filter((show) =>
          show.name.toLowerCase().includes(query.toLowerCase())
        );
      }
      return shows;
    },
  });
};
