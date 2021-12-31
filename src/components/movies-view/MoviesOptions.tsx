import { FC, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

interface Props {
  filterTitle: string;
  setFilterTitle: Dispatch<SetStateAction<string>>;
}

const MoviesOptions: FC<Props> = ({ filterTitle, setFilterTitle }) => {
  return (
    <div>
      <Link to={"/add-form"}>
        <button>Dodaj Film</button>
      </Link>
      <select name="category" id="category" placeholder="">
        <option value="" disabled>
          Sortuj wg.
        </option>
        <option value="date">Data dodania</option>
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
