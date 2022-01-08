import { FC, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/movies";

import Movie from "../../interfaces/Movie";

const MovieDetails: FC = () => {
  const params = useParams();
  const [movie, setMovies] = useState<Movie>({} as Movie);

  const getMovies = async () => {
    return await api.get(`/movie/${params.movieId}`);
  };

  useEffect(() => {
    const getAllMovies = async () => {
      const allMovies = await getMovies();
      if (allMovies) setMovies(allMovies.data);
    };

    getAllMovies();
  });

  return (
    <div>
      <h2>Szczegóły filmu</h2>
      <Link to={"/"}>
        <button>Powrót</button>
      </Link>
      <div style={{ width: "300px" }}>
        <img src={movie.image_url} alt="movie-poster" />
        <p>{movie.title}</p>
        <p>{movie.director}</p>
        <p>{movie.genre}</p>
        <p>{movie.year}</p>
        <p>{movie.description}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
