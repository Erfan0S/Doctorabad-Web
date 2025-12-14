import { useEffect, useMemo, useState } from "react";

type Tone = "green" | "yellow" | "red";

type ToastState = {
  score: number;
  tone: Tone;
  message: string;
};

// نگاشت امتیاز به درصد ریسک طبق جدول
const riskByScore: Record<number, string> = {
  0: "0%",
  1: "1.3%",
  2: "2.2%",
  3: "3.2%",
  4: "4.0%",
  5: "6.7%",
  6: "9.8%",
  7: "9.6%",
  8: "6.7%",
  9: "15.2%",
};

// تابع تعیین رنگ و پیام
const getToneAndMessage = (score: number): { tone: Tone; message: string } => {
  const risk = riskByScore[score] || "Unknown";
  
  // پیام فارسی درخواستی
  const message = `ریسک سکته مغزی در هر سال: ${risk}`;

  // منطق رنگ‌بندی (0=سبز، 1=زرد، >=2=قرمز)
  if (score >= 2) {
    return { tone: "red", message };
  }
  if (score === 1) {
    return { tone: "yellow", message };
  }
  // score === 0
  return { tone: "green", message };
};

export default function useCha2ds2Vasc(parameters: { id: number; points: number }[]) {
  // ... (سایر stateها و لاجیک‌های قبلی بدون تغییر) ...
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [ageOption, setAgeOption] = useState<number>(0);
  const [genderOption, setGenderOption] = useState<number>(0);
  const [toast, setToast] = useState<ToastState | null>(null);

  const toggleParameter = (id: number) => { /* ... */ }; // (همان کد قبلی)

  const totalScore = useMemo(() => {
    // ... (همان کد قبلی محاسبه امتیاز) ...
    const paramsScore = parameters
      .filter((p) => selectedIds.includes(p.id))
      .reduce((sum, p) => sum + p.points, 0);
    return paramsScore + ageOption + genderOption;
  }, [parameters, selectedIds, ageOption, genderOption]);

  // تغییر در تابع محاسبه برای استفاده از getToneAndMessage
  const calculate = () => {
    const { tone, message } = getToneAndMessage(totalScore);
    setToast({
      score: totalScore,
      tone,
      message,
    });
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  return {
    // ... (خروجی‌های قبلی)
    selectedIds, toggleParameter, ageOption, setAgeOption, 
    genderOption, setGenderOption, calculate, toast, totalScore
  };
}
