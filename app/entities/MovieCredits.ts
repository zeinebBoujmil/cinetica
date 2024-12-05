export interface MovieCredits {
    adult: boolean; // Indique si le participant est associé à du contenu pour adultes
    gender: number; // Genre (1 = Femme, 2 = Homme, 0 = Non spécifié)
    id: number; // Identifiant unique de la personne
    known_for_department: string; // Département de spécialisation (ex : Acting, Directing)
    name: string; // Nom de la personne
    original_name: string; // Nom original de la personne
    popularity: number; // Popularité
    profile_path: string | null; // Chemin vers l'image de profil
    cast_id: number; // Identifiant unique dans le casting
    character: string; // Rôle ou personnage joué
    credit_id: string; // Identifiant unique du crédit
    order: number; // Ordre dans la liste de casting
  }
  