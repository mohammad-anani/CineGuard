import type { GuideSectionType, SeverityLevel } from "../../types";

export const sectionNames: Record<GuideSectionType, string> = {
  Sex_Nudity: "Sex & Nudity",
  Violence_Gore: "Violence & Gore",
  Profanity: "Profanity",
  Alcohol_Drugs_Smoking: "Alcohol, Drugs & Smoking",
  Frightening_Intense_Scenes: "Frightening & Intense Scenes",
};

export function severityClass(severity: SeverityLevel) {
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
