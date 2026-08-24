import { Link } from "react-router";

function Home() {
  return (
    <div className="min-h-[calc(100vh-73px)] flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to{" "}
          <span className="text-primary">CineGuard</span>
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          Analyze movie scripts and generate detailed parental
          guidance information with AI.
        </p>

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
      </div>
    </div>
  );
}

export default Home;