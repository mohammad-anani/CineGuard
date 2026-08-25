import { useOutletContext } from "react-router";
import { Error } from "../components/movieScript/Error";
import { Header } from "../components/movieScript/Header";
import { Loading } from "../components/movieScript/Loading";
import { Script } from "../components/movieScript/Script";
import useScript from "../components/movieScript/useScript";
import type { Movie } from "../types";

function MovieScript() {
  const { movie } = useOutletContext<{ movie: Movie }>()

  const { script, loading, error } = useScript(movie)

  if (loading) {
    return (
      <Loading />
    );
  }

  if (error) {
    return (
      <Error error={error} />
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-8 py-10">
      <Header movieName={movie?.name ?? ""} />

      <Script script={script} />
    </div>
  );
}

export default MovieScript;


