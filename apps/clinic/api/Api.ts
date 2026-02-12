// api.ts
import {
  Disease,
  DiseaseCategory,
  DiseaseTreatment,
  FavoriteDisease,
  Slider,
  DiseaseListParams,
  FavoriteStoreParams,
  ErrorReport,
  DiseaseListResponse,
  DiseaseDetails,
  DiscountPlan,
  UserDiscountPlans
} from "../types/clinic";
import { Request } from "@repo/core/http-request/Request";
import { ResponseType } from "@repo/core/types/general";
import { defaultBaseUrl, isServerSide } from "@repo/core/constants/constants";
import { toast } from "react-toastify";
import { User, VerifyPhoneInput } from "@repo/core/types/user";

class ClinicApi extends Request {
  constructor() {
    super({
      baseUrl: defaultBaseUrl,
      isServerSide: () => isServerSide,
      showToast: toast,
    });
  }
  getCsrf(): Promise<any> {
    return this.request.get("/sanctum/csrf-cookie");
  }

  // user
  sendVerificationCode(mobile: string): Promise<any> {
    return this.request.post("/user/verification/send", { mobile });
  }

  verifyPhone(data: VerifyPhoneInput): Promise<ResponseType<User>> {
    return this.request.post<User>("/user", data);
  }
  // Disease APIs
  getDiseaseList = (
    params?: DiseaseListParams
  ): Promise<ResponseType<DiseaseListResponse>> => {
    const queryParams = new URLSearchParams();
    if (params?.title) queryParams.append("title", params.title);
    if (params?.category_id)
      queryParams.append("category_id", params.category_id.toString());
    if (params?.page) queryParams.append("page", params.page.toString());

    const query = queryParams.toString() ? `?${queryParams.toString()}` : "";
    return this.request.get(`/user/v1/clinic/${query}`);
  };

  getDiseaseById = (id: number): Promise<ResponseType<{ data: Disease }>> => {
    return this.request.get(`/user/v1/clinic/${id}`);
  };

  // Category APIs
  getDiseaseCategories = (): Promise<
    ResponseType<{ data: DiseaseCategory[] }>
  > => {
    return this.request.get(`/user/v1/clinic/category/parent`);
  };

  getDiseaseChildren = (
    parentId: number
  ): Promise<ResponseType<{ data: DiseaseCategory[] }>> => {
    return this.request.get(`/user/v1/clinic/category/children/${parentId}`);
  };

  getDiseaseTreatments = (
    categoryId: number
  ): Promise<ResponseType<{ data: DiseaseTreatment[] }>> => {
    return this.request.get(
      `/user/v1/clinic/category/treatment/${categoryId}`
    );
  };

  // Error Report APIs
  reportDiseaseError = (
    text: string,
    productId: number
  ): Promise<ResponseType<{ message: string }>> => {
    return this.request.post(`/user/v1/clinic/error/report`, {
      report: text,
      id: productId,
    });
  };

  // Favorite APIs
  getFavoriteList = (page: number): Promise<
    ResponseType<{ data: DiseaseListResponse }>
  > => {
    return this.request.get(`/user/v1/clinic/favorite/list?page=${page}`);
  };

  storeFavorite = (
    clinic_id: number,
    favorite: number,
  ): Promise<ResponseType<{ message: string }>> => {
    return this.request.post(`/user/v1/clinic/favorite/`, 
      {clinic_id, favorite},
    );
  };

  // Slider APIs
  getSliderList = (): Promise<ResponseType<{ data: Slider[] }>> => {
    return this.request.get(`/user/v1/clinic/slider`);
  };

  getDiseaseDetails = (
    diseaseId: number
  ): Promise<ResponseType<{ data: DiseaseDetails }>> => {
    return this.request.get(`/user/v1/clinic/${diseaseId}`);
  };
  getUserPlans = (
  ): Promise<ResponseType< UserDiscountPlans >> => {
    return this.request.get(`/user/v1/discount/plans/check?type=3`);
  };

  getDiscountPlans = (
  ): Promise<ResponseType<{ data: DiscountPlan[] }>> => {
    return this.request.get(`/user/v1/discount/plans?type=3`);
  };

  recordDiseaseView = (
    diseaseId: number
  ): Promise<ResponseType<{ message: string }>> => {
    return this.request.post(`/user/club/mission/disease/view`, {
      id: diseaseId,
    });
  };
}

export const clinicApi = new ClinicApi();
