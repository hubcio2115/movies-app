import { FC } from "react";
import Movie from "../../interfaces/Movie";

interface Props {
  movie: Movie;
}

const MovieCard: FC<Props> = ({ movie }) => {
  return (
    <div style={{ width: "300px" }}>
      <img src={movie.image_url} alt="movie-poster" />
      <p>{movie.title}</p>
      <p>{movie.director}</p>
      <p>{movie.genre}</p>
      <p>{movie.year}</p>
      <p>{movie.description}</p>
    </div>
  );
};

export default MovieCard;
