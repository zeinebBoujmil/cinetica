import { ShowRepository } from "../interfaces/ShowRepository";
import { TVShow } from "@/app/entities/TVShow";

export class ShowRepositoryTMDB implements ShowRepository {
  private readonly apiUrl = "/api/shows"; // Base URL pour les séries

  async getOnTheAir(): Promise<TVShow[]> {
    try {
      const response = await fetch(`${this.apiUrl}/on-the-air`);
      if (!response.ok) {
        throw new Error("Failed to fetch on-the-air TV shows");
      }
      const data = await response.json();
      return data as TVShow[];
    } catch (error) {
      console.error("Error in getOnTheAir:", error);
      throw error;
    }
  }

  async getTopRated(): Promise<TVShow[]> {
    try {
      const response = await fetch(`${this.apiUrl}/top-rated`);
      if (!response.ok) {
        throw new Error("Failed to fetch top-rated TV shows");
      }
      const data = await response.json();
      return data as TVShow[];
    } catch (error) {
      console.error("Error in getTopRated:", error);
      throw error;
    }
  }

  async getPopular(): Promise<TVShow[]> {
    try {
      const response = await fetch(`${this.apiUrl}/popular`);
      if (!response.ok) {
        throw new Error("Failed to fetch popular TV shows");
      }
      const data = await response.json();
      return data as TVShow[];
    } catch (error) {
      console.error("Error in getPopular:", error);
      throw error;
    }
  }
  async getShowById(id: number): Promise<TVShow> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch show details: ${response.statusText}`);
      }
      const data = await response.json();
      return data as TVShow;
    } catch (error) {
      console.error("Error in getShowById:", error);
      throw error;
    }
  }
}
