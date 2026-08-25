
export default function Header({ onAddClick }: { onAddClick: () => void }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Movies
        </h1>

        <p className="text-gray-600 mt-1">
          Browse your analyzed movies.
        </p>
      </div>

      <button
        onClick={onAddClick}
        className="bg-primary text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-red-700 transition"
      >
        Add Movie
      </button>
    </div>
  )
}
