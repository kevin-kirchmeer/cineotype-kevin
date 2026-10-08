import { useState, useEffect } from "react";
import type { Movie } from "../types/movie";
import { searchMovies } from "../services/tmdb";

export function useMovieSearch(query: string) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    if (query.trim() === "") {
      setMovies([]);
      return;
    }

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const results = await searchMovies(query);
        if (!ignore) setMovies(results);
      } catch (err: unknown) {
        if (!ignore)
          setError(err instanceof Error ? err.message : "Unbekannter Fehler");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [query]);

  return { movies, loading, error };
}
