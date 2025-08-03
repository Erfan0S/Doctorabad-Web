import {
  BudgetingType,
  ExamDateType,
  ExamFieldGradeType,
  ExamSliderType,
  ExamType,
  QuestionExplanationType,
  QuestionListParamsType,
  QuestionType,
} from "@/types/exam";
import {defaultBaseUrl, isServerSide} from "@repo/core/constants/constants";
import {Request} from "@repo/core/http-request/Request";
import {ResponseType} from "@repo/core/types/general";
import {toast} from "react-toastify";

class Api extends Request {
  constructor() {
    super({
      baseUrl: defaultBaseUrl,
      isServerSide: () => isServerSide,
      showToast: toast,
    });
  }

  //----------Exam----------

  getExamList = (params?: {
    field_id?: number;
    grade_id?: number;
    places?: number[];
    dates?: number[];
  }): Promise<ResponseType<{data: ExamType[]}>> => {
    return this.request.get("/user/v1/lab/exam", {params});
  };

  getExamDetail = (id: number): Promise<ResponseType<{data: ExamType}>> => {
    return this.request.get(`/user/v1/lab/exam/${id}`);
  };

  examStart = (id: number): Promise<ResponseType<{data: ExamType}>> => {
    return this.request.get(`/user/v1/lab/exam/start/${id}`);
  };

  getExamFields = (): Promise<ResponseType<{data: ExamFieldGradeType[]}>> => {
    return this.request.get("/user/v1/lab/exam/fields");
  };

  getExamGrades = (
    field_id: number
  ): Promise<ResponseType<{data: ExamFieldGradeType[]}>> => {
    return this.request.post(`/user/v1/lab/exam/grades`, {field_id});
  };

  getExamPlaces = (
    field_id?: number,
    grade_id?: number
  ): Promise<ResponseType<{data: ExamFieldGradeType[]}>> => {
    return this.request.post(`/user/v1/lab/exam/places`, {
      field_id,
      grade_id,
    });
  };

  getExamDates = (
    field_id: number,
    grade_id: number
  ): Promise<ResponseType<{data: ExamDateType[]}>> => {
    return this.request.post(`/user/v1/lab/exam/dates`, {field_id, grade_id});
  };

  //----------Question----------

  getQuestions = (
    params: QuestionListParamsType
  ): Promise<
    ResponseType<{data: QuestionType[]; budgeting: BudgetingType}>
  > => {
    return this.request.post("/user/v1/lab/question", params);
  };

  getQuestionExplanation = (params: {
    question_id: number;
    exam_id?: number;
  }): Promise<ResponseType<{data: QuestionExplanationType}>> => {
    return this.request.post(`/user/v1/lab/question/explanation`, params);
  };

  getQuestionMaker = (
    params: QuestionListParamsType
  ): Promise<ResponseType<{data: QuestionType[]; budgeting: unknown[]}>> => {
    return this.request.post("/user/v1/lab/question/maker", params);
  };

  getQuestionSearchTitle = (params: {
    title: string;
  }): Promise<ResponseType<{data: QuestionType[]}>> => {
    return this.request.post("/user/v1/lab/question/search/title", params);
  };

  //----------Question Find----------

  getQuestionFields = (): Promise<
    ResponseType<{data: ExamFieldGradeType[]}>
  > => {
    return this.request.get("/user/v1/lab/question/fields");
  };

  getQuestionGrades = (
    field_id: number
  ): Promise<ResponseType<{data: ExamFieldGradeType[]}>> => {
    return this.request.post(`/user/v1/lab/question/grades`, {field_id});
  };

  getQuestionPlaces = (params: {
    field_id?: number;
    grade_id?: number;
    topics?: number[];
  }): Promise<ResponseType<{data: ExamFieldGradeType[]}>> => {
    return this.request.post(`/user/v1/lab/question/places`, params);
  };

  getQuestionDates = (params: {
    field_id?: number;
    grade_id?: number;
    topics?: number[];
  }): Promise<ResponseType<{data: ExamDateType[]}>> => {
    return this.request.post(`/user/v1/lab/question/dates`, params);
  };

  getQuestionTopics = (
    lesson_id: number
  ): Promise<ResponseType<{data: ExamFieldGradeType[]}>> => {
    return this.request.post(`/user/v1/lab/question/topics`, {
      lesson_id,
    });
  };

  getQuestionLessons = (
    grade_id: number
  ): Promise<ResponseType<{data: ExamFieldGradeType[]}>> => {
    return this.request.post(`/user/v1/lab/question/lessons`, {grade_id});
  };

  getQestionCount = (
    params: Partial<QuestionListParamsType>
  ): Promise<
    ResponseType<{
      data: {
        count: number;
      };
    }>
  > => {
    return this.request.post("/user/v1/lab/question/count", params);
  };

  //----------Question Favorite----------
  getQuestionFavorite = (): Promise<ResponseType<{data: QuestionType[]}>> => {
    return this.request.get("/user/v1/lab/question/favorite");
  };

  addQuestionFavorite = (question: number, favorite?: boolean): Promise<{}> => {
    return this.request.post(`/user/v1/lab/question/favorite`, {
      question,
      favorite,
    });
  };

  //----------Archived Filter----------
  getArcgived = (
    params: QuestionListParamsType
  ): Promise<ResponseType<{data: QuestionType[]}>> => {
    return this.request.post("/user/v1/lab/question/archived/filter", params);
  };

  deleteArchived = (question: number): Promise<{}> => {
    return this.request.delete(
      `/user/v1/lab/question/archived/filter/${question}`
    );
  };

  addArchived = (
    question: number,
    params: {exp?: number; favorite?: number}
  ): Promise<{}> => {
    return this.request.post(
      `/user/v1/lab/question/archived/filter/${question}`,
      params
    );
  };

  //----------Others----------
  errorReport = (params: {
    question_id: number;
    message: string;
  }): Promise<{}> => {
    return this.request.post(`/user/v1/lab/report`, params);
  };

  getExamSlider = (): Promise<ResponseType<{data: ExamSliderType[]}>> => {
    return this.request.get("/user/v1/lab/sliders");
  };
}

export const api = new Api();
