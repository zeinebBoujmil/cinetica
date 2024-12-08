// repositories/implementations/DiscoverRepositoryImpl.ts
import { Movie } from '@/app/entities/Movie';
import { TVShow } from '@/app/entities/TVShow';
import { DiscoverInterface } from '../interfaces/DiscoverRepository';

export class DiscoverRepositoryImpl implements DiscoverInterface {
  async getDiscoverData(): Promise<{ films: Movie[]; series: TVShow[] }> {
    try {
      const response = await fetch('/api/discover');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        films: data.films as Movie[],
        series: data.series as TVShow[],
      };
    } catch (error) {
      console.error('Error fetching movies and series data:', error);
      throw error; // Rejette l'erreur pour que la couche supérieure puisse la gérer
    }
  }
}
