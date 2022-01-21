import { FC, useState } from "react";
import { Routes, Route } from "react-router-dom";

import MyHeader from "./components/MyHeader";
import MoviesView from "./components/movies-view/MoviesView";
import MovieAddForm from "./components/movie-add-form/MovieForm";
import MovieDetails from "./components/movie-details/MovieDetails";

import Movie from "./interfaces/Movie";

const App: FC = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  return (
    <div className="App">
      <MyHeader />
      <Routes>
        <Route
          path="/"
          element={
            <MoviesView
              favoriteMovies={favoriteMovies}
              setFavoriteMovies={setFavoriteMovies}
            />
          }
        />
        <Route path="/add-form" element={<MovieAddForm isAddForm={true} />} />
        <Route path="/movie-details/:movieId" element={<MovieDetails />} />
      </Routes>
    </div>
  );
};

export default App;
