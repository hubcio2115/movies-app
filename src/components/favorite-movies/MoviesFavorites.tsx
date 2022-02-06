import { Dispatch, FC, SetStateAction } from "react";

import Movie from "interfaces/Movie";

import MovieCard from "components/movies-view/MovieCard";
import NoFavoriteMovies from "components/favorite-movies/NoFavoriteMovies";
import { Box } from "@mui/system";
import { Grid, Typography } from "@mui/material";

interface Props {
  favoriteMovies: Movie[];
  setFavoriteMovies: Dispatch<SetStateAction<Movie[]>>;
}

const MoviesFavorites: FC<Props> = ({ favoriteMovies, setFavoriteMovies }) => {
  return (
    <Box sx={{ marginBottom: 5, marginTop: 3 }}>
      <Typography variant="h4" mb={2}>
        Ulubione
      </Typography>
      {favoriteMovies.length ? (
        <Grid container>
          {favoriteMovies.map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                movie={movie}
                favoriteMovies={favoriteMovies}
                setFavoriteMovies={setFavoriteMovies}
                isFavoriteProp={true}
              />
            );
          })}
        </Grid>
      ) : (
        <NoFavoriteMovies />
      )}
    </Box>
  );
};

export default MoviesFavorites;
