import { NextRequest } from "next/server";
import { Movie } from "@/app/entities/Movie";
export async function GET(req: NextRequest, { params }: { params: { movie_id: string } }) {
  const { movie_id } = params; // Récupère l'ID du film depuis les paramètres
  const apiKey = process.env.TMDB_API_KEY; // Clé API pour TMDB
  console.log("ID du film :", movie_id);

  const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}&language=fr-FR`; // URL de l'API externe

  try {
    const response = await fetch(url); // Requête vers l'API externe
    if (!response.ok) {
      throw new Error(`Erreur de requête : ${response.statusText}`);
    }

    // Conversion de la réponse en JSON
    const data: Movie = await response.json();

    // Retourne les détails du film avec le bon type
    return new Response(JSON.stringify(data), { 
      status: 200, 
      headers: { "Content-Type": "application/json" } 
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des détails du film :", error);
    return new Response(
      JSON.stringify({ error: "Échec de la récupération des détails du film" }), 
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
