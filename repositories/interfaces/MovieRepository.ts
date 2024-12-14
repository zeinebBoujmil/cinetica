// repositories/interfaces/MovieRepository.ts
import { Movie } from "@/app/entities/Movie";
import { MovieCredits } from "@/app/entities/MovieCredits";

export interface MovieRepository {
  getNowPlaying(): Promise<Movie[]>; 
  getPopular(): Promise<Movie[]>;   
  getTopRated(): Promise<Movie[]>; 
  getFilmById(id: number): Promise<Movie>; 
  getCreditsByMovieId(id: number): Promise<MovieCredits[]>; // Nouvelle méthode

}
