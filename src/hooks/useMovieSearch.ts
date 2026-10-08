import { useState, useEffect } from "react";
import type { Movie } from "../types/movie";
import { searchMovies, getPopularMovies } from "../services/tmdb";

export function useMovieSearch(query: string) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const results =
          query.trim() === ""
            ? await getPopularMovies()
            : await searchMovies(query);

        if (!ignore) {
          setMovies(results);
        }
      } catch (err: unknown) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Unbekannter Fehler");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [query]);

  return { movies, loading, error };
}
