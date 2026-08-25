import type { MovieGuideSection } from "../../types";
import { sectionNames, severityClass } from "./util";

export function SectionHeader({ section }: { section: MovieGuideSection; }) {
  return <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
    <h2 className="text-xl font-bold text-gray-900">
      {sectionNames[section.sectionType]}
    </h2>

    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${severityClass(
        section.severityLevel
      )}`}
    >
      {section.severityLevel}
    </span>
  </div>;
}
