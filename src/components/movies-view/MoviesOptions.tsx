import { FC } from "react";
import { Link } from "react-router-dom";

const MoviesOptions: FC = () => {
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
      <input type="text" placeholder="Wyszukaj film..." />
    </div>
  );
};

export default MoviesOptions;
