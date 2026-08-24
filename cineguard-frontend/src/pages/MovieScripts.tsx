import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { API_URL, getMovie } from "../api";
import type { Movie } from "../types";

function MovieScript() {
  const { id } = useParams();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadScript() {
      try {
        const movieData = await getMovie(Number(id));

        if (!movieData) {
          setError("Movie not found.");
          return;
        }

        setMovie(movieData);

        if (!movieData.scriptPath) {
          setError("This movie has no script.");
          return;
        }

        const response = await fetch(
          `${API_URL}${movieData.scriptPath}`
        );

        if (!response.ok) {
          throw new Error();
        }

        const text = await response.text();
        setScript(text);
      } catch {
        setError("Failed to load script.");
      } finally {
        setLoading(false);
      }
    }

    loadScript();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-8 py-10">
        Loading script...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-8 py-10">
        <p className="text-primary font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-8 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link
            to={`/movies/${movie?.id}`}
            className="text-primary hover:underline text-sm"
          >
            ← Back to movie
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mt-2">
            {movie?.name} — Script
          </h1>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        <pre className="whitespace-pre-wrap break-words font-mono text-sm leading-7 text-gray-800">
          {script}
        </pre>
      </div>
    </div>
  );
}

export default MovieScript;