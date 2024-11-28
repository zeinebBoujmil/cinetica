import { Movie } from "@/app/entities/Movie";

export interface MovieRepository {
  getNowPlaying(): Promise<Movie[]>; 
  getPopular(): Promise<Movie[]>;   
  getTopRated(): Promise<Movie[]>; 
}
