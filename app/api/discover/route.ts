import { Movie } from "@/app/entities/Movie";
import { TVShow } from "@/app/entities/TVShow";
import { NextResponse } from "next/server";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;

export async function GET() {
    const moviesUrl = `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=1`;
    const seriesUrl = `${API_BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&page=1`;

    try {
        // Récupérer les films
        const moviesResponse = await fetch(moviesUrl);
        const moviesData = await moviesResponse.json();

        const moviesDataType: Movie[] = moviesData.results; // Utilisez le type `Movie[]` pour les résultats
  
        // Récupérer les séries
        const seriesResponse = await fetch(seriesUrl);
        const seriesData = await seriesResponse.json();
        const seriesDataType: TVShow[] = seriesData.results; 

        // Retourner les données sous forme d'objet JSON
        return NextResponse.json({ films: moviesDataType, series: seriesDataType });
    } catch (error) {
        console.error("Erreur de récupération :", error);
        return NextResponse.json({ error: "Échec de la récupération des films et des séries" }, { status: 500 });
    }
}
