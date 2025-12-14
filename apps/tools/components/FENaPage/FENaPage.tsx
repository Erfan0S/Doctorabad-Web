"use client";

import { useState } from "react";
import { useFENa } from "@/hooks/useFENa";
import styles from "./FENaPage.module.scss";

export default function FENaPage() {
  const [activeTab, setActiveTab] = useState<"calc" | "interpret">("calc");

  const {
    serumNa,
    setSerumNa,
    serumCr,
    setSerumCr,
    urineNa,
    setUrineNa,
    urineCr,
    setUrineCr,
    toast,
    calculate,
  } = useFENa();

  // داده‌های جدول تفسیر
  const interpretationData = [
    { type: "Pre-Renal", fena: "< 1%", una: "< 20" },
    { type: "Intrinsic", fena: "1% - 3%", una: "> 40" },
    { type: "Post-Renal", fena: "> 4%", una: "> 40" },
  ];

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
          <div className={styles.inputGroup}>
            <div className={styles.inputLabel}>سدیم سرم </div>
            <input
              type="number"
              step="0.1"
              className={styles.input}
              value={serumNa}
              onChange={(e) => setSerumNa(e.target.value)}
              placeholder="mEq/L"
            />
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.inputLabel}>کراتینین سرم </div>
            <input
              type="number"
              step="0.1"
              className={styles.input}
              value={serumCr}
              onChange={(e) => setSerumCr(e.target.value)}
              placeholder="mg/dL"
            />
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.inputLabel}>سدیم ادرار </div>
            <input
              type="number"
              step="0.1"
              className={styles.input}
              value={urineNa}
              onChange={(e) => setUrineNa(e.target.value)}
              placeholder="mEq/L"
            />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputLabel}>کراتینین ادرار </div>
            <input
              type="number"
              step="0.1"
              className={styles.input}
              value={urineCr}
              onChange={(e) => setUrineCr(e.target.value)}
              placeholder="mg/dL"
            />
          </div>

          <div className={styles.calculateBar}>
            <button className={styles.calculateButton} onClick={calculate}>
              محاسبه کن!
            </button>
          </div>
        </>
      ) : (
        <div className={styles.interpretation}>
          <div className={styles.sectionContent}>
            <p>
              به جهت تشخیص نوع نارسایی کلیوی از کسر دفعی سدیم استفاده می‌شود:
            </p>

            <div className={styles.formula}>
              Fractional Excertion of Sodium (FENa), (%) = 100 × (SCr × UNa) /
              (SNa × UCr)
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>UNa</th>
                    <th>FENa</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {interpretationData.map((item, index) => (
                    <tr
                      key={index}
                      className={styles.tableRow}
                      style={{ color: "#333" }}
                    >
                      <td className={styles.cell} style={{ direction: "ltr" }}>
                        {item.una}
                      </td>
                      <td className={styles.cell} style={{ direction: "ltr" }}>
                        {item.fena}
                      </td>
                      <td className={styles.cell}>{item.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className={`${styles.toast} ${styles[toast.tone]}`}>
          {toast.value ? (
            <>
              <div className={styles.toastTitle}>
                <span>FENa: {toast.value}</span>
              </div>
              {/* نمایش نوع در خط دوم */}
              <div className={styles.toastText} style={{ marginTop: "4px" }}>
                {toast.message}
              </div>
            </>
          ) : (
            <div className={styles.toastTitle}>{toast.message}</div>
          )}
        </div>
      )}
    </div>
  );
}
