import { Request } from "@repo/core/http-request/Request";
import { defaultBaseUrl, isServerSide } from "@repo/core/constants/constants";
import { toast } from "react-toastify";
import { ResponseType } from "@repo/core/types/general";

class Api extends Request {
  constructor() {
    super({
      baseUrl: defaultBaseUrl,
      isServerSide: () => isServerSide,
      showToast: toast,
    });
  }

  getExamFavoriteExamList = (page: number = 1): Promise<ResponseType<any>> => {
    return this.request.get(`/user/v1/lab/exam/favorite?page=${page}`);
  };

  getExamList = (params?: {
    field_id?: number;
    grade_id?: number;
    places?: number[];
    dates?: number[];
    page?: number;
  }): Promise<ResponseType<any>> => {
    return this.request.post("/user/v1/lab/exam", { ...params });
  };
}

export const api = new Api();
