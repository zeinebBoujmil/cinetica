import React from "react";
import { Movie } from "@/app/entities/Movie";
import { Star, Calendar, Globe, Users, Activity, AlertCircle, X } from "lucide-react"; // Icônes pour les infos

interface ModalFilmProps {
  isOpen: boolean;
  onClose: () => void;
  item: Movie | null;
  isMovie: boolean;
}

const ModalFilm = ({ isOpen, onClose, item, isMovie }: ModalFilmProps) => {
  if (!isOpen || !item) return null;

  const voteAveragePercentage = Math.min(Math.max(item.vote_average / 10, 0), 1) * 100;

  return isMovie ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="relative bg-white rounded-lg shadow-xl overflow-y-auto max-h-screen w-11/12 max-w-3xl">
        {/* Image du film */}
        {item.poster_path && (
          <div className="relative">
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title}
              className="w-full h-64 object-cover filter brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50"></div>
          </div>
        )}

        {/* Bouton de fermeture */}
        <button
          className="absolute top-4 right-4 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-900 transition-transform transform hover:scale-110"
          onClick={onClose}
        >
          <X size={18} />
        </button>

        {/* Contenu du modal */}
        <div className="p-6">
          {/* Titre et sous-titre */}
          <h2 className="text-4xl font-bold text-gray-900 mb-1">{item.title}</h2>
          <p className="text-sm text-gray-500 italic mb-4">({item.original_title})</p>

          {/* Description */}
          <p className="text-base text-gray-700 mb-6 overflow-y-auto max-h-40 pr-2">{item.overview || "Aucune description disponible."}</p>

          {/* Informations supplémentaires */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800 text-sm">
            <div className="flex items-center gap-2">
              <Calendar size={20} className="text-indigo-500" />
              <span>
                <strong>Date de sortie:</strong> {item.release_date.split("-").reverse().join("-") || "Inconnue"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={20} className="text-green-500" />
              <span>
                <strong>Langue originale:</strong> {item.original_language.toUpperCase() || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Activity size={20} className="text-blue-500" />
              <span>
                <strong>Popularité:</strong> {item.popularity.toFixed(1)} / 100
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={20} className="text-purple-500" />
              <span>
                <strong>Nombre de votes:</strong> {item.vote_count || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={20} className="text-yellow-500" />
              <span>
                <strong>Note moyenne:</strong>
              </span>
            </div>
            <div className="relative w-full h-4 bg-gray-300 rounded-full shadow-inner">
              <div
                className={`absolute top-0 left-0 h-4 ${voteAveragePercentage > 50
                    ? "bg-green-500"
                    : voteAveragePercentage > 30
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  } rounded-full transition-all`}
                style={{ width: `${voteAveragePercentage}%` }}
              ></div>
            </div>
            
            <div className="flex items-center gap-2">
              <AlertCircle size={20} className="text-red-500" />
              <span>
                <strong>Pour adultes:</strong> {item.adult ? "Oui" : "Non"}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  ) : null;
};

export default ModalFilm;
