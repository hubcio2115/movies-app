import { Dispatch, FC, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "api/movies";

import { Movie } from "utils/interfaces";

import {
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Save, ArrowBack } from "@mui/icons-material";

interface MovieFormProps {
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

const MovieForm: FC<MovieFormProps> = ({
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
  const navigate = useNavigate();

  return (
    <Container>
      <Stack gap={3} mt={2}>
        {isAddForm ? (
          <Box>
            <Typography variant="h5">Dodaj Film</Typography>
          </Box>
        ) : null}
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
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
                sx={{ flexGrow: 1 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="director"
                name="director"
                label="Reżyser"
                value={formik.values.director}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.touched.director = true;
                  formik.validateField(e.target.name);
                }}
                error={
                  formik.touched.director && Boolean(formik.errors.director)
                }
                helperText={formik.touched.director && formik.errors.director}
                sx={{ flexGrow: 1 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="genre"
                name="genre"
                label="Gatunek"
                value={formik.values.genre}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.touched.genre = true;
                  formik.validateField(e.target.name);
                }}
                error={formik.touched.genre && Boolean(formik.errors.genre)}
                helperText={formik.touched.genre && formik.errors.genre}
                sx={{ flexGrow: 1 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="year"
                name="year"
                label="Rok"
                type="number"
                value={formik.values.year}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.touched.year = true;
                  formik.validateField(e.target.name);
                }}
                error={formik.touched.year && Boolean(formik.errors.year)}
                helperText={formik.touched.year && formik.errors.year}
                sx={{ flexGrow: 1 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                name="description"
                label="Opis"
                multiline
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.touched.description = true;
                  formik.validateField(e.target.name);
                }}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
                fullWidth
              />
            </Grid>
            <Grid item sx={{ mb: 2 }} xs={12} sm={6}>
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
                error={
                  formik.touched.image_url && Boolean(formik.errors.image_url)
                }
                helperText={formik.touched.image_url && formik.errors.image_url}
                sx={{ flexGrow: 1 }}
                fullWidth
              />
            </Grid>
          </Grid>
          <Stack direction="row" justifyContent="space-between">
            <Button
              variant="contained"
              startIcon={<ArrowBack />}
              onClick={() => {
                if (isAddForm) {
                  navigate("/");
                } else {
                  setIsEditing(false);
                }
              }}
            >
              Powrót
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="success"
              startIcon={<Save />}
            >
              Zapisz
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
};

export default MovieForm;
