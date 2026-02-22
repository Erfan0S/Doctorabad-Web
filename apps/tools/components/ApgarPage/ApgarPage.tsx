"use client";

import { useEffect, useState } from "react";
import styles from "./ApgarPage.module.scss";
import useApgar from "@/hooks/useApgar";
import ResultToast from "@/components/common/ResultToast/ResultToast";

export default function ApgarPage() {
  const [activeTab, setActiveTab] = useState<"calc" | "interpret">("calc");

  const {
    selectedHeartRate,
    setSelectedHeartRate,
    selectedBreathing,
    setSelectedBreathing,
    selectedMuscle,
    setSelectedMuscle,
    selectedReflex,
    setSelectedReflex,
    selectedSkinColor,
    setSelectedSkinColor,
    calculateApgar,
    toast,
  } = useApgar();

  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    if (toast) {
      setToastOpen(true);
    }
  }, [toast]);

  const heartRateItems = [
    { id: 1, title: "نبض نداره!", points: "0" },
    { id: 2, title: "زیر ۱۰۰ بار در دقیقه", points: "1" },
    { id: 3, title: "بالای ۱۰۰ بار در دقیقه", points: "2" },
  ];
  const breathingItems = [
    { id: 1, title: "تنفس نداره!", points: "0" },
    { id: 2, title: "گریه ضعیف داره!", points: "1" },
    { id: 3, title: "گریه شدید داره!", points: "2" },
  ];
  const muscleItems = [
    { id: 1, title: "نداره!", points: "0" },
    { id: 2, title: "کمی فلکسیون در اندام‌ها داره!", points: "1" },
    { id: 3, title: "اندام‌ها به خوبی فلکس میشن!", points: "2" },
  ];
  const reflexItems = [
    { id: 1, title: "نداره!", points: "0" },
    { id: 2, title: "کمی حرکت می‌کنه.", points: "1" },
    { id: 3, title: "گریه می‌کنه یا از محرک دور میشه!", points: "2" },
  ];
  const skinColorItems = [
    { id: 1, title: "آبی!", points: "0" },
    { id: 2, title: "بدن صورتی + اندام‌ها آبی", points: "1" },
    { id: 3, title: "کلا صورتی!", points: "2" },
  ];

  const interpretationRows = [
    { tone: "green", score: "۷ - ۱۰", status: "نرمال" },
    {
      tone: "yellow",
      score: "۴ - ۶",
      status:
        "نیازمند مراقبت از نزدیک؛ ممکن است رو به بهبودی برود و یا یک علت پاتولوژیک در کار باشد.",
    },
    {
      tone: "red",
      score: "۰ - ۳",
      status: "بیانگر یک علت پاتولوژیک یا ارست قبلی تنفسی است.",
    },
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
          <div>
            <div className={styles.sectionTitle}>ضربان قلب</div>
            <div className={styles.sectionContent}>
              <div className={styles.listItems}>
                {heartRateItems.map((item) => (
                  <div
                    className={styles.item}
                    key={item.id}
                    onClick={() => setSelectedHeartRate(item.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      e.key === "Enter" && setSelectedHeartRate(item.id)
                    }
                  >
                    <input
                      type="radio"
                      checked={selectedHeartRate === item.id}
                      onChange={() => setSelectedHeartRate(item.id)}
                    />
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className={styles.sectionTitle}> وضعیت تنفس</div>
            <div className={styles.sectionContent}>
              {" "}
              <div className={styles.listItems}>
                {breathingItems.map((item) => (
                  <div
                    className={styles.item}
                    key={item.id}
                    onClick={() => setSelectedBreathing(item.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      e.key === "Enter" && setSelectedBreathing(item.id)
                    }
                  >
                    <input
                      type="radio"
                      checked={selectedBreathing === item.id}
                      onChange={() => setSelectedBreathing(item.id)}
                    />
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className={styles.sectionTitle}>تون عضلانی</div>
            <div className={styles.sectionContent}>
              {" "}
              <div className={styles.listItems}>
                {muscleItems.map((item) => (
                  <div
                    className={styles.item}
                    key={item.id}
                    onClick={() => setSelectedMuscle(item.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      e.key === "Enter" && setSelectedMuscle(item.id)
                    }
                  >
                    <input
                      type="radio"
                      checked={selectedMuscle === item.id}
                      onChange={() => setSelectedMuscle(item.id)}
                    />
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className={styles.sectionTitle}>تحریک رفلکس</div>
            <div className={styles.sectionContent}>
              {" "}
              <div className={styles.listItems}>
                {reflexItems.map((item) => (
                  <div
                    className={styles.item}
                    key={item.id}
                    onClick={() => setSelectedReflex(item.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      e.key === "Enter" && setSelectedReflex(item.id)
                    }
                  >
                    <input
                      type="radio"
                      checked={selectedReflex === item.id}
                      onChange={() => setSelectedReflex(item.id)}
                    />
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className={styles.sectionTitle}>رنگ بدن</div>
            <div className={styles.sectionContent}>
              {" "}
              <div className={styles.listItems}>
                {skinColorItems.map((item) => (
                  <div
                    className={styles.item}
                    key={item.id}
                    onClick={() => setSelectedSkinColor(item.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      e.key === "Enter" && setSelectedSkinColor(item.id)
                    }
                  >
                    <input
                      type="radio"
                      checked={selectedSkinColor === item.id}
                      onChange={() => setSelectedSkinColor(item.id)}
                    />
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.calculateBar}>
            <button onClick={calculateApgar} className={styles.calculateButton}>
              <span>محاسبه کن!</span>
            </button>
          </div>
        </>
      ) : (
        <div className={styles.interpretation}>
          <div className={styles.sectionContent}>
            <p>
              آپگار یک سیستم امتیازدهی سریع بر اساس پاسخ‌های فیزیولوژیک برای
              بررسی این است که آیا نوزاد به بررسی احتیاج دارد یا خیر؛ در لحظات
              ابتدایی پس از ولادت، این پنج پارامتر فیزیولوژیک توسط آزمونگر
              سنجیده شده و بر اساس جدول زیر نمره دهی می‌شود.
            </p>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>نمره آپگار</th>
                    <th>وضعیت</th>
                  </tr>
                </thead>
                <tbody>
                  {interpretationRows.map((row) => (
                    <tr
                      key={row.tone}
                      className={`${styles.tableRow} ${styles[row.tone]}`}
                    >
                      <td>{row.score}</td>
                      <td>{row.status}</td>
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
        title={toast ? `APGAR = ${toast.score}` : undefined}
        message={toast?.message}
        onClose={() => setToastOpen(false)}
      />
    </div>
  );
}
