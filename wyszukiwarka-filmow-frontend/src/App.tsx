import { FC, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import api from "./api/api";

import MyHeader from "./components/MyHeader";
import MoviesView from "./components/movies-view/MoviesView";
import MovieAddForm from "./components/movie-add-form/MovieAddForm";

const App: FC = () => {
  const [movies, setMovies] = useState([{}]);

  const getMovies = async () => {
    return await api.get("/movies");
  };

  useEffect(() => {
    const getAllMovies = async () => {
      const allMovies = await getMovies();
      if (allMovies) setMovies(allMovies.data);
    };

    getAllMovies();
  }, []);

  return (
    <div className="App">
      <MyHeader />
      <Routes>
        <Route path="/" element={<MoviesView />} />
        <Route path="/add-form" element={<MovieAddForm />} />
      </Routes>
    </div>
  );
};

export default App;
