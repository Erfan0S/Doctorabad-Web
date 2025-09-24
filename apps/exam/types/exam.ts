import {
  ExamDetailType,
  LessonType,
  QuestionType,
} from "@repo/apps_shared_components/exam/types/exam.ts";
import { PaginatedResponse } from "@repo/core/types/general";

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

export type QuestionListParamsType = {
  field: number; // required
  grade?: number;
  places?: number[];
  dates?: number[];
  title?: string;
  lesson?: number;
  topics?: number[];
  budgeting?: number;
  tip?: number | string;
  analyse?: number;
  per_page?: number | string;
  question_count?: number; // max: 300
};

export type BudgetingType = {
  id: number;
  title: string;
  questions_count: number;
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

export type QuestionPageType = {
  data: QuestionType[];
  exam: ExamDetailType;
  lessons: LessonType[];
};

export interface QuestionPaginatedResponse
  extends PaginatedResponse<QuestionType[]> {
  budgeting: BudgetingType[];
}

export interface MakerResponseType {
  data: QuestionType[];
  lessons: LessonType[];
}
