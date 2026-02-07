// components/modals/UserInfoModal/UserInfoModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import styles from "./UserInfoModal.module.scss";
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
  const [selectedResidencyId, setSelectedResidencyId] = useState<number | null>(null);
  const [activeClinic, setActiveClinic] = useState(false);
  const [provinceId, setProvinceId] = useState<number | undefined>();
  const { data: cities = [] } = useCities(provinceId);
  const [cityId, setCityId] = useState<number | undefined>();
  const [address, setAddress] = useState("");
  const [nationalCardId, setNationalCardId] = useState<number | null>(null);
  const [medicalCardId, setMedicalCardId] = useState<number | null>(null);
  const [insuredPhone, setInsuredPhone] = useState("");
  const [postalCode, setPostalCode] = useState<number | null>(null);

  const storeMutation = useStoreInsuranceInfo();
  const updateMutation = useUpdateInsuranceInfo();

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
        setNationalCardId(
          info.national_id_card_files?.[0]?.id || null
        );
        setMedicalCardId(
          info.medical_education_card_files?.[0]?.id || null
        );
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

  const openDamageHistoryModal = () => {
    modalActions.addModal(ModalTypes.INSURANCE_FIELD_SELECT, {
      title: "انتخاب سابقه خسارت",
      options: damageHistories.map((d) => ({ id: d.id, label: d.title })),
      selectedId: selectedDamageHistoryId,
      onSelect: (id: number) => setSelectedDamageHistoryId(id),
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

  const getDamageHistoryLabel = () => {
    if (!selectedDamageHistoryId) return "سابقه خسارت";
    return (
      damageHistories.find((d) => d.id === selectedDamageHistoryId)?.title ||
      "سابقه خسارت"
    );
  };

  const getProvinceLabel = () => {
    if (!provinceId) return "استان";
    return provinces.find((p: Province) => p.id === provinceId)?.title || "استان";
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
        }
      );
    } else {
      storeMutation.mutate(payload, {
        onSuccess: async (response) => {
          console.log("Store Response:", response);
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
              info.title === (formTitle || userProfile?.name || "")
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

  return (
    <div className={styles.modalContainer}>
      <div className={styles.header}>
        <h3 className={styles.headerTitle}>
          {view === "list"
            ? "انتخاب اطلاعات بیمه‌گذار"
            : editingId
            ? "ویرایش اطلاعات بیمه‌گذار"
            : "افزودن اطلاعات جدید"}
        </h3>
        {view === "form" && (
          <button className={styles.backBtn} onClick={handleBack}>
            بازگشت
          </button>
        )}
      </div>

      <div className={styles.scrollContent}>
        {view === "list" ? (
          <div className={styles.listWrapper}>
            {isLoading && (
              <div className={styles.loading}>در حال بارگذاری...</div>
            )}

            {!isLoading && infos.length === 0 && (
              <div className={styles.emptyState}>
                <p>اطلاعاتی ثبت نشده است</p>
                <button className={styles.addNewBtn} onClick={handleAddNew}>
                  + افزودن اطلاعات جدید
                </button>
              </div>
            )}

            {!isLoading &&
              infos.map((info) => (
                <div
                  key={info.id}
                  className={`${styles.infoItem} ${
                    info.id === data.currentId ? styles.selected : ""
                  }`}
                  onClick={() => handleSelect(info.id)}
                >
                  <div className={styles.infoContent}>
                    <div className={styles.infoTitle}>
                      {info.title || "بدون عنوان"}
                    </div>
                    <div className={styles.infoSubtitle}>
                      {fields.find((f) => f.id === info.field_id)?.title ||
                        "---"}{" "}
                      -{" "}
                      {grades.find((g) => g.id === info.grade_id)?.title ||
                        "---"}
                    </div>
                  </div>
                  <button
                    className={styles.editBtn}
                    onClick={(e) => handleEdit(info.id, e)}
                  >
                    ویرایش
                  </button>
                </div>
              ))}

            {!isLoading && infos.length > 0 && (
              <button className={styles.addNewBtn} onClick={handleAddNew}>
                + افزودن اطلاعات جدید
              </button>
            )}
          </div>
        ) : (
          <div className={styles.formWrapper}>
            <div className={styles.formSection}>
              <label className={styles.label}>نام و نام خانوادگی:</label>
              <input
                className={styles.input}
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="نام و نام خانوادگی"
              />
            </div>

            <div className={styles.formSection}>
              <label className={styles.label}>شماره تماس:</label>
              <input
                className={styles.input}
                type="tel"
                value={insuredPhone}
                onChange={(e) => setInsuredPhone(e.target.value)}
                placeholder="09123456789"
              />
            </div>

            <div className={styles.formSection}>
              <label className={styles.label}>رشته:</label>
              <div
                className={styles.selectBox}
                onClick={openFieldModal}
              >
                {getFieldLabel()} <DownArrow />
              </div>
            </div>

            <div className={styles.formSection}>
              <label className={styles.label}>تخصص:</label>
              <div
                className={`${styles.selectBox} ${
                  !selectedFieldId ? styles.disabled : ""
                }`}
                onClick={openGradeModal}
              >
                {getGradeLabel()} <DownArrow />
              </div>
            </div>

            <div className={styles.formSection}>
              <label className={styles.label}>وضعیت:</label>
              <div
                className={styles.selectBox}
                onClick={openResidencyModal}
              >
                {getResidencyLabel()} <DownArrow />
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.formSection}>
              <label className={styles.label}>آپلود فایل‌ها:</label>
              <div className={styles.uploadSection}>
                <UploadBox
                  title="افزودن کارت ملی"
                  type={1}
                  fileId={nationalCardId}
                  onUploadSuccess={setNationalCardId}
                  onDeleteSuccess={() => setNationalCardId(null)}
                />
                <UploadBox
                  title="افزودن کارت نظام پزشکی"
                  type={2}
                  fileId={medicalCardId}
                  onUploadSuccess={setMedicalCardId}
                  onDeleteSuccess={() => setMedicalCardId(null)}
                />
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.formSection}>
              <label className={styles.label}>استان و شهر:</label>
              <div className={styles.geoRow}>
                <div
                  className={styles.selectBox}
                  onClick={openProvinceModal}
                >
                  {getProvinceLabel()} <DownArrow />
                </div>
                <div
                  className={styles.selectBox}
                  onClick={openCityModal}
                >
                  {getCityLabel()} <DownArrow />
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <label className={styles.label}>کد پستی:</label>
              <input
                className={styles.input}
                type="text"
                value={postalCode ? String(postalCode) : ""}
                onChange={(e) => setPostalCode(Number(e.target.value))}
                placeholder="1234567890"
              />
            </div>

            <div className={styles.divider} />

            <div className={styles.clinicSection}>
              <div className={styles.switchRow}>
                <span>مطب فعال دارم</span>
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
                <div className={styles.clinicInputs}>
                  <textarea
                    className={styles.addressInput}
                    placeholder="آدرس مطب / شرح فعالیت"
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
        <div className={styles.footer}>
          <button
            className={styles.saveBtn}
            onClick={handleSave}
            disabled={!isFormValid || storeMutation.isPending || updateMutation.isPending}
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
