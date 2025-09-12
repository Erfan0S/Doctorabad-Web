import { PaginatedResponse } from "@repo/core/types/general";

export type ExamType = {
  id: number;
  title: string;
  date: string;
  field: string;
  grade: string;
  place: string;
  picture: string | null;
  main_price: number;
  off_price: number | null;
  user_has_access: boolean;
};
export interface ExamPaginatedResponse<T> extends PaginatedResponse<T> {
  has_general_access: boolean;
}

export type ExamFieldGradeType = {
  id: number;
  title: string;
};

export type ExamDateType = {
  id: number;
  when: string;
};

export type QuestionOptionType = {
  id: number;
  title: string;
  is_correct: boolean;
};

export enum QuestionTypes {
  SingleSelect = 1,
  MultipleSelect = 2,
  Text = 3,
}

export type QuestionType = {
  id: number;
  title: string;
  lesson: string;
  lesson_color_code: string;
  lesson_id: number;
  field: string;
  grade: string;
  dates: string[];
  places: string[];
  topics: string[];
  vip: boolean;
  tip: boolean;
  has_explanation: boolean;
  favorite: boolean;
  type: QuestionTypes;
  options: QuestionOptionType[];
  files: any[];
};

export type QuestionListParamsType = {
  field: number | string; // required
  grade?: number | string;
  places?: number[] | string[];
  dates?: number[] | string[];
  title?: number | string;
  lesson?: number | string;
  topics?: number[] | string[];
  budgeting?: number | string;
  tip?: number | string;
};

export type BudgetingType = {
  id: number;
  title: string;
  questions_count: number;
};

export type QuestionExplanationType = {
  explanation: string;
  references: string;
  files: string[];
};

export type ExamSliderType = {
  id: number;
  title: string;
  pic: string;
  url: string;
  location: number;
};

export type ExamTopicType = {
  id: number;
  title: string;
  topics: ExamTopicType[];
};

export type ExamDetailType = {
  id: number;
  title: string;
  order_items_count: number | null;
  main_price: number;
  off_price: number | null;
  date: {
    id: number;
    when: string;
    when_fa: string;
  };
  place: {
    id: number;
    title: string;
  };
};

export type LessonType = {
  id: number;
  title: string;
  color_code: string;
  reputation_count: number;
};

export type QuestionPageType = {
  data: QuestionType[];
  exam: ExamDetailType;
  lessons: LessonType[];
};

export interface QuestionPaginatedResponse
  extends PaginatedResponse<QuestionType[]> {
  budgeting: BudgetingType;
}

export enum ExamSearchParams {
  STATUS = "status",
  MANUAL_TIME = "time",
  SHOW_RECORD = "show_record",
}

export enum ExamStatus {
  OBSERVING = "observing",
  DRAFT = "draft",
  STARTED = "started",
  FINISHED = "finished",
}
