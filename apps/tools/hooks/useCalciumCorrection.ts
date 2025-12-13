import { useState, useCallback, useMemo, useEffect } from "react";

type Tone = "green" | "gray";

type CalciumStage = {
  tone: Tone;
  message: string;
};

type ToastState = {
  value?: number;
  stage?: CalciumStage;
  message?: string;
  tone: Tone;
};

export const useCalciumCorrection = () => {
  const [calcium, setCalcium] = useState<string>("");       // Serum Ca
  const [albumin, setAlbumin] = useState<string>("");       // Patient's Albumin
  const [toast, setToast] = useState<ToastState | null>(null);

  // فرض: Normal Albumin = 4 g/dL (در متن راهنما همین را هم می‌نویسی)
  const NORMAL_ALBUMIN = 4;

  const calculate = useCallback(() => {
    const caNum = Number(calcium);
    const albNum = Number(albumin);

    if (!calcium || !albumin || caNum <= 0 || albNum <= 0) {
      setToast({
        tone: "gray",
        message: "لطفاً کلسیم و آلبومین را به‌صورت معتبر وارد کنید!",
      });
      return;
    }

    const corrected = 0.8 * (NORMAL_ALBUMIN - albNum) + caNum;
    const rounded = Number(corrected.toFixed(2));

    const stage: CalciumStage = {
      tone: "green",
      message: "Calcium Correction",
    };

    setToast({
      value: rounded,
      stage,
      tone: stage.tone,
      message: stage.message,
    });
  }, [calcium, albumin]);

  const reset = useCallback(() => {
    setCalcium("");
    setAlbumin("");
    setToast(null);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  return useMemo(
    () => ({
      calcium,
      setCalcium,
      albumin,
      setAlbumin,
      toast,
      calculate,
      reset,
    }),
    [calcium, albumin, toast, calculate, reset]
  );
};
