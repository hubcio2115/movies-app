import {
  FC,
  useState,
  Dispatch,
  SetStateAction,
  ChangeEventHandler,
  ChangeEvent,
} from "react";
import { Link } from "react-router-dom";
import Movie from "../../interfaces/Movie";

interface Props {
  sortedMovies: Movie[];
  setSortedMovies: Dispatch<SetStateAction<Movie[]>>;
  filterTitle: string;
  setFilterTitle: Dispatch<SetStateAction<string>>;
}

const MoviesOptions: FC<Props> = ({
  sortedMovies,
  setSortedMovies,
  filterTitle,
  setFilterTitle,
}) => {
  const [selectedValue, setSelectedValue] = useState<
    "title" | "genre" | "year" | ""
  >("");

  const handleSort: ChangeEventHandler = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedValue(e.target.value as "title" | "genre" | "year");
    let temp = sortedMovies;

    temp.sort((current, next) => {
      if (
        current[selectedValue as "title" | "genre" | "year"] >
        next[selectedValue as "title" | "genre" | "year"]
      ) {
        return 1;
      } else if (
        current[selectedValue as "title" | "genre" | "year"] ===
        next[selectedValue as "title" | "genre" | "year"]
      ) {
        return 0;
      }
      return -1;
    });

    setSortedMovies(temp);
  };

  return (
    <div>
      <Link to={"/add-form"}>
        <button>Dodaj Film</button>
      </Link>
      <select
        name="category"
        id="category"
        value={selectedValue}
        onChange={(e) => handleSort(e)}
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
