import { ShowRepository } from '../interfaces/ShowRepository';
import { TVShow } from '@/app/entities/TVShow';

export class ShowRepositoryTMDB implements ShowRepository {
  private baseUrl = 'https://api.themoviedb.org/3';
  private apiKey = process.env.TMDB_API_KEY;

  private async fetchMovies(endpoint: string): Promise<TVShow[]> {
    const url = `${this.baseUrl}${endpoint}?api_key=${this.apiKey}&language=en-US&page=1`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur de requête : ${response.statusText}`);
    }

    const data = await response.json();
    return data.results as TVShow[];
  }

  async getOnTheAir(): Promise<TVShow[]> {
    return this.fetchMovies('/tv/on_the_air');
  }

  async getPopular(): Promise<TVShow[]> {
    return this.fetchMovies('/tv/popular');
  }

  async getTopRated(): Promise<TVShow[]> {
    return this.fetchMovies('/tv/top_rated');
  }
}