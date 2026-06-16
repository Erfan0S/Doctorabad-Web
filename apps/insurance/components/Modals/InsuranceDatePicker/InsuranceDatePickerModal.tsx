import React, { useState } from "react";
import { ModalProps } from "@repo/core/types/modals";
import { toGregorian, toJalaali } from "jalaali-js";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import styles from "./InsuranceDatePickerModal.module.scss";
import DownArrow from "@/assets/svg/downArrow";
import SelectOptionsModal from "@/components/SelectOptions/SelectOptions";

interface InsuranceDatePickerData {
  label: string;
  value?: string; // Gregorian format: 2025-01-01
  onChange: (gregorianDate: string) => void;
}

interface InsuranceDatePickerModalProps extends ModalProps {
  data: InsuranceDatePickerData;
}

// --- Helpers ---
const getYears = () => {
  const today = new Date();
  const { jy: currentJYear } = toJalaali(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );
  return [currentJYear -1, currentJYear , currentJYear +1];
};

const getMonths = () => [
  { id: 1, title: "فروردین" },
  { id: 2, title: "اردیبهشت" },
  { id: 3, title: "خرداد" },
  { id: 4, title: "تیر" },
  { id: 5, title: "مرداد" },
  { id: 6, title: "شهریور" },
  { id: 7, title: "مهر" },
  { id: 8, title: "آبان" },
  { id: 9, title: "آذر" },
  { id: 10, title: "دی" },
  { id: 11, title: "بهمن" },
  { id: 12, title: "اسفند" },
];

const getDays = () => Array.from({ length: 31 }, (_, i) => i + 1);

export const InsuranceDatePickerModal: React.FC<InsuranceDatePickerModalProps> = ({
  closeModal,
  data,
}) => {
  if (!data) return null;
  
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [activeSelector, setActiveSelector] = useState<'year' | 'month' | 'day' | null>(null);

  const handleConfirm = () => {
    if (selectedYear && selectedMonth && selectedDay) {
      const gDate = toGregorian(selectedYear, selectedMonth, selectedDay);
      const formattedDate = `${gDate.gy}-${String(gDate.gm).padStart(2, '0')}-${String(gDate.gd).padStart(2, '0')}`;
      data.onChange(formattedDate);
      closeModal();
    }
  };

  const getYearLabel = () => selectedYear || "سال";
  const getMonthLabel = () => {
    if (!selectedMonth) return "ماه";
    return getMonths().find((m) => m.id === selectedMonth)?.title || "ماه";
  };
  const getDayLabel = () => selectedDay || "روز";

  if (activeSelector) {
    let options: { id: number | string; label: string }[] = [];
    let title = "";
    let selectedId: number | null = null;
    let onSelect: (id: number | string) => void = () => {};

    if (activeSelector === 'year') {
      title = "انتخاب سال";
      options = getYears().map((y) => ({ id: y, label: String(y) }));
      selectedId = selectedYear;
      onSelect = (id) => setSelectedYear(Number(id));
    } else if (activeSelector === 'month') {
      title = "انتخاب ماه";
      options = getMonths().map((m) => ({ id: m.id, label: m.title }));
      selectedId = selectedMonth;
      onSelect = (id) => setSelectedMonth(Number(id));
    } else if (activeSelector === 'day') {
      title = "انتخاب روز";
      options = getDays().map((d) => ({ id: d, label: String(d) }));
      selectedId = selectedDay;
      onSelect = (id) => setSelectedDay(Number(id));
    }

    return (
      <SelectOptionsModal
        title={title}
        options={options}
        selectedId={selectedId}
        onSelect={onSelect}
        closeModal={() => setActiveSelector(null)}
      />
    );
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.header}>
        <h3 className={styles.headerTitle}>تاریخ اتمام بیمه‌نامه</h3>
      </div>

      <div className={styles.scrollContent}>
        <div className={styles.selectorsRow}>


          {/* Day */}
          <div 
            className={`${styles.selectorBox} ${selectedDay ? styles.filled : ''}`} 
            onClick={() => setActiveSelector('day')}
          >
            <span>{getDayLabel()}</span>
            <DownArrow />
          </div>
          {/* Month */}
          <div 
            className={`${styles.selectorBox} ${selectedMonth ? styles.filled : ''}`} 
            onClick={() => setActiveSelector('month')}
          >
            <span>{getMonthLabel()}</span>
            <DownArrow />
          </div>
          {/* Year */}
          <div 
            className={`${styles.selectorBox} ${selectedYear ? styles.filled : ''}`} 
            onClick={() => setActiveSelector('year')}
          >
            <span>{getYearLabel()}</span>
            <DownArrow />
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <button
          className={styles.submitBtn}
          onClick={handleConfirm}
          disabled={!selectedYear || !selectedMonth || !selectedDay}
        >
          ثبت کن!
        </button>
      </div>
    </div>
  );
};

export default InsuranceDatePickerModal;
