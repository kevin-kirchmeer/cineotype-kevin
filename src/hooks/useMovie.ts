import { useState, useEffect } from "react";
import { getMovie } from "../services/tmdb";
import type { MovieDetails } from "../types/movie";

export function useMovie(id: number) {
    const [movie, setMovie] = useState<MovieDetails | null>(null);

    useEffect(() => {
        async function load() {
            try {
                const data = await getMovie(id);
                setMovie(data);
            } catch (err) {
                console.error("Fehler beim Laden der Filmdetails", err);
            }
        }

        load();
    }, [id]);

    return movie;
}