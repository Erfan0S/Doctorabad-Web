// components/modals/UserInfoModal/UserInfoModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ModalProps } from "@repo/core/types/modals";
import {
  useInsuranceInfos,
  useStoreInsuranceInfo,
  useUpdateInsuranceInfo,
  useProvinces,
  useCities,
  useUserProfile,
} from "@/hooks/useUserInfo";
import {
  useInsuranceFields,
  useGrades,
  useResidencyStatus,
  useDamageHistory,
  useLastInsurer,
} from "@/hooks/useInsuranceFind";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { UpdateUserInfoInput, Province, City } from "@/types/insurance";
import UploadBox from "@/components/common/UploadBox";
import DownArrow from "@/assets/svg/downArrow";

interface UserInfoModalProps extends ModalProps {
  data: {
    onSelect: (id: number) => void;
    currentId: number | null;
  };
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({ closeModal, data }) => {
  const { data: infos = [], isLoading, refetch } = useInsuranceInfos();
  const { data: userProfile } = useUserProfile();
  const [view, setView] = useState<"list" | "form">("list");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Data for form
  const { data: fields = [] } = useInsuranceFields();
  const { data: provinces = [] } = useProvinces();
  const { data: residencyStatuses = [] } = useResidencyStatus();

  // Form states
  const [formTitle, setFormTitle] = useState("");
  const [selectedFieldId, setSelectedFieldId] = useState<number | null>(null);
  const fieldIds = selectedFieldId ? [selectedFieldId] : [];
  const { data: grades = [] } = useGrades(fieldIds);
  const [selectedGradeId, setSelectedGradeId] = useState<number | null>(null);
  const [selectedResidencyId, setSelectedResidencyId] = useState<number | null>(
    null,
  );
  const [activeClinic, setActiveClinic] = useState(false);
  const [provinceId, setProvinceId] = useState<number | undefined>();
  const { data: cities = [] } = useCities(provinceId);
  const [cityId, setCityId] = useState<number | undefined>();
  const [address, setAddress] = useState("");
  const [nationalCardId, setNationalCardId] = useState<number | null>(null);
  const [medicalCardId, setMedicalCardId] = useState<number | null>(null);
  const [lastInsurerCardId, setLastInsurerCardId] = useState<number | null>(
    null,
  );
  const [insuredPhone, setInsuredPhone] = useState("");
  const [postalCode, setPostalCode] = useState<number | null>(null);

  const storeMutation = useStoreInsuranceInfo();
  const updateMutation = useUpdateInsuranceInfo();

  const { data: damageHistories = [] } = useDamageHistory();

  // Load editing data
  useEffect(() => {
    if (editingId && view === "form") {
      const info = infos.find((i) => i.id === editingId);
      if (info) {
        setFormTitle(info.title || "");
        setSelectedFieldId(info.field_id);
        setSelectedGradeId(info.grade_id);
        setSelectedResidencyId(info.residency_status ? 2 : 1);
        setActiveClinic(!!info.active_clinic);
        setProvinceId(info.province_id);
        setCityId(info.city_id);
        setAddress(info.clinic_address || "");
        setNationalCardId(info.national_id_card_files?.[0]?.id || null);
        setMedicalCardId(info.medical_education_card_files?.[0]?.id || null);
        setLastInsurerCardId(info.last_insurance_files?.[0]?.id || null);
        setInsuredPhone(info.insured_phone || "");
        setPostalCode(info.postal_code ? Number(info.postal_code) : null);
      }
    } else if (view === "form" && !editingId) {
      // Reset form for new entry
      setFormTitle(userProfile?.name || "");
      setSelectedFieldId(null);
      setSelectedGradeId(null);
      setSelectedResidencyId(null);
      setActiveClinic(false);
      setProvinceId(undefined);
      setCityId(undefined);
      setAddress("");
      setNationalCardId(null);
      setMedicalCardId(null);
      setLastInsurerCardId(null);
      setInsuredPhone("");
      setPostalCode(null);
    }
  }, [editingId, view, infos, userProfile]);

  const handleSelect = (id: number) => {
    data.onSelect(id);
    closeModal();
  };

  const handleEdit = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(id);
    setView("form");
  };

  const handleAddNew = () => {
    setEditingId(null);
    setView("form");
  };

  const handleBack = () => {
    setView("list");
    setEditingId(null);
  };

  const openFieldModal = () => {
    modalActions.addModal(ModalTypes.INSURANCE_FIELD_SELECT, {
      title: "انتخاب رشته",
      options: fields.map((f) => ({ id: f.id, label: f.title })),
      selectedId: selectedFieldId,
      onSelect: (id: number) => {
        setSelectedFieldId(id);
        setSelectedGradeId(null); // Reset grade when field changes
      },
    });
  };

