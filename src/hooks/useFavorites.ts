import { useState, useEffect } from "react";
import type { Movie } from "../types/movie";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const saved = localStorage.getItem("cineotype_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cineotype_favorites", JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(movie: Movie) {
    setFavorites((prev) => {
      const isFav = prev.some((f) => f.id === movie.id);
      if (isFav) {
        return prev.filter((f) => f.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  }

  return { favorites, toggleFavorite };
}