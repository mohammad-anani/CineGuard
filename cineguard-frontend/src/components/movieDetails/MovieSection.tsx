import type { MovieGuideSection } from "../../types";
import { EmptyList } from "./EmptyList";
import { SectionHeader } from "./SectionHeader";
import { SectionItems } from "./SectionItems";

export function MovieSection({ section }: { section: MovieGuideSection; }) {
  return <section
    key={section.id}
    className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden "
  >
    <SectionHeader section={section} />

    <div className="p-6">
      {!section.movieGuideItems ||
        section.movieGuideItems.length === 0 ? (
        <EmptyList />
      ) : (
        <SectionItems movieGuideItems={section.movieGuideItems} />
      )}
    </div>
  </section>;
}



