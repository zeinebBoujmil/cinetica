"use client";

import { ModeToggle } from '../ModeToggle';
import { useSearch } from '../contexts/searchContext';



export default function Navbar() {
  const { query, setQuery } = useSearch();

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50 dark:bg-black">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <div className="text-lg font-bold ">
          Cinetica
        </div>

        <div className="flex items-center space-x-4">
          {/* Barre de recherche */}
          <div className="relative w-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for movies or shows..."
              className="w-full bg-gray-100 text-gray-800 placeholder-gray-500 border border-gray-300 pl-10 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-black dark:text-gray-200 dark:placeholder-gray-400 dark:border-gray-700"
            />
          </div>

          {/* Bouton mode sombre */}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );

}  
