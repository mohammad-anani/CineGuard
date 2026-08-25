export function Error({ error }: { error: string; }) {
  return <div className="max-w-6xl mx-auto px-8 py-10">
    <p className="text-primary font-semibold">{error}</p>
  </div>;
}
