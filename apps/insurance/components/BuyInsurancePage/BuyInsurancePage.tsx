"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./BuyInsurancePage.module.scss";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import UploadBox from "@/components/common/UploadBox";
import DownArrow from "@/assets/svg/downArrow";
import {
  useProvinces,
  useCities,
  useUserProfile,
  useInsuranceInfoSingle,
  useUpdateInsuranceInfo,
} from "@/hooks/useUserInfo";
import { UpdateUserInfoInput } from "@/types/insurance";

const BuyInsurancePage = () => {
  const searchParams = useSearchParams();

  // ----- URL Params (از صفحه لیست بیمه) -----
  const insurerTitle = searchParams.get("insurer_title") || "بیمه";
  const insurerLogo = searchParams.get("insurer_logo");
  const priceRaw = searchParams.get("price");
  const urlPrice = priceRaw ? Number(priceRaw) : 0;
  
  // اگر نیاز است پروفایل اولیه بر اساس فیلترهای URL انتخاب شود، اینجا لاجیک اضافه کنید
  // فعلا فرض بر این است که کاربر خودش دکمه ویرایش را میزند

  // ----- States -----
  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(null);
  
  const [activeClinic, setActiveClinic] = useState(false);
  const [provinceId, setProvinceId] = useState<number | undefined>();
  const [cityId, setCityId] = useState<number | undefined>();
  const [address, setAddress] = useState("");
  
  const [nationalCardId, setNationalCardId] = useState<number | null>(null);
  const [medicalCardId, setMedicalCardId] = useState<number | null>(null);

  // ----- Queries -----
  const { data: userProfile } = useUserProfile(); 
  const { data: provinces = [] } = useProvinces();
  const { data: cities = [] } = useCities(provinceId);
  const { data: profileData } = useInsuranceInfoSingle(selectedProfileId);

  // Sync state with fetched profile data
  useEffect(() => {
    if (profileData) {
      setActiveClinic(!!profileData.active_clinic);
      setProvinceId(profileData.province_id);
      setCityId(profileData.city_id);
      setAddress(profileData.clinic_address || "");

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
  }, [profileData]);

  const updateMutation = useUpdateInsuranceInfo();

  // ----- Handlers -----
  const handleEditClick = () => {
    modalActions.addModal(ModalTypes.INSURANCE_INFO, {
      onSelect: (id: number) => setSelectedProfileId(id),
      currentId: selectedProfileId,
    });
  };

  const openProvinceModal = () => {
    modalActions.addModal(ModalTypes.INSURANCE_FIELD_SELECT, {
      title: "انتخاب استان",
      options: provinces.map((p) => ({ id: p.id, label: p.title })),
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
      options: cities.map((c) => ({ id: c.id, label: c.title })),
      selectedId: cityId,
      onSelect: (id: number) => setCityId(id),
    });
  };

  const handleSubmit = () => {
    if (!selectedProfileId) {
      alert("لطفا ابتدا اطلاعات پایه را ویرایش/انتخاب کنید");
      return;
    }

    const payload: UpdateUserInfoInput = {
      field_id: profileData?.field_id || 0, 
      grade_id: profileData?.grade_id || 0,
      residency_status: profileData?.residency_status || false,
      national_id_card_files: nationalCardId ? [nationalCardId] : [],
      medical_education_card_files: medicalCardId ? [medicalCardId] : [],
      active_clinic: activeClinic,
      province_id: activeClinic ? provinceId : undefined,
      city_id: activeClinic ? cityId : undefined,
      clinic_address: activeClinic ? address : undefined,
      insured_name: userProfile?.name || "", 
    };

    updateMutation.mutate({ id: selectedProfileId, payload });
  };

  // ----- Helpers -----
  const userFullName = userProfile?.name || "کاربر مهمان"; 
  
  const getProvinceLabel = () => provinces.find(p => p.id === provinceId)?.title || "استان";
  const getCityLabel = () => cities.find(c => c.id === cityId)?.title || "شهر";

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.insurerHeader}>
         <div className={styles.insurerLogo}>
           {insurerLogo ? (
             <img src={insurerLogo} alt={insurerTitle} style={{ maxHeight: 40 }} />
           ) : (
             <span>{insurerTitle}</span>
           )}
         </div>
      </div>

      {/* Info Card */}
      <div className={styles.infoCard}>
        <div className={styles.cardHeader}>
          <span className={styles.cardTitle}>اطلاعات من</span>
          <button className={styles.editBtn} onClick={handleEditClick}>
            ویرایش
          </button>
        </div>

        <div className={styles.infoList}>
          <InfoRow label="بیمه‌گذار" value={userFullName} />
          <InfoRow label="شماره تلفن" value={userProfile?.mobile || "---"} />
          <InfoRow label="رشته" value={profileData?.title || "---"} /> 
          <InfoRow label="تخصص" value="---" /> 
        </div>

        {/* Uploads */}
        <div className={styles.uploadSection}>
           <div className={styles.bigUploadBox}>
              <UploadBox 
                 title="افزودن کارت ملی" 
                 type={1} 
                 fileId={nationalCardId}
                 onUploadSuccess={setNationalCardId}
                 onDeleteSuccess={() => setNationalCardId(null)}
              />
              <div style={{height: 10}} />
              <UploadBox 
                 title="افزودن کارت نظام پزشکی" 
                 type={2} 
                 fileId={medicalCardId}
                 onUploadSuccess={setMedicalCardId}
                 onDeleteSuccess={() => setMedicalCardId(null)}
              />
           </div>
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
            <>
              <div className={styles.geoRow}>
                 <div className={styles.selectBox} onClick={openProvinceModal}>
                   {getProvinceLabel()} <DownArrow />
                 </div>
                 <div className={styles.selectBox} onClick={openCityModal}>
                   {getCityLabel()} <DownArrow />
                 </div>
              </div>
              
              <textarea 
                className={styles.addressInput} 
                placeholder="آدرس مطب / شرح فعالیت"
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
         <div className={styles.price}>
           {/* نمایش قیمت گرفته شده از URL */}
           <span>{urlPrice.toLocaleString("fa-IR")} تومان</span>
         </div>
         <button className={styles.submitBtn} onClick={handleSubmit}>
            افزودن به سبد خرید
         </button>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string, value: string }) => (
  <div className={styles.infoRow}>
    <span className={styles.bullet}>•</span> {label}: {value}
  </div>
);

export default BuyInsurancePage;
