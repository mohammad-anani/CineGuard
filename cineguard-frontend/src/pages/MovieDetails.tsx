import { useOutletContext } from "react-router";
import { Header } from "../components/movieDetails/Header";
import { MovieGuide } from "../components/movieDetails/MovieGuide";
import type {
  Movie
} from "../types";

function MovieDetails() {

  const { movie } = useOutletContext<{ movie: Movie }>()

  if (!movie)
    return <></>

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      <Header movie={movie} />
      {movie.movieGuideSections && movie.movieGuideSections.length > 0 ? <MovieGuide movieGuideSections={movie.movieGuideSections} /> : <h1 className="text-2xl text-center">Parents Guide Unavailable</h1>}
    </div>
  );
}

export default MovieDetails;



