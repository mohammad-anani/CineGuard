import type { NavigateFunction } from 'react-router'
import type { Movie } from '../../types'
import MovieItem from './MovieItem'

export default function MoviesList({ movies, navigate }: { movies: Movie[], navigate: NavigateFunction }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieItem movie={movie} navigate={navigate} />
      ))}
    </div>
  )
}
