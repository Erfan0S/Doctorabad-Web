// api.ts
import {
  InsuranceField,
  InsuranceGrade,
  ResidencyStatus,
  DamageHistory,
  Insurer,
  GetGradesInput,
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

// اینترفیس‌های جدید برای ورودی‌ها و خروجی‌ها (می‌توانید به فایل types ببرید)

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

  getUserProfile(): Promise<ResponseType<User>> {
    return this.request.get("/user");
  }

  getProvinces(): Promise<ResponseType<Province[]>> {
    return this.request.get("/user/find/provinces");
  }

  getCities(provinceId: number): Promise<ResponseType<City[]>> {
    // طبق اسناد شما این روت POST است و بادی می‌گیرد
    return this.request.post("/user/find/tapin/cities", {
      province_id: provinceId,
    });
  }

  // ----- File Operations -----

  uploadFile(
    file: File,
    type: number
  ): Promise<ResponseType<UploadFileResponse>> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", String(type));

    // در کلاس Request معمولاً اگر formData بفرستید خودش هدر multipart را ست می‌کند
    // اما اگر نیاز به تنظیم دستی است، می‌توان کانفیگ اضافه کرد.
    return this.request.post("/user/v1/insurance/info/file/upload", formData);
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

  getInsuranceFields(): Promise<ResponseType<InsuranceField[]>> {
    return this.request.get("/user/v1/insurance/find/fields");
  }

  getInsuranceGrades(
    fields: number[]
  ): Promise<ResponseType<InsuranceGrade[]>> {
    const params: Record<string, number> = {};

    fields.forEach((id, index) => {
      params[`fields[${index}]`] = id;
    });

    return this.request.get("/user/v1/insurance/find/grades", {
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

  getResidencyStatus(): Promise<ResponseType<ResidencyStatus[]>> {
    return this.request.get("/user/v1/insurance/find/residency");
  }

  getDamageHistory(): Promise<ResponseType<DamageHistory[]>> {
    return this.request.get("/user/v1/insurance/find/history");
  }

  getLastInsurer(): Promise<ResponseType<Insurer[]>> {
    return this.request.get("/user/v1/insurance/find/insurer");
  }

  // دریافت لیست اطلاعات ذخیره شده
  getInsuranceInfos(): Promise<ResponseType<InsuranceInfo[]>> {
    return this.request.get("/user/v1/insurance/info");
  }

  // دریافت تکی (برای وقتی که کاربر یک مورد را انتخاب می‌کند)
  getInsuranceInfoSingle(id: number): Promise<ResponseType<InsuranceInfo>> {
    return this.request.get(`/user/v1/insurance/info/${id}`);
  }

  // ذخیره اطلاعات جدید
  storeInsuranceInfo(data: UpdateUserInfoInput): Promise<ResponseType<StoreInsuranceInfoResponse>> {
    return this.request.post("/user/v1/insurance/info", data);
  }
}

export const insuranceApi = new InsuranceApi();
