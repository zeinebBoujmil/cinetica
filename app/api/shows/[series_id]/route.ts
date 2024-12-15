import { NextRequest } from "next/server";
import { TVShow } from "@/app/entities/TVShow";

export async function GET(req: NextRequest, { params }: { params: { series_id: string } }) {
  const { series_id } = params; 
  const apiKey = process.env.TMDB_API_KEY; 
  console.log("ID Série :", series_id);

  const url = `https://api.themoviedb.org/3/tv/${series_id}?api_key=${apiKey}&language=fr-FR`; 

  try {
    const response = await fetch(url); 
    if (!response.ok) {
      throw new Error(`Erreur de requête : ${response.statusText}`);
    }

    const data = await response.json();


    const seriesDetails = data as TVShow;


    if (!seriesDetails.id || !seriesDetails.name) {
      throw new Error("Les détails de la série sont invalides ou incomplets.");
    }

    return new Response(JSON.stringify(seriesDetails), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }); 
  } catch (error) {
    console.error("Erreur lors de la récupération des détails de la série :", error);
    return new Response(
      JSON.stringify({ error: "Échec de la récupération des détails de la série" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
