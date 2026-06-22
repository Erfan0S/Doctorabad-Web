export interface BuyInsuranceValidationInput {
  mobileCheckboxChecked: boolean;
  provinceId?: number;
  cityId?: number;
  postalCode?: number;
  nationalCardId: number | null;
  medicalCardId: number | null;
  lastInsuranceFileId: number | null;
  requiresPreviousInsurance: boolean;
  activeClinic: boolean;
  address: string;
  fieldId: number | null;
  gradeId: number | null;
  residencyStatusId: number | null;
  damageHistoryId: number | null;
  lastInsuranceId: number | null;
  insuranceEndDateIso: string | null;
  endDateFromUrl?: string;
  insuredName: string;
  insuredPhone: string;
}

export interface BuyInsuranceValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

export const validateBuyInsuranceForm = (
  input: BuyInsuranceValidationInput,
): BuyInsuranceValidationResult => {
  if (!input.mobileCheckboxChecked) {
    return {
      isValid: false,
      errorMessage: "لطفاً تأیید کنید که شماره موبایل به نام بیمه‌گذار است.",
    };
  }

  if (!input.fieldId || !input.gradeId || !input.residencyStatusId) {
    return {
      isValid: false,
      errorMessage: "لطفاً اطلاعات رشته، تخصص و وضعیت را تکمیل کنید.",
    };
  }

  if (!input.damageHistoryId) {
    return {
      isValid: false,
      errorMessage: "لطفاً سابقه خسارت را تکمیل کنید.",
    };
  }

  if (input.requiresPreviousInsurance) {
    if (!input.lastInsuranceId) {
      return {
        isValid: false,
        errorMessage: "لطفاً بیمه‌گر قبلی را انتخاب کنید.",
      };
    }

    if (!input.insuranceEndDateIso && !input.endDateFromUrl) {
      return {
        isValid: false,
        errorMessage: "لطفاً تاریخ اتمام بیمه‌نامه را وارد کنید.",
      };
    }

    if (!input.lastInsuranceFileId) {
      return {
        isValid: false,
        errorMessage: "لطفاً تصویر بیمه‌نامه قبلی را آپلود کنید.",
      };
    }
  }

  if (!input.insuredName.trim()) {
    return {
      isValid: false,
      errorMessage: "لطفاً نام بیمه‌گذار را وارد کنید.",
    };
  }

  if (!input.insuredPhone.trim()) {
    return {
      isValid: false,
      errorMessage: "لطفاً شماره موبایل بیمه‌گذار را وارد کنید.",
    };
  }

  if (!input.provinceId || !input.cityId) {
    return {
      isValid: false,
      errorMessage: "لطفاً استان و شهر را انتخاب کنید.",
    };
  }

  if (!input.postalCode) {
    return {
      isValid: false,
      errorMessage: "لطفاً کد پستی را وارد کنید.",
    };
  }

  if (!input.nationalCardId) {
    return {
      isValid: false,
      errorMessage: "لطفاً تصویر کارت ملی را آپلود کنید.",
    };
  }

  if (!input.medicalCardId) {
    return {
      isValid: false,
      errorMessage: "لطفاً تصویر کارت نظام پزشکی را آپلود کنید.",
    };
  }

  if (input.activeClinic && !input.address.trim()) {
    return {
      isValid: false,
      errorMessage: "لطفاً آدرس مطب را وارد کنید.",
    };
  }

  return { isValid: true };
};
