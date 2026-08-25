import { useNavigate } from 'react-router';
import { deleteMovie } from '../../api';

export default function useDelete(movieId: number) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteMovie(movieId);
      navigate("/movies");
    } catch (error) {
      console.error(error);
    }
  };

  return { handleDelete }
}
