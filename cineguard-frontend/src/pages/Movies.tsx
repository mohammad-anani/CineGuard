import EmptyList from "../components/movies/EmptyList";
import Error from "../components/movies/Error";
import Header from "../components/movies/Header";
import Loading from "../components/movies/Loading";
import MoviesList from "../components/movies/MoviesList";
import useMovies from "../components/movies/useMovies";

function Movies() {

  const { movies, loading, error, navigate } = useMovies()

  if (loading)
    return <Loading />

  if (error)
    return <Error error={error} />

  return (
    <div className="max-w-7xl mx-auto px-8 py-10">
      <Header onAddClick={() => navigate("/movies/add")} />
      {movies.length === 0 ? (
        <EmptyList />
      ) : (
        <MoviesList movies={movies} navigate={navigate} />
      )}
    </div>
  );
}

export default Movies;