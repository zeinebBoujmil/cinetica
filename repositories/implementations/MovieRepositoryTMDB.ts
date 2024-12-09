import { Movie } from "@/app/entities/Movie";
import { MovieRepository } from "../interfaces/MovieRepository";

const API_BASE_URL = "/api/movies"; // Base URL pour les films

export class MovieRepositoryTMDB implements MovieRepository {
  async getNowPlaying(): Promise<Movie[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/now_playing`);
      if (!response.ok) {
        throw new Error(`Failed to fetch now playing movies: ${response.statusText}`);
      }
      const data = await response.json();
      return data as Movie[];
    } catch (error) {
      console.error("Error in getNowPlaying:", error);
      throw error;
    }
  }

  async getPopular(): Promise<Movie[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/popular`);
      if (!response.ok) {
        throw new Error(`Failed to fetch popular movies: ${response.statusText}`);
      }
      const data = await response.json();
      return data as Movie[];
    } catch (error) {
      console.error("Error in getPopular:", error);
      throw error;
    }
  }

  async getTopRated(): Promise<Movie[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/top-rated`);
      if (!response.ok) {
        throw new Error(`Failed to fetch top-rated movies: ${response.statusText}`);
      }
      const data = await response.json();
      return data as Movie[];
    } catch (error) {
      console.error("Error in getTopRated:", error);
      throw error;
    }
  }
  async getFilmById(id: number): Promise<Movie> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch movie details: ${response.statusText}`);
      }
      const data = await response.json();
      return data as Movie;
    } catch (error) {
      console.error("Error in getFilmById:", error);
      throw error;
    }
  }
}
