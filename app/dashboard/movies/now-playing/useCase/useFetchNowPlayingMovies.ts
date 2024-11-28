import { useQuery } from "@tanstack/react-query";
import { MovieRepositoryTMDB } from "@/repositories/implementations/MovieRepositoryTMDB";

const movieRepository = new MovieRepositoryTMDB();

export const useFetchNowPlayingMovies = (query: string) => {
  return useQuery({
    queryKey: ['nowPlayingMovies', query], // Ajoutez le `query` comme dépendance
    queryFn: async () => {
      const movies = await movieRepository.getNowPlaying();
      if (query) {
        // Appliquer le filtre directement ici
        return movies.filter((movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase())
        );
      }
      return movies;
    },
  });
};
