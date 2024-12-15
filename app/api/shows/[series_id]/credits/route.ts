import { NextRequest } from "next/server";
import type { ShowCredits } from "@/app/entities/ShowCredits"; 

export async function GET(req: NextRequest, { params }: { params: { series_id: string } }) {
  const apiKey = process.env.TMDB_API_KEY; 
  const { series_id } = params; 
  console.log("ID Série :", series_id);

  const url = `https://api.themoviedb.org/3/tv/${series_id}/credits?api_key=${apiKey}`; 

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  try {
    const response = await fetch(url, options); 

    if (!response.ok) {
      throw new Error(`Erreur de requête : ${response.statusText}`);
    }

    const data = await response.json();
    const cast = data.cast as ShowCredits[]; 

    return new Response(JSON.stringify(cast), { 
      status: 200, 
      headers: { "Content-Type": "application/json" } 
    }); 
  } catch (error) {
    console.error("Erreur lors de la récupération des crédits :", error);
    return new Response(
      JSON.stringify({ error: "Échec de la récupération des crédits de la série" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
