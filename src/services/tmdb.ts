import type { Movie, SearchResponse, MovieDetails } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


//  Hier kapselt er den Fehler und merkt sich zusätzlich den HTTP-Statuscode (z.b.: 404)
export class TmdbError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.name = "TmdbError";
    }
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const url = `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}`;
  const res = await fetch(url);

  if (!res.ok) {
    // hier werfen wir unseren ersten eigenen Fehler Statuscode:
    throw new TmdbError(res.status, 'Fehler bei der TMDB-Suche');
  }

  const data: SearchResponse = await res.json();
  return data.results;
}

export async function getMovie(id: number): Promise<MovieDetails> {
  const url = `${BASE_URL}/movie/${id}api_key=${API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    // auch hier werfen wir unseren eigenen Fehler code aus.
    throw new TmdbError(res.status, `Film mit der ${id} konnte nicht geladen werden!`)
  }

  return await res.json();
}

// hier baut er eine fertige URL zusammen oder liefert einen Fallback, falls wir keine Poster im Film haben
export function posterUrl(path: string | null, size = "w500"): string {
    if(!path) return "/placeholder.png"
    return `https://image.tmdb.org/t/p/${size}${path}`;
}

