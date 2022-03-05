import { FC, useState, Dispatch, SetStateAction, useContext } from "react";

import Movie from "../interfaces/Movie";

import MoviesFavorites from "../components/MoviesFavorites";
import MoviesOptions from "../components/MoviesOptions";
import MovieCard from "../components/MovieCard";
import NoMovies from "../components/NoMovies";
import MoviesContext from "../MoviesContext";

import { Pagination, Container, Grid, Stack, Typography } from "@mui/material";

interface MoviesViewProps {
  favoriteMovies: Movie[];
  setFavoriteMovies: Dispatch<SetStateAction<Movie[]>>;
}

const MoviesView: FC<MoviesViewProps> = ({
  favoriteMovies,
  setFavoriteMovies,
}) => {
  const { movies } = useContext(MoviesContext);
  const [sortedMovies, setSortedMovies] = useState<Movie[]>(movies);

  const [titleFilter, setTitleFilter] = useState("");

  const [selectedMovies, setSelectedMovies] = useState<number[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const moviesFilterHelper = sortedMovies.filter((movie) => {
    return movie.title.toLowerCase().indexOf(titleFilter.toLowerCase()) !== -1;
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
        titleFilter={titleFilter}
        setTitleFilter={setTitleFilter}
        isSelecting={isSelecting}
        setIsSelecting={setIsSelecting}
        selectedMovies={selectedMovies}
        setCurrentPage={setCurrentPage}
      />
      <hr />
      {moviesFilterHelper.length ? (
        <>
          <Grid container spacing={2}>
            {currentMovies
              .filter((movie) => {
                return (
                  movie.title
                    .toLowerCase()
                    .indexOf(titleFilter.toLowerCase()) !== -1
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
          </Grid>
          <br />
          <Stack justifyContent="center">
            <Pagination
              sx={{ marginLeft: "auto", marginRight: "auto" }}
              count={Math.ceil(moviesFilterHelper.length / moviesPerPage)}
              page={currentPage}
              onChange={(e, v) => {
                setCurrentPage(v);
              }}
            />
          </Stack>
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
