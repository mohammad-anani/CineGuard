import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { addMovie } from "../api";

function AddMovie() {
  const navigate = useNavigate();

  const [movieName, setMovieName] = useState("");
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!movieName.trim() || !script.trim()) {
      setError("Please enter both the movie name and script.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const movieId = await addMovie(
        movieName.trim(),
        script
      );

      navigate(`/movies/${movieId}`);
    } catch {
      setError("Failed to add movie.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900">
        Add Movie
      </h1>

      <p className="text-gray-600 mt-2 mb-8">
        Add a movie script to generate its parental guide.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Movie Name
          </label>

          <input
            type="text"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            placeholder="Enter movie name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:border-primary focus:ring-2 focus:ring-primary-light/30"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Script
          </label>

          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            placeholder="Paste the movie script here..."
            rows={20}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none resize-y focus:border-primary focus:ring-2 focus:ring-primary-light/30"
          />
        </div>

        {error && (
          <p className="text-primary font-medium mb-4">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? "Analyzing..." : "Add Movie"}
        </button>
      </form>
    </div>
  );
}

export default AddMovie;