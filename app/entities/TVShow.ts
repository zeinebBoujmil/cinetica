export interface TVShow {
    id: number;                   // Identifiant unique de l'émission
    name: string;                 // Nom de l'émission
    original_name: string;        // Nom original de l'émission
    overview: string;             // Description/résumé de l'émission
    first_air_date: string;       // Date de la première diffusion (format "YYYY-MM-DD")
    poster_path: string;          // Chemin de l'affiche de l'émission
    backdrop_path: string;        // Chemin de l'image de fond de l'émission
    genre_ids: number[];          // Liste des genres associés (ID)
    original_language: string;    // Langue originale de l'émission
    origin_country: string[];     // Liste des pays d'origine
    popularity: number;           // Indice de popularité
    vote_average: number;         // Note moyenne
    vote_count: number;           // Nombre de votes
    adult: boolean;               // Indicateur si l'émission est pour adultes
  }
  