// api.ts
import {
  InsuranceField,
  InsuranceGrade,
  ResidencyStatus,
  DamageHistory,
  Insurer,
  InsuranceListParams,
  City,
  Province,
  UpdateUserInfoInput,
  UploadFileResponse,
  InsuranceInfo,
  StoreInsuranceInfoResponse,
} from "@/types/insurance";
import { Request } from "@repo/core/http-request/Request";
import { ResponseType, PaginatedResponse } from "@repo/core/types/general";
import { defaultBaseUrl, isServerSide } from "@repo/core/constants/constants";
import { toast } from "react-toastify";
import { User, VerifyPhoneInput } from "@repo/core/types/user";


class InsuranceApi extends Request {
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

  // user auth
  sendVerificationCode(mobile: string): Promise<any> {
    return this.request.post("/user/verification/send", { mobile });
  }

  verifyPhone(data: VerifyPhoneInput): Promise<ResponseType<User>> {
    return this.request.post<User>("/user", data);
  }

  // ----- User Profile & Address -----

  getUserProfile(): Promise<ResponseType<{ data: User }>> {
    return this.request.get<{ data: User }>("/user");
  }

  getProvinces(): Promise<ResponseType<{ data: Province[] } >> {
    return this.request.get<{ data: Province[] }>("/user/find/provinces");
  }

  getCities(provinceId: number): Promise<ResponseType<{ data: City[] }>> {
    // طبق اسناد شما این روت POST است و بادی می‌گیرد
    return this.request.post<{ data: City[] }>("/user/find/tapin/cities", {
      province_id: provinceId,
    });
  }

  // ----- File Operations -----

  uploadFile(
    file: File,
    type: number
  ): Promise<ResponseType<{ data: UploadFileResponse }>> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", String(type));

    return this.request.post<{ data: UploadFileResponse }>("/user/v1/insurance/info/file/upload", formData);
  }

  destroyFile(fileId: number, type: number): Promise<ResponseType<any>> {
    return this.request.delete("/user/v1/insurance/info/file/destroy", {
      params: {
        file_id: fileId,
        type,
      },
    });
  }

  // ----- Update Insurance Info (Final Submit) -----

  updateInsuranceInfo(
    id: number,
    data: UpdateUserInfoInput
  ): Promise<ResponseType<any>> {
    return this.request.put(`/user/v1/insurance/info/${id}`, data);
  }

  // ----- Insurance Find -----

  getInsuranceFields():  Promise<ResponseType<{ data: InsuranceField[] }>> {
    return this.request.get<{ data: InsuranceField[] }>("/user/v1/insurance/find/fields");
  }

  getInsuranceGrades(
    fields: number[]
  ): Promise<ResponseType<{ data: InsuranceGrade[] }>> {
    const params: Record<string, number> = {};

    fields.forEach((id, index) => {
      params[`fields[${index}]`] = id;
    });

    return this.request.get<{ data: InsuranceGrade[] }>("/user/v1/insurance/find/grades", {
      params,
    });
  }

  getInsurances(
    params: InsuranceListParams
  ): Promise<ResponseType<PaginatedResponse<Insurer[]>>> {
    const qp: Record<string, any> = { page: params.page ?? 1 };

    if (params.field) qp.field = params.field;
    if (params.grade) qp.grade = params.grade;
    if (params.residency_status) qp.residency_status = params.residency_status;
    if (params.damage_history) qp.damage_history = params.damage_history;
    if (params.last_insurance != null)
      qp.last_insurance = params.last_insurance;
    if (params.current_insurance_end_date !== null)
      qp.current_insurance_end_date = params.current_insurance_end_date;

    return this.request.get("/user/v1/insurance", { params: qp });
  }

  getResidencyStatus(): Promise<ResponseType<{ data: ResidencyStatus[] }>> {
    return this.request.get<{ data: ResidencyStatus[] }>("/user/v1/insurance/find/residency");
  }

  getDamageHistory(): Promise<ResponseType<{data: DamageHistory[]}>> {
    return this.request.get<{ data: DamageHistory[] }>("/user/v1/insurance/find/history");
  }

  getLastInsurer(): Promise<ResponseType<{ data: Insurer[] }>> {
    return this.request.get<{ data: Insurer[] }>("/user/v1/insurance/find/insurer");
  }

  // دریافت لیست اطلاعات ذخیره شده
  getInsuranceInfos(): Promise<ResponseType<{ data: InsuranceInfo[] }>> {
    return this.request.get<{ data: InsuranceInfo[] }>("/user/v1/insurance/info");
  }

  // دریافت تکی (برای وقتی که کاربر یک مورد را انتخاب می‌کند)
  getInsuranceInfoSingle(id: number): Promise<ResponseType<{ data: InsuranceInfo }>> {
    return this.request.get<{ data: InsuranceInfo }>(`/user/v1/insurance/info/${id}`);
  }

  // ذخیره اطلاعات جدید
  storeInsuranceInfo(data: UpdateUserInfoInput): Promise<ResponseType<{ data: StoreInsuranceInfoResponse }>> {
    return this.request.post<{ data: StoreInsuranceInfoResponse }>("/user/v1/insurance/info", data);
  }
}

export const insuranceApi = new InsuranceApi();
