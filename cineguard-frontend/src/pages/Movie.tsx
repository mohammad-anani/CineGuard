import { Outlet } from "react-router";
import { Error } from "../components/movie/Error";
import { Loading } from "../components/movie/Loading";
import useMovie from "../components/movie/useMovie";

function Movie() {

  const { error, loading, movie } = useMovie()

  if (loading) {
    return (
      <Loading />
    );
  }

  if (error || !movie) {
    return (
      Error(error)
    );
  }


  return <Outlet context={{ movie }} />;
}

export default Movie;



