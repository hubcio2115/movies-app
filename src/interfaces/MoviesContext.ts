import { Dispatch, SetStateAction } from "react";
import Movie from "./Movie";

interface MoviesContextType {
  movies: Movie[];
  setMovies: Dispatch<SetStateAction<Movie[]>>;
}

export default MoviesContextType;
