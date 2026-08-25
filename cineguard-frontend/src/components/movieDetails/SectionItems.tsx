import type { MovieGuideItem } from "../../types";
import { SectionItem } from "./SectionItem";

export function SectionItems({ movieGuideItems }: { movieGuideItems: MovieGuideItem[]; }) {
  return <div className="space-y-4">
    {movieGuideItems.map((item) => (
      <SectionItem item={item} />
    ))}
  </div>;
}
