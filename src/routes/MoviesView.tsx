import { FC, useState, Dispatch, SetStateAction, useContext } from "react";
import Pagination from "@mui/material/Pagination";

import Movie from "interfaces/Movie";

import MoviesFavorites from "components/favorite-movies/MoviesFavorites";
import MoviesOptions from "components/movies-view/MoviesOptions";
import MovieCard from "components/movies-view/MovieCard";
import NoMovies from "components/movies-view/NoMovies";
import MoviesContext from "MoviesContext";

import Container from "@mui/material/Container";
import { Box, Typography } from "@mui/material";

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
    <Container>
      <Typography variant="h4" mt={3} mb={3}>
        Lista Filmów
      </Typography>
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
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 2,
            }}
          >
            {currentMovies
              .filter((movie) => {
                return (
                  movie.title
                    .toLowerCase()
                    .indexOf(filterTitle.toLowerCase()) !== -1
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
          </Box>
          <br />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              sx={{ marginLeft: "auto", marginRight: "auto" }}
              count={Math.ceil(moviesFilterHelper.length / moviesPerPage)}
              page={currentPage}
              onChange={(e, v) => {
                setCurrentPage(v);
              }}
            />
          </Box>
        </>
      ) : (
        <NoMovies />
      )}
      <hr />
      <MoviesFavorites
        favoriteMovies={favoriteMovies}
        setFavoriteMovies={setFavoriteMovies}
      />
    </Container>
  );
};

export default MoviesView;
