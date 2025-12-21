import React, { useMemo, useState } from "react";
import styles from "./SelectInfo.module.scss";
import DownArrow from "@/assets/svg/downArrow";
import moment from "moment-jalaali";
import {
  useInsuranceFields,
  useDamageHistory,
  useResidencyStatus,
  useLastInsurer,
  useGrades,
} from "@/hooks/useInsuranceFind";

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
  const { data: fields = [] } = useInsuranceFields();
  const { data: history = [] } = useDamageHistory();
  const { data: residency = [] } = useResidencyStatus();
  const { data: insurers = [] } = useLastInsurer();

  const [selectedFieldId, setSelectedFieldId] = useState<string>("");
  const fieldIds = selectedFieldId ? [Number(selectedFieldId)] : [];
  const { data: grades = [] } = useGrades(fieldIds);

  const [selectedResidencyId, setSelectedResidencyId] = useState<string>("");
  const [selectedHistoryId, setSelectedHistoryId] = useState<string>("");
  const [selectedInsurerId, setSelectedInsurerId] = useState<string>("");
  const [selectedGradeId, setSelectedGradeId] = useState<string>("");

  const [expiryDateIso, setExpiryDateIso] = useState<string>("");
  const [showCalendar, setShowCalendar] = useState(false);

  const selectedHistoryItem = useMemo(
    () => history.find((h) => String(h.id) === selectedHistoryId),
    [history, selectedHistoryId]
  );

  // اگر id=1 (صدور اولیه) / چیزی انتخاب نشده، بیمه‌گر قبلی و تاریخ را نشان نده
  const showInsurerAndExpiry =
    selectedHistoryId && selectedHistoryItem?.id !== 1;

  const isGradeEnabled = Boolean(selectedFieldId);

  const expiryDateJalali = expiryDateIso
    ? moment(expiryDateIso, "YYYY-MM-DD").format("jYYYY/jMM/jDD")
    : "";

  const handleSelectExpiry = (iso: string) => {
    setExpiryDateIso(iso);
    setShowCalendar(false);
    onChangeEndDate?.(iso);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputGrid}>
        {/* 1. رشته */}
        <div className={styles.pickerGroup}>
          <select
            className={styles.selectInput}
            value={selectedFieldId}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedFieldId(value);
              setSelectedGradeId("");
              const ids = value ? [Number(value)] : [];
              onChangeFields?.(ids);
              onChangeGrades?.([]); // ریست گریدها
            }}
          >
            <option value="" disabled>
              رشته
            </option>
            {fields.map((f) => (
              <option key={f.id} value={f.id}>
                {f.title}
              </option>
            ))}
          </select>
          <div className={styles.selectIcon}>
            <DownArrow />
          </div>
        </div>

        {/* 2. تخصص (گرید) */}
        <div
          className={`${styles.pickerGroup} ${
            !isGradeEnabled ? styles.disabled : ""
          }`}
        >
          <select
            className={styles.selectInput}
            value={selectedGradeId}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedGradeId(value);
              const ids = value ? [Number(value)] : [];
              onChangeGrades?.(ids);
            }}
            disabled={!isGradeEnabled}
          >
            <option value="" disabled>
              تخصص
            </option>
            {grades.map((g) => (
              <option key={g.id} value={g.id}>
                {g.title}
              </option>
            ))}
          </select>
          <div className={styles.selectIcon}>
            <DownArrow />
          </div>
        </div>

        {/* 3. وضعیت */}
        <div className={styles.pickerGroup}>
          <select
            className={styles.selectInput}
            value={selectedResidencyId}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedResidencyId(value);
              onChangeResidency?.(value ? Number(value) : null);
            }}
          >
            <option value="" disabled>
              وضعیت
            </option>
            {residency.map((r) => (
              <option key={r.id} value={r.id}>
                {r.title}
              </option>
            ))}
          </select>
          <div className={styles.selectIcon}>
            <DownArrow />
          </div>
        </div>

        {/* 4. سابقه خسارت */}
        <div className={styles.pickerGroup}>
          <select
            className={styles.selectInput}
            value={selectedHistoryId}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedHistoryId(value);
              onChangeDamageHistory?.(value ? Number(value) : null);
            }}
          >
            <option value="" disabled>
              سابقه خسارت
            </option>
            {history.map((h) => (
              <option key={h.id} value={h.id}>
                {h.title}
              </option>
            ))}
          </select>
          <div className={styles.selectIcon}>
            <DownArrow />
          </div>
        </div>

        {/* 5 و 6. بیمه‌گر قبلی + اتمام بیمه‌نامه (شرطی) */}
        {showInsurerAndExpiry && (
          <>
            {/* 5. بیمه‌گر قبلی */}
            <div className={styles.pickerGroup}>
              <select
                className={styles.selectInput}
                value={selectedInsurerId}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedInsurerId(value);
                  onChangeLastInsurance?.(value ? Number(value) : null);
                }}
              >
                <option value="" disabled>
                  بیمه‌گر قبلی
                </option>
                {insurers.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.title}
                  </option>
                ))}
              </select>
              <div className={styles.selectIcon}>
                <DownArrow />
              </div>
            </div>

            {/* 6. اتمام بیمه‌نامه با پاپ‌آپ کلندر */}
            <div className={styles.pickerGroup}>
              <div
                className={styles.selectInput}
                onClick={() => setShowCalendar((prev) => !prev)}
              >
                {expiryDateJalali || "اتمام بیمه‌نامه"}
              </div>

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
