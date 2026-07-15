"use client";

import { useEffect, useState } from "react";
import { useCalciumCorrection } from "@/hooks/useCalciumCorrection";
import styles from "./toolStyles";
import ResultToast from "@/components/common/ResultToast/ResultToast";

export default function CalciumCorrectionPage() {
  const [activeTab, setActiveTab] = useState<"calc" | "interpret">("calc");

  const { calcium, setCalcium, albumin, setAlbumin, toast, calculate, reset } =
    useCalciumCorrection();

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
            <div className={styles.inputLabel}>کلسیم</div>
            <input
              type="number"
              step="0.1"
              className={styles.input}
              value={calcium}
              onChange={(e) => setCalcium(e.target.value)}
              placeholder="mmol/L"
            />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputLabel}>آلبومین</div>
            <input
              type="number"
              step="0.1"
              className={styles.input}
              value={albumin}
              onChange={(e) => setAlbumin(e.target.value)}
              placeholder="g/L"
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
              کلسیم در خون به سه فرم وجود دارد:
              <br />
              ۱- فرم باند شده به پروتئین (۴۰٪)
              <br />
              ۲- فرم یونیزه (۴۸٪) <br />
              ۳- فرم باند شده به سایر آنیون‌ها (۱۲٪)
              <br /> در فرم اول، آلبومین مسئول باند شدن به ۹۰٪ کلسیم‌ها و
              گلوبولین مسئول اتصال به ۱۰ کلسیم هاست.
              <br /> هر ۱ gr/dl کاهش آلبومین میزان کلسیم توتال را، ۰۲ mmol/dl
              کاهش می‌دهد؛ این تغییر بدون تاثیر بر روی اشکال یونیزه (که فرم فعال
              فیزیولوژیک هستند) می‌باشد، لذا هیچ گونه علامتی از هیپوکلسمی وجود
              ندارد.
              <br /> از این رو هنگام اندازه گیری کلسیم توتال باید عدد بدست آمده
              را برحسب میزان آلبومین تصحیح نمود:
            </p>

            <div className={styles.formula}>
              Corrected Ca = 0.8 × (Normal Albumin − Patient&apos;s Albumin) +
              Serum Ca
            </div>
          </div>
        </div>
      )}

      <ResultToast
        open={toastOpen && !!toast}
        tone={toast?.tone}
        title={
          toast
            ? toast.value !== undefined
              ? `Result = ${toast.value} mmol/L`
              : toast.message
            : undefined
        }
        message={toast && toast.value !== undefined ? toast.message : undefined}
        onClose={() => setToastOpen(false)}
      />
    </div>
  );
}
