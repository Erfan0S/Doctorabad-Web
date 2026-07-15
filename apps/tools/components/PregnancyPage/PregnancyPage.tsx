"use client";

import { useEffect, useState } from "react";
import styles from "./toolStyles";
import usePregnancy from "@/hooks/usePregnancy";
import DownArrow from "@/assets/svg/downArrow"; // ایمپورت آیکون
import ResultToast from "@/components/common/ResultToast/ResultToast";

export default function PregnancyPage() {
  const [activeTab, setActiveTab] = useState<"calc" | "interpret">("calc");

  const {
    mode,
    setMode,
    day,
    setDay,
    monthIndex,
    setMonthIndex,
    year,
    setYear,
    usgWeeks,
    setUsgWeeks,
    usgDays,
    setUsgDays,
    calculate,
    toast,
    todayDate,
    options,
  } = usePregnancy();

  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    if (toast) {
      setToastOpen(true);
    }
  }, [toast]);

  const interpretationData = [
    { age: "8 weeks", crl: "1.6 cm" },
    { age: "9 weeks", crl: "2.3 cm" },
    { age: "10 weeks", crl: "3.1 cm" },
    { age: "11 weeks", crl: "4.1 cm" },
    { age: "12 weeks", crl: "5.4 cm" },
    { age: "13 weeks", crl: "7.4 cm" },
    { age: "14 weeks", crl: "8.7 cm" },
    { age: "15 weeks", crl: "10.1 cm" },
    { age: "16 weeks", crl: "11.6 cm" },
    { age: "17 weeks", crl: "13 cm" },
    { age: "18 weeks", crl: "14.2 cm" },
    { age: "19 weeks", crl: "15.3 cm" },
    { age: "20 weeks", crl: "16.4 cm" },
  ];

  return (
    <div className={styles.container}>
      {/* تب‌ها */}
      <div className={styles.tabBar}>
        <button
          className={`${styles.tab} ${activeTab === "calc" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("calc")}
        >
          محاسبه
        </button>
        <button
          className={`${styles.tab} ${activeTab === "interpret" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("interpret")}
        >
          تفسیر
        </button>
        <div
          className={`${styles.tabIndicator} ${
            activeTab === "calc" ? styles.indicatorRight : styles.indicatorLeft
          }`}
        />
      </div>

      {activeTab === "calc" ? (
        <>
          <div className={styles.todayDate}>تاریخ امروز: {todayDate}</div>

          {/* انتخابگر مود */}
          {/* باکس انتخاب نوع محاسبه */}
          <div style={{ marginTop: "1rem" }}>
            <div className={styles.sectionTitle}>نوع محاسبه</div>
            <div className={styles.sectionContent}>
              <div className={styles.listItems}>
                {/* گزینه LMP */}
                <div className={styles.item} onClick={() => setMode("lmp")}>
                  <input
                    type="radio"
                    checked={mode === "lmp"}
                    onChange={() => setMode("lmp")}
                  />
                  <span>بر اساس LMP</span>
                </div>

                {/* گزینه سونوگرافی */}
                <div className={styles.item} onClick={() => setMode("usg")}>
                  <input
                    type="radio"
                    checked={mode === "usg"}
                    onChange={() => setMode("usg")}
                  />
                  <span>بر اساس سونوگرافی</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.datesContainer}>


          {/* ورودی تاریخ (LMP یا تاریخ سونو) */}
          <div className={styles.inputLabel}>
            {mode === "lmp"
              ? "اولین روز آخرین قاعدگی (LMP):"
              : "تاریخ انجام سونوگرافی:"}
          </div>

          <div className={styles.pickerRow}>
            {/* روز */}
            <div className={styles.pickerGroup}>
              <select
                className={styles.selectInput}
                value={day}
                onChange={(e) => setDay(e.target.value)}
                >
                <option value="" disabled>
                  روز
                </option>
                {options.days.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <div className={styles.selectIcon}>
                <DownArrow />
              </div>
            </div>

            {/* ماه */}
            <div className={styles.pickerGroup}>
              <select
                className={styles.selectInput}
                value={monthIndex}
                onChange={(e) => setMonthIndex(e.target.value)}
                >
                <option value="" disabled>
                  ماه
                </option>
                {options.months.map((m, idx) => (
                    <option key={idx} value={idx}>
                    {m}
                  </option>
                ))}
              </select>
              <div className={styles.selectIcon}>
                <DownArrow />
              </div>
            </div>
            {/* سال */}
            <div className={styles.pickerGroup}>
              <select
                className={styles.selectInput}
                value={year}
                onChange={(e) => setYear(e.target.value)}
                >
                <option value="" disabled>
                  سال
                </option>
                {options.years.map((y) => (
                    <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <div className={styles.selectIcon}>
                <DownArrow />
              </div>
            </div>
          </div>
          {/* ورودی سن جنین (مخصوص سونوگرافی) */}
          {mode === "usg" && (
            <>
              <div className={styles.inputLabel}>سن جنین در سونوگرافی:</div>
              <div className={styles.pickerRow}>
                {/* هفته */}
                <div className={styles.pickerGroup}>
                  <select
                    className={styles.selectInput}
                    value={usgWeeks}
                    onChange={(e) => setUsgWeeks(e.target.value)}
                    >
                    <option value="" disabled>
                      هفته
                    </option>
                    {options.gaWeeks.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                  <div className={styles.selectIcon}>
                    <DownArrow />
                  </div>
                </div>

                {/* روز */}
                <div className={styles.pickerGroup}>
                  <select
                    className={styles.selectInput}
                    value={usgDays}
                    onChange={(e) => setUsgDays(e.target.value)}
                    >
                    <option value="" disabled>
                      روز
                    </option>
                    {options.gaDays.map((d) => (
                        <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <div className={styles.selectIcon}>
                    <DownArrow />
                  </div>
                </div>
              </div>
            </>
          )}
          </div>

          <div className={styles.calculateBar}>
            <button onClick={calculate} className={styles.calculateButton}>
              محاسبه کن!
            </button>
          </div>
        </>
      ) : (
<div className={styles.interpretation}>
  <div className={styles.sectionContent}>
    <p>
      سن ایجاد نطفه همیشه حدود ۱۴ روز کمتر از سن بارداری خواهد بود. طول
      متوسط یک بارداری کامل، حدود ۲۸۰ روز و یا ۴۰ هفته است که از اولین روز
      آخرین سیکل قاعدگی شروع می‌شود. عمر متوسط یک جنین کامل از زمان لقاح،
      حدود ۲۶۶ روز و یا ۳۸ هفته است.
    </p>

    <p>
      برای تعیین سن بارداری (Gestational Age) و همچنین زمان تخمینی زایمان
      (EDD یا EDC) چندین روش وجود دارد:
      <br />
      ۱- محاسبه بر اساس اولین روز آخرین قاعدگی (LMP)
      <br />
      ۲- محاسبه بر اساس سن درج شده در سونوگرافی‌های انجام شده
      <br />
      ۳- محاسبه بر اساس میزان هورمون HCG
      <br />
      ۴- محاسبه بر اساس اندازه‌گیری ارتفاع و ضخامت رحم
      <br />
      ۵- محاسبه بر اساس CRL (طول فرق سر تا دنبالچه) در سه ماهه اول بارداری
      طبق جدول زیر:
    </p>

    {/* جدول بر اساس تمپلیت */}
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>CRL (Crown Rump Length)</th>
            <th>Gestational Age</th>
          </tr>
        </thead>
        <tbody>
          {interpretationData.map((item, index) => (
            <tr key={index} className={styles.tableRow} style={{color: '#333'}}>
              <td className={styles.cell}>{item.crl}</td>
              <td className={styles.cell}>{item.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
      )}

      <ResultToast
        open={toastOpen && !!toast}
        tone={toast?.tone}
        title={toast?.title}
        message={toast?.message}
        onClose={() => setToastOpen(false)}
      />
    </div>
  );
}
