import { NextRequest } from "next/server";
import type { ShowCredits } from "@/app/entities/ShowCredits"; // Import de l'interface ShowCredits

export async function GET(req: NextRequest, { params }: { params: { series_id: string } }) {
  const apiKey = process.env.TMDB_API_KEY; // Clé API pour TMDB
  const { series_id } = params; // Récupère l'ID de la série depuis les paramètres
  console.log("ID Série :", series_id);

  const url = `https://api.themoviedb.org/3/tv/${series_id}/credits?api_key=${apiKey}`; // URL pour les crédits des séries

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  try {
    const response = await fetch(url, options); // Requête vers l'API externe

    if (!response.ok) {
      throw new Error(`Erreur de requête : ${response.statusText}`);
    }

    const data = await response.json();
    const cast = data.cast as ShowCredits[]; // Typage des données en tant que tableau de `ShowCredits`

    return new Response(JSON.stringify(cast), { 
      status: 200, 
      headers: { "Content-Type": "application/json" } 
    }); // Retourne le casting de la série
  } catch (error) {
    console.error("Erreur lors de la récupération des crédits :", error);
    return new Response(
      JSON.stringify({ error: "Échec de la récupération des crédits de la série" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
