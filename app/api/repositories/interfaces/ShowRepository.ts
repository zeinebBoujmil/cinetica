import { TVShow } from '@/app/entities/TVShow';

export interface ShowRepository {
  getOnTheAir(): Promise<TVShow[]>;
  getPopular(): Promise<TVShow[]>;
  getTopRated(): Promise<TVShow[]>;
}
