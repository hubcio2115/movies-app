import { FC } from "react";

const MoviesOptions: FC = () => {
  return (
    <div>
      <button>Dodaj Film</button>
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
