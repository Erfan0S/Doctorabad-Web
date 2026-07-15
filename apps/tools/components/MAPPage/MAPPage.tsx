"use client";

import { useEffect, useState } from "react";
import { useMAP } from "@/hooks/useMAP";
import styles from "./toolStyles";
import ResultToast from "@/components/common/ResultToast/ResultToast";

export default function MAPPage() {
  const [activeTab, setActiveTab] = useState<"calc" | "interpret">("calc");

  const { systolic, setSystolic, diastolic, setDiastolic, calculate, toast } =
    useMAP();

  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    if (toast) {
      setToastOpen(true);
    }
  }, [toast]);

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
      <ResultToast
        open={toastOpen && !!toast}
        tone={toast?.tone}
        title={
          toast
            ? toast.value !== undefined
              ? `MAP: ${toast.value} mmHg`
              : toast.message
            : undefined
        }
        onClose={() => setToastOpen(false)}
      />
    </div>
  );
}
