
export default function Error({ error }: { error: string | null }) {
  return (
    <>
      {error && (
        <p className="text-primary font-medium mb-4">
          {error}
        </p>
      )}
    </>
  )
}
