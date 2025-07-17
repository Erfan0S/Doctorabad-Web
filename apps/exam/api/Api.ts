import { ExamDateType, ExamFieldGradeType, ExamType } from "@/types/exam";
import { defaultBaseUrl, isServerSide } from "@repo/core/constants/constants";
import { Request } from "@repo/core/http-request/Request";
import { ResponseType } from "@repo/core/types/general";
import { toast } from "react-toastify";

class Api extends Request {
  constructor() {
    super({
      baseUrl: defaultBaseUrl,
      isServerSide: () => isServerSide,
      showToast: toast,
    });
  }

  getExamList = (params?: {
    field_id?: number;
    grade_id?: number;
    places?: number[];
    dates?: number[];
  }): Promise<ResponseType<{ data: ExamType[] }>> => {
    return this.request.get("/user/v1/lab/exam", { params });
  };

  getExamDetail = (id: number): Promise<ResponseType<{ data: ExamType }>> => {
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
    field_id: number,
    grade_id: number
  ): Promise<ResponseType<{ data: ExamDateType[] }>> => {
    return this.request.post(`/user/v1/lab/exam/dates`, { field_id, grade_id });
  };
}

export const api = new Api();
