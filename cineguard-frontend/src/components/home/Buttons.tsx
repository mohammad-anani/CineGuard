import { Link } from 'react-router'

export default function Buttons() {
  return (
    <div className="flex justify-center gap-4">
      <Link
        to="/movies"
        className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-background-dark transition border-2 border-primary hover:text-primary"
      >
        Browse Movies
      </Link>

      <Link
        to="/movies/add"
        className="bg-white text-primary border-2 border-primary px-6 py-3 rounded-lg font-semibold hover:bg-background-dark transition"
      >
        Add Movie
      </Link>
    </div>
  )
}
