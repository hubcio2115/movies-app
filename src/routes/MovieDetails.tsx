import { FC, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "api/movies";

import Movie from "interfaces/Movie";

import MovieForm from "routes/MovieForm";

import {
  Button,
  Grid,
  Stack,
  Container,
  Rating,
  Typography,
} from "@mui/material";

import { ArrowBack, Edit, Delete } from "@mui/icons-material";

const MovieDetails: FC = () => {
  const [movie, setMovie] = useState<Movie>({} as Movie);
  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(0);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getMovie = async (url: string) => {
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
    <Container sx={{ mb: 5 }}>
      <Typography variant="h5" mt={2} mb={3}>
        Szczegóły filmu
      </Typography>
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
        <Grid container mb={5} spacing={2}>
          <Grid
            item
            xs={12}
            sm={4}
            md={3}
            p={0}
            m={0}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <img
              src={movie.image_url}
              alt="movie-poster"
              width={220}
              height={330}
            />
          </Grid>
          <Grid item xs={10} sm={7}>
            <Grid container ml={2} spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h6">{movie.title}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  Reżyser: {movie.director}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">Gatunek: {movie.genre}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">Rok: {movie.year}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">{movie.description}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography component="legend" textAlign="center">
                  <Rating
                    name="controlled"
                    defaultValue={movie.rating}
                    value={rating}
                    onChange={(e, v) => handleRating(v as number)}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
      {!isEditing ? (
        <Stack direction="row" gap={1}>
          <Button
            variant="contained"
            startIcon={<ArrowBack />}
            onClick={() => {
              navigate("/");
            }}
          >
            Powrót
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Edit />}
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          >
            Edytuj
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteMovie();
            }}
          >
            <Delete />
          </Button>
        </Stack>
      ) : null}
    </Container>
  );
};

export default MovieDetails;
