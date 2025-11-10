import { MedicineCategory } from "@/types/category";
import { Request } from "@repo/core/http-request/Request";
import { ResponseType } from "@repo/core/types/general";

import { defaultBaseUrl, isServerSide } from "@repo/core/constants/constants";
import { toast } from "react-toastify";

class Api extends Request {
  constructor() {
    super({
      baseUrl: defaultBaseUrl,
      isServerSide: () => isServerSide,
      showToast: toast,
    });
  }

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
  ): Promise<
    ResponseType<{ data: { id: number; title_fa: string; title_en: string }[] }>
  > => {
    return this.request.get(
      `user/v1/medicine/category/treatment/${categoryId}`
    );
  };
}
export const api = new Api();
