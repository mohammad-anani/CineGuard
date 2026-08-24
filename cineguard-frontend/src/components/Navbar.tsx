import { Link } from "react-router";

function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-primary"
        >
          CineGuard
        </Link>

        <div className="flex gap-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-primary transition"
          >
            Home
          </Link>

          <Link
            to="/movies"
            className="text-gray-700 hover:text-primary transition"
          >
            Movies
          </Link>

          <Link
            to="/movies/add"
            className="text-gray-700 hover:text-primary transition"
          >
            Add Movie
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;