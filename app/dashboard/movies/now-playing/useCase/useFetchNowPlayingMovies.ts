import { useQuery } from "@tanstack/react-query";
import { MovieRepositoryTMDB } from "@/repositories/implementations/MovieRepositoryTMDB";

const movieRepository = new MovieRepositoryTMDB();

export const useFetchNowPlayingMovies = (query: string) => {
  return useQuery({
    queryKey: ['nowPlayingMovies', query], 
    queryFn: async () => {
      const movies = await movieRepository.getNowPlaying();
      if (query) {

        return movies.filter((movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase())
        );
      }
      return movies;
    },
  });
};
