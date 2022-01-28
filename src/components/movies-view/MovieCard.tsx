import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Movie from "interfaces/Movie";

interface Props {
  movie: Movie;
  isSelecting?: boolean;
  selectedMovies?: number[];
  setSelectedMovies?: Dispatch<SetStateAction<number[]>>;
  favoriteMovies: Movie[];
  setFavoriteMovies: Dispatch<SetStateAction<Movie[]>>;
  isFavoriteProp: boolean;
}

const MovieCard: FC<Props> = ({
  movie,
  isSelecting,
  selectedMovies = [],
  setSelectedMovies = () => {},
  favoriteMovies,
  setFavoriteMovies,
  isFavoriteProp,
}) => {
  const [checked, setChecked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(isFavoriteProp);

  const handleCheckbox = () => {
    setChecked(!checked);

    if (!checked) {
      setSelectedMovies([...selectedMovies, movie.id]);
    } else {
      const temp = [...selectedMovies].filter((id) => {
        return id !== movie.id;
      });

      setSelectedMovies(temp);
    }
  };

  const handleFavorite = () => {
    if (!isFavorite) {
      setIsFavorite(true);

      setFavoriteMovies([...favoriteMovies, movie]);
    } else {
      setIsFavorite(false);

      const temp = [...favoriteMovies].filter((favoriteMovie) => {
        return favoriteMovie.id !== movie.id;
      });

      setFavoriteMovies(temp);
    }
  };

  useEffect(() => {
    if (favoriteMovies.indexOf(movie) === -1) {
      setIsFavorite(false);
    } else {
      setIsFavorite(true);
    }
  }, [favoriteMovies, movie]);

  return (
    <div style={{ width: "300px" }}>
      <Link to={`/movie-details/${movie.id}`}>
        <img
          src={movie.image_url}
          alt="movie-poster"
          width={220}
          height={330}
        />
        <p>{movie.title}</p>
        <p>{movie.director}</p>
        <p>{movie.genre}</p>
        <p>{movie.year}</p>
        <p>{movie.description}</p>
      </Link>
      {isSelecting ? (
        <input
          type="checkbox"
          name="select"
          id="select-checkbox"
          checked={checked}
          onChange={() => {
            handleCheckbox();
          }}
        />
      ) : null}
      <button
        onClick={() => {
          handleFavorite();
        }}
      >
        {isFavorite ? "👎🏻" : "⭐️"}
      </button>
    </div>
  );
};

export default MovieCard;
