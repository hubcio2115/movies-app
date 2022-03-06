import { Dispatch, FC, SetStateAction } from "react";

import { Movie } from "utils/interfaces";

import MovieCard from "components/MovieCard";
import NoMovies from "components/NoMovies";

import { Box } from "@mui/system";
import { Grid, Typography } from "@mui/material";

interface MovieFavoritesProps {
  favoriteMovies: Movie[];
  setFavoriteMovies: Dispatch<SetStateAction<Movie[]>>;
}

const MoviesFavorites: FC<MovieFavoritesProps> = ({
  favoriteMovies,
  setFavoriteMovies,
}) => {
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
        <NoMovies isFavorites />
      )}
    </Box>
  );
};

export default MoviesFavorites;
