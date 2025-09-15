import { Request } from "@repo/core/http-request/Request";
import { defaultBaseUrl, isServerSide } from "@repo/core/constants/constants";
import { toast } from "react-toastify";
import { ResponseType } from "@repo/core/types/general";
import {
  FavoritePaginatedResponse,
  QuestionExplanationType,
} from "../types/exam";

class Api extends Request {
  constructor() {
    super({
      baseUrl: defaultBaseUrl,
      isServerSide: () => isServerSide,
      showToast: toast,
    });
  }

  getQuestionExplanation = (params: {
    question_id: number;
    exam_id?: number;
  }): Promise<ResponseType<{ data: QuestionExplanationType }>> => {
    return this.request.post(`/user/v1/lab/question/explanation`, params);
  };

  getExamFavoriteList = (
    page: number = 1
  ): Promise<ResponseType<FavoritePaginatedResponse>> => {
    return this.request.get(`/user/v1/lab/question/favorite?page=${page}`);
  };
}

export const api = new Api();