  const openGradeModal = () => {
    if (!selectedFieldId) return;
    modalActions.addModal(ModalTypes.INSURANCE_FIELD_SELECT, {
      title: "انتخاب تخصص",
      options: grades.map((g) => ({ id: g.id, label: g.title })),
      selectedId: selectedGradeId,
      onSelect: (id: number) => setSelectedGradeId(id),
    });
  };

  const openResidencyModal = () => {
    modalActions.addModal(ModalTypes.INSURANCE_FIELD_SELECT, {
      title: "انتخاب وضعیت",
      options: residencyStatuses.map((r) => ({ id: r.id, label: r.title })),
      selectedId: selectedResidencyId,
      onSelect: (id: number) => setSelectedResidencyId(id),
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

  const getFieldLabel = () => {
    if (!selectedFieldId) return "رشته";
    return fields.find((f) => f.id === selectedFieldId)?.title || "رشته";
  };

  const getGradeLabel = () => {
    if (!selectedGradeId) return "تخصص";
    return grades.find((g) => g.id === selectedGradeId)?.title || "تخصص";
  };

  const getResidencyLabel = () => {
    if (!selectedResidencyId) return "وضعیت";
    return (
      residencyStatuses.find((r) => r.id === selectedResidencyId)?.title ||
      "وضعیت"
    );
  };

  const getProvinceLabel = () => {
    if (!provinceId) return "استان";
    return (
      provinces.find((p: Province) => p.id === provinceId)?.title || "استان"
    );
  };

  const getCityLabel = () => {
    if (!cityId) return "شهر";
    return cities.find((c: City) => c.id === cityId)?.title || "شهر";
  };

  const handleSave = () => {
    if (!selectedFieldId || !selectedGradeId || !selectedResidencyId) {
      alert("لطفا تمام فیلدهای الزامی را پر کنید");
      return;
    }

    const payload: UpdateUserInfoInput = {
      title: formTitle || userProfile?.name || "",
      field_id: selectedFieldId,
      grade_id: selectedGradeId,
      residency_status: selectedResidencyId as 1 | 2,
      national_id_card_files: nationalCardId ? [nationalCardId] : [],
      last_insurance_files: lastInsurerCardId ? [lastInsurerCardId] : [],
      medical_education_card_files: medicalCardId ? [medicalCardId] : [],
      active_clinic: activeClinic,
      province_id: provinceId,
      city_id: cityId,
      clinic_address: activeClinic ? address : undefined,
      insured_name: formTitle || userProfile?.name || "",
      insured_phone: insuredPhone,
      postal_code: postalCode ? Number(postalCode) : undefined,
    };

    if (editingId) {
      updateMutation.mutate(
        { id: editingId, payload },
        {
          onSuccess: () => {
            refetch();
            setView("list");
            setEditingId(null);
          },
        },
      );
    } else {
      storeMutation.mutate(payload, {
        onSuccess: async (response) => {
          // اگر پاسخ شامل id بود، مستقیماً آن را انتخاب کن
          if (response?.id) {
            // لیست را آپدیت کن تا در پس‌زمینه سینک شود
            refetch();
            handleSelect(response.id);
            return;
          }

          // اگر id در پاسخ نبود (محض اطمینان)، از روش‌های قبلی استفاده کن
          // Refetch the list to get the new item
          const { data: updatedInfos = [] } = await refetch();

          // Try to find by matching field and grade
          let newInfo = updatedInfos.find(
            (info) =>
              info.field_id === selectedFieldId &&
              info.grade_id === selectedGradeId &&
              info.title === (formTitle || userProfile?.name || ""),
          );

          // If still not found, select the last item (most likely the new one)
          if (!newInfo && updatedInfos.length > 0) {
            newInfo = updatedInfos[updatedInfos.length - 1];
          }

          if (newInfo) {
            handleSelect(newInfo.id);
          } else {
            setView("list");
          }
        },
      });
    }
  };

  const isFormValid =
    selectedFieldId !== null &&
    selectedGradeId !== null &&
    selectedResidencyId !== null;

  const formSectionCls = "flex flex-col gap-2";
  const labelCls = "text-sm font-semibold text-[#333]";
  const inputCls =
    "w-full rounded-[10px] border-2 border-solid border-[#e9ecef] bg-white p-3 text-sm transition-all duration-200 [font-family:inherit] placeholder:text-[#999] focus:border-[#2ecc71] focus:shadow-[0_0_0_3px_rgba(46,204,113,0.1)] focus:outline-none";
  const selectBoxCls =
    "flex min-h-[44px] w-full cursor-pointer items-center justify-between rounded-[10px] border-2 border-solid border-[#e9ecef] bg-white p-3 text-sm transition-all duration-200 hover:border-[#2ecc71] hover:bg-[#f8f9fa]";
  const selectBoxDisabledCls =
    "flex min-h-[44px] w-full cursor-not-allowed items-center justify-between rounded-[10px] border-2 border-solid border-[#e9ecef] bg-smoke p-3 text-sm opacity-50";
  const dividerCls = "my-2 h-px w-full bg-[#e9ecef]";
  const addNewBtnCls =
    "mt-2 cursor-pointer rounded-xl border-none bg-green-base p-4 text-[15px] font-bold text-white shadow-[0_4px_12px_rgba(46,204,113,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(46,204,113,0.4)] active:translate-y-0";

  return (
    <div className="relative flex h-[90vh] max-h-[800px] w-[min(92vw,360px)] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.15)] [direction:rtl]">
      <div className="flex shrink-0 items-center justify-between border-b border-solid border-[#eee] bg-green-base p-5 text-white">
        <h3 className="m-0 text-[18px] font-bold">
          {view === "list"
            ? "انتخاب اطلاعات بیمه‌گذار"
            : editingId
              ? "ویرایش اطلاعات بیمه‌گذار"
              : "افزودن اطلاعات جدید"}
        </h3>
        {view === "form" && (
          <button
            className="cursor-pointer rounded-lg border border-solid border-white/30 bg-white/20 px-4 py-[6px] text-[13px] text-white transition-all duration-200 hover:bg-white/30"
            onClick={handleBack}
          >
            بازگشت
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 [-webkit-overflow-scrolling:touch]">
        {view === "list" ? (
          <div className="flex flex-col gap-3">
            {isLoading && (
              <div className="px-5 py-10 text-center text-sm text-[#666]">
                در حال بارگذاری...
              </div>
            )}

            {!isLoading && infos.length === 0 && (
              <div className="px-5 py-[60px] text-center text-[#666] [&_p]:mb-5 [&_p]:mt-0 [&_p]:text-sm">
                <p>اطلاعاتی ثبت نشده است</p>
                <button className={addNewBtnCls} onClick={handleAddNew}>
                  + افزودن اطلاعات جدید
                </button>
              </div>
            )}

            {!isLoading &&
              infos.map((info) => (
                <div
                  key={info.id}
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border-2 border-solid p-4 transition-all duration-200 hover:-translate-y-0.5 ${
                    info.id === data.currentId
                      ? "border-green-base bg-[rgba(46,204,113,0.1)] shadow-[0_0_0_3px_rgba(46,204,113,0.1)]"
                      : "border-[#e9ecef] bg-[#f8f9fa] hover:border-green-base hover:bg-[#e9ecef] hover:shadow-[0_4px_12px_rgba(46,204,113,0.15)]"
                  }`}
                  onClick={() => handleSelect(info.id)}
                >
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 overflow-hidden text-ellipsis whitespace-nowrap text-base font-bold text-[#333]">
                      {`${info.insured_name} (${info.insured_phone})` ||
                        "بدون عنوان"}
                    </div>
                    {/* <div className={styles.infoSubtitle}>
                      {fields.find((f) => f.id === info.field_id)?.title ||
                        "---"}{" "}
                      -{" "}
                      {grades.find((g) => g.id === info.grade_id)?.title ||
                        "---"}
                    </div> */}
                  </div>
                  <button
                    className="shrink-0 cursor-pointer whitespace-nowrap rounded-lg border-none bg-green-base px-4 py-2 text-xs font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-[0.98]"
                    onClick={(e) => handleEdit(info.id, e)}
                  >
                    ویرایش
                  </button>
                </div>
              ))}

            {!isLoading && infos.length > 0 && (
              <button className={addNewBtnCls} onClick={handleAddNew}>
                + افزودن اطلاعات جدید
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <div className={formSectionCls}>
              <label className={labelCls}>نام و نام خانوادگی:</label>
              <input
                className={inputCls}
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="نام و نام خانوادگی"
              />
            </div>

            <div className={formSectionCls}>
              <label className={labelCls}>شماره تماس:</label>
              <input
                className={inputCls}
                type="tel"
                value={insuredPhone}
                onChange={(e) => setInsuredPhone(e.target.value)}
                placeholder="09123456789"
              />
            </div>

            <div className={formSectionCls}>
              <label className={labelCls}>رشته:</label>
              <div className={selectBoxCls} onClick={openFieldModal}>
                {getFieldLabel()} <DownArrow />
              </div>
            </div>

            <div className={formSectionCls}>
              <label className={labelCls}>تخصص:</label>
              <div
                className={
                  !selectedFieldId ? selectBoxDisabledCls : selectBoxCls
                }
                onClick={openGradeModal}
              >
                {getGradeLabel()} <DownArrow />
              </div>
            </div>

            <div className={formSectionCls}>
              <label className={labelCls}>وضعیت:</label>
              <div className={selectBoxCls} onClick={openResidencyModal}>
                {getResidencyLabel()} <DownArrow />
              </div>
            </div>

            <div className={dividerCls} />

            <div className={formSectionCls}>
              <label className={labelCls}>آپلود فایل‌ها:</label>
              <div className="flex flex-col gap-3">
                <UploadBox
                  title=" کارت ملی"
                  type={1}
                  fileId={nationalCardId}
                  onUploadSuccess={setNationalCardId}
                  onDeleteSuccess={() => setNationalCardId(null)}
                />
                <UploadBox
                  title="  کارت نظام پزشکی"
                  type={2}
                  fileId={medicalCardId}
                  onUploadSuccess={setMedicalCardId}
                  onDeleteSuccess={() => setMedicalCardId(null)}
                />
                <UploadBox
                  title="  بیمه‌نامه قبلی"
                  type={3}
                  fileId={lastInsurerCardId}
                  onUploadSuccess={setLastInsurerCardId}
                  onDeleteSuccess={() => setLastInsurerCardId(null)}
                />
              </div>
            </div>

            <div className={dividerCls} />

            <div className={formSectionCls}>
              <label className={labelCls}>استان و شهر:</label>
              <div className="flex gap-3 [&>div]:flex-1">
                <div className={selectBoxCls} onClick={openProvinceModal}>
                  {getProvinceLabel()} <DownArrow />
                </div>
                <div className={selectBoxCls} onClick={openCityModal}>
                  {getCityLabel()} <DownArrow />
                </div>
              </div>
            </div>

            <div className={formSectionCls}>
              <label className={labelCls}>کد پستی:</label>
              <input
                className={inputCls}
                type="text"
                value={postalCode ? String(postalCode) : ""}
                onChange={(e) => setPostalCode(Number(e.target.value))}
                placeholder="1234567890"
              />
            </div>

            <div className={dividerCls} />

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between text-sm font-semibold text-[#333]">
                <span>مطب فعال دارم</span>
                <label className="relative inline-block h-7 w-[50px]">
                  <input
                    className="peer h-0 w-0 opacity-0"
                    type="checkbox"
                    checked={activeClinic}
                    onChange={(e) => setActiveClinic(e.target.checked)}
                  />
                  <span className="absolute inset-0 cursor-pointer rounded-[34px] bg-[#ccc] transition-all duration-300 before:absolute before:bottom-1 before:left-1 before:h-5 before:w-5 before:rounded-full before:bg-white before:transition-all before:duration-300 before:content-[''] peer-checked:bg-green-base peer-checked:before:translate-x-[22px]"></span>
                </label>
              </div>

              {activeClinic && (
                <div className="flex flex-col gap-3">
                  <textarea
                    className="min-h-[100px] w-full resize-y rounded-[10px] border-2 border-solid border-[#e9ecef] p-3 text-sm transition-all duration-200 [font-family:inherit] placeholder:text-[#999] focus:border-green-base focus:shadow-[0_0_0_3px_rgba(46,204,113,0.1)] focus:outline-none"
                    placeholder="کلیه مراکز بهداشتی و درمانی مجاز سراسر کشور"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {view === "form" && (
        <div className="flex shrink-0 items-center justify-center border-t border-solid border-white/10 px-5 py-4 text-white">
          <button
            className="w-full max-w-[300px] cursor-pointer rounded-[10px] border-2 border-solid border-white bg-green-base px-8 py-3 text-[15px] font-bold text-white transition-all duration-200 enabled:hover:-translate-y-0.5 enabled:hover:bg-white/30 enabled:hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] enabled:active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={handleSave}
            disabled={
              !isFormValid ||
              storeMutation.isPending ||
              updateMutation.isPending
            }
          >
            {storeMutation.isPending || updateMutation.isPending
              ? "در حال ذخیره..."
              : editingId
                ? "ذخیره تغییرات"
                : "ذخیره"}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserInfoModal;
