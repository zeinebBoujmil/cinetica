import { Movie } from "@/app/entities/Movie";
export async function GET() {
    const apiKey = 'b5ccd41c3520c090526c7effad1e0d05';

    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;
  

    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Erreur de requête : ${response.statusText}`);
      }
  
      const data = await response.json();
      const movies: Movie[] = data.results;
      console.error("dataaaaaaaaaa :", data);

      return new Response(JSON.stringify(movies), { status: 200 });
    } catch (error) {
        console.error("Erreur de récupération :", error);

      console.error("Erreur lors de la récupération des films populaires ");
      return new Response(JSON.stringify({ error: "Échec de la récupération des films populaires" }), { status: 500 });
    }
  }
  