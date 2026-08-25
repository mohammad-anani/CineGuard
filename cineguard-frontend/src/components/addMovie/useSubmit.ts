import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { addMovie } from "../../api";


export default function useSubmit() {
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

  return { movieName, setMovieName, script, setScript, error, loading, handleSubmit }
}
