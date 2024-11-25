export interface Actor {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null; // L'image peut être null si l'actor n'a pas d'image associée
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
  }
  