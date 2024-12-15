import { useQuery } from "@tanstack/react-query";
import { ShowRepositoryTMDB } from "@/repositories/implementations/ShowRepositoryTMDB";

const tvShowRepository = new ShowRepositoryTMDB();

export const useFetchOnTheAirShows = (query: string) => {
  return useQuery({
    queryKey: ["onTheAirShows", query], 
    queryFn: async () => {
      const shows = await tvShowRepository.getOnTheAir();

      if (query) {
        return shows.filter((serie) =>
          serie.name.toLowerCase().includes(query.toLowerCase())
        );
      }
      return shows;
    },
  });
};
