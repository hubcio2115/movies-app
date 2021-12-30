import { FC } from "react";
import { Routes, Route } from "react-router-dom";

import MyHeader from "./components/MyHeader";
import MoviesView from "./components/movies-view/MoviesView";
import MovieAddForm from "./components/movie-add-form/MovieAddForm";

const App: FC = () => {
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
