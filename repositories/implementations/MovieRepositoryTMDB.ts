import { Movie } from "@/app/entities/Movie";
import { MovieRepository } from "../interfaces/MovieRepository";

const API_BASE_URL = "/api/movies"; 

export class MovieRepositoryTMDB implements MovieRepository {
  async getNowPlaying(): Promise<Movie[]> {
    const response = await fetch(`${API_BASE_URL}/now_playing`);
    if (!response.ok) {
      throw new Error(`Failed to fetch now playing movies: ${response.statusText}`);
    }
    return await response.json();
  }

  async getPopular(): Promise<Movie[]> {
    const response = await fetch(`${API_BASE_URL}/popular`);
    if (!response.ok) {
      throw new Error(`Failed to fetch popular movies: ${response.statusText}`);
    }
    return await response.json(); 
  }

  async getTopRated(): Promise<Movie[]> {
    const response = await fetch(`${API_BASE_URL}/top-rated`);
    if (!response.ok) {
      throw new Error(`Failed to fetch top-rated movies: ${response.statusText}`);
    }
    return await response.json(); 
  }
}
