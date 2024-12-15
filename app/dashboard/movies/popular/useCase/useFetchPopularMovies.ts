import { useQuery } from "@tanstack/react-query";
import { MovieRepositoryTMDB } from "@/repositories/implementations/MovieRepositoryTMDB";

const movieRepository = new MovieRepositoryTMDB();

export const useFetchPopularMovies = (query: string) => {
  return useQuery({
    queryKey: ['popularMovies', query],
    queryFn: async () => {
      const movies = await movieRepository.getPopular();
      if (query) {

        return movies.filter((movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase())
        );
      }
      return movies;
    },
  });
};
