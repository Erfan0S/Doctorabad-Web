import { Request } from "@repo/core/http-request/Request";
import { defaultBaseUrl, isServerSide } from "@repo/core/constants/constants";
import { toast } from "react-toastify";
import { ResponseType } from "@repo/core/types/general";
import { ExamPaginatedResponse, ExamType } from "../types";

class Api extends Request {
  constructor() {
    super({
      baseUrl: defaultBaseUrl,
      isServerSide: () => isServerSide,
      showToast: toast,
    });
  }

  getExamFavoriteExamList = (
    page: number = 1
  ): Promise<ResponseType<ExamPaginatedResponse<ExamType[]>>> => {
    return this.request.get(`/user/v1/lab/exam/favorite?page=${page}`);
  };
}

export const api = new Api();
