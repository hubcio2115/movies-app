import { Dispatch, SetStateAction } from "react";

export interface Movie {
  id: number;
  title: string;
  director: string;
  genre: string;
  year: number;
  description: string;
  image_url: string;
  rating_count: number;
  rating: number;
}

export interface MoviesContextType {
  movies: Movie[];
  setMovies: Dispatch<SetStateAction<Movie[]>>;
}
