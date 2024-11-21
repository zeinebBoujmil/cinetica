export interface Movie {
    id: number;                 // Identifiant unique du film
    title: string;              // Titre du film
    original_title: string;     // Titre original du film
    overview: string;           // Description/résumé du film
    release_date: string;       // Date de sortie (format "YYYY-MM-DD")
    poster_path: string;        // Chemin de l'affiche du film
    backdrop_path: string;      // Chemin de l'image de fond du film
    genre_ids: number[];        // Liste des genres associés (ID)
    original_language: string;  // Langue originale du film
    popularity: number;         // Indice de popularité
    vote_average: number;       // Note moyenne
    vote_count: number;         // Nombre de votes
    adult: boolean;             // Indicateur si le film est pour adultes
    video: boolean;             // Indicateur si c'est une vidéo
  }
  