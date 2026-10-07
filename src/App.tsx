import { useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import { useMovieSearch } from "./hooks/useMovieSearch";

export default function App() {
  const [query, setQuery] = useState("");
  
  const { movies, loading, error } = useMovieSearch(query);

  return (
    <div className="max-w-5xl mx-auto p-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-900"> Cineotype</h1>

      <SearchBar onSearch={setQuery} />

      {loading && <p className="text-blue-500 font-bold text-center my-8">Filme werden geladen...</p>}
      {error && <p className="text-red-500 bg-red-100 p-4 rounded text-center my-8">Fehler: {error}</p>}

      {!loading && !error && <MovieList movies={movies} />}
    </div>
  );
}