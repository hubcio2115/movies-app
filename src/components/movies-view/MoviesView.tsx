import { FC } from "react";

import MoviesOptions from "./MoviesOptions";
import MoviesList from "./MoviesList";
import MoviesFavorites from "./MoviesFavorites";
import NoMovies from "./NoMovies";

interface Props {
  movies?: [
    {
      id?: number;
      title?: string;
      director?: string;
      genre?: string;
      year?: number;
      description?: string;
      image_url?: string;
      rating_count?: number;
      rating?: number;
    }
  ];
}

const MoviesView: FC<Props> = ({ movies }) => {
  return (
    <div>
      <h1>Lista Filmów</h1>
      <MoviesOptions />
      <hr />
      {movies ? <MoviesList movies={movies} /> : <NoMovies />}
      <hr />
      <MoviesFavorites />
    </div>
  );
};

export default MoviesView;
