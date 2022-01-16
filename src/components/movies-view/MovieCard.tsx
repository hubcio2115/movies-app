import { Dispatch, FC, SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import Movie from "../../interfaces/Movie";

interface Props {
  movie: Movie;
  isSelecting: boolean;
  selectedMovies: number[];
  setSelectedMovies: Dispatch<SetStateAction<number[]>>;
}

const MovieCard: FC<Props> = ({
  movie,
  isSelecting,
  selectedMovies,
  setSelectedMovies,
}) => {
  const [checked, setChecked] = useState(false);

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
    </div>
  );
};

export default MovieCard;
