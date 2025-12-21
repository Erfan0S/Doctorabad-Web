// api.ts
import {
  InsuranceField,
  InsuranceGrade,
  ResidencyStatus,
  DamageHistory,
  Insurer,
  GetGradesInput,
  InsuranceListParams,
} from "@/types/insurance";
import { Request } from "@repo/core/http-request/Request";
import { ResponseType } from "@repo/core/types/general";
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

  // user
  sendVerificationCode(mobile: string): Promise<any> {
    return this.request.post("/user/verification/send", { mobile });
  }

  verifyPhone(data: VerifyPhoneInput): Promise<ResponseType<User>> {
    return this.request.post<User>("/user", data);
  }

  // insurance find
  getInsuranceFields(): Promise<ResponseType<InsuranceField[]>> {
    return this.request.get("/user/v1/insurance/find/fields");
  }

// api.ts
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
): Promise<ResponseType<{ data: Insurer[] }>> {
  const qp: Record<string, any> = { page: params.page ?? 1 };

  params.fields.forEach((id, index) => {
    qp[`fields[${index}]`] = id;
  });
  params.grades?.forEach((id, index) => {
    qp[`grades[${index}]`] = id;
  });
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
}


export const insuranceApi = new InsuranceApi();
