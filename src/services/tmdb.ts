import type { Movie, SearchResponse, MovieDetails } from "../types/movie";

//Unsere Basis-URL ist jetzt dein lokaler Proxy! Keine TMDB-URL mehr im Frontend.
const BASE_URL = import.meta.env.VITE_PROXY_URL;

// Der API_KEY und import.meta.env fliegen hier komplett raus!

// Hier kapselt er den Fehler und merkt sich zusätzlich den HTTP-Statuscode (z.b.: 404)
export class TmdbError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.name = "TmdbError";
    }
}

export async function searchMovies(query: string): Promise<Movie[]> {
  // Kein API-Key mehr in der URL! Wir schicken nur den Suchbegriff an den Proxy.
  const url = `${BASE_URL}/search?query=${encodeURIComponent(query)}`;
  const res = await fetch(url);

  if (!res.ok) {
    // hier werfen wir unseren ersten eigenen Fehler Statuscode:
    throw new TmdbError(res.status, 'Fehler bei der TMDB-Suche');
  }

  const data: SearchResponse = await res.json();
  return data.results;
}

export async function getMovie(id: number): Promise<MovieDetails> {
  // Auch hier fragen wir einfach nur den Proxy nach der ID.
  const url = `${BASE_URL}/movie/${id}`;

  const res = await fetch(url);
  if (!res.ok) {
    // auch hier werfen wir unseren eigenen Fehler code aus.
    throw new TmdbError(res.status, `Film mit der ID ${id} konnte nicht geladen werden!`)
  }

  return await res.json();
}

// Lädt die aktuell beliebtesten Filme als Startbildschirm
export async function getPopularMovies(): Promise<Movie[]> {
  // Auch die beliebten Filme gehen über den Proxy
  const url = `${BASE_URL}/movie/popular`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new TmdbError(response.status, "Fehler beim Laden beliebter Filme");
  }

  const data: SearchResponse = await response.json();
  return data.results;
}

// hier baut er eine fertige URL zusammen oder liefert einen Fallback, falls wir keine Poster im Film haben
export function posterUrl(path: string | null, size = "w500"): string {
    if(!path) return "/placeholder.png"
    return `https://image.tmdb.org/t/p/${size}${path}`;
}