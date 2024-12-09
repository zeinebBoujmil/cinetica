// repositories/interfaces/MovieRepository.ts
import { Movie } from "@/app/entities/Movie";

export interface MovieRepository {
  getNowPlaying(): Promise<Movie[]>; 
  getPopular(): Promise<Movie[]>;   
  getTopRated(): Promise<Movie[]>; 
  getFilmById(id: number): Promise<Movie>; // Ajout de la méthode pour récupérer un film par son ID
}
