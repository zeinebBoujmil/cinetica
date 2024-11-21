// app/api/movies/popular.js

import { TVShow } from "@/app/entities/TVShow";

export async function GET() {
    const apiKey = process.env.TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=en-US&page=1`;
  
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    };
  
    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error(`Erreur de requête : ${response.statusText}`);
      }
  
      const data = await response.json();
      const tvShow: TVShow[] = data.results; // Utilisez le type `Movie[]` pour les résultats

      return new Response(JSON.stringify(tvShow), { status: 200 });
    } catch (error) {
        console.error("Erreur de récupération :", error);

      console.error("Erreur lors de la récupération des films populaires ");
      return new Response(JSON.stringify({ error: "Échec de la récupération des films populaires" }), { status: 500 });
    }
  }
  