export function Error(error: string) {
  return <div className="max-w-5xl mx-auto px-8 py-10">
    <p className="text-primary font-semibold">
      {error || "Movie not found."}
    </p>
  </div>;
}
