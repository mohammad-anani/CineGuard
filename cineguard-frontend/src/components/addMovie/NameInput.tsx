import type { Setter } from "../../types";

export default function NameInput({ movieName, setMovieName }: { movieName: string, setMovieName: Setter<string> }) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Movie Name
      </label>

      <input
        type="text"
        value={movieName}
        onChange={(e) => setMovieName(e.target.value)}
        placeholder="Enter movie name"
        className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:border-primary focus:ring-2 focus:ring-primary-light/30"
      />
    </div>
  )
}
