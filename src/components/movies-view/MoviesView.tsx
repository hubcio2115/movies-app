import { FC, useState, useEffect } from "react";
import api from "../../api/movies";

import MoviesOptions from "./MoviesOptions";
import MovieCard from "./MovieCard";
import MoviesFavorites from "./MoviesFavorites";
import NoMovies from "./NoMovies";

interface Movie {
  id: number;
  title: string;
  director: string;
  genre: string;
  year: number;
  description: string;
  image_url: string;
  rating_count: number;
  rating: number;
}

const MoviesView: FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filterTitle, setFilterTitle] = useState("");
  const moviesData = movies.filter((movie) => {
    return movie.title.toLowerCase().indexOf(filterTitle.toLowerCase()) !== -1;
  });

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
    <div>
      <h2>Lista Filmów</h2>
      <MoviesOptions
        filterTitle={filterTitle}
        setFilterTitle={setFilterTitle}
      />
      <hr />
      {moviesData.length ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {moviesData.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
        </div>
      ) : (
        <NoMovies />
      )}
      <hr />
      <MoviesFavorites />
    </div>
  );
};

export default MoviesView;
