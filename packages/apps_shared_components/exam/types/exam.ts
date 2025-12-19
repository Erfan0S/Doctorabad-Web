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
  favorite: boolean;
  installment_payment: boolean;
  installment_text?: string;
};

export enum ExamStatus {
  OBSERVING = "observing",
  DRAFT = "draft",
  STARTED = "started",
  FINISHED = "finished",
}
