import { TVShow } from "@/app/entities/TVShow";

export interface ShowRepository {
  getOnTheAir(): Promise<TVShow[]>; // Récupérer les séries en cours de diffusion
  getTopRated(): Promise<TVShow[]>; // Récupérer les séries les mieux notées
  getPopular(): Promise<TVShow[]>; // Récupérer les séries populaires
}
