import React, { useState } from "react";
import { ModalProps } from "@repo/core/types/modals";
import { toGregorian, toJalaali } from "jalaali-js";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
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

  const selectorBoxCls =
    "flex h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-solid bg-white px-2 transition-all duration-200 hover:border-green-base [&_svg]:h-3 [&_svg]:w-3";
  const selectorIdleCls =
    "border-[#ddd] [&_span]:text-sm [&_span]:font-medium [&_span]:text-[#555] [&_svg]:opacity-60 [&_svg_path]:fill-[#555]";
  const selectorFilledCls =
    "border-green-base [&_span]:text-sm [&_span]:font-bold [&_span]:text-[#333] [&_svg]:opacity-100 [&_svg_path]:fill-green-base";

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
    <div className="relative flex max-h-[800px] w-[min(92vw,360px)] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.15)] [direction:rtl]">
      <div className="bg-green-base p-4 text-center text-white">
        <h3 className="m-0 text-base font-bold">تاریخ اتمام بیمه‌نامه</h3>
      </div>

      <div className="px-4 py-6">
        <div className="flex justify-center gap-2 [direction:rtl]">


          {/* Day */}
          <div 
            className={`${selectorBoxCls} ${selectedDay ? selectorFilledCls : selectorIdleCls}`} 
            onClick={() => setActiveSelector('day')}
          >
            <span>{getDayLabel()}</span>
            <DownArrow />
          </div>
          {/* Month */}
          <div 
            className={`${selectorBoxCls} ${selectedMonth ? selectorFilledCls : selectorIdleCls}`} 
            onClick={() => setActiveSelector('month')}
          >
            <span>{getMonthLabel()}</span>
            <DownArrow />
          </div>
          {/* Year */}
          <div 
            className={`${selectorBoxCls} ${selectedYear ? selectorFilledCls : selectorIdleCls}`} 
            onClick={() => setActiveSelector('year')}
          >
            <span>{getYearLabel()}</span>
            <DownArrow />
          </div>
        </div>
      </div>

      <div className="flex justify-center px-4 pb-6">
        <button
          className="h-12 w-full cursor-pointer rounded-xl border-none bg-green-base text-base font-bold text-white transition-[background] duration-200 enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:bg-[#ccc]"
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
