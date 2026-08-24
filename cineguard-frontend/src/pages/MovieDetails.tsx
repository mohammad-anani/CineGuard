import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getMovie } from "../api";
import type {
  GuideSectionType,
  Movie,
  SeverityLevel,
} from "../types";

const sectionNames: Record<GuideSectionType, string> = {
  Sex_Nudity: "Sex & Nudity",
  Violence_Gore: "Violence & Gore",
  Profanity: "Profanity",
  Alcohol_Drugs_Smoking: "Alcohol, Drugs & Smoking",
  Frightening_Intense_Scenes: "Frightening & Intense Scenes",
};

function severityClass(severity: SeverityLevel) {
  switch (severity) {
    case "None":
      return "bg-gray-100 text-gray-600";

    case "Mild":
      return "bg-green-100 text-green-700";

    case "Moderate":
      return "bg-yellow-100 text-yellow-700";

    case "Severe":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-600";
  }
}

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMovie() {
      try {
        const data = await getMovie(Number(id));

        if (!data) {
          setError("Movie not found.");
          return;
        }

        setMovie(data);
      } catch {
        setError("Failed to load movie.");
      } finally {
        setLoading(false);
      }
    }

    loadMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-8 py-10">
        Loading movie...
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="max-w-5xl mx-auto px-8 py-10">
        <p className="text-primary font-semibold">
          {error || "Movie not found."}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            {movie.name}
          </h1>

          <p className="text-gray-500 mt-2">
            Movie #{movie.id}
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            to={`/movies/${movie.id}/script`}
            className="bg-white border border-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition"
          >
            Script
          </Link>

          <Link
            to={`/movies/${movie.id}/query`}
            className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition"
          >
            Ask AI
          </Link>
        </div>
      </div>

      <div className="space-y-6">
        {movie.movieGuideSections?.map((section) => (
          <section
            key={section.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
          >
            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
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
            </div>

            <div className="p-6">
              {!section.movieGuideItems ||
                section.movieGuideItems.length === 0 ? (
                <p className="text-gray-500">
                  No items found.
                </p>
              ) : (
                <div className="space-y-4">
                  {section.movieGuideItems.map((item) => (
                    <div
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
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default MovieDetails;