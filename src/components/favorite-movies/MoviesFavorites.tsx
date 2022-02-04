import { Dispatch, FC, SetStateAction } from "react";

import Movie from "interfaces/Movie";

import MovieCard from "components/movies-view/MovieCard";
import NoFavoriteMovies from "components/favorite-movies/NoFavoriteMovies";
import { Box } from "@mui/system";

interface Props {
  favoriteMovies: Movie[];
  setFavoriteMovies: Dispatch<SetStateAction<Movie[]>>;
}

const MoviesFavorites: FC<Props> = ({ favoriteMovies, setFavoriteMovies }) => {
  return (
    <Box sx={{ marginBottom: 5 }}>
      <h1>Favorites</h1>
      {favoriteMovies.length ? (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
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
        </Box>
      ) : (
        <NoFavoriteMovies />
      )}
    </Box>
  );
};

export default MoviesFavorites;
