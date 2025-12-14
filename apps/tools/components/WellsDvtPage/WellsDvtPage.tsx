"use client";

import { Fragment, useState } from "react";
import styles from "./WellsDvtPage.module.scss"; // مشابه استایل صفحات قبلی
import useWellsDvt from "@/hooks/useWellsDvt";

// لیست پارامترها با امتیازدهی خاص
// همه 1 امتیاز به جز آخری که -2 امتیاز دارد
const parameters = [
  { id: 0, title: "جراحی ماژور تو ۳ ماه گذشته داشته و یا بیشتر از ۳ روز تو بستر مونده؟", points: 1 },
  { id: 1, title: "فلج یا گچ‌گرفتن داشته؟", points: 1 },
  { id: 2, title: "طی ۶ ماه اخیر سرطان فعال داشته؟", points: 1 },
  { id: 3, title: "تورم ساق پا داره؟", points: 1 },
  { id: 4, title: "تورم تمام پا داره؟", points: 1 },
  { id: 5, title: "سیاهرگ‌های جانبی غیرواریسی داره؟", points: 1 },
  { id: 6, title: "در مسیر سیاهرگ‌ها تندرنس داره؟", points: 1 },
  { id: 7, title: "ادم گوده‌گذار داره؟", points: 1 },
  { id: 8, title: "سابقه DVT قبلی داره؟", points: 1 },
  { id: 9, title: "تشخیص قوی دیگه‌ای براش مطرحه؟", points: -2 }, // -2 امتیاز
];

export default function WellsDvtPage() {
  const [activeTab, setActiveTab] = useState<"calc" | "interpret">("calc");

  const { selectedIds, toggleParameter, calculateWells, toast } =
    useWellsDvt(parameters);

  // داده‌های جدول تفسیر طبق تصویر دوم
  const interpretationRows = [
    { score: "-2-0 points", risk: "Low probability", color: "green" },
    { score: "1-2 points", risk: "Moderate probability", color: "yellow" },
    { score: "3-9 points", risk: "High probability", color: "red" },
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
                  <div>

                    <span className={styles.parameterText}>{item.title}</span>
                    {item.id === 3 ? <><br/><span className={styles.subText}>(بیش از ۳ سانتی‌متر افزایش قطر ۱۰ سانتی‌متر پاین‌تر از توبروزیته تیبیا نسبت به پای مقابل)</span></> : null}
                  </div>
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
                    <th>Risk of DVT</th>
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
                      <td style={{direction: 'ltr'}}>{row.score}</td>
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
          <div className={styles.toastTitle}>Wells Score: {toast.score}</div>
          <div className={styles.toastText}>{toast.message}</div>
        </div>
      ) : null}
    </div>
  );
}
