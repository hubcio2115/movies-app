import { FC, useState, useEffect, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { forEachChild } from "typescript";
import api from "../../api/movies";
import Movie from "../../interfaces/Movie";

type SortType = "title" | "genre" | "year";

interface Props {
  movies: Movie[];
  setMovies: Dispatch<SetStateAction<Movie[]>>;
  filterTitle: string;
  setFilterTitle: Dispatch<SetStateAction<string>>;
  isSelecting: boolean;
  setIsSelecting: Dispatch<SetStateAction<boolean>>;
  selectedMovies: number[];
}

const MoviesOptions: FC<Props> = ({
  movies,
  setMovies,
  filterTitle,
  setFilterTitle,
  isSelecting,
  setIsSelecting,
  selectedMovies,
}) => {
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

      setMovies(sorted);
    };

    sortMovies(sortType as SortType);
  }, [setMovies, sortType]);

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
        onChange={(e) => setFilterTitle(e.target.value)}
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
