
export default function SubmitButton({ loading }: { loading: boolean }) {
  return (

    <button
      type="submit"
      disabled={loading}
      className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
    >
      {loading ? "Analyzing..." : "Add Movie"}
    </button>
  )
}
