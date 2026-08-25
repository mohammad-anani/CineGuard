
export default function Error({ error }: { error: string | null }) {
  return (
    <div className="max-w-7xl mx-auto px-8 py-10">
      <p className="text-primary font-semibold">{error}</p>
    </div>
  )
}
