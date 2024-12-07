'use client';

import { useState, useEffect } from 'react';
import { Movie } from '../../entities/Movie';
import { TVShow } from '../../entities/TVShow';
import Loading from '../../Loading';
import MovieCard from '../cards/filmCard';
import ShowCard from '../cards/showCard';
import { useSearch } from '../contexts/searchContext';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function Discover() {
    const [data, setData] = useState<{ films: Movie[]; series: TVShow[] } | null>(null);
    const [loading, setLoading] = useState(true);
    const { query } = useSearch();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Commence le chargement
            try {
                console.log('Fetching movies and series data from /api/discover...');

                const response = await fetch('/api/discover');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Data received:', data);

                const filteredMovies = data.films.filter((movie: Movie) =>
                    movie.title.toLowerCase().includes(query.toLowerCase())
                );

                const filteredSeries = data.series.filter((serie: TVShow) =>
                    serie.name.toLowerCase().includes(query.toLowerCase())
                );

                console.log('Filtered movies:', filteredMovies);
                console.log('Filtered series:', filteredSeries);

                setData({ films: filteredMovies, series: filteredSeries });
            } catch (error) {
                console.error('Error fetching movies and series data:', error);
            } finally {
                setLoading(false); // Fin du chargement
            }
        };

        fetchData();
    }, [query]);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <br />
            <br />
            <h1 className="text-3xl font-extrabold mb-6 text-center relative">
                Films <span className="block h-1 w-24 bg-primary mx-auto mt-2 rounded-full"></span>
            </h1>
            <ScrollArea className="w-screen whitespace-nowrap rounded-md border">
                <div className="flex w-max space-x-4 p-4">
                    {data?.films.map((movie) => (
                        <div key={movie.id} className="shrink-0">
                            <MovieCard id={movie.id} />
                        </div>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <h1 className="text-3xl font-extrabold mb-6 text-center relative">
                Shows <span className="block h-1 w-24 bg-primary mx-auto mt-2 rounded-full"></span>
            </h1>
            <ScrollArea className="w-screen whitespace-nowrap rounded-md border">
                <div className="flex w-max space-x-4 p-4">
                    {data?.series.map((serie) => (
                        <div key={serie.id} className="shrink-0">
                            <ShowCard id={serie.id} />
                        </div>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </>
    );
}
