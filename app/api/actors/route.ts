// app/api/actors/page.tsx
import { Actor } from "@/app/entities/Actor"; 

export async function GET({ params }: { params: { category: string; showId: string } }) {
  console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"); // Log de l'URL qui est utilisée

  const TMDB_API_KEY = 'b5ccd41c3520c090526c7effad1e0d05';
  const { category, showId } = params;

  const creditsUrl = `https://api.themoviedb.org/3/${category}/${showId}/credits?api_key=${TMDB_API_KEY}`;

  console.log("Requesting URL:", creditsUrl); // Log de l'URL qui est utilisée

  try {
    const response = await fetch(creditsUrl);

    if (!response.ok) {
      console.error(`Request failed with status: ${response.status}`); // Log de l'échec
      throw new Error(`Erreur de requête : ${response.statusText}`);
    }

    const creditsData = await response.json();
    console.log("Received credits data:", creditsData); // Log des données reçues

    const actors: Actor[] = creditsData.cast.map((actor: any) => ({
      adult: actor.adult,
      gender: actor.gender,
      id: actor.id,
      known_for_department: actor.known_for_department,
      name: actor.name,
      original_name: actor.original_name,
      popularity: actor.popularity,
      profile_path: actor.profile_path,
      cast_id: actor.cast_id,
      character: actor.character,
      credit_id: actor.credit_id,
      order: actor.order,
    }));

    console.log("Actors array:", actors); // Log du tableau des acteurs transformés

    return new Response(JSON.stringify(actors), { status: 200 });
  } catch (error) {
    console.error("Erreur de récupération des crédits des acteurs :", error);
    return new Response(JSON.stringify({ error: "Échec de la récupération des crédits des acteurs" }), { status: 500 });
  }
}
