import { MovieRepositoryTMDB } from '../../repositories/implementations/MovieRepositoryTMDB';

export async function GET() {
  const movieRepository = new MovieRepositoryTMDB();

  try {
    const movies = await movieRepository.getPopular();
    return new Response(JSON.stringify(movies), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération des films populaires :', error);
    return new Response(JSON.stringify({ error: 'Échec de la récupération des films' }), { status: 500 });
  }
}
