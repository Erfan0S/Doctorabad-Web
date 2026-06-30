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
              <div className={styles.selectInput}>
                <InsuranceDatePicker
                  label=""
                  value={isoValue}
                  onChange={handleSelectExpiry}
                />
              </div>
              <div className={styles.selectIcon}>
                <DownArrow />
              </div>
            </div>
          </>
        )}
      </div>

      {showInsurerNotice && (
        <div className={styles.noticeBox}>
          <p className={styles.noticeText}>
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
