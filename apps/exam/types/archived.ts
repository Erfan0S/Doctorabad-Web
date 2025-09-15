interface ArchivedType {
  id: number;
  title?: string;
  field: number;
  field_title: string;
  grade?: number;
  grade_title?: string;
  lesson?: number;
  lesson_title?: string;
  topic?: ExamTopicType[];
  date?: ExamDateType[];
  place?: ExamPlaceType[];
  budgeting?: boolean;
  tip?: boolean;
  created_at: string;
}

interface ExamTopicType {
  id: number;
  title: string;
}

interface ExamDateType {
  id: number;
  title: string;
}

interface ExamPlaceType {
  id: number;
  title: string;
}
