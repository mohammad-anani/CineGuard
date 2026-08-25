import { Link } from "react-router";

export default function Header() {
  return (
    <>

      <Link
        to={-1}
        className="text-primary hover:underline text-sm mb-5"
      >
        ← Back
      </Link>
      <h1 className="text-3xl font-bold text-gray-900">
        Add Movie
      </h1>

      <p className="text-gray-600 mt-2 mb-8">
        Add a movie script to generate its parental guide.
      </p>
    </>
  )
}
