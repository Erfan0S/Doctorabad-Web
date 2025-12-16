"use client";

import { Fragment, useEffect, useState } from "react";
import styles from "./Cha2ds2VascPage.module.scss"; // مشابه استایل صفحات قبلی
import useCha2ds2Vasc from "@/hooks/useCha2ds2Vasc";
import ResultToast from "@/components/common/ResultToast/ResultToast";

// لیست پارامترهای سوئیچی (چک‌باکس‌ها)
// همه 1 امتیاز به جز سکته مغزی که 2 امتیاز دارد
const parameters = [
  { id: 0, title: "سابقه نارسایی قلبی داره؟", points: 1 },
  { id: 1, title: "فشارخون بالا داره؟", points: 1 },
  { id: 2, title: "دیابت داره؟", points: 1 },
  { id: 3, title: "سابقه سکته مغزی داره؟", points: 2 }, // 2 امتیاز
  { id: 4, title: "سابقه بیماری‌های عروقی داره؟", points: 1 },
];

export default function Cha2ds2VascPage() {
  const [activeTab, setActiveTab] = useState<"calc" | "interpret">("calc");

  const {
    selectedIds,
    toggleParameter,
    ageOption,
    setAgeOption,
    genderOption,
    setGenderOption,
    calculate,
    toast,
  } = useCha2ds2Vasc(parameters);

  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    if (toast) {
      setToastOpen(true);
    }
  }, [toast]);

  // گزینه‌های سن
  const ageItems = [
    { id: 0, title: "کمتر از ۶۵ سال", points: 0 },
    { id: 1, title: "بین ۶۵ تا ۷۵ سال", points: 1 },
    { id: 2, title: "بالاتر از ۷۵ سال", points: 2 },
  ];

  // گزینه‌های جنسیت
  const genderItems = [
    { id: 0, title: "مرد", points: 0 },
    { id: 1, title: "زن", points: 1 },
  ];

  // داده‌های جدول تفسیر (مثال - مقادیر دقیق را طبق رفرنس خودتان تنظیم کنید)
  // تعریف داده‌ها به همراه کلاس رنگ
  const interpretationRows = [
    { score: "0 points", risk: "%0.2", color: "green" },
    { score: "1 points", risk: "%0.6", color: "green" },
    { score: "2 points", risk: "%2.2", color: "green" },
    { score: "3 points", risk: "%3.2", color: "yellow" },
    { score: "4 points", risk: "%4.8", color: "yellow" },
    { score: "5 points", risk: "%7.2", color: "yellow" },
    { score: "6 points", risk: "%9.7", color: "yellow" },
    { score: "7 points", risk: "%11.2", color: "red" },
    { score: "8 points", risk: "%10.8", color: "red" },
    { score: "9 points", risk: "%12.2", color: "red" },
  ];

  // ... در قسمت JSX جدول ...

  <tbody>
    {interpretationRows.map((row, index) => (
      <tr
        key={index}
        // اعمال کلاس رنگ از استایل‌ها
        className={`${styles.tableRow} ${styles[row.color]}`}
      >
        <td>{row.score}</td>
        <td>{row.risk}</td>
      </tr>
    ))}
  </tbody>;

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
          {/* بخش انتخاب سن */}
          <div>
            <div className={styles.sectionTitle}>سن</div>
            <div className={styles.sectionContent}>
              <div className={styles.listItems}>
                {ageItems.map((item) => (
                  <div
                    className={styles.item}
                    key={item.id}
                    onClick={() => setAgeOption(item.id)}
                  >
                    <input
                      type="radio"
                      checked={ageOption === item.id}
                      onChange={() => setAgeOption(item.id)}
                    />
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* بخش انتخاب جنسیت */}
          <div style={{ marginTop: "1rem" }}>
            <div className={styles.sectionTitle}>جنسیت</div>
            <div className={styles.sectionContent}>
              <div className={styles.listItems}>
                {genderItems.map((item) => (
                  <div
                    className={styles.item}
                    key={item.id}
                    onClick={() => setGenderOption(item.id)}
                  >
                    <input
                      type="radio"
                      checked={genderOption === item.id}
                      onChange={() => setGenderOption(item.id)}
                    />
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* پارامترهای سوئیچی */}
          <div className={styles.parameters} style={{ marginTop: "1rem" }}>
            {parameters.map((item, index) => (
              <Fragment key={item.id}>
                <div className={styles.parameterRow}>
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
            <button onClick={calculate} className={styles.calculateButton}>
              <span>محاسبه کن!</span>
            </button>
          </div>
        </>
      ) : (
        <div className={styles.interpretation}>
          <div className={styles.sectionContent}>
            <p>
              سیستم امتیازدهی CHA2DS2-VASc برای تخمین خطر سکته مغزی در بیماران
              مبتلا به فیبریلاسیون دهلیزی (AF) استفاده می‌شود.
            </p>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Adjusted Stroke Rate (%/year)</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {interpretationRows.map((row, index) => (
                    <tr
                      key={index}
                      // اعمال کلاس رنگ از استایل‌ها
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
