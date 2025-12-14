"use client";

import { useState } from "react";
import { useMaintenanceFluids } from "@/hooks/useMaintenanceFluids";
import styles from "./MaintenanceFluidsPage.module.scss"; // استایل مشابه صفحات قبل

export default function MaintenanceFluidsPage() {
  const [activeTab, setActiveTab] = useState<"calc" | "interpret">("calc");

  const { weight, setWeight, toast, calculate } = useMaintenanceFluids();

  // داده‌های جدول راهنما طبق عکس
  const interpretationData = [
    { weightRange: "For 0-10 kg", fluidRate: "+ 4 mL/kg/hr" },
    { weightRange: "For 10-20 kg", fluidRate: "+ 2 mL/kg/hr" },
    { weightRange: "For > 20 kg", fluidRate: "+ 1 mL/kg/hr" },
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
          <div className={styles.inputGroup}>
            <div className={styles.inputLabel}>وزن</div>
            <input
              type="number"
              step="1"
              className={styles.input}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="کیلوگرم"
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
              برای محاسبه مقدار و سرعت سرم‌تراپی در فرد دهیدراته، بر اساس وزن
              وی از فرمول‌های زیر استفاده می‌شود:
            </p>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Maintenance fluids</th>
                    <th>Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {interpretationData.map((item, index) => (
                    <tr key={index} className={styles.tableRow} style={{color: '#333'}}>
                      <td style={{ direction: "ltr" }}>{item.fluidRate}</td>
                      <td style={{ direction: "ltr" }}>{item.weightRange}</td>
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
                <span>Result: {toast.value}</span>
              </div>
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
