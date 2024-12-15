import { MovieRepository } from '../interfaces/MovieRepository';
import { Movie } from '@/app/entities/Movie';

export class MovieRepositoryTMDB implements MovieRepository {
  private baseUrl = 'https://api.themoviedb.org/3';
  private apiKey = process.env.TMDB_API_KEY;

  private async fetchMovies(endpoint: string): Promise<Movie[]> {
    const url = `${this.baseUrl}${endpoint}?api_key=${this.apiKey}&language=en-US&page=1`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur de requête : ${response.statusText}`);
    }

    const data = await response.json();
    return data.results as Movie[];
  }

  async getNowPlaying(): Promise<Movie[]> {
    return this.fetchMovies('/movie/now_playing');
  }

  async getPopular(): Promise<Movie[]> {
    return this.fetchMovies('/movie/popular');
  }

  async getTopRated(): Promise<Movie[]> {
    return this.fetchMovies('/movie/top_rated');
  }

  async discoverMovies(): Promise<Movie[]> {
    return this.fetchMovies('/discover/movie');
  }
}
