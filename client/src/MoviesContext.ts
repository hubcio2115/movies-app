import { createContext } from "react";
import { MoviesContextType } from "utils/interfaces";

const MoviesContext = createContext<MoviesContextType>({
  movies: [],
  setMovies: () => {},
});

export default MoviesContext;
