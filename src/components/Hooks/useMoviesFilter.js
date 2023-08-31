import { useState, useEffect } from "react";

export function useMoviesFilter(moviesData, isShortFilmFilterActive, searchQuery) {
  const [filteredMovies, setFilteredMovies] = useState([]);

  const updateFilteredMovies = (filteredData, isActive = isShortFilmFilterActive) => {
    let updatedMovies = filteredData;
    if (isActive) {
      updatedMovies = updatedMovies.filter((movie) => movie.duration <= 40);
    }
    setFilteredMovies(updatedMovies);
  };

  useEffect(() => {
    const filteredData = moviesData.filter((movie) =>
      movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
    );
    updateFilteredMovies(filteredData);
  }, [moviesData, searchQuery]);

  useEffect(() => {
    updateFilteredMovies(filteredMovies);
  }, [isShortFilmFilterActive]);

  return { filteredMovies, updateFilteredMovies };
}