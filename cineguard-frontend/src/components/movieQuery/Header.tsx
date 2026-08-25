import { Link } from "react-router";

export function Header({ movieName }: { movieName: string; }) {
  return <div className="max-w-4xl w-full mx-auto px-6 pt-6">
    <Link
      to={-1}
      className="text-primary hover:underline text-sm"
    >
      ← Back to movie
    </Link>
    <h1 className="text-3xl font-bold text-gray-900 mt-2">
      {movieName} - Ask AI
    </h1>
  </div>;
}
