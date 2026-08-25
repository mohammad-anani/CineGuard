import type { Movie } from "../../types";


export function Title({ movie }: { movie: Movie }) {
  return <div>
    <h1 className="text-4xl font-bold text-gray-900">
      {movie.name}
    </h1>

    <p className="text-gray-500 mt-2">
      Movie #{movie.id}
    </p>
  </div>;
}
