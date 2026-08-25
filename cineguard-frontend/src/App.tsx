import { Route, Routes } from "react-router";

import Navbar from "./components/Navbar";

import AddMovie from "./pages/AddMovie";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import MovieDetails from "./pages/MovieDetails";
import MovieQuery from "./pages/MovieQuery";
import Movies from "./pages/Movies";
import MovieScript from "./pages/MovieScripts";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/movies" element={<Movies />} />

        <Route
          path="/movies/add"
          element={<AddMovie />}
        />

        <Route path="/movies/:id" element={<Movie />}>
          <Route index element={<MovieDetails />} />
          <Route path="query" element={<MovieQuery />} />
          <Route path="script" element={<MovieScript />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;