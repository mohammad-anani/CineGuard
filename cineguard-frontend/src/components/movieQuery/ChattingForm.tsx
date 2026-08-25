import type { Dispatch, FormEvent, SetStateAction } from "react";

export function ChattingForm({ handleSubmit, loading, setQuery, query }: { handleSubmit: (event: FormEvent) => Promise<void>; query: string; setQuery: Dispatch<SetStateAction<string>>; loading: boolean; }) {
  return <form
    onSubmit={handleSubmit}
    className="flex gap-3"
  >
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Ask something about this movie..."
      disabled={loading}
      className="flex-1 bg-white border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary-light/30 disabled:bg-gray-100" />

    <button
      type="submit"
      disabled={loading || !query.trim()}
      className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
    >
      Send
    </button>
  </form>;
}
