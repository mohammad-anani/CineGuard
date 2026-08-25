import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getMovies } from "../../api";
import type { Movie } from "../../types";

export default function useMovies() {

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


  return { movies, loading, error, navigate }
}
