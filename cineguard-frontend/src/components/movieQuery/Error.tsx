export function Error({ error }: { error: string; }) {
  return <p className="text-primary text-sm mb-2">
    {error}
  </p>;
}
