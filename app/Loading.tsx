import React from 'react';

const Loading = () => (
    <div className="absolute top-[300px] left-[700px] flex items-center justify-center text-gray-600">
        <svg className="animate-spin h-10 w-10 text-gray-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8V12H4z"></path>
        </svg>
        <p className="text-lg font-semibold">Chargement...</p>
    </div>
);

export default Loading;
