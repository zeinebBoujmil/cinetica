import { NextRequest } from "next/server";
import { Movie } from "@/app/entities/Movie";
export async function GET(req: NextRequest, { params }: { params: { movie_id: string } }) {
  const { movie_id } = params; 
  const apiKey = process.env.TMDB_API_KEY; 
  console.log("ID du film :", movie_id);

  const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}&language=fr-FR`; 

  try {
    const response = await fetch(url); 
    if (!response.ok) {
      throw new Error(`Erreur de requête : ${response.statusText}`);
    }


    const data: Movie = await response.json();


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
