// useCase/useTVShowDetails.ts
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TVShow } from "@/app/entities/TVShow";
import { ShowCredits } from "@/app/entities/ShowCredits";

export const useFetchShowsCredits = (id: string) => {
  const [series, setSeries] = useState<TVShow | null>(null);
  const [credits, setCredits] = useState<ShowCredits[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    const fetchSeriesDetails = async () => {
      try {
        const seriesResponse = await fetch(`/api/shows/${id}`);
        const creditsResponse = await fetch(`/api/shows/${id}/credits`);

        if (!seriesResponse.ok || !creditsResponse.ok) {
          throw new Error("Failed to fetch series details or credits.");
        }

        const seriesData = await seriesResponse.json();
        const creditsData = await creditsResponse.json();

        setSeries(seriesData);
        setCredits(creditsData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Une erreur s'est produite lors du chargement des données.");
        setLoading(false);
      }
    };

    fetchSeriesDetails();
  }, [id]);

  return { series, credits, loading, error, handleBack };
};
