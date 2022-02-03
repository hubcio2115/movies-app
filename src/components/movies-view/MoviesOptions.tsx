import {
  FC,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { Link } from "react-router-dom";

import api from "api/movies";

import MoviesContext from "MoviesContext";
import Movie from "interfaces/Movie";

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
    <div>
      <Link to={"/add-form"}>
        <button>Dodaj Film</button>
      </Link>
      <select
        name="category"
        id="category"
        value={sortType}
        onChange={(e) => setSortType(e.target.value as SortType)}
      >
        <option value="" disabled>
          Sortuj wg.
        </option>
        <option value="title">Tytuł</option>
        <option value="genre">Gatunek</option>
        <option value="year">Rok</option>
      </select>
      <input
        type="text"
        placeholder="Wyszukaj film..."
        value={filterTitle}
        onChange={(e) => {
          setFilterTitle(e.target.value);
          setCurrentPage(1);
        }}
      />
      <button
        onClick={() => {
          setIsSelecting(!isSelecting);
        }}
      >
        Zaznacz
      </button>
      {!isSelecting ? null : (
        <button
          onClick={() => {
            handleDeleteMovie();
          }}
        >
          ❌
        </button>
      )}
    </div>
  );
};

export default MoviesOptions;
