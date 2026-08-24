export type SeverityLevel =
  | "None"
  | "Mild"
  | "Moderate"
  | "Severe";

export type GuideSectionType =
  | "Sex_Nudity"
  | "Violence_Gore"
  | "Profanity"
  | "Alcohol_Drugs_Smoking"
  | "Frightening_Intense_Scenes";

export interface MovieGuideItem {
  id: number;
  sectionId: number;
  description: string | null;
  severityLevel: SeverityLevel;
}

export interface MovieGuideSection {
  id: number;
  movieId: number;
  sectionType: GuideSectionType;
  severityLevel: SeverityLevel;
  movieGuideItems: MovieGuideItem[] | null;
}

export interface Movie {
  id: number;
  name: string | null;
  scriptPath: string | null;
  movieGuideSections: MovieGuideSection[] | null;
}

export interface QueryResult {
  answer: string | null;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}