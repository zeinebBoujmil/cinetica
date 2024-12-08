// interfaces/DiscoverInterface.ts
import { Movie } from "@/app/entities/Movie";
import { TVShow } from "@/app/entities/TVShow";

export interface DiscoverInterface {
  getDiscoverData: () => Promise<{ films: Movie[]; series: TVShow[] }>;
}
