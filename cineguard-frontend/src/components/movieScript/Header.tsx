import { Link } from "react-router";

export function Header({ movieName }: { movieName: string; }) {
  return <div className="flex items-center justify-between mb-6">
    <div>
      <Link
        to={-1}
        className="text-primary hover:underline text-sm"
      >
        ← Back to movie
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mt-2">
        {movieName} - Script
      </h1>
    </div>
  </div>;
}
