import { useQuery } from "@tanstack/react-query";
import { MovieRepositoryTMDB } from "@/repositories/implementations/MovieRepositoryTMDB";


const movieRepository = new MovieRepositoryTMDB();

export const useFetchTopRatedMovies = () => {
  return useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: () => movieRepository.getTopRated(),
  });
};
