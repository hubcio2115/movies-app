import { FC, useState, useEffect, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import Movie from "../../interfaces/Movie";

type SortType = "title" | "genre" | "year";

interface Props {
  movies: Movie[];
  setMovies: Dispatch<SetStateAction<Movie[]>>;
  filterTitle: string;
  setFilterTitle: Dispatch<SetStateAction<string>>;
}

const MoviesOptions: FC<Props> = ({
  movies,
  setMovies,
  filterTitle,
  setFilterTitle,
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
    </div>
  );
};

export default MoviesOptions;
