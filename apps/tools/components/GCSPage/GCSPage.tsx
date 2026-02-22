"use client";

import { useEffect, useState } from "react";
import styles from "./GCSPage.module.scss";
import useGCS from "@/hooks/useGCS";
import ResultToast from "@/components/common/ResultToast/ResultToast";

export default function GCSPage() {
  const [activeTab, setActiveTab] = useState<"calc" | "interpret">("calc");

  const {
    selectedEye,
    setSelectedEye,
    selectedVerbal,
    setSelectedVerbal,
    selectedMotor,
    setSelectedMotor,
    calculateGCS,
    toast,
  } = useGCS();

  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    if (toast) {
      setToastOpen(true);
    }
  }, [toast]);

  const eyeItems = [
    { id: 4, title: "خود به خود چشم باز می‌شه." },           // 4 امتیاز
    { id: 3, title: "در پاسخ به صدا چشم رو باز می‌کنه." },   // 3 امتیاز
    { id: 2, title: "در پاسخ به درد چشم رو باز می‌کنه." },   // 2 امتیاز
    { id: 1, title: "چشم باز نمی‌شه." },                     // 1 امتیاز
    { id: -1, title: "اصلا قابل سنجش نیست!" },
  ];
  

  const verbalItems = [
    { id: 5, title: "آگاهه و جواب سوالات رو درست می‌ده." },        // 5 امتیاز
    { id: 4, title: "گیجه! هر چند جواب سوالات رو می‌ده." },        // 4 امتیاز
    { id: 3, title: "کلمات بی‌ربط به هم می‌گه." },                 // 3 امتیاز
    { id: 2, title: "فقط صداهای بی‌معنی از خودش درمیاره!" },       // 2 امتیاز
    { id: 1, title: "هیچ پاسخی به صدا نمیده." },                   // 1 امتیاز
    { id: -1, title: "اصلا قابل سنجش نیست!" },
  ];
  
  const motorItems = [
    { id: 6, title: "با دستور حرکت می‌کنه." },                    // 6 امتیاز
    { id: 5, title: "محل درد رو تشخیص می‌ده." },                  // 5 امتیاز
    { id: 4, title: "خودش رو از محرک دردناک دور می‌کنه." },       // 4 امتیاز
    { id: 3, title: "با درد اندام‌هاش رو خم می‌کنه." }, // 3 امتیاز
    { id: 2, title: "با درد اندام‌هاش رو باز می‌کنه." },  // 2 امتیاز
    { id: 1, title: "هیچ پاسخی به درد نمی‌ده." },                 // 1 امتیاز
    { id: -1, title: "اصلا قابل سنجش نیست!" },
  ];
  

  const interpretationRows = [
    { tone: "green", score: "13–15", status: "Minor" },
    { tone: "yellow", score: "9–12", status: "Moderate" },
    { tone: "red", score: "< 9", status: "Severe" },
  ] as const;

  return (
    <div className={styles.container}>
      <div className={styles.tabBar}>
        <button
          type="button"
          className={`${styles.tab} ${activeTab === "calc" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("calc")}
        >
          محاسبه
        </button>
        <button
          type="button"
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
          {/* پاسخ چشمی */}
          <div>
            <div className={styles.sectionTitle}>پاسخ چشمی</div>
            <div className={styles.sectionContent}>
              <div className={styles.listItems}>
                {eyeItems.map((item) => (
                  <div
                    className={styles.item}
                    key={item.id}
                    onClick={() => setSelectedEye(item.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      e.key === "Enter" && setSelectedEye(item.id)
                    }
                  >
                    <input
                      type="radio"
                      checked={selectedEye === item.id}
                      onChange={() => setSelectedEye(item.id)}
                    />
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* پاسخ کلامی */}
          <div>
            <div className={styles.sectionTitle}>پاسخ کلامی</div>
            <div className={styles.sectionContent}>
              <div className={styles.listItems}>
                {verbalItems.map((item) => (
                  <div
                    className={styles.item}
                    key={item.id}
                    onClick={() => setSelectedVerbal(item.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      e.key === "Enter" && setSelectedVerbal(item.id)
                    }
                  >
                    <input
                      type="radio"
                      checked={selectedVerbal === item.id}
                      onChange={() => setSelectedVerbal(item.id)}
                    />
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* پاسخ حرکتی */}
          <div>
            <div className={styles.sectionTitle}>پاسخ حرکتی</div>
            <div className={styles.sectionContent}>
              <div className={styles.listItems}>
                {motorItems.map((item) => (
                  <div
                    className={styles.item}
                    key={item.id}
                    onClick={() => setSelectedMotor(item.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      e.key === "Enter" && setSelectedMotor(item.id)
                    }
                  >
                    <input
                      type="radio"
                      checked={selectedMotor === item.id}
                      onChange={() => setSelectedMotor(item.id)}
                    />
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.calculateBar}>
            <button onClick={calculateGCS} className={styles.calculateButton}>
              <span>محاسبه کن!</span>
            </button>
          </div>
        </>
      ) : (
        <div className={styles.interpretation}>
          <div className={styles.sectionContent}>
            <p>
              مقیاس GCS برای ارزیابی سطح هوشیاری در آسیب‌های مغزی به کار می‌رود و
              مجموع امتیاز سه بخش چشمی، کلامی و حرکتی بین ۳ تا ۱۵ است.
            </p>
            <p>
              بر اساس امتیاز نهایی، شدت آسیب به سه دستهٔ خفیف، متوسط و شدید
              تقسیم می‌شود که در جدول زیر نشان داده شده است.
            </p>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>injury classification</th>
                    <th>GCS</th>
                  </tr>
                </thead>
                <tbody>
                  {interpretationRows.map((row) => (
                    <tr
                      key={row.tone}
                      className={`${styles.tableRow} ${styles[row.tone]}`}
                    >
                      <td>{row.status}</td>
                      <td>{row.score}</td>
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
        title={
          toast
            ? toast.score !== null
              ? `GCS = ${toast.score}`
              : ""
            : undefined
        }
        message={toast?.message}
        onClose={() => setToastOpen(false)}
      />
    </div>
  );
}
