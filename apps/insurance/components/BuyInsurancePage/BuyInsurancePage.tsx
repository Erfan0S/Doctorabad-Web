"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import moment from "moment-jalaali";
import { toGregorian, toJalaali } from "jalaali-js";
import styles from "./BuyInsurancePage.module.scss";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import UploadBox from "@/components/common/UploadBox";
import DownArrow from "@/assets/svg/downArrow";
import DiscountIcon from "@/assets/svg/discount_icon";
import Loading from "@/components/common/loading";
import { useCartActionsLoadingHandler } from "@repo/core/hooks/useCartActionsLoadingHandler";
import { AddToCartButton } from "@repo/shared_modules/components";

moment.loadPersian({ usePersianDigits: true });
import {
  useProvinces,
  useCities,
  useUserProfile,
  useInsuranceInfoSingle,
  useUpdateInsuranceInfo,
  useInsuranceInfos,
  useStoreInsuranceInfo,
} from "@/hooks/useUserInfo";
import {
  useInsuranceFields,
  useGrades,
  useResidencyStatus,
  useDamageHistory,
  useLastInsurer,
} from "@/hooks/useInsuranceFind";
import {
  UpdateUserInfoInput,
  Province,
  City,
  Insurer,
} from "@/types/insurance";
import { insuranceApi } from "@/api/Api";
import { toast } from "react-toastify";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { cartActions } from "@repo/core/states/cart";
import { OrderType } from "@repo/core/types/cart";

