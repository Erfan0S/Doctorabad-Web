import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { BuyInsuranceUrlParams, FilterData } from "../types";

const parseNumberParam = (value: string | null): number | null =>
  value ? Number(value) : null;

const parseOptionalNumberParam = (value: string | null): number | undefined =>
  value ? Number(value) : undefined;

const buildFilterData = (
  id: number | null,
  title: string | null,
): FilterData | null => (id ? { id, title: title || "" } : null);

export const useBuyInsuranceParams = (): BuyInsuranceUrlParams => {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const fieldId = parseNumberParam(searchParams.get("field"));
    const gradeId = parseNumberParam(searchParams.get("grade"));
    const residencyId = parseNumberParam(searchParams.get("residency"));
    const damageHistoryId = parseNumberParam(searchParams.get("damageHistory"));
    const lastInsuranceId = parseNumberParam(searchParams.get("lastInsurance"));

    return {
      insurerTitle: searchParams.get("insurer_title") || "بیمه",
      insurerLogo: searchParams.get("insurer_logo"),
      insurerId: parseNumberParam(searchParams.get("insurer_id")),
      urlPrice: parseNumberParam(searchParams.get("price")) ?? 0,
      urlMainPrice: parseNumberParam(searchParams.get("main_price")) ?? 0,
      fieldId,
      gradeId,
      residencyId,
      damageHistoryId,
      lastInsuranceId,
      urlProvinceId: parseOptionalNumberParam(searchParams.get("province_id")),
      urlCityId: parseOptionalNumberParam(searchParams.get("city_id")),
      urlPostalCode: parseOptionalNumberParam(searchParams.get("postal_code")),
      urlActiveClinic: searchParams.get("active_clinic")
        ? searchParams.get("active_clinic") === "true"
        : undefined,
      urlClinicAddress: searchParams.get("clinic_address") || undefined,
      insuredName: searchParams.get("insured_name") || "",
      insuredPhone: searchParams.get("insured_phone") || "",
      endDate: searchParams.get("endDate") || "",
      fieldData: buildFilterData(fieldId, searchParams.get("field_title")),
      gradeData: buildFilterData(gradeId, searchParams.get("grade_title")),
      residencyData: buildFilterData(
        residencyId,
        searchParams.get("residency_title"),
      ),
      damageHistoryData: buildFilterData(
        damageHistoryId,
        searchParams.get("damageHistory_title"),
      ),
      lastInsuranceData: buildFilterData(
        lastInsuranceId,
        searchParams.get("lastInsurance_title"),
      ),
    };
  }, [searchParams]);
};
