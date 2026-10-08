import { useMovie } from "../hooks/useMovie";
import { posterUrl } from "../services/tmdb";

type MovieDetailsProps = {
  id: number;
  onBack: () => void;
};

export default function MovieDetails({ id, onBack }: MovieDetailsProps) {
  const movie = useMovie(id);

  if (!movie)
    return (
      <p className="text-center mt-8 text-gray-500">
        Filmdetails werden geladen…
      </p>
    );

  return (
    <div>
      <button
        onClick={onBack}
        className="text-blue-600 hover:underline mb-4 font-semibold hover:bg-gray-400/20 border rounded-full py-2 px-4 cursor-pointer text-sm"
      >
        Zurück zur Suche
      </button>

      <article className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto flex flex-col md:flex-row gap-8">
        <img
          src={posterUrl(movie.poster_path)}
          alt={movie.title}
          className="w-full md:w-64 rounded-lg object-cover shadow-sm"
        />

        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
          {movie.tagline && (
            <p className="italic text-gray-600 mb-4">"{movie.tagline}"</p>
          )}

          <p className="font-medium text-gray-800 mb-4">
            Laufzeit: {movie.runtime} Min.
          </p>

          <ul className="flex flex-wrap gap-2 mb-6">
            {movie.genres.map((genre) => (
              <li
                key={genre.id}
                className="rounded-full bg-blue-100 text-blue-800 px-3 py-1 text-sm font-medium"
              >
                {genre.name}
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-bold mb-2">Handlung</h3>
          <p className="text-gray-700 leading-relaxed">{movie.overview}</p>
        </div>
      </article>
    </div>
  );
}
