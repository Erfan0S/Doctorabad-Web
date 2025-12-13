"use client";

import { useState } from "react";
import { useBMI } from "@/hooks/useBMI";
import styles from "./BMIPage.module.scss";

export default function MAPPage() {
  const [activeTab, setActiveTab] = useState<"calc" | "interpret">("calc");

  const { height, setHeight, weight, setWeight, calculate, toast } = useBMI();
  const interpretationData = [
    { stage: "Underweight", range: "< 18.5", color: "yellow" },
    { stage: "Normal weight", range: "18.5–24.9", color: "green" },
    { stage: "Overweight", range: "25.0–29.9", color: "yellow" },
    { stage: "Obesity class I", range: "30.0–34.9", color: "red" },
    { stage: "Obesity class II", range: "35.0–39.9", color: "red" },
    { stage: "Obesity class III", range: "≥ 40.0", color: "red" },
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
            <div className={styles.inputLabel}>قد</div>
            <input
              type="number"
              className={styles.input}
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="mmHg"
            />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputLabel}>وزن</div>
            <input
              type="number"
              className={styles.input}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
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
            <p>
              فرمول شاخص توده بدنی که به صورت زیر محاسبه می‌شود، نشانگر میزان
              لاغری یا اضافه وزن در افراد است.
            </p>

            <div className={styles.formula}>
              BMI = weight(kg) / (height(m))²
            </div>

            <div className={styles.tableWrapper}>
              <br />
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>BMI</th>
                    <th>Weight</th>
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
            <div className={styles.toastTitle}>
              <span>BMI: {toast.value}</span>
              <div className={styles.toastText}>{toast.message}</div>
            </div>
          ) : (
            <div className={styles.toastTitle}>{toast.message}</div>
          )}
        </div>
      )}
    </div>
  );
}
