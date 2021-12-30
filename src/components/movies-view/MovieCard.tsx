import { FC } from "react";
interface Props {
  movie: {
    id: number;
    title: string;
    director: string;
    genre: string;
    year: number;
    description: string;
    image_url: string;
    rating_count: number;
    rating: number;
  };
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
