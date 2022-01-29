import { createContext } from "react";
import MoviesContextType from "interfaces/MoviesContext";

const MoviesContext = createContext<MoviesContextType>({
  movies: [],
  setMovies: () => {},
});

export default MoviesContext;
