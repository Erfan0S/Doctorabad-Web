// components/common/InsuranceDatePicker.tsx
import React from "react";
import styles from "./InsuranceDatePicker.module.scss";
import DownArrow from "@/assets/svg/downArrow";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import moment from "moment-jalaali";

interface DatePickerProps {
  label: string;
  value?: string; // Gregorian: 2025-01-01
  onChange: (gregorianDate: string) => void;
}

const InsuranceDatePicker: React.FC<DatePickerProps> = ({ label, value, onChange }) => {
  
  const getDisplayDate = () => {
    if (value) {
       return moment(value, "YYYY-MM-DD").format("jYYYY/jMM/jDD");
    }
    return null;
  };

  const handleClick = () => {
    modalActions.addModal(ModalTypes.INSURANCE_DATE_PICKER, {
      label,
      value,
      onChange: (date: string) => {
          onChange(date);
      }
    });
  };

  return (
    <div  onClick={handleClick}>
        <span>{label}</span>
        <div className={styles.value} >{getDisplayDate() || "اتمام بیمه‌نامه"}</div>
    </div>
  );
};

export default InsuranceDatePicker;
