import { FC, useState, Dispatch, SetStateAction, useContext } from "react";
import { Pagination } from "@mui/material";

import Movie from "interfaces/Movie";

import MoviesFavorites from "components/favorite-movies/MoviesFavorites";
import MoviesOptions from "components/movies-view/MoviesOptions";
import MovieCard from "components/movies-view/MovieCard";
import NoMovies from "components/movies-view/NoMovies";
import MoviesContext from "MoviesContext";

interface Props {
  favoriteMovies: Movie[];
  setFavoriteMovies: Dispatch<SetStateAction<Movie[]>>;
}

const MoviesView: FC<Props> = ({ favoriteMovies, setFavoriteMovies }) => {
  const { movies } = useContext(MoviesContext);
  const [sortedMovies, setSortedMovies] = useState(movies);

  const [filterTitle, setFilterTitle] = useState("");

  const [selectedMovies, setSelectedMovies] = useState<number[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const moviesFilterHelper = sortedMovies.filter((movie) => {
    return movie.title.toLowerCase().indexOf(filterTitle.toLowerCase()) !== -1;
  });

  const moviesPerPage = 4;
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = moviesFilterHelper.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  return (
    <div>
      <h2>Lista Filmów</h2>
      <MoviesOptions
        setSortedMovies={setSortedMovies}
        filterTitle={filterTitle}
        setFilterTitle={setFilterTitle}
        isSelecting={isSelecting}
        setIsSelecting={setIsSelecting}
        selectedMovies={selectedMovies}
        setCurrentPage={setCurrentPage}
      />
      <hr />
      {moviesFilterHelper.length ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {currentMovies
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
          <Pagination
            count={Math.ceil(moviesFilterHelper.length / moviesPerPage)}
            page={currentPage}
            onChange={(e, v) => {
              setCurrentPage(v);
            }}
          />
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
