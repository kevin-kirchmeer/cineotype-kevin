import type { Movie } from "../types/movie";
import { posterUrl } from "../services/tmdb";

type MovieCardProps = {
  movie: Movie;
  onClick: (id: number) => void;
  isFavorit?: boolean;
  onToggleFav?: (movie: Movie) => void;
};

export default function MovieCard({ movie, onClick, isFavorit, onToggleFav }: MovieCardProps) {
  return (
    <div
      onClick={() => onClick(movie.id)}
      className="relativ cursor-pointer border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col bg-white"
    >
      <img
        src={posterUrl(movie.poster_path)}
        alt={`Poster für ${movie.title}`}
      />

      <button
        onClick={(e) => {
          e.stopPropagation();
          if (onToggleFav) onToggleFav(movie);
        }}
        className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-2 shadow transition-colors"
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-bold text-lg leading-tight">{movie.title}</h3>
        <p className="text-gray-500 text-sm">
          Erschienen: {movie.release_date || "Unbekannt"}
        </p>
        <div className="text-yellow-600 font-bold">
          ★{" "}
          {movie.vote_average
            ? movie.vote_average.toFixed(1)
            : "Keine Bewertung"}
        </div>
      </div>
    </div>
  );
}
