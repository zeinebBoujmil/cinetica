import { NextRequest } from "next/server";
import { Movie } from "@/app/entities/Movie";

export async function GET(req: NextRequest, { params }: { params: { movie_id: string } }) {
  const { movie_id } = params; // Récupère l'ID du film depuis les paramètres
  const apiKey = process.env.TMDB_API_KEY;
  console.log("idddddddd",movie_id);

  const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}&language=fr-FR`; // URL de l'API externe

  try {
    const response = await fetch(url); // Requête vers l'API externe
    if (!response.ok) {
      throw new Error(`Erreur de requête : ${response.statusText}`);
    }

    const data = await response.json(); // Conversion de la réponse en JSON



    return new Response(JSON.stringify(data), { status: 200 }); // Retourne les détails du film
  } catch (error) {
    console.error("Erreur lors de la récupération des détails du film :", error);
    return new Response(JSON.stringify({ error: "Échec de la récupération des détails du film" }), { status: 500 });
  }
}
