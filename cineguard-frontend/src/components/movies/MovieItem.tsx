import type { NavigateFunction } from 'react-router'
import type { Movie } from '../../types'

export default function MovieItem({ movie, navigate }: { movie: Movie, navigate: NavigateFunction }) {
  return (
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
  )
}
