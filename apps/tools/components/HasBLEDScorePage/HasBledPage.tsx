"use client";

import { Fragment, useState } from "react";
import styles from "./HasBledPage.module.scss"; // فایل استایل مشابه صفحات قبل
import useHasBled from "@/hooks/useHasBled";

// لیست پارامترها طبق تصویر (همه ۱ امتیاز دارند)
const parameters = [
  { id: 0, title: "فشار خون بالا داره؟", points: 1 },
  { id: 1, title: "مشکل کبدی داره؟", points: 1 },
  { id: 2, title: "مشکل کلیوی داره؟", points: 1 },
  { id: 3, title: "سابقه سکته داره؟", points: 1 },
  { id: 4, title: "سابقه خون‌ریزی قبلی داره؟", points: 1 },
  { id: 5, title: "INR اش کمتر از ۶۰ درصده؟", points: 1 }, // Labile INR
  { id: 6, title: "سن اش بالاتر از ۶۵ ساله؟", points: 1 },
  { id: 7, title: "الکل مصرف میکنه؟", points: 1 },
  { id: 8, title: "داروهای ضد انعقاد مصرف می‌کنه؟", points: 1 },
];

export default function HasBledPage() {
  const [activeTab, setActiveTab] = useState<"calc" | "interpret">("calc");

  const { selectedIds, toggleParameter, calculateHasBled, toast } =
    useHasBled(parameters);

  // داده‌های جدول تفسیر طبق تصویر دوم
  const interpretationRows = [
    { score: "0 point", risk: "Relatively Low Risk", color: "green" },
    { score: "1 point", risk: "Low Risk", color: "green" },
    { score: "2 points", risk: "Moderate Risk", color: "yellow" },
    { score: "3 points", risk: "High Risk", color: "yellow" },
    { score: "4 points", risk: "High Risk", color: "yellow" },
    { score: "5 points", risk: "Very High Risk", color: "red" },
    { score: "6 points", risk: "Very High Risk", color: "red" },
    { score: "7 points", risk: "Very High Risk", color: "red" },
    { score: "8 points", risk: "Very High Risk", color: "red" },
    { score: "9 points", risk: "Very High Risk", color: "red" },
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
                <div className={styles.parameterRow}>
                  {/* دکمه سوئیچ سمت چپ و متن سمت راست (طبق تصویر) */}
                    <span className={styles.parameterText}>{item.title}</span>
                  <label className={styles.switch}>
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
              onClick={calculateHasBled}
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
              بیمارانی که به شکل طولانی مدت از داروهای ضد انعقاد استفاده
              می‌کنند، باید همواره از جهت خونریزی‌های خود بخودی پایش شوند:
            </p>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Risk of Bleeding</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {interpretationRows.map((row, index) => (
                    <tr
                      key={index}
                      className={`${styles.tableRow} ${styles[row.color]}`}
                    >
                      <td>{row.risk}</td>
                      <td className={styles.scoreTableText}>{row.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {toast ? (
        <div className={`${styles.toast} ${styles[toast.tone]}`}>
          <div className={styles.toastTitle}>Has-Bled Score: {toast.score}</div>
          <div className={styles.toastText}>{toast.message}</div>
        </div>
      ) : null}
    </div>
  );
}
