import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/movies";

import Movie from "../../interfaces/Movie";
import url from "../../types/url";

import MoviesOptions from "./MoviesOptions";
import MovieCard from "./MovieCard";
import MoviesFavorites from "./MoviesFavorites";
import NoMovies from "./NoMovies";

const MoviesView: FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filterTitle, setFilterTitle] = useState("");

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
                <Link to={`/movie-details/${movie.id}`} key={movie.id}>
                  <MovieCard movie={movie} />
                </Link>
              );
            })}
        </div>
      ) : (
        <NoMovies />
      )}
      <hr />
      <MoviesFavorites />
    </div>
  );
};

export default MoviesView;
