import { FC, useMemo, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import api from "api/movies";
import MoviesContext from "MoviesContext";

import Movie from "./interfaces/Movie";
import url from "types/url";

import MyHeader from "components/MyHeader";
import MoviesView from "routes/MoviesView";
import MovieAddForm from "routes/MovieForm";
import MovieDetails from "routes/MovieDetails";

const App: FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getMovies = async (url: url) => {
      const res = await api.get(url);
      setMovies(res.data);
    };

    getMovies("/movies");
  }, []);

  const providerMovies = useMemo(
    () => ({ movies, setMovies }),
    [movies, setMovies]
  );

  return (
    <div>
      <MyHeader />
      <MoviesContext.Provider value={providerMovies}>
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
      </MoviesContext.Provider>
    </div>
  );
};

export default App;
