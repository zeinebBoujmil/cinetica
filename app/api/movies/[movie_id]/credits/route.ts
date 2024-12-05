import { NextRequest } from "next/server";
import { MovieCredits } from "@/app/entities/MovieCredits";

export async function GET(req: NextRequest, { params }: { params: { movie_id: string } }) {
  const apiKey = process.env.TMDB_API_KEY;
  const { movie_id } = params;
  console.log("idddddddd",movie_id);

  const url = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${apiKey}`;

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
    const cast: MovieCredits[] = data.cast; // Typage des données reçues en tant que `MovieCredits[]`

    return new Response(JSON.stringify(cast), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des crédits :", error);
    return new Response(JSON.stringify({ error: "Échec de la récupération des crédits" }), { status: 500 });
  }
}
