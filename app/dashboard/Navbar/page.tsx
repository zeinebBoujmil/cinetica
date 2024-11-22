"use client";

import { ModeToggle } from '../ModeToggle';
import { useSearch } from '../contexts/searchContext';



export default function Navbar() {
  const { query, setQuery } = useSearch();

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50 dark:bg-gray-900">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Titre/logo à gauche */}
        <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
          Cinetica
        </div>

        {/* Barre de recherche et bouton mode sombre */}
        <div className="flex items-center space-x-4">
          {/* Barre de recherche améliorée */}
          <div className="relative w-full">
            <i className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</i>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for movies or shows..."
              className="w-full bg-gray-100 text-gray-800 placeholder-gray-500 border border-gray-300 pl-10 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-400 dark:border-gray-700"
            />
          </div>

          {/* Bouton mode sombre */}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );

}  
