import type { MovieGuideSection } from "../../types";
import { MovieSection } from "./MovieSection";

export function MovieGuide({ movieGuideSections }: { movieGuideSections: MovieGuideSection[]; }) {
  return <div className="space-y-6">
    <h2 className="text-2xl font-bold">Parents Guide</h2>
    {movieGuideSections?.map((section) => (
      <MovieSection section={section} />
    ))}
  </div>;
}
