import { useQuery } from "@tanstack/react-query";
import { ShowRepositoryTMDB } from "@/repositories/implementations/ShowRepositoryTMDB";

const tvShowRepository = new ShowRepositoryTMDB();

export const useFetchPopularShows = (query: string) => {
  return useQuery({
    queryKey: ["popularShows", query], 
    queryFn: async () => {
      const shows = await tvShowRepository.getPopular();

      if (query) {
        return shows.filter((show) =>
          show.name.toLowerCase().includes(query.toLowerCase())
        );
      }
      return shows;
    },
  });
};
