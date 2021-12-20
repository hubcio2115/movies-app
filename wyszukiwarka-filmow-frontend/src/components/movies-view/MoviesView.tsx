import { FC } from "react";

import MoviesOptions from "./MoviesOptions";
import MoviesList from "./MoviesList";
import MoviesFavorites from "./MoviesFavorites";

const MoviesView: FC = () => {
  return (
    <div>
      <MoviesOptions />
      <MoviesList />
      <MoviesFavorites />
    </div>
  );
};

export default MoviesView;
