import type { MovieGuideItem } from "../../types";
import { severityClass } from "./util";

export function SectionItem({ item }: { item: MovieGuideItem; }) {
  return <div
    key={item.id}
    className="flex items-start justify-between gap-6 p-4 rounded-lg bg-background"
  >
    <p className="text-gray-700">
      {item.description}
    </p>

    <span
      className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${severityClass(
        item.severityLevel
      )}`}
    >
      {item.severityLevel}
    </span>
  </div>;
}
