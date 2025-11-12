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
} from "@/types/pharmacy";
import { Request } from "@repo/core/http-request/Request";
import { ResponseType } from "@repo/core/types/general";
import { defaultBaseUrl, isServerSide } from "@repo/core/constants/constants";
import { toast } from "react-toastify";

class PharmacyApi extends Request {
  constructor() {
    super({
      baseUrl: defaultBaseUrl,
      isServerSide: () => isServerSide,
      showToast: toast,
    });
  }

  // Medicine APIs
getMedicineList = (
  params?: MedicineListParams
): Promise<ResponseType<MedicineListResponse>> => {
  const queryParams = new URLSearchParams();
  if (params?.title) queryParams.append("title", params.title);
  if (params?.category_id)
    queryParams.append("category_id", params.category_id.toString());
  if (params?.page)
    queryParams.append("page", params.page.toString());

  const query = queryParams.toString() ? `?${queryParams.toString()}` : "";
  return this.request.get(`user/v1/medicine${query}`);
};

  getMedicineById = (id: number): Promise<ResponseType<{ data: Medicine }>> => {
    return this.request.get(`user/v1/medicine/${id}`);
  };

  // Category APIs
  getMedicineCategories = (): Promise<
    ResponseType<{ data: MedicineCategory[] }>
  > => {
    return this.request.get(`user/v1/medicine/category/parent`);
  };

  getMedicineChildren = (
    parentId: number
  ): Promise<ResponseType<{ data: MedicineCategory[] }>> => {
    return this.request.get(`user/v1/medicine/category/children/${parentId}`);
  };

  getMedicineTreatments = (
    categoryId: number
  ): Promise<ResponseType<{ data: MedicineTreatment[] }>> => {
    return this.request.get(
      `user/v1/medicine/category/treatment/${categoryId}`
    );
  };

  // Error Report APIs
  reportMedicineError = (
    data: ErrorReport
  ): Promise<ResponseType<{ message: string }>> => {
    const formData = new FormData();
    formData.append("id", data.id.toString());
    formData.append("report", data.report);

    return this.request.post(`user/v1/medicine/error/report`, formData);
  };

  // Favorite APIs
  getFavoriteList = (): Promise<ResponseType<{ data: FavoriteMedicine[] }>> => {
    return this.request.get(`user/v1/medicine/favorite/list`);
  };

  storeFavorite = (
    data: FavoriteStoreParams
  ): Promise<ResponseType<{ message: string }>> => {
    const formData = new FormData();
    formData.append("medicine_id", data.medicine_id.toString());
    formData.append("favorite", data.favorite.toString());

    return this.request.post(`user/v1/medicine/favorite/`, formData);
  };

  // Slider APIs
  getSliderList = (): Promise<ResponseType<{ data: Slider[] }>> => {
    return this.request.get(`user/v1/medicine/slider`);
  };
}

export const pharmacyApi = new PharmacyApi();
