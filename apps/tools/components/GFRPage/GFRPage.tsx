"use client";

import { useState } from "react";
import { useGFR } from "@/hooks/useGFR";
import styles from "./GFRPage.module.scss";

export default function GFRPage() {
  const [activeTab, setActiveTab] = useState<"calc" | "interpret">("calc");

  const {
    gender,
    setGender,
    age,
    setAge,
    weight,
    setWeight,
    creatinine,
    setCreatinine,
    toast,
    calculate,
    reset,
  } = useGFR();

  const interpretationData = [
    { stage: "I", range: "≥ 90", color: "green" },
    { stage: "II", range: "89-60", color: "green" },
    { stage: "III a", range: "59-45", color: "yellow" },
    { stage: "III b", range: "44-30", color: "yellow" },
    { stage: "IV", range: "29-15", color: "red" },
    { stage: "V", range: "< 15", color: "red" },
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
          <div>
            <div className={styles.sectionTitle}>جنسیت</div>
            <div className={styles.sectionContent}>
              <div className={styles.listItems}>
                <div className={styles.item}>
                  <input
                    type="radio"
                    checked={gender === "male"}
                    onChange={() => setGender("male")}
                  />
                  <span>مرد</span>
                </div>
                <div className={styles.item}>
                  <input
                    type="radio"
                    checked={gender === "female"}
                    onChange={() => setGender("female")}
                  />
                  <span>زن</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputLabel}>سن</div>
            <input
              type="number"
              className={styles.input}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="سال"
            />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputLabel}>وزن</div>
            <input
              type="number"
              className={styles.input}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="کیلوگرم"
            />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputLabel}>کراتینین</div>
            <input
              type="number"
              step="0.1"
              className={styles.input}
              value={creatinine}
              onChange={(e) => setCreatinine(e.target.value)}
              placeholder="μmol/L"
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
              فرمول کروتکوف-گالت که به صورت زیر محاسبه می‌شود نشانگر شدت یا حدت
              بیماری در بیمار مبتلا به نارسابی مزمن کلیه است:
            </p>

            <div>GFR= (140-age) * (weight,kg) * (0/85 if female) / (72*cr)</div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>CKD stage</th>
                    <th>GFR</th>
                  </tr>
                </thead>
                <tbody>
                  {interpretationData.map((item, index) => (
                    <tr
                      key={index}
                      className={`${styles.tableRow} ${styles[item.color]}`}
                    >
                      <td className={styles.cell}>{item.stage}</td>
                      <td className={styles.cell}>{item.range}</td>
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
          {toast.value !== undefined ? (
            // حالت محاسبه موفق
            <>
              <div className={styles.toastTitle}>
                <span>GFR: {toast.value}</span>
                {toast.stage && <span> - Stage: {toast.stage.stage}</span>}
              </div>
              <p className={styles.toastText}>{toast.stage?.message}</p>
            </>
          ) : (
            // حالت خطا
            <div className={styles.toastTitle}>{toast.message}</div>
          )}
        </div>
      )}
    </div>
  );
}
