// useCases/useFetchDiscoverData.ts
import { useQuery } from "@tanstack/react-query";
import { DiscoverRepositoryImpl } from "@/repositories/implementations/DiscoverRepositoryImpl";

const discoverRepository = new DiscoverRepositoryImpl();

export const useFetchDiscover = (query: string) => {
  return useQuery({
    queryKey: ['discoverData', query], 
    queryFn: async () => {
      const data = await discoverRepository.getDiscoverData();

      const filteredMovies = query
        ? data.films.filter((movie) =>
            movie.title.toLowerCase().includes(query.toLowerCase())
          )
        : data.films;

      const filteredSeries = query
        ? data.series.filter((serie) =>
            serie.name.toLowerCase().includes(query.toLowerCase())
          )
        : data.series;

      return { films: filteredMovies, series: filteredSeries };
    },
  });
};
