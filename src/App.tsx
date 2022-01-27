import { FC, useState } from "react";
import { Routes, Route } from "react-router-dom";

import MyHeader from "components/MyHeader";
import MoviesView from "routes/MoviesView";
import MovieAddForm from "routes/MovieForm";
import MovieDetails from "routes/MovieDetails";

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
