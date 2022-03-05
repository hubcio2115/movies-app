import { FC, useMemo, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import api from "./api/movies";
import MoviesContext from "./MoviesContext";

import Movie from "./interfaces/Movie";

import MyHeader from "./components/AppHeader";
import MoviesView from "./routes/MoviesView";
import MovieForm from "./routes/MovieForm";
import MovieDetails from "./routes/MovieDetails";

const App: FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getMovies = async (url: string) => {
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
    <>
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
          <Route path="/add-form" element={<MovieForm isAddForm={true} />} />
          <Route path="/movie-details/:movieId" element={<MovieDetails />} />
        </Routes>
      </MoviesContext.Provider>
    </>
  );
};

export default App;
