import { Link } from "react-router";
import useDelete from "./useDelete";

export function ActionButtons({ movieId }: { movieId: number }) {

  const { handleDelete } = useDelete(movieId)

  return <div className="flex gap-3 flex-wrap">
    <Link
      to={`/movies/${movieId}/script`}
      className="bg-white border border-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition"
    >
      Script
    </Link>

    <Link
      to={`/movies/${movieId}/query`}
      className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition"
    >
      Ask AI
    </Link>

    <button
      onClick={() => {
        if (confirm("Confirm Deletion?"))
          handleDelete()
      }}
      className=" text-white px-4 py-2 rounded-lg font-medium bg-red-700 transition hover:opacity-85"
    >
      Delete
    </button>
  </div>;
}