const BuyInsurancePage = () => {
  const searchParams = useSearchParams();

  const { cartActionsLoadingHandler, updateCartLoading } =
    useCartActionsLoadingHandler();

  // ----- URL Params (از صفحه لیست بیمه) -----
  const insurerTitle = searchParams.get("insurer_title") || "بیمه";
  const insurerLogo = searchParams.get("insurer_logo");
  const priceRaw = searchParams.get("price");
  const urlPrice = priceRaw ? Number(priceRaw) : 0;
  const mainPriceRaw = searchParams.get("main_price");
  const urlMainPrice = mainPriceRaw ? Number(mainPriceRaw) : 0;

  const insurerId = searchParams.get("insurer_id")
    ? Number(searchParams.get("insurer_id"))
    : null;

  // قیمت پویا بر اساس فیلدهای فعلی و نتیجه getInsurances
  const [dynamicMainPrice, setDynamicMainPrice] = useState<number | null>(null);
  const [dynamicFinalPrice, setDynamicFinalPrice] = useState<number | null>(
    null,
  );

  // ----- فیلترهای کاربر (ID ها) -----
  const fieldId = searchParams.get("field") ? Number(searchParams.get("field")) : null;
  const gradeId = searchParams.get("grade") ? Number(searchParams.get("grade")) : null;
  const residencyId = searchParams.get("residency") ? Number(searchParams.get("residency")) : null;
  const damageHistoryId = searchParams.get("damageHistory") ? Number(searchParams.get("damageHistory")) : null;
  const lastInsuranceId = searchParams.get("lastInsurance") ? Number(searchParams.get("lastInsurance")) : null;
  const urlProvinceId = searchParams.get("province_id") ? Number(searchParams.get("province_id")) : undefined;
  const urlCityId = searchParams.get("city_id") ? Number(searchParams.get("city_id")) : undefined;
  const urlPostalCode = searchParams.get("postal_code") ? Number(searchParams.get("postal_code")) : undefined;
  const urlActiveClinic = searchParams.get("active_clinic")
    ? searchParams.get("active_clinic") === "true"
    : undefined;
  const urlClinicAddress = searchParams.get("clinic_address") || undefined;

  const urlInsuredName = searchParams.get("insured_name") || "";
  const urlInsuredPhone = searchParams.get("insured_phone") || "";

  // const endDate = searchParams.get("endDate");

  // ----- فیلترهای کاربر (Title ها) -----
  const fieldTitle = searchParams.get("field_title") || null;
  const gradeTitle = searchParams.get("grade_title") || null;
  const residencyTitle = searchParams.get("residency_title") || null;
  const damageHistoryTitle = searchParams.get("damageHistory_title") || null;
  const lastInsuranceTitle = searchParams.get("lastInsurance_title") || null;

  // ----- ساخت آبجکت کامل فیلدها -----
  // حالا می‌توانید از این آبجکت‌ها استفاده کنید:
  // - fieldData: آبجکت { id: number, title: string } یا null
  // - gradeData: آبجکت { id: number, title: string } یا null
  // - residencyData: آبجکت { id: number, title: string } یا null
  // - damageHistoryData: آبجکت { id: number, title: string } یا null
  // - lastInsuranceData: آبجکت { id: number, title: string } یا null
  const fieldData = fieldId ? { id: fieldId, title: fieldTitle || "" } : null;
  const gradeData = gradeId ? { id: gradeId, title: gradeTitle || "" } : null;
  const residencyData = residencyId
    ? { id: residencyId, title: residencyTitle || "" }
    : null;
  const damageHistoryData = damageHistoryId
    ? { id: damageHistoryId, title: damageHistoryTitle || "" }
    : null;
  const lastInsuranceData = lastInsuranceId
    ? { id: lastInsuranceId, title: lastInsuranceTitle || "" }
    : null;

  // قیمت‌هایی که باید نمایش داده شوند (اولویت با مقدار محاسبه شده از API)
  const mainPriceToShow = dynamicMainPrice ?? urlMainPrice;
  const priceToShow = dynamicFinalPrice ?? urlPrice;

  const discountPercent =
    mainPriceToShow > priceToShow && mainPriceToShow > 0
      ? Math.round(((mainPriceToShow - priceToShow) / mainPriceToShow) * 100)
      : 0;

  // ----- States -----
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
  // store Gregorian ISO for backend, and Jalali for display
  const [insuranceEndDateIso, setInsuranceEndDateIso] = useState<string>("");
  const [insuranceEndDateJalali, setInsuranceEndDateJalali] = useState<string>("");
  const [showEndDateCalendar, setShowEndDateCalendar] = useState(false);

  const [nationalCardId, setNationalCardId] = useState<number | null>(null);
  const [medicalCardId, setMedicalCardId] = useState<number | null>(null);
  const [lastInsuranceFileId, setLastInsuranceFileId] = useState<number | null>(
    null,
  );
  const [endDate, setEndDate] = useState<string>(
    searchParams.get("endDate") || "",
  );

  const parseToIso = (val?: string | null): string | undefined => {
    if (!val) return undefined;
    const v = String(val).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v;
    if (/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(v)) {
      const parts = v.split(/[-\/]/);
      const year = Number(parts[0]);
      if (!Number.isNaN(year) && year >= 1300) {
        return moment(v, "jYYYY/jMM/jDD").format("YYYY-MM-DD");
      }
      return `${parts[0].padStart(4, '0')}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
    }
    return undefined;
  };
  const [mobileCheckboxChecked, setMobileCheckboxChecked] = useState(false);

  // ----- Queries -----
  const { data: userProfile } = useUserProfile();
  const { data: provinces = [] } = useProvinces();
  const { data: cities = [] } = useCities(provinceId);
  const { data: profileData } = useInsuranceInfoSingle(selectedProfileId);
  const { data: insuranceInfos = [], refetch: refetchInsuranceInfos } =
    useInsuranceInfos();
  const { data: residencyStatuses = [] } = useResidencyStatus();
  const { data: damageHistories = [] } = useDamageHistory();
  const { data: lastInsurers = [] } = useLastInsurer();

  // مقادیر موثر برای سابقه خسارت، بیمه‌گر قبلی و تاریخ اتمام (ترکیب URL و state)
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

  // برای گرفتن title رشته و تخصص از API
  const { data: allFields = [] } = useInsuranceFields();
  // استفاده از field_id: همیشه ابتدا از URL (صفحه قبل) و در صورت نبود، از profileData
  const fieldIdToUse = fieldId ?? profileData?.field_id ?? null;
  const { data: allGrades = [] } = useGrades(
    fieldIdToUse ? [fieldIdToUse] : [],
  );

  // پیدا کردن title رشته و تخصص
  // اولویت: همیشه مقادیر انتخاب‌شده از صفحه قبل (URL)، و در صورت نبود، از profileData
  const displayFieldTitle = (() => {
    // اگر از صفحه قبل title داریم، همان را نشان بده
    if (fieldData?.title) return fieldData.title;
    // در غیر این صورت از fieldIdToUse (URL یا profileData) استفاده کن
    if (fieldIdToUse)
      return allFields.find((f) => f.id === fieldIdToUse)?.title || "---";
    return "---";
  })();

  const gradeIdToUse = gradeId ?? profileData?.grade_id ?? null;
  const displayGradeTitle = (() => {
    // اگر از صفحه قبل title داریم، همان را نشان بده
    if (gradeData?.title) return gradeData.title;
    // در غیر این صورت از gradeIdToUse (URL یا profileData) استفاده کن
    if (gradeIdToUse)
      return allGrades.find((g) => g.id === gradeIdToUse)?.title || "---";
    return "---";
  })();

  // ----- انتخاب خودکار پروفایل بر اساس فیلترهای URL -----
  useEffect(() => {
    // اگر قبلا پروفایلی انتخاب شده، کاری نکن
    if (selectedProfileId) return;

    // اگر فیلتر field در URL وجود ندارد، کاری نکن
    if (!fieldId) return;

    // اگر لیست پروفایل‌ها هنوز لود نشده، صبر کن
    if (insuranceInfos.length === 0) return;

    // پیدا کردن پروفایلی که با فیلترها مطابقت دارد
    const matchingProfile = insuranceInfos.find((profile) => {
      // بررسی field_id (باید با field انتخاب شده مطابقت داشته باشد)
      const fieldMatches = profile.field_id === fieldId;

      // بررسی grade_id (اگر grade انتخاب شده، باید مطابقت داشته باشد)
      const gradeMatches =
        gradeId !== null ? profile.grade_id === gradeId : true;

      // بررسی residency_status (اگر residency انتخاب شده، باید مطابقت داشته باشد)
      // توجه: residency_status در InsuranceInfo یک boolean است
      // اما در URL یک number است (1 یا 2)
      // فرض می‌کنیم: 1 = false (غیر مقیم), 2 = true (مقیم)
      const residencyMatches =
        residencyId !== null
          ? residencyId === 1
            ? !profile.residency_status
            : profile.residency_status
          : true;

      return fieldMatches && gradeMatches && residencyMatches;
    });

    // اگر پروفایل مطابق پیدا شد، آن را انتخاب کن
    if (matchingProfile) {
      setSelectedProfileId(matchingProfile.id);
    }
  }, [insuranceInfos, fieldId, gradeId, residencyId, selectedProfileId]);

  // تنظیم state از URL (مقادیر انتخاب شده در صفحه قبل)
  useEffect(() => {
    if (residencyId) {
      setResidencyStatusId(residencyId);
    }
    if (damageHistoryId) {
      setSelectedDamageHistoryId(damageHistoryId);
    }
    if (urlInsuredName) {
      setInsuredName(urlInsuredName);
    }
    if (urlInsuredPhone) {
      setInsuredPhone(urlInsuredPhone);
    }
    if (lastInsuranceId) {
      setSelectedLastInsuranceId(lastInsuranceId);
    }
    if (endDate) {
      const iso = parseToIso(endDate);
      if (iso) {
        setInsuranceEndDateIso(iso);
        setInsuranceEndDateJalali(moment(iso, "YYYY-MM-DD").format("jYYYY/jMM/jDD"));
      } else {
        // fallback: store raw
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

  // Sync state with fetched profile data
  // وقتی پروفایل انتخاب می‌شود، همیشه از profileData استفاده می‌کنیم
  useEffect(() => {
    if (profileData && selectedProfileId) {
      setActiveClinic(!!profileData.active_clinic);
      setProvinceId(profileData.province_id);
      setCityId(profileData.city_id);
      setAddress(profileData.clinic_address || "");
      setPostalCode(
        profileData.postal_code ? Number(profileData.postal_code) : undefined,
      );
      setInsuredName(profileData.insured_name || profileData.title || "");
      setInsuredPhone(profileData.insured_phone || "");

      // اگر از صفحه قبل وضعیت (residency) انتخاب نشده باشد، از profileData استفاده کن
      if (!residencyId) {
        setResidencyStatusId(profileData.residency_status ? 2 : 1);
      }
      // مهم: damage_history_id می‌تواند undefined باشد، پس باید به null تبدیل شود
      // setSelectedDamageHistoryId(profileData.damage_history_id ?? null);

      // هندل کردن فایل‌ها
      if (profileData.national_id_card_files?.length > 0) {
        setNationalCardId(profileData.national_id_card_files[0].id);
      } else {
        setNationalCardId(null);
      }

      if (profileData.medical_education_card_files?.length > 0) {
        setMedicalCardId(profileData.medical_education_card_files[0].id);
      } else {
        setMedicalCardId(null);
      }
      if (profileData.last_insurance_files?.length > 0) {
        setLastInsuranceFileId(profileData.last_insurance_files[0].id);
      } else {
        setLastInsuranceFileId(null);
      }
    } else if (profileData && !selectedProfileId) {
      // اگر پروفایلی انتخاب نشده، فقط اگر از URL تنظیم نشده باشد از profileData استفاده کن
      setActiveClinic(!!profileData.active_clinic);
      setProvinceId(profileData.province_id);
      setCityId(profileData.city_id);
      setAddress(profileData.clinic_address || "");
      setPostalCode(
        profileData.postal_code ? Number(profileData.postal_code) : undefined,
      );
      setInsuredName(profileData.insured_name || profileData.title || "");
      setInsuredPhone(profileData.insured_phone || "");

      if (!residencyId) {
        setResidencyStatusId(profileData.residency_status ? 2 : 1);
      }
      // if (!damageHistoryId) {
      //   setSelectedDamageHistoryId(profileData.damage_history_id ?? null);
      // }

      // هندل کردن فایل‌ها
      if (profileData.national_id_card_files?.length > 0) {
        setNationalCardId(profileData.national_id_card_files[0].id);
      } else {
        setNationalCardId(null);
      }

      if (profileData.medical_education_card_files?.length > 0) {
        setMedicalCardId(profileData.medical_education_card_files[0].id);
      } else {
        setMedicalCardId(null);
      }

      if (profileData.last_insurance_files?.length > 0) {
        setLastInsuranceFileId(profileData.last_insurance_files[0].id);
      } else {
        setLastInsuranceFileId(null);
      }
    }
  }, [profileData, selectedProfileId, residencyId, damageHistoryId]);

  const updateMutation = useUpdateInsuranceInfo();
  const storeMutation = useStoreInsuranceInfo();

  // ----- Handlers -----
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
        // اگر ID = 1 (صدور اولیه) باشد، بیمه‌گر قبلی و تاریخ اتمام را پاک کن
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
    // modal expects Gregorian value; prefer ISO if we have it
    let modalValue: string | undefined = undefined;
    if (insuranceEndDateIso) {
      modalValue = insuranceEndDateIso;
    } else if (insuranceEndDateJalali) {
      modalValue = moment(insuranceEndDateJalali, "jYYYY/jMM/jDD").format("YYYY-MM-DD");
    } else if (endDate) {
      modalValue = parseToIso(endDate);
    }

    modalActions.addModal(ModalTypes.INSURANCE_DATE_PICKER, {
      label: "اتمام بیمه‌نامه",
      value: modalValue,
      onChange: (gregorianDate: string) => {
        const iso = gregorianDate;
        setInsuranceEndDateIso(iso);
        setInsuranceEndDateJalali(moment(iso, "YYYY-MM-DD").format("jYYYY/jMM/jDD"));
      },
    });
  };

  const handleSelectEndDate = (iso: string) => {
    if (iso) {
      setInsuranceEndDateIso(iso);
      setInsuranceEndDateJalali(moment(iso, "YYYY-MM-DD").format("jYYYY/jMM/jDD"));
    } else {
      setInsuranceEndDateIso("");
      setInsuranceEndDateJalali("");
    }
    setShowEndDateCalendar(false);
  };

  const handleSubmit = () => {
    if (!selectedProfileId) {
      return;
    }

    if (!profileData) return;

    const payload: UpdateUserInfoInput = {
      title: profileData.title,
      field_id: profileData.field_id,
      grade_id: profileData.grade_id,
      residency_status: residencyStatusId as 1 | 2,
      damage_history_id: selectedDamageHistoryId || undefined,
      national_id_card_files: nationalCardId ? [nationalCardId] : [],
      medical_education_card_files: medicalCardId ? [medicalCardId] : [],
      last_insurance_files: lastInsuranceFileId ? [lastInsuranceFileId] : [],
      active_clinic: activeClinic,
      province_id: provinceId,
      city_id: cityId,
      clinic_address: activeClinic ? address : undefined,
      insured_name: insuredName || profileData.title || userProfile?.name || "",
      insured_phone: insuredPhone,
      postal_code: Number(postalCode) || undefined,
    };

    updateMutation.mutate({ id: selectedProfileId, payload });
  };

  // Handler for adding to cart
  const handleAddToCart = async () => {
    if (!insurerId) {
      return;
    }

    if (!mobileCheckboxChecked) {
      toast.error("لطفاً تأیید کنید که شماره موبایل به نام بیمه‌گذار است.");
      return;
    }

    let profileIdToUse = selectedProfileId;

    // اگر پروفایلی انتخاب نشده، بررسی کن که ترکیب نام و شماره موبایل قبلا در لیست ذخیره شده باشد
    // در این صورت از آن استفاده کن و دیگر POST برای پروفایل جدید نزن
    if (!selectedProfileId) {
      const nameToCheck = (insuredName || userProfile?.name || "").toString().trim();
      const phoneToCheck = String(insuredPhone || userProfile?.mobile || "").trim();
      const existingProfile = insuranceInfos.find((info) => {
        const infoName = (info.insured_name || info.title || "").toString().trim();
        const infoPhone = String(info.insured_phone || "").trim();
        return infoName === nameToCheck && infoPhone === phoneToCheck;
      });

      if (existingProfile) {
        profileIdToUse = existingProfile.id;
        setSelectedProfileId(existingProfile.id);
      } else {
      // بررسی فیلدهای الزامی
      if (!fieldIdToUse || !gradeIdToUse || !residencyStatusId) {
        return;
      }

      // ساخت payload برای ایجاد پروفایل جدید
      const newProfilePayload: UpdateUserInfoInput = {
        title: insuredName || userProfile?.name || "",
        field_id: fieldIdToUse,
        grade_id: gradeIdToUse,
        residency_status: residencyStatusId as 1 | 2,
        national_id_card_files: nationalCardId ? [nationalCardId] : [],
        medical_education_card_files: medicalCardId ? [medicalCardId] : [],
        last_insurance_files: lastInsuranceFileId ? [lastInsuranceFileId] : [],
        active_clinic: activeClinic,
        province_id: provinceId,
        city_id: cityId,
        clinic_address: activeClinic ? address : undefined,
        insured_name: insuredName || userProfile?.name || "",
        insured_phone: userPhone,
        postal_code: Number(postalCode) || undefined,
      };

        try {
          // ایجاد پروفایل جدید
          const newProfile = await storeMutation.mutateAsync(newProfilePayload);

          // استفاده از id از پاسخ (اکنون که تایپ درست شده، مطمئن هستیم id وجود دارد)
          if (newProfile?.id) {
            profileIdToUse = newProfile.id;
          } else {
            // اگر به هر دلیلی id نبود (محض اطمینان)، از لیست پیدا می‌کنیم
            const { data: updatedInfos = [] } = await refetchInsuranceInfos();
            const foundProfile = updatedInfos.find(
              (info) =>
                info.field_id === fieldIdToUse &&
                info.grade_id === gradeIdToUse &&
                info.title === (insuredName || userProfile?.name || ""),
            );
            if (foundProfile) {
              profileIdToUse = foundProfile.id;
            } else if (updatedInfos.length > 0) {
              // اگر پیدا نشد، آخرین آیتم را استفاده می‌کنیم
              profileIdToUse = updatedInfos[updatedInfos.length - 1].id;
            }
          }

          if (profileIdToUse) {
            // این خط باعث می‌شود هوک useInsuranceInfoSingle با آی‌دی جدید کال شود
            // و سپس useEffect مربوطه (line 242) اطلاعات را در صفحه پر می‌کند
            setSelectedProfileId(profileIdToUse);
          } else {
            return;
          }
        } catch (error) {
          return;
        }
      }
    }

    // افزودن به سبد خرید با استفاده از insurer_id و profile_id
    if (profileIdToUse) {
      cartActions.addToCart(
        insurerId,
        OrderType.Insurance,
        undefined,
        profileIdToUse,
        selectedDamageHistoryId || undefined,
        selectedDamageHistoryId === 1
          ? undefined
          : selectedLastInsuranceId || undefined,
        selectedDamageHistoryId === 1 ? undefined : (insuranceEndDateIso || parseToIso(endDate) || undefined),
      );
    }
  };

  // ----- Helpers -----
  const userFullName =
    insuredName ||
    profileData?.insured_name ||
    profileData?.title ||
    userProfile?.name ||
    "کاربر مهمان";
  const userPhone =
    insuredPhone || profileData?.insured_phone || userProfile?.mobile || "---";

  const getProvinceLabel = () =>
    provinces.find((p: Province) => p.id === provinceId)?.title || "استان";
  const getCityLabel = () =>
    cities.find((c: City) => c.id === cityId)?.title || "شهر";

  const getLastInsuranceLabel = () => {
    // 1. Profile (اگر در آینده به پروفایل اضافه شد)
    // if (selectedProfileId && profileData?.last_insurance_id) ...

    // 2. URL
    if (lastInsuranceData?.title) return lastInsuranceData.title;

    // 3. State
    if (selectedLastInsuranceId) {
      return (
        lastInsurers.find((i) => i.id === selectedLastInsuranceId)?.title ||
        "بیمه‌گر قبلی"
      );
    }
    return "بیمه‌گر قبلی";
  };

  const getEndDateLabel = () => {
    const formatIsoToJalali = (iso?: string | null) => {
      if (!iso) return null;
      return moment(iso, "YYYY-MM-DD").format("jYYYY/jMM/jDD");
    };

    // 1. If we have Jalali state from selection, show it
    if (insuranceEndDateJalali) return insuranceEndDateJalali;

    // 2. If ISO exists (either from URL or parsed), convert and show
    const isoFromParam = parseToIso(endDate);
    if (isoFromParam) return formatIsoToJalali(isoFromParam) || "تاریخ اتمام بیمه";

    return "تاریخ اتمام بیمه";
  };

  // بررسی اینکه آیا باید فیلدهای سابقه خسارت، بیمه‌گر قبلی و تاریخ اتمام را نشان بدهیم
  // اولویت: اگر پروفایل انتخاب شده: از state (که از profileData تنظیم شده)
  // اگر پروفایل انتخاب نشده: 1) از URL 2) از state 3) "وضعیت"
  const getResidencyLabel = () => {
    // اگر پروفایلی انتخاب شده، از state استفاده کن (که از profileData تنظیم شده)
    if (selectedProfileId && residencyStatusId) {
      const found = residencyStatuses.find((r) => r.id === residencyStatusId);
      if (found) return found.title;
    }
    // در غیر این صورت از URL استفاده کن
    if (residencyData?.title) {
      return residencyData.title;
    }
    if (residencyStatusId) {
      const found = residencyStatuses.find((r) => r.id === residencyStatusId);
      if (found) return found.title;
    }
    return "وضعیت";
  };

  // اولویت: اگر پروفایل انتخاب شده: از state (که از profileData تنظیم شده)
  // اگر پروفایل انتخاب نشده: 1) از URL 2) از state 3) "سابقه خسارت"
  const getDamageHistoryLabel = () => {
    // اگر پروفایلی انتخاب شده، همیشه از state استفاده کن (که از profileData تنظیم شده)
    // حتی اگر null باشد (یعنی پروفایل سابقه خسارت ندارد)
    if (selectedProfileId) {
      if (selectedDamageHistoryId) {
        const found = damageHistories.find(
          (d) => d.id === selectedDamageHistoryId,
        );
        if (found) return found.title;
      }
      // اگر پروفایل انتخاب شده اما سابقه خسارت ندارد، "سابقه خسارت" برگردان
      return "سابقه خسارت";
    }
    // در غیر این صورت از URL استفاده کن
    if (damageHistoryData?.title) {
      return damageHistoryData.title;
    }
    if (selectedDamageHistoryId) {
      const found = damageHistories.find(
        (d) => d.id === selectedDamageHistoryId,
      );
      if (found) return found.title;
    }
    return "سابقه خسارت";
  };

  // --- فراخوانی مجدد getInsurances وقتی فیلدها تغییر می‌کنند ---
  useEffect(() => {
    // اگر شناسه بیمه‌گر در URL موجود نیست، نیازی به فراخوانی نیست
    if (!insurerId) return;

    // اعتبارسنجی مشابه صفحه لیست:
    // باید رشته، تخصص، وضعیت و سابقه خسارت مشخص باشند
    if (
      !fieldIdToUse ||
      !gradeIdToUse ||
      !residencyStatusId ||
      !effectiveDamageHistoryId
    ) {
      return;
    }

    // اگر سابقه خسارت "صدور اولیه" نیست، بیمه‌گر قبلی و تاریخ اتمام الزامی‌اند
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
        // در صورت خطا، قیمت URL را نگه می‌داریم
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

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.top}>
          {insurerTitle}
          {insurerLogo && (
            <img
              src={insurerLogo}
              alt={insurerTitle}
              className={styles.image}
            />
          )}
        </div>
        <div className={styles.bottom}>{insurerTitle}</div>
      </div>

      {/* Info Card */}
      <div className={styles.infoCard}>
        <div className={styles.cardHeader}>
          <span className={styles.cardTitle}>اطلاعات من</span>
          <button className={styles.editBtn} onClick={handleEditClick}>
            ویرایش
          </button>
        </div>
        <hr className={styles.divider} />

        <div className={styles.infoList}>
          <InfoRow label="بیمه‌گذار" value={userFullName} />
          <InfoRow label="شماره تلفن" value={userPhone} />
          <InfoRow label="رشته" value={displayFieldTitle} />
          <InfoRow label="تخصص" value={displayGradeTitle} />
          <InfoRow label="وضعیت" value={getResidencyLabel()} />

          {/* سابقه خسارت و فیلدهای وابسته فقط به‌صورت نمایش مقدار انتخاب‌شده از صفحه قبل */}
          <InfoRow label="سابقه خسارت" value={getDamageHistoryLabel()} />

          {(selectedDamageHistoryId || damageHistoryId) &&
            (selectedDamageHistoryId || damageHistoryId) !== 1 && (
              <>
                <InfoRow label="بیمه‌گر قبلی" value={getLastInsuranceLabel()} />
                <InfoRow label="اتمام بیمه‌نامه" value={getEndDateLabel()} />
              </>
            )}
        </div>
        <div className={styles.mobileCheckContainer}>
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={mobileCheckboxChecked}
            onChange={(e) => setMobileCheckboxChecked(e.target.checked)}
          />
          <h3>شماره موبایل وارد شده به نام فرد بیمه‌گذار است.</h3>
        </div>

        {/* Uploads */}
        <div className={styles.uploadSection}>
          <div className={styles.bigUploadBox}>
            <UploadBox
              title=" کارت ملی"
              type={1}
              fileId={nationalCardId}
              onUploadSuccess={setNationalCardId}
              onDeleteSuccess={() => setNationalCardId(null)}
            />
            <div style={{ height: 10 }} />
            <UploadBox
              title=" کارت نظام پزشکی"
              type={2}
              fileId={medicalCardId}
              onUploadSuccess={setMedicalCardId}
              onDeleteSuccess={() => setMedicalCardId(null)}
            />
            <div style={{ height: 10 }} />

            {lastInsuranceData && (
              <UploadBox
                type={3}
                title=" بیمه‌نامه قبلی"
                fileId={lastInsuranceFileId}
                onUploadSuccess={setLastInsuranceFileId}
                onDeleteSuccess={() => setLastInsuranceFileId(null)}
              />
            )}
          </div>
        </div>

        {/* Location */}
        <div className={styles.clinicSection}>
          <div className={styles.geoRow}>
            <div className={styles.selectBox} onClick={openProvinceModal}>
              {getProvinceLabel()} <DownArrow />
            </div>
            <div className={styles.selectBox} onClick={openCityModal}>
              {getCityLabel()} <DownArrow />
            </div>
          </div>

          <input
            className={styles.addressInput}
            type="text"
            placeholder="کد پستی (ثبت شده در amlak.mrud.ir)"
            value={postalCode ? String(postalCode) : ""}
            onChange={(e) => setPostalCode(Number(e.target.value) || undefined)}
            style={{ minHeight: "auto", height: "auto" }}
          />
        </div>

        {/* Clinic */}
        <div className={styles.clinicSection}>
          <div className={styles.switchRow}>
            <span>مطب فعال دارم.</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={activeClinic}
                onChange={(e) => setActiveClinic(e.target.checked)}
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          {activeClinic && (
            <textarea
              className={styles.addressInput}
              placeholder="کلیه مراکز بهداشتی و درمانی مجاز سراسر کشور"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        {discountPercent > 0 && (
          <div className={styles.discountBadge}>
            <DiscountIcon />
            <span>٪{discountPercent}</span>
          </div>
        )}

        {insurerId ? (
          <AddToCartButton
            id={insurerId}
            type={OrderType.Insurance}
            className={styles.submitBtn}
            onClick={authorizeClientAction(
              cartActionsLoadingHandler(handleAddToCart),
            )}
          >
            {updateCartLoading ? (
              <Loading size={22} />
            ) : (
              <div className={styles.btnContent}>
                <div className={styles.priceContainer}>
                  {mainPriceToShow > priceToShow && (
                    <span className={styles.oldPrice}>
                      {mainPriceToShow.toLocaleString("fa-IR")} تومان
                    </span>
                  )}
                  <span className={styles.newPrice}>
                    {priceToShow.toLocaleString("fa-IR")} تومان
                  </span>
                </div>
                <div className={styles.verticalLine}></div>
                <span className={styles.btnText}>افزودن به سبد خرید</span>
              </div>
            )}
          </AddToCartButton>
        ) : (
          <button className={styles.submitBtn} disabled>
            <div className={styles.btnContent}>
              <div className={styles.priceContainer}>
                {mainPriceToShow > priceToShow && (
                  <span className={styles.oldPrice}>
                    {mainPriceToShow.toLocaleString("fa-IR")} تومان
                  </span>
                )}
                <span className={styles.newPrice}>
                  {priceToShow.toLocaleString("fa-IR")} تومان
                </span>
              </div>
              <div className={styles.verticalLine}></div>
              <span className={styles.btnText}>افزودن به سبد خرید</span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className={styles.infoRow}>
    <span className={styles.bullet}>•</span> {label}: {value}
  </div>
);

export default BuyInsurancePage;
