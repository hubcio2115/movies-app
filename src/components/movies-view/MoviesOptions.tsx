import {
  FC,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";

import api from "api/movies";

import MoviesContext from "MoviesContext";
import Movie from "interfaces/Movie";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  setSortedMovies: Dispatch<SetStateAction<Movie[]>>;
  filterTitle: string;
  setFilterTitle: Dispatch<SetStateAction<string>>;
  isSelecting: boolean;
  setIsSelecting: Dispatch<SetStateAction<boolean>>;
  selectedMovies: number[];
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

type SortType = "title" | "genre" | "year";

const MoviesOptions: FC<Props> = ({
  setSortedMovies,
  filterTitle,
  setFilterTitle,
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

      const temp = [...movies].filter((movie) => {
        return movie.id !== movieId;
      });

      setMovies(temp);
    });
  };

  return (
    <Stack direction="row" spacing={1}>
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          navigate("/add-form");
        }}
        startIcon={<AddIcon />}
      >
        Dodaj Film
      </Button>
      <FormControl sx={{ minWidth: 120 }}>
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
      <TextField
        type="text"
        placeholder="Wyszukaj film..."
        value={filterTitle}
        onChange={(e) => {
          setFilterTitle(e.target.value);
          setCurrentPage(1);
        }}
      />
      <Stack
        direction="row"
        spacing={1}
        sx={{ marginLeft: "auto !important", justifySelf: "stretch" }}
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
            <DeleteIcon />
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
    </Stack>
  );
};

export default MoviesOptions;
