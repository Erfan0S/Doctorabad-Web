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

export type QuestionType = {
  id: number;
  title: string;
  lesson: string;
  lesson_color_code: string;
  field: string;
  grade: string;
  dates: string[];
  places: string[];
  topics: string[];
  vip: boolean;
  tip: boolean;
  has_explanation: boolean;
  favorite: boolean;
  type: number;
  options: QuestionOptionType[];
  files: any[];
};

export type QuestionListParamsType = {
  field: number; // required
  grade?: number;
  places?: number[];
  dates?: number[];
  title?: string;
  lesson?: number;
  topics?: number[];
  budgeting?: number;
  tip?: number;
};

export type BudgetingType = {
  id: number;
  title: string;
  questions_count: number;
};

export type QuestionExplanationType = {
  explanation: string;
  references: string;
  files: any[];
};

export type ExamSliderType = {
  id: number;
  title: string;
  pic: string;
  url: string;
  location: number;
};
