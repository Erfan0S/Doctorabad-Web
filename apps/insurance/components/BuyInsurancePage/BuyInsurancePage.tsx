"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import moment from "moment-jalaali";
import styles from "./BuyInsurancePage.module.scss";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import UploadBox from "@/components/common/UploadBox";
import DownArrow from "@/assets/svg/downArrow";
import Loading from "@/components/common/loading";
import { useCartActionsLoadingHandler } from "@repo/core/hooks/useCartActionsLoadingHandler";


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
import { UpdateUserInfoInput, Province, City, Insurer } from "@/types/insurance";
import { insuranceApi } from "@/api/Api";
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
  const [dynamicFinalPrice, setDynamicFinalPrice] = useState<number | null>(null);

  // ----- فیلترهای کاربر (ID ها) -----
  const fieldId = searchParams.get("field")
    ? Number(searchParams.get("field"))
    : null;
  const gradeId = searchParams.get("grade")
    ? Number(searchParams.get("grade"))
    : null;
  const residencyId = searchParams.get("residency")
    ? Number(searchParams.get("residency"))
    : null;
  const damageHistoryId = searchParams.get("damageHistory")
    ? Number(searchParams.get("damageHistory"))
    : null;
  const lastInsuranceId = searchParams.get("lastInsurance")
    ? Number(searchParams.get("lastInsurance"))
    : null;
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
    null
  );
  const [isProfileManuallySelected, setIsProfileManuallySelected] =
    useState(false);

  const [activeClinic, setActiveClinic] = useState(false);
  const [provinceId, setProvinceId] = useState<number | undefined>();
  const [cityId, setCityId] = useState<number | undefined>();
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState<number | undefined>(undefined);
  const [insuredName, setInsuredName] = useState("");
  const [insuredPhone, setInsuredPhone] = useState("");
  const [residencyStatusId, setResidencyStatusId] = useState<number | null>(
    null
  );
  const [selectedDamageHistoryId, setSelectedDamageHistoryId] = useState<
    number | null
  >(null);
  const [selectedLastInsuranceId, setSelectedLastInsuranceId] = useState<
    number | null
  >(null);
  const [insuranceEndDate, setInsuranceEndDate] = useState<string>("");
  const [showEndDateCalendar, setShowEndDateCalendar] = useState(false);

  const [nationalCardId, setNationalCardId] = useState<number | null>(null);
  const [medicalCardId, setMedicalCardId] = useState<number | null>(null);
  const [endDate, setEndDate] = useState<string>(
    searchParams.get("endDate") || ""
  );

  

  // ----- Queries -----
  const { data: userProfile } = useUserProfile();
  const { data: provinces = [] } = useProvinces();
  const { data: cities = [] } = useCities(provinceId);
  const { data: profileData } = useInsuranceInfoSingle(selectedProfileId);
  const { data: insuranceInfos = [], refetch: refetchInsuranceInfos } = useInsuranceInfos();
  const { data: residencyStatuses = [] } = useResidencyStatus();
  const { data: damageHistories = [] } = useDamageHistory();
  const { data: lastInsurers = [] } = useLastInsurer();

  // مقادیر موثر برای سابقه خسارت، بیمه‌گر قبلی و تاریخ اتمام (ترکیب URL و state)
  const effectiveDamageHistoryId = useMemo(
    () => selectedDamageHistoryId ?? damageHistoryId ?? null,
    [selectedDamageHistoryId, damageHistoryId]
  );

  const effectiveLastInsuranceId = useMemo(
    () => selectedLastInsuranceId ?? lastInsuranceId ?? null,
    [selectedLastInsuranceId, lastInsuranceId]
  );

  const effectiveEndDate = useMemo(
    () => insuranceEndDate || endDate || null,
    [insuranceEndDate, endDate]
  );

  // برای گرفتن title رشته و تخصص از API
  const { data: allFields = [] } = useInsuranceFields();
  // استفاده از field_id: اگر پروفایلی انتخاب شده، از profileData استفاده کن، در غیر این صورت از URL
  const fieldIdToUse =
    selectedProfileId && profileData?.field_id
      ? profileData.field_id
      : fieldId || profileData?.field_id;
  const { data: allGrades = [] } = useGrades(
    fieldIdToUse ? [fieldIdToUse] : []
  );

  // پیدا کردن title رشته و تخصص
  // اولویت: اگر پروفایل انتخاب شده: از profileData (از API)
  // اگر پروفایل انتخاب نشده: از URL یا profileData
  const displayFieldTitle = (() => {
    // اگر پروفایلی انتخاب شده و profileData موجود است، از آن استفاده کن
    if (selectedProfileId && profileData?.field_id) {
      return (
        allFields.find((f) => f.id === profileData.field_id)?.title || "---"
      );
    }
    // در غیر این صورت از URL یا profileData استفاده کن
    if (fieldData?.title) return fieldData.title;
    if (fieldIdToUse) {
      return allFields.find((f) => f.id === fieldIdToUse)?.title || "---";
    }
    return "---";
  })();

  const gradeIdToUse =
    selectedProfileId && profileData?.grade_id
      ? profileData.grade_id
      : gradeId || profileData?.grade_id;
  const displayGradeTitle = (() => {
    // اگر پروفایلی انتخاب شده و profileData موجود است، از آن استفاده کن
    if (selectedProfileId && profileData?.grade_id) {
      return (
        allGrades.find((g) => g.id === profileData.grade_id)?.title || "---"
      );
    }
    // در غیر این صورت از URL یا profileData استفاده کن
    if (gradeData?.title) return gradeData.title;
    if (gradeIdToUse) {
      return allGrades.find((g) => g.id === gradeIdToUse)?.title || "---";
    }
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

  // تنظیم state از URL (فقط در ابتدا، قبل از انتخاب پروفایل)
  useEffect(() => {
    // فقط اگر هنوز پروفایلی انتخاب نشده، از URL استفاده کن
    if (!selectedProfileId) {
      if (residencyId) {
        setResidencyStatusId(residencyId);
      }
      if (damageHistoryId) {
        setSelectedDamageHistoryId(damageHistoryId);
      }
      if (lastInsuranceId) {
        setSelectedLastInsuranceId(lastInsuranceId);
      }
      if (endDate) {
        setInsuranceEndDate(endDate);
      }
    }
  }, [residencyId, damageHistoryId, lastInsuranceId, endDate, selectedProfileId]);

  // Sync state with fetched profile data
  // وقتی پروفایل انتخاب می‌شود، همیشه از profileData استفاده می‌کنیم
  useEffect(() => {
    if (profileData && selectedProfileId) {
      setActiveClinic(!!profileData.active_clinic);
      setProvinceId(profileData.province_id);
      setCityId(profileData.city_id);
      setAddress(profileData.clinic_address || "");
      setPostalCode(profileData.postal_code ? Number(profileData.postal_code) : undefined);
      setInsuredName(profileData.insured_name || profileData.title || "");
      setInsuredPhone(profileData.insured_phone || "");

      // کاربر از modal انتخاب کرده، پس از profileData استفاده کن
      setResidencyStatusId(profileData.residency_status ? 2 : 1);
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
    } else if (profileData && !selectedProfileId) {
      // اگر پروفایلی انتخاب نشده، فقط اگر از URL تنظیم نشده باشد از profileData استفاده کن
      setActiveClinic(!!profileData.active_clinic);
      setProvinceId(profileData.province_id);
      setCityId(profileData.city_id);
      setAddress(profileData.clinic_address || "");
      setPostalCode(profileData.postal_code ? Number(profileData.postal_code) : undefined);
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
    }
  }, [profileData, selectedProfileId, residencyId, damageHistoryId]);

  const updateMutation = useUpdateInsuranceInfo();
  const storeMutation = useStoreInsuranceInfo();

  // ----- Handlers -----
  const handleEditClick = () => {
    modalActions.addModal(ModalTypes.INSURANCE_INFO, {
      onSelect: (id: number) => {
        setSelectedProfileId(id);
        setIsProfileManuallySelected(true); // نشان می‌دهد که کاربر به صورت دستی پروفایل را انتخاب کرده
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
          setInsuranceEndDate("");
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
    modalActions.addModal(ModalTypes.INSURANCE_DATE_PICKER, {
      label: "اتمام بیمه‌نامه",
      value: insuranceEndDate,
      onChange: (date: string) => {
        setEndDate(date);
        setInsuranceEndDate(date);
      }
    });
  };

  const handleSelectEndDate = (iso: string) => {
    setInsuranceEndDate(iso);
    setShowEndDateCalendar(false);
  };

  const handleSubmit = () => {
    if (!selectedProfileId) {
      alert("لطفا ابتدا اطلاعات پایه را ویرایش/انتخاب کنید");
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
      alert("خطا: شناسه بیمه‌گر یافت نشد");
      return;
    }

    let profileIdToUse = selectedProfileId;

    // اگر پروفایلی انتخاب نشده، باید یک پروفایل جدید ایجاد کنیم
    if (!selectedProfileId) {
      // بررسی فیلدهای الزامی
      if (!fieldIdToUse || !gradeIdToUse || !residencyStatusId) {
        alert("لطفا ابتدا اطلاعات پایه (رشته، تخصص و وضعیت) را پر کنید");
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
              info.title === (insuredName || userProfile?.name || "")
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
          alert("خطا در دریافت شناسه پروفایل");
          return;
        }
      } catch (error) {
        alert("خطا در ثبت اطلاعات. لطفا دوباره تلاش کنید");
        return;
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
        selectedDamageHistoryId === 1 ? undefined  : selectedLastInsuranceId || undefined,
        selectedDamageHistoryId === 1 ? undefined  : endDate || undefined,
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
    // 1. URL
    if (endDate && !insuranceEndDate) {
       return moment(endDate, "YYYY-MM-DD").format("jYYYY/jMM/jDD");
    }

    if (!insuranceEndDate) return "تاریخ اتمام بیمه";
    return moment(insuranceEndDate, "YYYY-MM-DD").format("jYYYY/jMM/jDD");
  };

  // بررسی اینکه آیا باید فیلدهای سابقه خسارت، بیمه‌گر قبلی و تاریخ اتمام را نشان بدهیم
  // فقط اگر پروفایلی به صورت دستی انتخاب شده باشد (نه از auto-select)
  const shouldShowDamageHistoryFields =
    selectedProfileId && isProfileManuallySelected;

  // بررسی اینکه آیا باید بیمه‌گر قبلی و تاریخ اتمام را نشان بدهیم
  // فقط اگر سابقه خسارت انتخاب شده و ID != 1
  const shouldShowLastInsuranceFields =
    shouldShowDamageHistoryFields &&
    selectedDamageHistoryId !== null &&
    selectedDamageHistoryId !== 1;

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
          (d) => d.id === selectedDamageHistoryId
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
        (d) => d.id === selectedDamageHistoryId
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
    if (!fieldIdToUse || !gradeIdToUse || !residencyStatusId || !effectiveDamageHistoryId) {
      return;
    }

    // اگر سابقه خسارت "صدور اولیه" نیست، بیمه‌گر قبلی و تاریخ اتمام الزامی‌اند
    if (
      effectiveDamageHistoryId !== 1 &&
      (!effectiveLastInsuranceId || !effectiveEndDate)
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
        effectiveDamageHistoryId === 1 ? undefined : effectiveLastInsuranceId ?? undefined,
      current_insurance_end_date:
        effectiveDamageHistoryId === 1 ? null : effectiveEndDate,
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
    effectiveEndDate,
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

          {/* سابقه خسارت: اگر پروفایل انتخاب شده، selectBox باشد، در غیر این صورت InfoRow */}
          {shouldShowDamageHistoryFields ? (
            <div className={styles.infoRow}>
              <span className={styles.bullet}>•</span> سابقه خسارت:{" "}
              <div
                className={`${styles.selectBox} ${styles.inlineSelectBox}`}
                onClick={openDamageHistoryModal}
              >
                {getDamageHistoryLabel()} <DownArrow />
              </div>
            </div>
          ) : (
            <InfoRow label="سابقه خسارت" value={getDamageHistoryLabel()} />
          )}

          {/* بیمه‌گر قبلی و تاریخ اتمام - فقط اگر سابقه خسارت != 1 */}
          {shouldShowLastInsuranceFields ? (
            <>
              <div className={styles.infoRow}>
                <span className={styles.bullet}>•</span> بیمه‌گر قبلی:{" "}
                <div
                  className={`${styles.selectBox} ${styles.inlineSelectBox}`}
                  onClick={openLastInsuranceModal}
                >
                  {getLastInsuranceLabel()} <DownArrow />
                </div>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.bullet}>•</span> اتمام بیمه‌نامه:{" "}
                <div
                  className={`${styles.selectBox} ${styles.inlineSelectBox}`}
                  onClick={openDatePickerModal}
                >
                  {getEndDateLabel()} <DownArrow />
                </div>
              </div>
            </>
          ) : (
            (selectedDamageHistoryId || damageHistoryId) && (selectedDamageHistoryId || damageHistoryId) !== 1 && (
              <>
                 <InfoRow label="بیمه‌گر قبلی" value={getLastInsuranceLabel()} />
                 <InfoRow label="اتمام بیمه‌نامه" value={getEndDateLabel()} />
              </>
            )
          )}
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
            placeholder="کد پستی"
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
              placeholder="آدرس مطب / شرح فعالیت"
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
            <span>٪{discountPercent}</span>
          </div>
        )}

        <button
          className={styles.submitBtn}
          onClick={authorizeClientAction(
            cartActionsLoadingHandler(handleAddToCart)
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
        </button>
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
