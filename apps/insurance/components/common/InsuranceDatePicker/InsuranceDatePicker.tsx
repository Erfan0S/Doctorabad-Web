// components/common/InsuranceDatePicker.tsx
import React from "react";
import DownArrow from "@/assets/svg/downArrow";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import moment from "moment-jalaali";
moment.loadPersian({ usePersianDigits: true });
import { toGregorian } from "jalaali-js";

interface DatePickerProps {
  label: string;
  value?: string; // Gregorian: 2025-01-01
  onChange: (gregorianDate: string) => void;
}

const InsuranceDatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
}) => {
  const getDisplayDate = () => {
    if (value) {
      const parts = String(value).split("-");
      const year = Number(parts[0]);
      if (!Number.isNaN(year) && year >= 1300 && year <= 1500) {
        // value is Jalaali like 1403-01-01 — parse as jalaali
        return moment(value, "jYYYY-jMM-jDD").format("jYYYY/jMM/jDD");
      }
      // treat value as Gregorian (ISO) and format to Jalaali display
      return moment(value, "YYYY-MM-DD").format("jYYYY/jMM/jDD");
    }
    return null;
  };

  const handleClick = () => {
    let modalValue: string | undefined = undefined;
    if (value) {
      const parts = String(value).split("-");
      const year = Number(parts[0]);
      if (!Number.isNaN(year) && year >= 1300) {
        const jy = Number(parts[0]);
        const jm = Number(parts[1]);
        const jd = Number(parts[2]);
        const g = toGregorian(jy, jm, jd);
        modalValue = `${g.gy}-${String(g.gm).padStart(2, "0")}-${String(g.gd).padStart(2, "0")}`;
      } else {
        modalValue = value;
      }
    }

    modalActions.addModal(ModalTypes.INSURANCE_DATE_PICKER, {
      label,
      value: modalValue,
      onChange: (date: string) => {
        onChange(date);
      },
    });
  };

  return (
    <div onClick={handleClick}>
      <span>{label}</span>
      <div>
        {getDisplayDate() || "اتمام بیمه‌نامه"}
      </div>
    </div>
  );
};

export default InsuranceDatePicker;
