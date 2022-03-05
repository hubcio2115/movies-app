import {
  FC,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/movies";

import MoviesContext from "../MoviesContext";
import Movie from "../interfaces/Movie";

import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import { Add, Delete } from "@mui/icons-material";

interface MovieOptionsProps {
  setSortedMovies: Dispatch<SetStateAction<Movie[]>>;
  titleFilter: string;
  setTitleFilter: Dispatch<SetStateAction<string>>;
  isSelecting: boolean;
  setIsSelecting: Dispatch<SetStateAction<boolean>>;
  selectedMovies: number[];
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

type SortType = "title" | "genre" | "year";

const MoviesOptions: FC<MovieOptionsProps> = ({
  setSortedMovies,
  titleFilter,
  setTitleFilter,
  isSelecting,
  setIsSelecting,
  selectedMovies,
  setCurrentPage,
}) => {
  const { movies, setMovies } = useContext(MoviesContext);
  const [sortType, setSortType] = useState<SortType | "">("");
  const navigate = useNavigate();

  useEffect(() => {
    const sortMovies = (type: SortType) => {
      const sorted = [...movies].sort((current, next) => {
        if (current[type] < next[type]) {
          return -1;
        } else if (current[type] === next[type]) {
          return 0;
        }
        return 1;
      });

      setSortedMovies(sorted);
    };

    sortMovies(sortType as SortType);
  }, [movies, setSortedMovies, sortType]);

  const handleDeleteMovie = () => {
    selectedMovies.forEach((movieId) => {
      api.delete(`/movie/${movieId}`);

      const newMovies = [...movies].filter((movie) => {
        return movie.id !== movieId;
      });

      setMovies(newMovies);
    });
  };

  return (
    <Grid
      container
      spacing={1}
      columns={{ xs: 4, sm: 12, md: 12, lg: 12, xl: 12 }}
    >
      <Grid item xs={2} sm={3} md={2}>
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={() => {
            navigate("/add-form");
          }}
          startIcon={<Add />}
          sx={{ height: "100%" }}
        >
          Dodaj Film
        </Button>
      </Grid>
      <Grid item xs={2} sm={2}>
        <FormControl fullWidth>
          <InputLabel id="category-select-label">Sortuj wg.</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            label="category"
            value={sortType}
            onChange={(e) => setSortType(e.target.value as SortType)}
          >
            <MenuItem value="title">Tytuł</MenuItem>
            <MenuItem value="genre">Gatunek</MenuItem>
            <MenuItem value="year">Rok</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4} sm={3}>
        <TextField
          type="text"
          placeholder="Wyszukaj film..."
          value={titleFilter}
          fullWidth
          onChange={(e) => {
            setTitleFilter(e.target.value);
            setCurrentPage(1);
          }}
        />
      </Grid>
      <Grid item xs={4} md={5}>
        <Stack
          direction="row"
          spacing={1}
          height="56px"
          justifyContent="flex-end"
        >
          {!isSelecting ? null : (
            <Button
              color="error"
              variant="contained"
              onClick={() => {
                handleDeleteMovie();
              }}
              disabled={selectedMovies.length === 0}
            >
              <Delete />
            </Button>
          )}
          <Button
            variant="contained"
            onClick={() => {
              setIsSelecting(!isSelecting);
            }}
          >
            Zaznacz
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default MoviesOptions;
