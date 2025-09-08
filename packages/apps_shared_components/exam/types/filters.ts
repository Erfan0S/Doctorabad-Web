// TODO: duplicated code, need to be refactored in exam

export const SharedFilters = {
  FIELD: "field",
  GRADE: "grade",
  LESSON: "lesson",
  TOPIC: "topic",
  DATE: "date",
  PLACE: "place",
  EXPLANATION: "explanation",
  BUDGETING: "budgeting",
  TIP: "tip",
  SORT: "sort",
};

export const MakeFilters = {
  ...SharedFilters,
  RECORD: "record",
  MARKING: "marking",
  MANUAL: "manual",
};

export type filterPages = "maker" | "questionBank" | "exams";
