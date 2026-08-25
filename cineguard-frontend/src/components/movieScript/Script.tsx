export function Script({ script }: { script: string; }) {
  return <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
    <pre className="whitespace-pre-wrap break-words font-mono text-sm leading-7 text-gray-800">
      {script}
    </pre>
  </div>;
}
