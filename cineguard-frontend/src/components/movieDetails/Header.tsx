import { Link } from "react-router";
import type { Movie } from "../../types";
import { ActionButtons } from "./ActionButtons";
import { Title } from "./Title";

export function Header({ movie }: { movie: Movie; }) {
  return <div className="flex flex-col space-y-5">
    <Link
      to={-1}
      className="text-primary hover:underline text-sm"
    >
      ← Back
    </Link>
    <div className="flex items-start justify-between mb-8">

      <Title movie={movie} />
      <ActionButtons movieId={movie.id} />
    </div>
  </div>
}
