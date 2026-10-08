import type { Movie } from "../types/movie";
import MovieCard from "./MovieCard";

type MovieListProps = {
    movies: Movie[];
    onMovieSelect: (id: number) => void;
}

export default function MovieList({ movies, onMovieSelect }: MovieListProps) {
  if (movies.length === 0) {
    return <p className="text-gray-500 text-center mt-8">Keine Filme gefunden oder noch nichts gesucht.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onClick={onMovieSelect}/>
      ))}
    </div>
  );
}