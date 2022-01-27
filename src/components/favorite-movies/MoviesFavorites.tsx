import { Dispatch, FC, SetStateAction } from "react";

import Movie from "interfaces/Movie";

import MovieCard from "components/movies-view/MovieCard";
import NoFavoriteMovies from "components/favorite-movies/NoFavoriteMovies";

interface Props {
  favoriteMovies: Movie[];
  setFavoriteMovies: Dispatch<SetStateAction<Movie[]>>;
}

const MoviesFavorites: FC<Props> = ({ favoriteMovies, setFavoriteMovies }) => {
  return (
    <div>
      <h1>Favorites</h1>
      {favoriteMovies.length ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
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
        </div>
      ) : (
        <NoFavoriteMovies />
      )}
    </div>
  );
};

export default MoviesFavorites;
