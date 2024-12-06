export interface MovieDetails {
    adult: boolean; // Indique si le film est destiné à un public adulte
    backdrop_path: string | null; // Chemin vers l'image d'arrière-plan
    belongs_to_collection?: {
      id: number; // Identifiant de la collection
      name: string; // Nom de la collection
      poster_path: string | null; // Chemin vers l'affiche de la collection
      backdrop_path: string | null; // Chemin vers l'image d'arrière-plan de la collection
    } | null; // Collection à laquelle appartient le film (peut être null)
    budget: number; // Budget du film en dollars
    genres: {
      id: number; // Identifiant du genre
      name: string; // Nom du genre
    }[]; // Liste des genres associés au film
    homepage: string | null; // URL de la page d'accueil du film
    id: number; // Identifiant unique du film
    imdb_id: string | null; // Identifiant IMDB du film
    origin_country?: string[]; // Pays d'origine du film
    original_language: string; // Langue originale du film
    original_title: string; // Titre original du film
    overview: string | null; // Description du film
    popularity: number; // Score de popularité
    poster_path: string | null; // Chemin vers l'affiche du film
    production_companies: {
      id: number; // Identifiant de la société de production
      logo_path: string | null; // Chemin vers le logo de la société
      name: string; // Nom de la société
      origin_country: string; // Pays d'origine de la société
    }[]; // Liste des sociétés de production
    production_countries: {
      iso_3166_1: string; // Code ISO du pays
      name: string; // Nom du pays
    }[]; // Liste des pays de production
    release_date: string; // Date de sortie du film
    revenue: number; // Revenus générés par le film en dollars
    runtime: number | null; // Durée du film en minutes
    spoken_languages: {
      english_name: string; // Nom de la langue en anglais
      iso_639_1: string; // Code ISO de la langue
      name: string; // Nom de la langue
    }[]; // Langues parlées dans le film
    status: string; // Statut du film (ex : "Released")
    tagline: string | null; // Slogan du film
    title: string; // Titre du film
    video: boolean; // Indique si le film est une vidéo
    vote_average: number; // Note moyenne
    vote_count: number; // Nombre de votes
  }
  