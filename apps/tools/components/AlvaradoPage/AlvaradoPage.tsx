"use client";

import { Fragment, useEffect, useState } from "react";
import styles from "./toolStyles";
import useAlvarado from "@/hooks/useAlvarado";
import ResultToast from "@/components/common/ResultToast/ResultToast";

const parameters = [
  { id: 0, title: "شیفت درد به RLQ دارد؟", points: 1 },
  { id: 1, title: "تهوع، استفراغ دارد؟", points: 1 },
  { id: 2, title: "بی‌اشتهایی دارد؟", points: 1 },
  { id: 3, title: "تندرنس RLQ دارد؟", points: 2 },
  { id: 4, title: "ریباند تندرنس RLQ دارد؟", points: 1 },
  { id: 5, title: "تب دارد؟", points: 1 },
  { id: 6, title: "لکوسیتوز دارد؟", points: 2 },
  { id: 7, title: "شیفت به چپ نوتروفیل دارد؟", points: 1 },
];

export default function AlvardoPage() {
  const [activeTab, setActiveTab] = useState<"calc" | "interpret">("calc");

  const { selectedIds, toggleParameter, calculateAlvarado, toast, totalScore } =
    useAlvarado(parameters);

  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    if (toast) {
      setToastOpen(true);
    }
  }, [toast]);

  const interpretationRows = [
    { tone: "green", score: "۱ - ۴", status: "کم" },
    {
      tone: "yellow",
      score: "۵ - ۷",
      status:
        "متوسط",
    },
    {
      tone: "red",
      score: "۸ - ۱۰",
      status: "زیاد",
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
                {(index + 1) % 3 === 0 && index !== parameters.length - 1 && (
                  <div className={styles.separator} />
                )}
              </Fragment>
            ))}
          </div>

          <div className={styles.calculateBar}>
            <button
              onClick={calculateAlvarado}
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
              معیار آلوارادو یک سیستم امتیازدهی بالینی است که برای تشخیص
              آپاندیسیت حاد استفاده می‌شود. این مقیاس بر اساس نشانه‌ها (سه مورد اول)،
              علائم (سه مورد بعدی) و یافته‌های آزمایشگاهی (دو مورد آخر) است که در
              ،رویکرد بیمار مبتلا به درد شکم که به تشخیص آپاندیسیت حاد مشکوک است
              استفاده می‌شود. امتیاز ۴ و کمتر به معنی آپاندیسیت کم خطر، بین ۵ تا
              ۷ با خطر متوسط و پس از ۸ بیمار وارد گروه پر خطر شده و ملاکی برای
              انتقال بیمار به اتاق عمل در نظر گرفته می‌شود
            </p>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>امتیاز</th>
                    <th>گروه خطر</th>
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
        title={toast ? `Alvarado = ${toast.score}` : undefined}
        message={toast?.message}
        onClose={() => setToastOpen(false)}
      />
    </div>
  );
}
