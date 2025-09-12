// TODO: duplicated code, need to be refactored in exam

export enum SharedFilters {
  FIELD = "field",
  GRADE = "grade",
  LESSON = "lesson",
  TOPIC = "topic",
  DATE = "date",
  PLACE = "place",
  EXPLANATION = "explanation",
  BUDGETING = "budgeting",
  TIP = "tip",
  SORT = "sort",
  LESSON_FILTER = "lessonFilter",
  RECORD = "record",
  MARKING = "marking",
  STATUS = "status",
  MANUAL_TIME = "time",
  SHOW_RECORD = "show_record",
}

export type filterPages = "maker" | "questionBank" | "exams";

export enum ExamStatus {
  OBSERVING = "observing",
  DRAFT = "draft",
  STARTED = "started",
  FINISHED = "finished",
}
