import type { Movie, SearchResponse, MovieDetails } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export async function searchMovies(query: string): Promise<Movie[]> {
  const url = `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`TMDB-Fehler: ${res.status}`);
  }

  const data: SearchResponse = await res.json();
  return data.results;
}

export async function getMovie(id: number): Promise<MovieDetails> {
  const url = `${BASE_URL}/movie/${id}api_key=${API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`TMDB-Fehler: ${res.status}`);
  }

  return await res.json();
}
