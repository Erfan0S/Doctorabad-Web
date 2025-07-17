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
