import { Movie } from "@/app/entities/Movie";
import { TVShow } from "@/app/entities/TVShow";
import { NextResponse } from "next/server";
import { MovieRepositoryTMDB } from "../repositories/implementations/MovieRepositoryTMDB";
import { ShowRepositoryTMDB } from "../repositories/implementations/ShowRepositoryTMDB";

const movieRepository = new MovieRepositoryTMDB();
const showRepository = new ShowRepositoryTMDB();

export async function GET() {
    try {
        const moviesData: Movie[] = await movieRepository.discoverMovies();
        const seriesData: TVShow[] = await showRepository.discoverShows();

        return NextResponse.json({ films: moviesData, series: seriesData });
    } catch (error) {
        console.error("Erreur de récupération :", error);
        return NextResponse.json({ error: "Échec de la récupération des films et des séries" }, { status: 500 });
    }
}
