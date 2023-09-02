import { useEffect, useState } from "react";
import { MAXADDMOVIES, MAXMOVIESONPAGE } from "./Constants";

export function useResize() {
  const [moviesToShow, setMoviesToShow] = useState({
    moviesOnPage: MAXMOVIESONPAGE,
    addMoviesOnPage: MAXADDMOVIES,
  });

  useEffect(() => {
    function handleWindowResize() {
      const screenWidth = window.innerWidth;

      let moviesOnPage = 12;
      let addMoviesOnPage = 3;

      if (screenWidth <= 1100) {
        moviesOnPage = 8;
        addMoviesOnPage = 2;
      }

      if (screenWidth <= 680) {
        moviesOnPage = 5;
        addMoviesOnPage = 1;
      }

      setMoviesToShow({ moviesOnPage, addMoviesOnPage });
    }

    handleWindowResize();

    let resizeTimeout;

    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleWindowResize, 1000);
    });

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return moviesToShow;
}
