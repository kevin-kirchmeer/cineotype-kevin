import { useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import { useMovieSearch } from "./hooks/useMovieSearch";
import { Spinner } from "./components/Feedback";
import { useDebounce } from "./hooks/useDebounce";
import { useFavorites } from "./hooks/useFavorites";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const debouncedQuery = useDebounce(query, 400);
  const { movies, loading, error } = useMovieSearch(debouncedQuery);
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="max-w-5xl mx-auto p-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-red-900">
        Cineotype
      </h1>

      {selectedMovieId ? (
        <MovieDetails
          id={selectedMovieId}
          onBack={() => setSelectedMovieId(null)}
        />
      ) : (
        <>
          <SearchBar onSearch={setQuery} />
          {loading && <Spinner />}

          {error && (
            <p className="text-red-500 bg-red-100 p-4 rounded text-center my-8">
              Fehler: {error}
            </p>
          )}

          {!loading && !error && (
            <MovieList
              movies={movies}
              onMovieSelect={setSelectedMovieId}
              favorites={favorites}
              onToggleFav={toggleFavorite}
            />
          )}
        </>
      )}
    </div>
  );
}
