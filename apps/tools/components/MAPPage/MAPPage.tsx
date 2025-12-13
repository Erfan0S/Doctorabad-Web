"use client";

import { useState } from "react";
import { useMAP } from "@/hooks/useMAP";
import styles from "./MAPPage.module.scss";

export default function MAPPage() {
  const [activeTab, setActiveTab] = useState<"calc" | "interpret">("calc");

  const { systolic, setSystolic, diastolic, setDiastolic, calculate, toast } =
    useMAP();

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
            <div className={styles.inputLabel}>فشارخون‌سیستولیک</div>
            <input
              type="number"
              className={styles.input}
              value={systolic}
              onChange={(e) => setSystolic(e.target.value)}
              placeholder="mmHg"
            />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputLabel}>فشارخون‌دیاستولیک</div>
            <input
              type="number"
              className={styles.input}
              value={diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
              placeholder="mmHg"
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
            <p>برای محاسبه متوسط فشسار شریانی از فرمول زیر استفاده می‌شود:</p>

            <div className={styles.formula}>Mean Arterial Pressure = 1/3(SBP) + 2/3(DBP)</div>
          </div>
        </div>
      )}
      {toast && (
        <div className={`${styles.toast} ${styles[toast.tone]}`}>
          {toast.value !== undefined ? (
            <>
              <div className={styles.toastTitle}>
                <span>MAP: {toast.value} mmHg</span>
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
