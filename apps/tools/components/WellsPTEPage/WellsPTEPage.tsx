"use client";

import { Fragment, useEffect, useState } from "react";
import styles from "./toolStyles"; // مشابه استایل صفحات قبلی
import useWellsPte from "@/hooks/useWellsPte";
import ResultToast from "@/components/common/ResultToast/ResultToast";

// لیست پارامترها با امتیازدهی خاص
// دو تای اول: 1 امتیاز
// دو تای آخر: 3 امتیاز
// بقیه: 1.5 امتیاز
const parameters = [
  { id: 0, title: "طی ۶ ماه اخیر سرطان فعال داشته؟", points: 1 },
  { id: 1, title: "هموپتزی داره؟", points: 1 },
  { id: 2, title: "سابقه DVT یا PTE داره؟", points: 1.5 },
  { id: 3, title: "جراحی ماژور تو ۴ هفته گذشته داشته و یا بیشتر از ۳ روز تو بستر مونده؟", points: 1.5 },
  { id: 4, title: "ضربان قلبش بیشتر از ۱۰۰ تاست؟", points: 1.5 },
  { id: 5, title: "آیا علائم DVT داره؟", points: 3 },
  { id: 6, title: "احتمال تشخیص‌های دیگه از آمبولی ریوی کمتره؟", points: 3 },
];

export default function WellsPtePage() {
  const [activeTab, setActiveTab] = useState<"calc" | "interpret">("calc");

  const { selectedIds, toggleParameter, calculateWells, toast } =
    useWellsPte(parameters);

  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    if (toast) {
      setToastOpen(true);
    }
  }, [toast]);

  // داده‌های جدول تفسیر طبق تصویر دوم
  const interpretationRows = [
    { score: "Score < 2", risk: "Low probability", color: "green" },
    { score: "2 <= Score <= 6", risk: "Moderate probability", color: "yellow" },
    { score: "6 < Score", risk: "High probability", color: "red" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.tabBar}>
        <button
          type="button"
          className={`${styles.tab} ${
            activeTab === "calc" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("calc")}
        >
          محاسبه
        </button>
        <button
          type="button"
          className={`${styles.tab} ${
            activeTab === "interpret" ? styles.activeTab : ""
          }`}
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
          <div className={styles.parameters}>
            {parameters.map((item, index) => (
              <Fragment key={item.id}>
                <div
                  className={styles.parameterRow}
                  onClick={() => toggleParameter(item.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && toggleParameter(item.id)
                  }
                >
                    <span className={styles.parameterText}>{item.title}</span>
                  <label
                    className={styles.switch}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => toggleParameter(item.id)}
                    />
                    <span className={styles.slider} />
                  </label>
                </div>

              </Fragment>
            ))}
          </div>

          <div className={styles.calculateBar}>
            <button
              onClick={calculateWells}
              className={styles.calculateButton}
            >
              <span>محاسبه کن!</span>
            </button>
          </div>
        </>
      ) : (
        <div className={styles.interpretation}>
          <div className={styles.sectionContent}>
            <p>
              معیار ولز از جمله معیارهایی است که جهت تعیین ریسک آمبولی ریه در
              موارد اورژانس استفاده می‌شود.
              <br />
              بر اساس این معیار بیماران به سه دسته ریسک پایین، متوسط و بالا تقسیم
              می‌شوند و تشخیص قطعی در این بیماران بر اساس این ریسک است.
            </p>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Risk of PTE</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {interpretationRows.map((row, index) => (
                    <tr
                      key={index}
                      className={`${styles.tableRow} ${styles[row.color]}`}
                    >
                      <td>{row.risk}</td>
                      <td style={{direction: 'ltr'}}>{row.score}</td>
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
        title={toast ? `Result: ${toast.score}` : undefined}
        message={toast?.message}
        onClose={() => setToastOpen(false)}
      />
    </div>
  );
}
