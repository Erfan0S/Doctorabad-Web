// api.ts
import {
  Medicine,
  MedicineCategory,
  MedicineTreatment,
  FavoriteMedicine,
  Slider,
  MedicineListParams,
  FavoriteStoreParams,
  ErrorReport,
  MedicineListResponse,
  MedicineDetails,
} from "../types/pharmacy";
import { Request } from "@repo/core/http-request/Request";
import { ResponseType } from "@repo/core/types/general";
import { defaultBaseUrl, isServerSide } from "@repo/core/constants/constants";
import { toast } from "react-toastify";
import { User, VerifyPhoneInput } from "@repo/core/types/user";

class PharmacyApi extends Request {
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
  // Medicine APIs
  getMedicineList = (
    params?: MedicineListParams
  ): Promise<ResponseType<MedicineListResponse>> => {
    const queryParams = new URLSearchParams();
    if (params?.title) queryParams.append("title", params.title);
    if (params?.category_id)
      queryParams.append("category_id", params.category_id.toString());
    if (params?.page) queryParams.append("page", params.page.toString());

    const query = queryParams.toString() ? `?${queryParams.toString()}` : "";
    return this.request.get(`/user/v1/medicine${query}`);
  };

  getMedicineById = (id: number): Promise<ResponseType<{ data: Medicine }>> => {
    return this.request.get(`/user/v1/medicine/${id}`);
  };

  // Category APIs
  getMedicineCategories = (): Promise<
    ResponseType<{ data: MedicineCategory[] }>
  > => {
    return this.request.get(`/user/v1/medicine/category/parent`);
  };

  getMedicineChildren = (
    parentId: number
  ): Promise<ResponseType<{ data: MedicineCategory[] }>> => {
    return this.request.get(`/user/v1/medicine/category/children/${parentId}`);
  };

  getMedicineTreatments = (
    categoryId: number
  ): Promise<ResponseType<{ data: MedicineTreatment[] }>> => {
    return this.request.get(
      `/user/v1/medicine/category/treatment/${categoryId}`
    );
  };

  // Error Report APIs
  reportMedicineError = (
    text: string,
    productId: number
  ): Promise<ResponseType<{ message: string }>> => {
    return this.request.post(`/user/v1/medicine/error/report`, {
      report: text,
      id: productId,
    });
  };

  // Favorite APIs
  getFavoriteList = (): Promise<
    ResponseType< MedicineListResponse >
  > => {
    return this.request.get(`/user/v1/medicine/favorite/list`);
  };

  storeFavorite = (
    medicine_id: number,
    favorite: number,
  ): Promise<ResponseType<{ message: string }>> => {
    return this.request.post(`/user/v1/medicine/favorite/`, 
      {medicine_id, favorite},
    );
  };

  // Slider APIs
  getSliderList = (): Promise<ResponseType<{ data: Slider[] }>> => {
    return this.request.get(`/user/v1/medicine/slider`);
  };

  getMedicineDetails = (
    medicineId: number
  ): Promise<ResponseType<{ data: MedicineDetails }>> => {
    return this.request.get(`/user/v1/medicine/${medicineId}`);
  };

  recordMedicineView = (
    medicineId: number
  ): Promise<ResponseType<{ message: string }>> => {
    return this.request.post(`/user/club/mission/medicine/view`, {
      id: medicineId,
    });
  };
}

export const pharmacyApi = new PharmacyApi();
