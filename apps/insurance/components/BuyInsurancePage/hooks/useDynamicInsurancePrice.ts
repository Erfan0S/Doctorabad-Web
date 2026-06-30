import { useEffect, useState } from "react";
import { insuranceApi } from "@/api/Api";
import { Insurer } from "@/types/insurance";
import { BuyInsuranceUrlParams } from "../types";
import { BuyInsuranceFormState } from "./useBuyInsuranceForm";

export const useDynamicInsurancePrice = (
  urlParams: BuyInsuranceUrlParams,
  form: BuyInsuranceFormState,
) => {
  const { insurerId, urlPrice, urlMainPrice } = urlParams;
  const {
    fieldIdToUse,
    gradeIdToUse,
    residencyStatusId,
    effectiveDamageHistoryId,
    effectiveLastInsuranceId,
    effectiveEndDateIso,
    selectedProfileId,
  } = form;

  const [dynamicMainPrice, setDynamicMainPrice] = useState<number | null>(null);
  const [dynamicFinalPrice, setDynamicFinalPrice] = useState<number | null>(
    null,
  );

  const mainPriceToShow = dynamicMainPrice ?? urlMainPrice;
  const priceToShow = dynamicFinalPrice ?? urlPrice;

  const discountPercent =
    mainPriceToShow > priceToShow && mainPriceToShow > 0
      ? Math.round(((mainPriceToShow - priceToShow) / mainPriceToShow) * 100)
      : 0;

  useEffect(() => {
    if (!insurerId) return;

    if (
      !fieldIdToUse ||
      !gradeIdToUse ||
      !residencyStatusId ||
      !effectiveDamageHistoryId
    ) {
      return;
    }

    if (
      effectiveDamageHistoryId !== 1 &&
      (!effectiveLastInsuranceId || !effectiveEndDateIso)
    ) {
      return;
    }

    const params = {
      page: 1,
      field: fieldIdToUse,
      grade: gradeIdToUse,
      residency_status: residencyStatusId ?? undefined,
      damage_history: effectiveDamageHistoryId ?? undefined,
      last_insurance:
        effectiveDamageHistoryId === 1
          ? undefined
          : (effectiveLastInsuranceId ?? undefined),
      current_insurance_end_date:
        effectiveDamageHistoryId === 1 ? null : effectiveEndDateIso,
    };

    insuranceApi
      .getInsurances(params)
      .then((response) => {
        const list: Insurer[] = response.data.data;
        const matched = list.find((ins) => ins.id === insurerId);
        if (matched) {
          const finalPrice =
            matched.amazing_price ?? matched.off_price ?? matched.main_price;
          setDynamicMainPrice(matched.main_price);
          setDynamicFinalPrice(finalPrice);
        }
      })
      .catch(() => {
        setDynamicMainPrice(null);
        setDynamicFinalPrice(null);
      });
  }, [
    insurerId,
    fieldIdToUse,
    gradeIdToUse,
    residencyStatusId,
    effectiveDamageHistoryId,
    effectiveLastInsuranceId,
    effectiveEndDateIso,
    selectedProfileId,
  ]);

  return {
    mainPriceToShow,
    priceToShow,
    discountPercent,
  };
};
