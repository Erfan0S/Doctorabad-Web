import {
  ExamDateType,
  ExamFieldGradeType,
  ExamPaginatedResponse,
  ExamSliderType,
  ExamTopicType,
  FavoritePaginatedResponse,
  MakerResponseType,
  QuestionExplanationType,
  QuestionListParamsType,
  QuestionPageType,
  QuestionPaginatedResponse,
} from "@/types/exam";
import { defaultBaseUrl, isServerSide } from "@repo/core/constants/constants";
import { Request } from "@repo/core/http-request/Request";
import { PaginatedResponse, ResponseType } from "@repo/core/types/general";
import { ExamType } from "@repo/apps_shared_components/exam/types";
import { toast } from "react-toastify";

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
    page?: number;
  }): Promise<ResponseType<ExamPaginatedResponse<ExamType[]>>> => {
    return this.request.post("/user/v1/lab/exam", { ...params });
  };

  getExamDetail = (id: number): Promise<ResponseType<QuestionPageType>> => {
    return this.request.get(`/user/v1/lab/exam/${id}`);
  };

  examStart = (id: number): Promise<ResponseType<{ data: ExamType }>> => {
    return this.request.get(`/user/v1/lab/exam/start/${id}`);
  };

  getExamFields = (): Promise<ResponseType<{ data: ExamFieldGradeType[] }>> => {
    return this.request.get("/user/v1/lab/exam/fields");
  };

  getExamGrades = (
    field_id: number
  ): Promise<ResponseType<{ data: ExamFieldGradeType[] }>> => {
    return this.request.post(`/user/v1/lab/exam/grades`, { field_id });
  };

  getExamPlaces = (
    field_id?: number,
    grade_id?: number
  ): Promise<ResponseType<{ data: ExamFieldGradeType[] }>> => {
    return this.request.post(`/user/v1/lab/exam/places`, {
      field_id,
      grade_id,
    });
  };

  getExamDates = (
    field_id?: number,
    grade_id?: number
  ): Promise<ResponseType<{ data: ExamDateType[] }>> => {
    return this.request.post(`/user/v1/lab/exam/dates`, { field_id, grade_id });
  };

  //----------Question----------

  getQuestions = (
    params: QuestionListParamsType & {
      page?: number;
      explanation?: 1;
      favorite?: 1;
    }
  ): Promise<ResponseType<QuestionPaginatedResponse>> => {
    return this.request.post("/user/v1/lab/question", params);
  };
  getQuestionMaker = (
    params: QuestionListParamsType
  ): Promise<ResponseType<MakerResponseType>> => {
    return this.request.post("/user/v1/lab/question/maker", params);
  };

  getQuestionExplanation = (params: {
    question_id: number;
    exam_id?: number;
  }): Promise<ResponseType<{ data: QuestionExplanationType }>> => {
    return this.request.post(`/user/v1/lab/question/explanation`, params);
  };

  //----------Question Find----------

  getQuestionFields = (): Promise<
    ResponseType<{ data: ExamFieldGradeType[] }>
  > => {
    return this.request.get("/user/v1/lab/question/fields");
  };

  getQuestionGrades = (
    field_id: number
  ): Promise<ResponseType<{ data: ExamFieldGradeType[] }>> => {
    return this.request.post(`/user/v1/lab/question/grades`, { field_id });
  };

  getQuestionPlaces = (params: {
    field_id?: number;
    grade_id?: number;
    topics?: number[];
  }): Promise<ResponseType<{ data: ExamFieldGradeType[] }>> => {
    return this.request.post(`/user/v1/lab/question/places`, params);
  };

  getQuestionDates = (params: {
    field_id?: number;
    grade_id?: number;
    topics?: number[];
  }): Promise<ResponseType<{ data: ExamDateType[] }>> => {
    return this.request.post(`/user/v1/lab/question/dates`, params);
  };

  getQuestionTopics = (
    lesson_id: number
  ): Promise<ResponseType<{ data: ExamTopicType[] }>> => {
    return this.request.post(`/user/v1/lab/question/topics`, {
      lesson_id,
    });
  };

  getQuestionLessons = (
    grade_id: number
  ): Promise<ResponseType<{ data: ExamFieldGradeType[] }>> => {
    return this.request.post(`/user/v1/lab/question/lessons`, { grade_id });
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

  addQuestionFavorite = (question: number, favorite?: number): Promise<{}> => {
    return this.request.post(`/user/v1/lab/question/favorite`, {
      question,
      favorite,
    });
  };

  getExamFavoriteQuestionList = (
    page: number = 1
  ): Promise<ResponseType<FavoritePaginatedResponse>> => {
    return this.request.get(`/user/v1/lab/question/favorite?page=${page}`);
  };

  //----------Archived Filter----------
  getArcgived = (
    page: number = 1,
    params?: Partial<QuestionListParamsType>
  ): Promise<ResponseType<PaginatedResponse<ArchivedType[]>>> => {
    return this.request.get("/user/v1/lab/question/archived/filter", {
      params: { page, ...params },
    });
  };

  deleteArchived = (question: number): Promise<{}> => {
    return this.request.delete(
      `/user/v1/lab/question/archived/filter/${question}`
    );
  };

  addArchived = (
    question: number,
    params: { exp?: number; favorite?: number }
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

  getExamSlider = (): Promise<ResponseType<{ data: ExamSliderType[] }>> => {
    return this.request.get("/user/v1/lab/sliders");
  };
}

export const api = new Api();
