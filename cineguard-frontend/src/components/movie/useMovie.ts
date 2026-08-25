import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getMovie } from '../../api';
import type { Movie } from '../../types';

export default function useMovie() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMovie() {
      try {
        const data = await getMovie(Number(id));

        if (!data) {
          setError("Movie not found.");
          return;
        }

        setMovie(data);
      } catch {
        setError("Failed to load movie.");
      } finally {
        setLoading(false);
      }
    }

    loadMovie();
  }, [id]);


  return { error, loading, movie }
}
