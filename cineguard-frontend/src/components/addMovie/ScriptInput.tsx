import type { Setter } from "../../types";

export default function ScriptInput({ script, setScript }: { script: string, setScript: Setter<string> }) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Script
      </label>

      <textarea
        value={script}
        onChange={(e) => setScript(e.target.value)}
        placeholder="Paste the movie script here..."
        rows={20}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none resize-y focus:border-primary focus:ring-2 focus:ring-primary-light/30"
      />
    </div>
  )
}
