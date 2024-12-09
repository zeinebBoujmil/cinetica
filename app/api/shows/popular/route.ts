import { ShowRepositoryTMDB } from "../../repositories/implementations/ShowRepositoryTMDB";

export async function GET() {
  const showRepository = new ShowRepositoryTMDB();
  
    try {
      const shows = await showRepository.getPopular();
  
      return new Response(JSON.stringify(shows), { status: 200 });
    } catch (error) {
      console.log(error);
      return new Response(JSON.stringify({ error: "Échec de la récupération des films populaires" }), { status: 500 });
    }
  }
  