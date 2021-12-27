import {
  FC,
  ChangeEvent,
  ChangeEventHandler,
  FormEventHandler,
  useState,
} from "react";

import api from "../../api/api";

const MovieAddForm: FC = () => {
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    genre: "",
    year: 1999,
    description: "",
    image_url: null as null | string,
  });

  const handleChange: ChangeEventHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit: FormEventHandler = (e) => {
    api.post("/movie", movie);
    e.preventDefault();
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div>
          <label htmlFor="title">Tytuł: </label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="director">Dyrektor: </label>
          <input
            type="text"
            name="director"
            id="director"
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="genre">Gatunek: </label>
          <input
            type="text"
            name="genre"
            id="genre"
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="year">Rok premiery: </label>
          <input
            type="number"
            name="year"
            id="year"
            min={1000}
            max={parseInt(new Date().getFullYear().toString())}
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Opis: </label>
          <textarea
            name="description"
            id="description"
            cols={30}
            rows={10}
            onChange={(e) => {
              handleChange(e);
            }}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="image_url">Zdjęcie: </label>
          <input
            type="url"
            name="image_url"
            id="image_url"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <button type="submit">Zapisz</button>
      </form>
    </div>
  );
};

export default MovieAddForm;
