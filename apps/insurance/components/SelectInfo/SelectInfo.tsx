// components/SelectInfo/SelectInfo.tsx
import React, { useMemo, useState } from "react";
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
import {
  InsuranceField,
  InsuranceGrade,
  ResidencyStatus,
  DamageHistory,
  Insurer,
} from "@/types/insurance";

import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import InsuranceDatePicker from "../common/InsuranceDatePicker/InsuranceDatePicker";
import { isoToJalali, parseToIso } from "../BuyInsurancePage/utils/dateUtils";

moment.loadPersian({ usePersianDigits: true });

interface SelectInfoProps {
  onChangeField?: (id: number | null) => void;
  onChangeFieldsData?: (field: InsuranceField | null) => void;
  onChangeGrade?: (id: number | null) => void;
  onChangeGradesData?: (grade: InsuranceGrade | null) => void;
  onChangeResidency?: (id: number | null) => void;
  onChangeResidencyData?: (residency: ResidencyStatus | null) => void;
  onChangeDamageHistory?: (id: number | null) => void;
  onChangeDamageHistoryData?: (history: DamageHistory | null) => void;
  onChangeLastInsurance?: (id: number | null) => void;
  onChangeLastInsuranceData?: (insurer: Insurer | null) => void;
  onChangeEndDate?: (iso: string | null) => void;
}

