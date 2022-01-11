import { FC, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import api from "../../api/movies";

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

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Pole wymagane"),
    director: Yup.string().required("Pole wymagane"),
    genre: Yup.string().required("Pole wymagane"),
    year: Yup.number()
      .min(1000, "Proszę podać date po roku 1000")
      .max(
        new Date().getFullYear(),
        "Rok nie może być większy niż z dzisiejszej daty"
      )
      .required("Pole wymagane"),
    description: Yup.string().required("Pole wymagane"),
    image_url: Yup.string().url("Proszę podać ").nullable(),
  });

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
        <Formik
          initialValues={movie}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            api.put(`/movie/${movie.id}`, values);
            setIsEditing(!isEditing);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div>
                <label htmlFor="title">Tytuł: </label>
                <Field id="title" name="title" type="text" />
                {errors.title && touched.title ? (
                  <div>{errors.title}</div>
                ) : null}
              </div>
              <div>
                <label htmlFor="director">Dyrektor: </label>
                <Field id="director" name="director" type="text" />
                {errors.director && touched.director ? (
                  <div>{errors.director}</div>
                ) : null}
              </div>
              <div>
                <label htmlFor="genre">Gatunek: </label>
                <Field id="genre" name="genre" type="text" />
                {errors.genre && touched.genre ? (
                  <div>{errors.genre}</div>
                ) : null}
              </div>
              <div>
                <label htmlFor="year">Rok premiery: </label>
                <Field id="year" name="year" type="number" />
                {errors.year && touched.year ? <div>{errors.year}</div> : null}
              </div>
              <div>
                <label htmlFor="description">Opis: </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  rows={10}
                  cols={30}
                />
                {errors.description && touched.description ? (
                  <div>{errors.description}</div>
                ) : null}
              </div>
              <div>
                <label htmlFor="image_url">Zdjęcie: </label>
                <Field id="image_url" name="image_url" type="url" />
                {errors.image_url && touched.image_url ? (
                  <div>{errors.image_url}</div>
                ) : null}
              </div>
              <button type="submit">Zapisz</button>
            </Form>
          )}
        </Formik>
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
