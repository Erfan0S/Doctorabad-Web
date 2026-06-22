import { useEffect, useMemo, useState } from "react";
import moment from "moment-jalaali";
import {
  useProvinces,
  useCities,
  useInsuranceInfoSingle,
  useInsuranceInfos,
} from "@/hooks/useUserInfo";
import {
  useInsuranceFields,
  useGrades,
  useResidencyStatus,
  useDamageHistory,
  useLastInsurer,
} from "@/hooks/useInsuranceFind";
import { BuyInsuranceUrlParams } from "../types";
import { formatIsoToJalali, isoToJalali, parseToIso } from "../utils/dateUtils";

moment.loadPersian({ usePersianDigits: true });

export const useBuyInsuranceForm = (urlParams: BuyInsuranceUrlParams) => {
  const {
    fieldId,
    gradeId,
    residencyId,
    damageHistoryId,
    lastInsuranceId,
    urlProvinceId,
    urlCityId,
    urlPostalCode,
    urlActiveClinic,
    urlClinicAddress,
    insuredName: urlInsuredName,
    insuredPhone: urlInsuredPhone,
    endDate,
    fieldData,
    gradeData,
    residencyData,
    damageHistoryData,
    lastInsuranceData,
  } = urlParams;

  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(
    null,
  );
  const [activeClinic, setActiveClinic] = useState(urlActiveClinic ?? false);
  const [provinceId, setProvinceId] = useState<number | undefined>(
    urlProvinceId,
  );
  const [cityId, setCityId] = useState<number | undefined>(urlCityId);
  const [address, setAddress] = useState(urlClinicAddress ?? "");
  const [postalCode, setPostalCode] = useState<number | undefined>(
    urlPostalCode,
  );
  const [insuredName, setInsuredName] = useState(urlInsuredName || "");
  const [insuredPhone, setInsuredPhone] = useState(urlInsuredPhone || "");
  const [residencyStatusId, setResidencyStatusId] = useState<number | null>(
    null,
  );
  const [selectedDamageHistoryId, setSelectedDamageHistoryId] = useState<
    number | null
  >(null);
  const [selectedLastInsuranceId, setSelectedLastInsuranceId] = useState<
    number | null
  >(null);
  const [insuranceEndDateIso, setInsuranceEndDateIso] = useState<string>("");
  const [insuranceEndDateJalali, setInsuranceEndDateJalali] =
    useState<string>("");
  const [showEndDateCalendar, setShowEndDateCalendar] = useState(false);
  const [nationalCardId, setNationalCardId] = useState<number | null>(null);
  const [medicalCardId, setMedicalCardId] = useState<number | null>(null);
  const [lastInsuranceFileId, setLastInsuranceFileId] = useState<number | null>(
    null,
  );
  const [mobileCheckboxChecked, setMobileCheckboxChecked] = useState(false);

  const { data: provinces = [] } = useProvinces();
  const { data: cities = [] } = useCities(provinceId);
  const { data: profileData } = useInsuranceInfoSingle(selectedProfileId);
  const { data: insuranceInfos = [], refetch: refetchInsuranceInfos } =
    useInsuranceInfos();
  const { data: residencyStatuses = [] } = useResidencyStatus();
  const { data: damageHistories = [] } = useDamageHistory();
  const { data: lastInsurers = [] } = useLastInsurer();
  const { data: allFields = [] } = useInsuranceFields();

  const fieldIdToUse = fieldId;
  const { data: allGrades = [] } = useGrades(
    fieldIdToUse ? [fieldIdToUse] : [],
  );
  const gradeIdToUse = gradeId;

  const effectiveDamageHistoryId = useMemo(
    () => selectedDamageHistoryId ?? damageHistoryId ?? null,
    [selectedDamageHistoryId, damageHistoryId],
  );

  const effectiveLastInsuranceId = useMemo(
    () => selectedLastInsuranceId ?? lastInsuranceId ?? null,
    [selectedLastInsuranceId, lastInsuranceId],
  );

  const effectiveEndDateIso = useMemo(() => {
    return insuranceEndDateIso || parseToIso(endDate) || null;
  }, [insuranceEndDateIso, endDate]);

  const displayFieldTitle = useMemo(() => {
    if (fieldData?.title) return fieldData.title;
    if (fieldIdToUse)
      return allFields.find((f) => f.id === fieldIdToUse)?.title || "---";
    return "---";
  }, [fieldData, fieldIdToUse, allFields]);

  const displayGradeTitle = useMemo(() => {
    if (gradeData?.title) return gradeData.title;
    if (gradeIdToUse)
      return allGrades.find((g) => g.id === gradeIdToUse)?.title || "---";
    return "---";
  }, [gradeData, gradeIdToUse, allGrades]);

  useEffect(() => {
    if (residencyId) setResidencyStatusId(residencyId);
    if (damageHistoryId) setSelectedDamageHistoryId(damageHistoryId);
    if (urlInsuredName) setInsuredName(urlInsuredName);
    if (urlInsuredPhone) setInsuredPhone(urlInsuredPhone);
    if (lastInsuranceId) setSelectedLastInsuranceId(lastInsuranceId);

    if (endDate) {
      const iso = parseToIso(endDate);
      if (iso) {
        setInsuranceEndDateIso(iso);
        setInsuranceEndDateJalali(isoToJalali(iso));
      } else {
        setInsuranceEndDateIso("");
        setInsuranceEndDateJalali("");
      }
    }
  }, [
    residencyId,
    damageHistoryId,
    lastInsuranceId,
    endDate,
    urlInsuredName,
    urlInsuredPhone,
  ]);

  const getProvinceLabel = () =>
    provinces.find((p) => p.id === provinceId)?.title || "استان";

  const getCityLabel = () =>
    cities.find((c) => c.id === cityId)?.title || "شهر";

  const getLastInsuranceLabel = () => {
    if (lastInsuranceData?.title) return lastInsuranceData.title;

    if (selectedLastInsuranceId) {
      return (
        lastInsurers.find((i) => i.id === selectedLastInsuranceId)?.title ||
        "بیمه‌گر قبلی"
      );
    }
    return "بیمه‌گر قبلی";
  };

  const getEndDateLabel = () => {
    if (insuranceEndDateJalali) return insuranceEndDateJalali;

    const isoFromParam = parseToIso(endDate);
    if (isoFromParam)
      return formatIsoToJalali(isoFromParam) || "تاریخ اتمام بیمه";

    return "تاریخ اتمام بیمه";
  };

  const getResidencyLabel = () => {
    if (selectedProfileId && residencyStatusId) {
      const found = residencyStatuses.find((r) => r.id === residencyStatusId);
      if (found) return found.title;
    }
    if (residencyData?.title) return residencyData.title;
    if (residencyStatusId) {
      const found = residencyStatuses.find((r) => r.id === residencyStatusId);
      if (found) return found.title;
    }
    return "وضعیت";
  };

  const getDamageHistoryLabel = () => {
    if (selectedProfileId) {
      if (selectedDamageHistoryId) {
        const found = damageHistories.find(
          (d) => d.id === selectedDamageHistoryId,
        );
        if (found) return found.title;
      }
      return "سابقه خسارت";
    }
    if (damageHistoryData?.title) return damageHistoryData.title;
    if (selectedDamageHistoryId) {
      const found = damageHistories.find(
        (d) => d.id === selectedDamageHistoryId,
      );
      if (found) return found.title;
    }
    return "سابقه خسارت";
  };

  const effectiveDamageHistoryForDisplay =
    selectedDamageHistoryId || damageHistoryId;
  const showPreviousInsuranceFields =
    !!effectiveDamageHistoryForDisplay &&
    effectiveDamageHistoryForDisplay !== 1;

  return {
    selectedProfileId,
    setSelectedProfileId,
    activeClinic,
    setActiveClinic,
    provinceId,
    setProvinceId,
    cityId,
    setCityId,
    address,
    setAddress,
    postalCode,
    setPostalCode,
    insuredName,
    insuredPhone,
    residencyStatusId,
    setResidencyStatusId,
    selectedDamageHistoryId,
    setSelectedDamageHistoryId,
    selectedLastInsuranceId,
    setSelectedLastInsuranceId,
    insuranceEndDateIso,
    setInsuranceEndDateIso,
    insuranceEndDateJalali,
    setInsuranceEndDateJalali,
    showEndDateCalendar,
    setShowEndDateCalendar,
    nationalCardId,
    setNationalCardId,
    medicalCardId,
    setMedicalCardId,
    lastInsuranceFileId,
    setLastInsuranceFileId,
    mobileCheckboxChecked,
    setMobileCheckboxChecked,
    provinces,
    cities,
    profileData,
    insuranceInfos,
    refetchInsuranceInfos,
    residencyStatuses,
    damageHistories,
    lastInsurers,
    fieldIdToUse,
    gradeIdToUse,
    effectiveDamageHistoryId,
    effectiveLastInsuranceId,
    effectiveEndDateIso,
    displayFieldTitle,
    displayGradeTitle,
    getProvinceLabel,
    getCityLabel,
    getLastInsuranceLabel,
    getEndDateLabel,
    getResidencyLabel,
    getDamageHistoryLabel,
    showPreviousInsuranceFields,
    lastInsuranceData,
    damageHistoryId,
  };
};

export type BuyInsuranceFormState = ReturnType<typeof useBuyInsuranceForm>;
