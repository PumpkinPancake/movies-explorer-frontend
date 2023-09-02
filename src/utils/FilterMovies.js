import { useResize } from "./HandleResize";
import { SHORTMOVIESDURATION } from "./Constants";

export function FilterMovies(movies, query, isShortFilm, count) {
  const defaultCount = useResize();

  if (!movies) {
    return [];
  }

  let filteredMovies = movies;

  if (query) {
    const lowercaseQuery = query.toLowerCase();
    filteredMovies = filteredMovies.filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(lowercaseQuery) ||
        movie.nameEN.toLowerCase().includes(lowercaseQuery),
    );
  }

  if (isShortFilm) {
    filteredMovies = filteredMovies.filter(
      (movie) => movie.duration <= SHORTMOVIESDURATION,
    );
  }

  const maxMovies = filteredMovies.length;

  filteredMovies = filteredMovies.slice(0, count ? count : defaultCount.count);

  return { filteredMovies, maxMovies };
}
