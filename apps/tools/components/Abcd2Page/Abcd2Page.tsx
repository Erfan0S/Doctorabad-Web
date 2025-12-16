"use client";

import { useEffect, useState } from "react";
import styles from "./Abcd2Page.module.scss"; // استایل مشابه صفحات قبلی
import useAbcd2 from "@/hooks/useAbcd2";
import ResultToast from "@/components/common/ResultToast/ResultToast";

export default function Abcd2Page() {
  const [activeTab, setActiveTab] = useState<"calc" | "interpret">("calc");

  const {
    ageOption,
    setAgeOption,
    bpOption,
    setBpOption,
    clinicalOption,
    setClinicalOption,
    durationOption,
    setDurationOption,
    diabetesOption,
    setDiabetesOption,
    calculateAbcd2,
    toast,
  } = useAbcd2();

  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    if (toast) {
      setToastOpen(true);
    }
  }, [toast]);

  // داده‌های گزینه‌ها
  // سن: 0, 1
  const ageItems = [
    { id: 0, title: "زیر ۶۰ سال" },
    { id: 1, title: "بالای ۶۰ سال" },
  ];
  // فشار خون: 1, 0 (طبق لاجیک هوک: اولی 1 امتیاز)
  const bpItems = [
    { id: 0, title: "کمتر از ۱۴۰/۹۰" },
    { id: 1, title: "بیشتر از ۱۴۰/۹۰" },
  ];
  // تابلوی بالینی: 2, 1, 0 (طبق لاجیک هوک)
  const clinicalItems = [
    { id: 0, title: "همی‌پارزی" }, // معمولاً این 2 امتیاز دارد
    { id: 1, title: "اختلال تکلم" }, // معمولاً این 1 امتیاز دارد
    { id: 2, title: "سایر علائم" },
  ];
  // مدت: 0, 1, 2
  const durationItems = [
    { id: 0, title: "کمتر از ۱۰ دقیقه" },
    { id: 1, title: "بین ۱۰ تا ۵۹ دقیقه" },
    { id: 2, title: "بالای ۶۰ دقیقه" },
  ];
  // دیابت: 0, 1
  const diabetesItems = [
    { id: 0, title: "ندارد" },
    { id: 1, title: "دارد" },
  ];

  const interpretationRows = [
    {
      score: "0-3",
      risk: "Low",
      risk2d: "%1",
      risk7d: "%1.2",
      risk90d: "%3.1",
      color: "green",
    },
    {
      score: "4-5",
      risk: "Moderate",
      risk2d: "%4.1",
      risk7d: "%5.9",
      risk90d: "%9.8",
      color: "yellow",
    },
    {
      score: "6-7",
      risk: "High",
      risk2d: "%8.1",
      risk7d: "%12",
      risk90d: "%18",
      color: "red",
    },
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
          {/* سن */}
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

          {/* فشار خون */}
          <div>
            <div className={styles.sectionTitle}>فشار خون</div>
            <div className={styles.sectionContent}>
              <div className={styles.listItems}>
                {bpItems.map((item) => (
                  <div
                    className={styles.item}
                    key={item.id}
                    onClick={() => setBpOption(item.id)}
                  >
                    <input
                      type="radio"
                      checked={bpOption === item.id}
                      onChange={() => setBpOption(item.id)}
                    />
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* تابلوی بالینی */}
          <div>
            <div className={styles.sectionTitle}>تابلوی بالینی</div>
            <div className={styles.sectionContent}>
              <div className={styles.listItems}>
                {clinicalItems.map((item) => (
                  <div
                    className={styles.item}
                    key={item.id}
                    onClick={() => setClinicalOption(item.id)}
                  >
                    <input
                      type="radio"
                      checked={clinicalOption === item.id}
                      onChange={() => setClinicalOption(item.id)}
                    />
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* مدت علائم */}
          <div>
            <div className={styles.sectionTitle}>مدت علائم</div>
            <div className={styles.sectionContent}>
              <div className={styles.listItems}>
                {durationItems.map((item) => (
                  <div
                    className={styles.item}
                    key={item.id}
                    onClick={() => setDurationOption(item.id)}
                  >
                    <input
                      type="radio"
                      checked={durationOption === item.id}
                      onChange={() => setDurationOption(item.id)}
                    />
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* دیابت */}
          <div>
            <div className={styles.sectionTitle}>دیابت</div>
            <div className={styles.sectionContent}>
              <div className={styles.listItems}>
                {diabetesItems.map((item) => (
                  <div
                    className={styles.item}
                    key={item.id}
                    onClick={() => setDiabetesOption(item.id)}
                  >
                    <input
                      type="radio"
                      checked={diabetesOption === item.id}
                      onChange={() => setDiabetesOption(item.id)}
                    />
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.calculateBar}>
            <button onClick={calculateAbcd2} className={styles.calculateButton}>
              <span>محاسبه کن!</span>
            </button>
          </div>
        </>
      ) : (
        <div className={styles.interpretation}>
          <div className={styles.sectionContent}>
            <p>
              حمله ایسکمی گذرا (TIA) به صورت بروز علائم نورولوژیک گذرا بدون
              شواهد انفارکتوس حاد تعریف می‌شود. این حالت یک عامل خطرساز شایع و
              مهم برای وقوع سکته مغزی در آینده به شمار می‌آید.
              <br /> نمره ABCD2 باید در خلال بررسی‌های اولیه تعیین گردد که
              می‌تواند در ارزیابی خطر فوری تکرار ایسکمی و سکته مغزی مفید واقع
              شود. بیمارانی که نمرات ABCD2 بالاتری دارند باید به صورت بستری
              درمان شوند، در حالی که کسانی که نمرات پایین‌تری دارند، می‌توانند
              به صورت سرپایی تحت درمان قرار گیرند.
            </p>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>امتیاز</th>
                    <th>گروه خطر</th>
                    <th>احتمال سکته در ۲ روز آتی</th>
                    <th>احتمال سکته در ۷ روز آتی</th>
                    <th>احتمال سکته در ۹۰ روز آتی</th>
                  </tr>
                </thead>
                <tbody>
                  {interpretationRows.map((row, index) => (
                    <tr
                      key={index}
                      className={`${styles.tableRow} ${styles[row.color]}`}
                    >
                      <td>{row.score}</td>
                      <td>{row.risk}</td>
                      <td>{row.risk2d}</td>
                      <td>{row.risk7d}</td>
                      <td>{row.risk90d}</td>
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
        title={toast ? `ABCD2 Score: ${toast.score}` : undefined}
        message={toast?.message}
        onClose={() => setToastOpen(false)}
      />
    </div>
  );
}
