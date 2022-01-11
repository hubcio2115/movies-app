import { FC, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../../api/movies";

import MovieForm from "../movie-add-form/MovieForm";

import Movie from "../../interfaces/Movie";
import url from "../../types/url";

const MovieDetails: FC = () => {
  const [movie, setMovies] = useState<Movie>({} as Movie);
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getMovie = async (url: url) => {
      const res = await api.get(url);
      setMovies(res.data);
    };

    getMovie(`/movie/${params.movieId}`);
  }, [params.movieId]);

  const handleDeleteMovie = () => {
    api.delete(`/movie/${params.movieId}`);
    navigate("/");
  };

  return (
    <div>
      <h2>Szczegóły filmu</h2>
      {isEditing ? (
        <button
          onClick={() => {
            setIsEditing(!isEditing);
          }}
        >
          Powrót
        </button>
      ) : (
        <Link to={"/"}>
          <button>Powrót</button>
        </Link>
      )}
      <button
        onClick={() => {
          setIsEditing(!isEditing);
        }}
      >
        Edytuj
      </button>
      {isEditing ? null : (
        <button
          onClick={() => {
            handleDeleteMovie();
          }}
        >
          ❌
        </button>
      )}
      {isEditing ? (
        <MovieForm
          isAddForm={false}
          setIsEditing={setIsEditing}
          initialValues={{
            ...movie,
          }}
        />
      ) : (
        <div style={{ width: "300px" }}>
          <img src={movie.image_url} alt="movie-poster" />
          <p>{movie.title}</p>
          <p>{movie.director}</p>
          <p>{movie.genre}</p>
          <p>{movie.year}</p>
          <p>{movie.description}</p>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
