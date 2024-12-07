import { NextRequest } from "next/server";
import type { ShowDetails } from "@/app/entities/ShowDetails";

export async function GET(req: NextRequest, { params }: { params: { series_id: string } }) {
  const { series_id } = params; // Récupère l'ID de la série depuis les paramètres
  const apiKey = process.env.TMDB_API_KEY; // Clé API pour TMDB
  console.log("ID Série :", series_id);

  const url = `https://api.themoviedb.org/3/tv/${series_id}?api_key=${apiKey}&language=fr-FR`; // URL de l'API externe

  try {
    const response = await fetch(url); // Requête vers l'API externe
    if (!response.ok) {
      throw new Error(`Erreur de requête : ${response.statusText}`);
    }

    const data = await response.json();

    // Cast de la réponse en SeriesDetails
    const seriesDetails = data as ShowDetails;

    // Validation supplémentaire (optionnelle) pour vérifier les champs essentiels
    if (!seriesDetails.id || !seriesDetails.name) {
      throw new Error("Les détails de la série sont invalides ou incomplets.");
    }

    return new Response(JSON.stringify(seriesDetails), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }); // Retourne les détails de la série avec le typage correct
  } catch (error) {
    console.error("Erreur lors de la récupération des détails de la série :", error);
    return new Response(
      JSON.stringify({ error: "Échec de la récupération des détails de la série" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}