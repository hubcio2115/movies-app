import { FC } from "react";
import { Routes, Route } from "react-router-dom";

import MyHeader from "./components/MyHeader";
import MoviesView from "./components/movies-view/MoviesView";
import MovieAddForm from "./components/movie-add-form/MovieAddForm";
import MovieDetails from "./components/movie-details/MovieDetails";

const App: FC = () => {
  return (
    <div className="App">
      <MyHeader />
      <Routes>
        <Route path="/" element={<MoviesView />} />
        <Route path="/add-form" element={<MovieAddForm />} />
        <Route path="/movie-details/:movieId" element={<MovieDetails />} />
      </Routes>
    </div>
  );
};

export default App;
