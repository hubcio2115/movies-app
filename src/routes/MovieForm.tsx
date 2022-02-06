import { Dispatch, FC, SetStateAction } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import api from "api/movies";

import Movie from "interfaces/Movie";
import { Container, TextField } from "@mui/material";

interface Props {
  isAddForm: boolean;
  initialValues?: Movie;
  setIsEditing?: Dispatch<SetStateAction<boolean>>;
  setMovie?: Dispatch<SetStateAction<Movie>>;
}

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
  image_url: Yup.string()
    .url("Link do zdjęcia musi mieć format linku")
    .nullable(),
});

const MovieForm: FC<Props> = ({
  isAddForm,
  setIsEditing = () => {},
  setMovie = () => {},
  initialValues = {
    title: "",
    director: "",
    genre: "",
    year: 1999,
    description: "",
    image_url: "",
  },
}) => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (isAddForm) {
        api.post("/movie", values);
      } else {
        api.put(`/movie/${initialValues.id}`, values);
        setMovie({
          id: initialValues.id,
          ...values,
          rating: initialValues.rating as number,
          rating_count: initialValues.rating_count as number,
        } as Movie);
        setIsEditing(false);
      }
    },
  });

  return (
    <Container>
      {isAddForm ? (
        <>
          <h2>Dodaj Film</h2>
          <Link to={"/"}>
            <button>Powrót</button>
          </Link>
        </>
      ) : null}
      <form onSubmit={formik.handleSubmit}>
        <div>
          <TextField
            id="title"
            name="title"
            label="Tytuł"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={(e) => {
              formik.touched.title = true;
              formik.validateField(e.target.name);
            }}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
        </div>
        <div>
          <TextField
            id="director"
            name="director"
            type="text"
            label="Reżyser"
            value={formik.values.director}
            onChange={formik.handleChange}
            onBlur={(e) => {
              formik.touched.director = true;
              formik.validateField(e.target.name);
            }}
            error={formik.touched.director && Boolean(formik.errors.director)}
            helperText={formik.touched.director && formik.errors.director}
          />
        </div>
        <div>
          <TextField
            id="genre"
            name="genre"
            type="text"
            label="Gatunek"
            value={formik.values.genre}
            onChange={formik.handleChange}
            onBlur={(e) => {
              formik.touched.genre = true;
              formik.validateField(e.target.name);
            }}
            error={formik.touched.genre && Boolean(formik.errors.genre)}
            helperText={formik.touched.genre && formik.errors.genre}
          />
        </div>
        <div>
          <TextField
            id="year"
            name="year"
            type="number"
            label="Rok"
            value={formik.values.year}
            onChange={formik.handleChange}
            onBlur={(e) => {
              formik.touched.year = true;
              formik.validateField(e.target.name);
            }}
            error={formik.touched.year && Boolean(formik.errors.year)}
            helperText={formik.touched.year && formik.errors.year}
          />
        </div>
        <div>
          <TextField
            id="description"
            name="description"
            label="Opis"
            rows={10}
            style={{ width: 200 }}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={(e) => {
              formik.touched.description = true;
              formik.validateField(e.target.name);
            }}
            type="textarea"
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
        </div>
        <div>
          <TextField
            id="image_url"
            name="image_url"
            type="url"
            label="Plakat"
            value={formik.values.image_url}
            onChange={formik.handleChange}
            onBlur={(e) => {
              formik.touched.image_url = true;
              formik.validateField(e.target.name);
            }}
            error={formik.touched.image_url && Boolean(formik.errors.image_url)}
            helperText={formik.touched.image_url && formik.errors.image_url}
          />
        </div>
        <button type="submit">Zapisz</button>
      </form>
    </Container>
  );
};

export default MovieForm;
