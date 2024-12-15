'use client';

import { useFetchDiscover } from "../discover/useCase/useFetchDiscover"
import Loading from "@/app/Loading";
import MovieCard from "../cards/filmCard/filmCard";
import ShowCard from "../cards/showCard/showCard";
import { useSearch } from "../../contexts/searchContext";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Discover() {
    const { query } = useSearch();
    const { data, isLoading, error } = useFetchDiscover(query);
    const { state } = useSidebar(); 
    const isMobile = useIsMobile(); 

    if (error) return <div>Erreur lors de la récupération des données</div>;

    return isLoading ? (
        <Loading />
    ) : (
        <div>
            <br />
            <br />
            <h1 className="text-3xl font-extrabold mb-6 text-center relative">
                Films <span className="block h-1 w-24 bg-primary mx-auto mt-2 rounded-full"></span>
            </h1>
            <ScrollArea className={`${!isMobile && state === "expanded" ? "w-[calc(100vw-16rem)]" : "w-screen"} whitespace-nowrap rounded-md`}>
                <div className="flex w-max space-x-4 p-4">
                    {data?.films.map((movie) => (
                        <div key={movie.id} className="shrink-0">
                            <MovieCard key={movie.id} id={movie.id} />
                        </div>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <h1 className="text-3xl font-extrabold mb-6 text-center relative">
                Shows <span className="block h-1 w-24 bg-primary mx-auto mt-2 rounded-full"></span>
            </h1>
            <ScrollArea className={`${!isMobile && state === "expanded" ? "w-[calc(100vw-16rem)]" : "w-screen"} whitespace-nowrap rounded-md`}>
                <div className="flex w-max space-x-4 p-4">
                    {data?.series.map((serie) => (
                        <div key={serie.id} className="shrink-0">
                            <ShowCard key={serie.id} id={serie.id} />
                        </div>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    );
}
