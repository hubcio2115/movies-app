import { FC, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

import api from "api/movies";

import Movie from "interfaces/Movie";
import url from "types/url";

import MovieForm from "routes/MovieForm";
import Container from "@mui/material/Container";

const MovieDetails: FC = () => {
  const [movie, setMovie] = useState<Movie>({} as Movie);
  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(0);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getMovie = async (url: url) => {
      const res = await api.get(url);
      setMovie(res.data);
      setRating(movie.rating);
    };

    getMovie(`/movie/${params.movieId}`);
  }, [params.movieId, movie.rating]);

  const handleDeleteMovie = () => {
    api.delete(`/movie/${params.movieId}`);
    navigate("/");
  };

  const handleRating = (value: number) => {
    api.patch(`/movie/${movie.id}/rate`, null, { params: { score: value } });
    setRating(value);
  };

  return (
    <Container>
      <Typography variant="h5" mt={2} mb={2}>
        Szczegóły filmu
      </Typography>
      {!isEditing ? (
        <>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Powrót
          </button>
          <button
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          >
            Edytuj
          </button>
        </>
      ) : null}
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
          setMovie={setMovie}
        />
      ) : (
        <div style={{ width: "300px" }}>
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
          <Typography component="legend">
            <Rating
              name="controlled"
              defaultValue={movie.rating}
              value={rating}
              onChange={(e, v) => handleRating(v as number)}
            />
          </Typography>
        </div>
      )}
    </Container>
  );
};

export default MovieDetails;
