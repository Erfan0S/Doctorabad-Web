// components/SelectInfo/SelectInfo.tsx
import React, { useMemo, useState } from "react";
import styles from "./SelectInfo.module.scss";
import DownArrow from "@/assets/svg/downArrow";
// import CalendarIcon from "@/assets/svg/CalendarIcon"; // اضافه کردن ایمپورت آیکون که کامنت بود
import moment from "moment-jalaali";
import {
  useInsuranceFields,
  useDamageHistory,
  useResidencyStatus,
  useLastInsurer,
  useGrades,
} from "@/hooks/useInsuranceFind";

import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";

moment.loadPersian({ usePersianDigits: true });

interface SelectInfoProps {
  onChangeFields?: (ids: number[]) => void;
  onChangeGrades?: (ids: number[]) => void;
  onChangeResidency?: (id: number | null) => void;
  onChangeDamageHistory?: (id: number | null) => void;
  onChangeLastInsurance?: (id: number | null) => void;
  onChangeEndDate?: (iso: string | null) => void;
}

export default function SelectInfo({
  onChangeFields,
  onChangeGrades,
  onChangeResidency,
  onChangeDamageHistory,
  onChangeLastInsurance,
  onChangeEndDate,
}: SelectInfoProps) {
  // ----- Data Fetching -----
  const { data: fields = [] } = useInsuranceFields();
  const { data: history = [] } = useDamageHistory();
  const { data: residency = [] } = useResidencyStatus();
  const { data: insurers = [] } = useLastInsurer();

  // ----- States -----
  const [selectedFieldId, setSelectedFieldId] = useState<string>("");
  const fieldIds = selectedFieldId ? [Number(selectedFieldId)] : [];
  const { data: grades = [] } = useGrades(fieldIds);

  const [selectedResidencyId, setSelectedResidencyId] = useState<string>("");
  const [selectedHistoryId, setSelectedHistoryId] = useState<string>("");
  const [selectedInsurerId, setSelectedInsurerId] = useState<string>("");
  const [selectedGradeId, setSelectedGradeId] = useState<string>("");

  const [expiryDateIso, setExpiryDateIso] = useState<string>("");
  const [showCalendar, setShowCalendar] = useState(false);

  // ----- Logic & Memos -----
  const selectedHistoryItem = useMemo(
    () => history.find((h) => String(h.id) === selectedHistoryId),
    [history, selectedHistoryId]
  );

  const showInsurerAndExpiry =
    selectedHistoryId && selectedHistoryItem?.id !== 1; // 1 = صدور اولیه

  const isGradeEnabled = Boolean(selectedFieldId);

  const expiryDateJalali = expiryDateIso
    ? moment(expiryDateIso, "YYYY-MM-DD").format("jYYYY/jMM/jDD")
    : "";

  const handleSelectExpiry = (iso: string) => {
    setExpiryDateIso(iso);
    setShowCalendar(false);
    onChangeEndDate?.(iso);
  };

  // ----- Helper: Open Modals -----

  // 1. رشته
  const openFieldModal = () => {
    modalActions.addModal(ModalTypes.INSURANCE_FIELD_SELECT, {
      title: "انتخاب رشته",
      options: fields.map((f) => ({ id: f.id, label: f.title })),
      selectedId: selectedFieldId ? Number(selectedFieldId) : null,
      onSelect: (id: number) => {
        const val = String(id);
        setSelectedFieldId(val);
        setSelectedGradeId(""); // Reset grade
        onChangeFields?.([id]);
        onChangeGrades?.([]);
      },
    });
  };

  // 2. تخصص
  const openGradeModal = () => {
    if (!isGradeEnabled) return;
    modalActions.addModal(ModalTypes.INSURANCE_FIELD_SELECT, {
      title: "انتخاب تخصص",
      options: grades.map((g) => ({ id: g.id, label: g.title })),
      selectedId: selectedGradeId ? Number(selectedGradeId) : null,
      onSelect: (id: number) => {
        const val = String(id);
        setSelectedGradeId(val);
        onChangeGrades?.([id]);
      },
    });
  };

  // 3. وضعیت
  const openResidencyModal = () => {
    modalActions.addModal(ModalTypes.INSURANCE_FIELD_SELECT, {
      title: "انتخاب وضعیت",
      options: residency.map((r) => ({ id: r.id, label: r.title })),
      selectedId: selectedResidencyId ? Number(selectedResidencyId) : null,
      onSelect: (id: number) => {
        const val = String(id);
        setSelectedResidencyId(val);
        onChangeResidency?.(id);
      },
    });
  };

  // 4. سابقه خسارت
  const openHistoryModal = () => {
    modalActions.addModal(ModalTypes.INSURANCE_FIELD_SELECT, {
      title: "سابقه خسارت",
      options: history.map((h) => ({ id: h.id, label: h.title })),
      selectedId: selectedHistoryId ? Number(selectedHistoryId) : null,
      onSelect: (id: number) => {
        const val = String(id);
        setSelectedHistoryId(val);
        onChangeDamageHistory?.(id);
      },
    });
  };

  // 5. بیمه‌گر قبلی
  const openInsurerModal = () => {
    modalActions.addModal(ModalTypes.INSURANCE_FIELD_SELECT, {
      title: "بیمه‌گر قبلی",
      options: insurers.map((i) => ({ id: i.id, label: i.title })),
      selectedId: selectedInsurerId ? Number(selectedInsurerId) : null,
      onSelect: (id: number) => {
        const val = String(id);
        setSelectedInsurerId(val);
        onChangeLastInsurance?.(id);
      },
    });
  };

  // Helper for displaying labels
  const getLabel = (idStr: string, list: any[], defaultLabel: string) => {
    if (!idStr) return defaultLabel;
    const item = list.find((x) => String(x.id) === idStr);
    return item ? item.title : defaultLabel;
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputGrid}>
        {/* 1. رشته */}
        <div className={styles.pickerGroup}>
          <div className={styles.selectInput} onClick={openFieldModal}>
            {getLabel(selectedFieldId, fields, "رشته")}
          </div>
          <div className={styles.selectIcon}>
            <DownArrow />
          </div>
        </div>

        {/* 2. تخصص */}
        <div
          className={`${styles.pickerGroup} ${
            !isGradeEnabled ? styles.disabled : ""
          }`}
        >
          <div className={styles.selectInput} onClick={openGradeModal}>
            {getLabel(selectedGradeId, grades, "تخصص")}
          </div>
          <div className={styles.selectIcon}>
            <DownArrow />
          </div>
        </div>

        {/* 3. وضعیت */}
        <div className={styles.pickerGroup}>
          <div className={styles.selectInput} onClick={openResidencyModal}>
            {getLabel(selectedResidencyId, residency, "وضعیت")}
          </div>
          <div className={styles.selectIcon}>
            <DownArrow />
          </div>
        </div>

        {/* 4. سابقه خسارت */}
        <div className={styles.pickerGroup}>
          <div className={styles.selectInput} onClick={openHistoryModal}>
            {getLabel(selectedHistoryId, history, "سابقه خسارت")}
          </div>
          <div className={styles.selectIcon}>
            <DownArrow />
          </div>
        </div>

        {/* 5 & 6. Conditional Render */}
        {showInsurerAndExpiry && (
          <>
            {/* 5. بیمه‌گر قبلی */}
            <div className={styles.pickerGroup}>
              <div className={styles.selectInput} onClick={openInsurerModal}>
                {getLabel(selectedInsurerId, insurers, "بیمه‌گر قبلی")}
              </div>
              <div className={styles.selectIcon}>
                <DownArrow />
              </div>
            </div>

            {/* 6. اتمام بیمه‌نامه (تقویم) */}
            <div className={styles.pickerGroup}>
              <div
                className={styles.selectInput}
                onClick={() => setShowCalendar((prev) => !prev)}
              >
                {expiryDateJalali || "اتمام بیمه‌نامه"}
              </div>
              
              {/* <div className={styles.selectIcon}>
                <CalendarIcon />
              </div> */}

              {showCalendar && (
                <div className={styles.calendarPopup}>
                  <div className={styles.calendarHeader}>
                    انتخاب تاریخ اتمام
                  </div>
                  <div className={styles.calendarBody}>
                    {[0, 1, 2, 3, 4, 5, 6].map((offset) => {
                      const iso = moment()
                        .add(offset, "day")
                        .format("YYYY-MM-DD");
                      const label = moment(iso, "YYYY-MM-DD").format(
                        "jMM/jDD"
                      );
                      return (
                        <button
                          key={iso}
                          type="button"
                          className={styles.calendarDay}
                          onClick={() => handleSelectExpiry(iso)}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    type="button"
                    className={styles.calendarClose}
                    onClick={() => setShowCalendar(false)}
                  >
                    بستن
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
