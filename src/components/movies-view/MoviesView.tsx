import { FC, useState, useEffect, Dispatch, SetStateAction } from "react";

import api from "../../api/movies";

import Movie from "../../interfaces/Movie";
import url from "../../types/url";

import MoviesOptions from "./MoviesOptions";
import MovieCard from "./MovieCard";
import MoviesFavorites from "../favorite-movies/MoviesFavorites";
import NoMovies from "./NoMovies";

interface Props {
  favoriteMovies: Movie[];
  setFavoriteMovies: Dispatch<SetStateAction<Movie[]>>;
}

const MoviesView: FC<Props> = ({ favoriteMovies, setFavoriteMovies }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filterTitle, setFilterTitle] = useState("");
  const [selectedMovies, setSelectedMovies] = useState<number[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);

  const moviesFilterHelper = movies.filter((movie) => {
    return movie.title.toLowerCase().indexOf(filterTitle.toLowerCase()) !== -1;
  });

  useEffect(() => {
    const getMovies = async (url: url) => {
      const res = await api.get(url);
      setMovies(res.data);
    };

    getMovies("/movies");
  }, []);

  return (
    <div>
      <h2>Lista Filmów</h2>
      <MoviesOptions
        movies={movies}
        setMovies={setMovies}
        filterTitle={filterTitle}
        setFilterTitle={setFilterTitle}
        isSelecting={isSelecting}
        setIsSelecting={setIsSelecting}
        selectedMovies={selectedMovies}
      />
      <hr />
      {moviesFilterHelper.length ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {movies
            .filter((movie) => {
              return (
                movie.title.toLowerCase().indexOf(filterTitle.toLowerCase()) !==
                -1
              );
            })
            .map((movie) => {
              return (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isSelecting={isSelecting}
                  selectedMovies={selectedMovies}
                  setSelectedMovies={setSelectedMovies}
                  favoriteMovies={favoriteMovies}
                  setFavoriteMovies={setFavoriteMovies}
                  isFavoriteProp={false}
                />
              );
            })}
        </div>
      ) : (
        <NoMovies />
      )}
      <hr />
      <MoviesFavorites
        favoriteMovies={favoriteMovies}
        setFavoriteMovies={setFavoriteMovies}
      />
    </div>
  );
};

export default MoviesView;
