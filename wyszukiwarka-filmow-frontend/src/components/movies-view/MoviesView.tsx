import { FC } from "react";

import MoviesOptions from "./MoviesOptions";
import MoviesList from "./MoviesList";
import MoviesFavorites from "./MoviesFavorites";
import NoMovies from "./NoMovies";

const MoviesView: FC = () => {
  const movies = false;

  return (
    <div>
      <h1>Lista Filmów</h1>
      <MoviesOptions />
      {movies ? <MoviesList /> : <NoMovies />}
      <MoviesFavorites />
    </div>
  );
};

export default MoviesView;