export default function SelectInfo({
  onChangeField,
  onChangeFieldsData,
  onChangeGrade,
  onChangeGradesData,
  onChangeResidency,
  onChangeResidencyData,
  onChangeDamageHistory,
  onChangeDamageHistoryData,
  onChangeLastInsurance,
  onChangeLastInsuranceData,
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
    [history, selectedHistoryId],
  );

  const selectedInsurerItem = useMemo(
    () => insurers.find((i) => String(i.id) === selectedInsurerId),
    [insurers, selectedInsurerId],
  );

  const showInsurerAndExpiry =
    selectedHistoryId && selectedHistoryItem?.id !== 1; // 1 = صدور اولیه

  const showInsurerNotice =
    Boolean(selectedHistoryId) &&
    selectedHistoryItem?.id !== 1 &&
    Boolean(selectedInsurerId);

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
        onChangeField?.(id);
        onChangeGrade?.(null);
        const selectedField = fields.find((f) => f.id === id);
        if (selectedField) {
          onChangeFieldsData?.(selectedField);
        }
        onChangeGradesData?.(null);
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
        onChangeGrade?.(id);
        const selectedGrade = grades.find((g) => g.id === id);
        if (selectedGrade) {
          onChangeGradesData?.(selectedGrade);
        }
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
        const selectedResidency = residency.find((r) => r.id === id);
        onChangeResidencyData?.(selectedResidency || null);
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
        const selectedHistory = history.find((h) => h.id === id);
        onChangeDamageHistoryData?.(selectedHistory || null);

        if (id === 1) {
          setSelectedInsurerId("");
          setExpiryDateIso("");
          onChangeLastInsurance?.(null);
          onChangeLastInsuranceData?.(null);
          onChangeEndDate?.(null);
        }
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
        const selectedInsurer = insurers.find((i) => i.id === id);
        onChangeLastInsuranceData?.(selectedInsurer || null);
      },
    });
  };

  // Helper for displaying labels
  const getLabel = (idStr: string, list: any[], defaultLabel: string) => {
    if (!idStr) return defaultLabel;
    const item = list.find((x) => String(x.id) === idStr);
    return item ? item.title : defaultLabel;
  };

  const isoValue = parseToIso(expiryDateIso) || "";

  const pickerGroupCls = "relative flex min-w-0 flex-1 flex-col";
  const selectInputBase =
    "box-border block h-[45px] w-full appearance-none overflow-hidden text-ellipsis whitespace-nowrap rounded-[10px] border-[1.5px] border-solid pb-2 pt-2 ps-[10px] pe-7 text-center text-[0.95rem] font-semibold [direction:rtl] [text-align-last:center]";
  const selectInputEnabled = `${selectInputBase} cursor-pointer border-green-base bg-white text-[#333] focus:outline-none focus:ring-2 focus:ring-green-base/20`;
  const selectInputDisabled = `${selectInputBase} pointer-events-none border-[#dcdcdc] bg-smoke text-[#8a8a8a]`;
  const selectIconCls =
    "pointer-events-none absolute end-2 top-1/2 flex -translate-y-1/2 items-center justify-center [&_svg]:h-6 [&_svg]:w-6 [&_svg]:fill-green-base [&_svg_path]:fill-green-base";

  return (
    <div className="mx-auto -mt-4 w-[calc(100%-10px)] rounded-[10px] border border-solid border-[#eee] bg-white px-[0.8rem] pb-[0.6rem] pt-6 text-[0.9rem] leading-[1.6] shadow-[0_4px_12px_rgba(0,0,0,0.15)] [direction:rtl]">
      <div className="grid grid-cols-2 gap-3 [direction:rtl]">
        {/* 1. رشته */}
        <div className={pickerGroupCls}>
          <div className={selectInputEnabled} onClick={openFieldModal}>
            {getLabel(selectedFieldId, fields, "رشته")}
          </div>
          <div className={selectIconCls}>
            <DownArrow />
          </div>
        </div>

        {/* 2. تخصص */}
        <div
          className={`${pickerGroupCls} ${
            !isGradeEnabled ? "cursor-not-allowed opacity-70" : ""
          }`}
        >
          <div className={isGradeEnabled ? selectInputEnabled : selectInputDisabled} onClick={openGradeModal}>
            {getLabel(selectedGradeId, grades, "تخصص")}
          </div>
          <div className={`${selectIconCls} ${
            !isGradeEnabled ? "[&_svg]:hidden" : ""
          }`}>
            <DownArrow />
          </div>
        </div>

        {/* 3. وضعیت */}
        <div className={pickerGroupCls}>
          <div className={selectInputEnabled} onClick={openResidencyModal}>
            {getLabel(selectedResidencyId, residency, "وضعیت")}
          </div>
          <div className={selectIconCls}>
            <DownArrow />
          </div>
        </div>

        {/* 4. سابقه خسارت */}
        <div className={pickerGroupCls}>
          <div className={selectInputEnabled} onClick={openHistoryModal}>
            {getLabel(selectedHistoryId, history, "سابقه خسارت")}
          </div>
          <div className={selectIconCls}>
            <DownArrow />
          </div>
        </div>

        {/* 5 & 6. Conditional Render */}
        {showInsurerAndExpiry && (
          <>
            {/* 5. بیمه‌گر قبلی */}
            <div className={pickerGroupCls}>
              <div className={selectInputEnabled} onClick={openInsurerModal}>
                {getLabel(selectedInsurerId, insurers, "بیمه‌گر قبلی")}
              </div>
              <div className={selectIconCls}>
                <DownArrow />
              </div>
            </div>

            {/* 6. اتمام بیمه‌نامه (تقویم) */}
            <div className={pickerGroupCls}>
              <div className={selectInputEnabled}>
                <InsuranceDatePicker
                  label=""
                  value={isoValue}
                  onChange={handleSelectExpiry}
                />
              </div>
              <div className={selectIconCls}>
                <DownArrow />
              </div>
            </div>
          </>
        )}
      </div>

      {showInsurerNotice && (
        <div className="mt-3 rounded-[10px] border border-solid border-gray bg-white px-[0.9rem] py-3 text-red">
          <p className="m-0 text-justify text-[0.85rem] leading-[1.7]">
            با توجه به اینکه بیمه‌نامه قبلی شما از شرکت{" "}
            {selectedInsurerItem?.title ?? "انتخاب‌شده"} است، تنها تخفیف به خرید
            از شرکت  {selectedInsurerItem?.title ?? "انتخاب‌شده"} تعلق
            می‌گیرد. همچنین نباید از تاریخ اتمام بیمه‌نامه قبلی گذشته باشد. در
            صورت فاصله افتادن بین بیمه‌نامه قبلی و جدید، هزینه توسط شرکت بیمه‌گر
            بدون تخفیف و مطابق صدور اولیه محاسبه می‌گردد.
          </p>
        </div>
      )}
    </div>
  );
}
