import moment from "moment-jalaali";
import { toast } from "react-toastify";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { cartActions } from "@repo/core/states/cart";
import { OrderType } from "@repo/core/types/cart";
import {
  useUpdateInsuranceInfo,
  useStoreInsuranceInfo,
} from "@/hooks/useUserInfo";
import { Province, City, UpdateUserInfoInput } from "@/types/insurance";
import { BuyInsuranceUrlParams } from "../types";
import { isoToJalali, parseToIso } from "../utils/dateUtils";
import { validateBuyInsuranceForm } from "../utils/validateBuyInsuranceForm";
import { BuyInsuranceFormState } from "./useBuyInsuranceForm";

moment.loadPersian({ usePersianDigits: true });

export const useBuyInsuranceActions = (
  urlParams: BuyInsuranceUrlParams,
  form: BuyInsuranceFormState,
) => {
  const { insurerId, endDate, fieldId, gradeId } = urlParams;
  const {
    selectedProfileId,
    setSelectedProfileId,
    provinceId,
    setProvinceId,
    cityId,
    setCityId,
    address,
    activeClinic,
    postalCode,
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
    setShowEndDateCalendar,
    nationalCardId,
    medicalCardId,
    lastInsuranceFileId,
    mobileCheckboxChecked,
    profileData,
    insuranceInfos,
    refetchInsuranceInfos,
    residencyStatuses,
    damageHistories,
    lastInsurers,
    provinces,
    cities,
    effectiveDamageHistoryId,
    effectiveLastInsuranceId,
    effectiveEndDateIso,
    showPreviousInsuranceFields,
  } = form;

  const updateMutation = useUpdateInsuranceInfo();
  const storeMutation = useStoreInsuranceInfo();

  const buildProfilePayload = (): UpdateUserInfoInput => ({
    title: insuredName.trim(),
    field_id: fieldId!,
    grade_id: gradeId!,
    residency_status: residencyStatusId as 1 | 2,
    damage_history_id: selectedDamageHistoryId || undefined,
    national_id_card_files: nationalCardId ? [nationalCardId] : [],
    medical_education_card_files: medicalCardId ? [medicalCardId] : [],
    last_insurance_files: lastInsuranceFileId ? [lastInsuranceFileId] : [],
    active_clinic: activeClinic,
    province_id: provinceId,
    city_id: cityId,
    clinic_address: activeClinic ? address : undefined,
    insured_name: insuredName.trim(),
    insured_phone: insuredPhone.trim(),
    postal_code: Number(postalCode) || undefined,
  });

  const handleEditClick = () => {
    modalActions.addModal(ModalTypes.INSURANCE_INFO, {
      onSelect: (id: number) => {
        setSelectedProfileId(id);
      },
      currentId: selectedProfileId,
    });
  };

  const openProvinceModal = () => {
    modalActions.addModal(ModalTypes.INSURANCE_FIELD_SELECT, {
      title: "انتخاب استان",
      options: provinces.map((p: Province) => ({ id: p.id, label: p.title })),
      selectedId: provinceId,
      onSelect: (id: number) => {
        setProvinceId(id);
        setCityId(undefined);
      },
    });
  };

  const openCityModal = () => {
    if (!provinceId) return;
    modalActions.addModal(ModalTypes.INSURANCE_FIELD_SELECT, {
      title: "انتخاب شهر",
      options: cities.map((c: City) => ({ id: c.id, label: c.title })),
      selectedId: cityId,
      onSelect: (id: number) => setCityId(id),
    });
  };

  const openResidencyModal = () => {
    modalActions.addModal(ModalTypes.INSURANCE_FIELD_SELECT, {
      title: "انتخاب وضعیت",
      options: residencyStatuses.map((r) => ({ id: r.id, label: r.title })),
      selectedId: residencyStatusId,
      onSelect: (id: number) => setResidencyStatusId(id),
    });
  };

  const openDamageHistoryModal = () => {
    modalActions.addModal(ModalTypes.INSURANCE_FIELD_SELECT, {
      title: "انتخاب سابقه خسارت",
      options: damageHistories.map((d) => ({ id: d.id, label: d.title })),
      selectedId: selectedDamageHistoryId,
      onSelect: (id: number) => {
        setSelectedDamageHistoryId(id);
        if (id === 1) {
          setSelectedLastInsuranceId(null);
          setInsuranceEndDateIso("");
          setInsuranceEndDateJalali("");
        }
      },
    });
  };

  const openLastInsuranceModal = () => {
    modalActions.addModal(ModalTypes.INSURANCE_FIELD_SELECT, {
      title: "بیمه‌گر قبلی",
      options: lastInsurers.map((i) => ({ id: i.id, label: i.title })),
      selectedId: selectedLastInsuranceId,
      onSelect: (id: number) => setSelectedLastInsuranceId(id),
    });
  };

  const openDatePickerModal = () => {
    let modalValue: string | undefined = undefined;
    if (insuranceEndDateIso) {
      modalValue = insuranceEndDateIso;
    } else if (insuranceEndDateJalali) {
      modalValue = moment(insuranceEndDateJalali, "jYYYY/jMM/jDD").format(
        "YYYY-MM-DD",
      );
    } else if (endDate) {
      modalValue = parseToIso(endDate);
    }

    modalActions.addModal(ModalTypes.INSURANCE_DATE_PICKER, {
      label: "اتمام بیمه‌نامه",
      value: modalValue,
      onChange: (gregorianDate: string) => {
        setInsuranceEndDateIso(gregorianDate);
        setInsuranceEndDateJalali(isoToJalali(gregorianDate));
      },
    });
  };

  const handleSelectEndDate = (iso: string) => {
    if (iso) {
      setInsuranceEndDateIso(iso);
      setInsuranceEndDateJalali(isoToJalali(iso));
    } else {
      setInsuranceEndDateIso("");
      setInsuranceEndDateJalali("");
    }
    setShowEndDateCalendar(false);
  };

  const handleSubmit = () => {
    if (!selectedProfileId || !profileData) return;

    updateMutation.mutate({
      id: selectedProfileId,
      payload: buildProfilePayload(),
    });
  };

  const handleAddToCart = async () => {
    if (!insurerId) return;

    const validation = validateBuyInsuranceForm({
      mobileCheckboxChecked,
      provinceId,
      cityId,
      postalCode,
      nationalCardId,
      medicalCardId,
      lastInsuranceFileId,
      requiresPreviousInsurance: showPreviousInsuranceFields,
      activeClinic,
      address,
      fieldId,
      gradeId,
      residencyStatusId,
      damageHistoryId: effectiveDamageHistoryId,
      lastInsuranceId: effectiveLastInsuranceId,
      insuranceEndDateIso: effectiveEndDateIso,
      endDateFromUrl: endDate,
      insuredName,
      insuredPhone,
    });

    if (!validation.isValid) {
      toast.error(validation.errorMessage!);
      return;
    }

    const payload = buildProfilePayload();
    let profileIdToUse = selectedProfileId;

    try {
      const normalizedPhone = insuredPhone.trim();
      const latestInfosResult = await refetchInsuranceInfos();
      const latestInfos = latestInfosResult?.data ?? insuranceInfos;
      const matchingProfile = normalizedPhone
        ? latestInfos.find(
            (info) => String(info.insured_phone ?? "").trim() === normalizedPhone,
          )
        : undefined;

      if (matchingProfile?.id) {
        const matchingProfileId = matchingProfile.id;
        profileIdToUse = matchingProfileId;
        await updateMutation.mutateAsync({ id: matchingProfileId, payload });
        setSelectedProfileId(profileIdToUse);
      } else if (profileIdToUse) {
        await updateMutation.mutateAsync({ id: profileIdToUse, payload });
      } else {
        const newProfile = await storeMutation.mutateAsync(payload);

        if (newProfile?.id) {
          profileIdToUse = newProfile.id;
        } else {
          const foundProfile = latestInfos.find(
            (info) =>
              info.field_id === fieldId &&
              info.grade_id === gradeId &&
              info.insured_name === insuredName.trim(),
          );
          profileIdToUse =
            foundProfile?.id ??
            latestInfos[latestInfos.length - 1]?.id ??
            null;
        }

        if (profileIdToUse) {
          setSelectedProfileId(profileIdToUse);
        }
      }

      if (!profileIdToUse) {
        toast.error(validation.errorMessage!);
        return;
      }

      cartActions.addToCart(
        insurerId,
        OrderType.Insurance,
        undefined,
        profileIdToUse,
        selectedDamageHistoryId || undefined,
        selectedDamageHistoryId === 1
          ? undefined
          : selectedLastInsuranceId || undefined,
        selectedDamageHistoryId === 1
          ? undefined
          : insuranceEndDateIso || parseToIso(endDate) || undefined,
      );
    } catch {
      toast.error(validation.errorMessage!);
      return;
    }
  };

  return {
    handleEditClick,
    openProvinceModal,
    openCityModal,
    openResidencyModal,
    openDamageHistoryModal,
    openLastInsuranceModal,
    openDatePickerModal,
    handleSelectEndDate,
    handleSubmit,
    handleAddToCart,
  };
};

