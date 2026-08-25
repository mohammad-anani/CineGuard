import { useEffect, useState } from 'react';
import { API_URL } from '../../api';
import type { Movie } from '../../types';

export default function useScript(movie: Movie) {
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadScript() {
      try {

        if (!movie.scriptPath) {
          setError("This movie has no script.");
          return;
        }

        const response = await fetch(
          `${API_URL}${movie.scriptPath}`
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
  }, [movie]);


  return { script, loading, error }
}
