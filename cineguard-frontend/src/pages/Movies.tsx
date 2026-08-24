import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getMovies } from "../api";
import type { Movie } from "../types";

function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function loadMovies() {
      try {
        const data = await getMovies();
        setMovies(data);
      } catch {
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-10">
        <p className="text-gray-600">Loading movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-10">
        <p className="text-primary font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Movies
          </h1>

          <p className="text-gray-600 mt-1">
            Browse your analyzed movies.
          </p>
        </div>

        <button
          onClick={() => navigate("/movies/add")}
          className="bg-primary text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Add Movie
        </button>
      </div>

      {movies.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center">
          <p className="text-gray-500">
            No movies have been added yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <button
              key={movie.id}
              onClick={() => navigate(`/movies/${movie.id}`)}
              className="text-left bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition"
            >
              <h2 className="text-xl font-semibold text-gray-900">
                {movie.name}
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                View movie guide
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Movies;