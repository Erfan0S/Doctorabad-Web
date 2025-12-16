import { useMemo, useState } from "react";

type Tone = "green" | "yellow" | "red";

type ToastState = {
  score: number;
  tone: Tone;
  message: string;
};

// تابع تعیین رنگ و پیام طبق جدول تصویر
const toneForScore = (score: number): { tone: Tone; message: string } => {
  if (score >= 6) {
    return {
      tone: "red",
      message: "High Risk",
    };
  }
  if (score >= 4) {
    return {
      tone: "yellow", // Moderate
      message: "Moderate Risk",
    };
  }
  // score <= 3
  return {
    tone: "green",
    message: "Low Risk",
  };
};

export default function useAbcd2() {
  const [ageOption, setAgeOption] = useState<number>(0);
  const [bpOption, setBpOption] = useState<number>(0);
  const [clinicalOption, setClinicalOption] = useState<number>(0); // **توجه:** مقادیر این بخش معکوس است
  const [durationOption, setDurationOption] = useState<number>(0);
  const [diabetesOption, setDiabetesOption] = useState<number>(0);

  const [toast, setToast] = useState<ToastState | null>(null);

  const totalScore = useMemo(() => {
    // محاسبه امتیاز هر بخش بر اساس ایندکس انتخاب شده (و منطق خاص تابلوی بالینی)
    
    // سن: زیر 60 (0)، بالای 60 (1) -> طبق تصویر: 0, 1
    const ageScore = ageOption; 



    // پیاده‌سازی امتیازها:
    
    // سن (گزینه 0 -> 0، گزینه 1 -> 1)
    const s1 = ageOption; 


    const s2 = bpOption === 0 ? 0 : 1; 

    // تابلوی بالینی (گزینه 0 -> 2، گزینه 1 -> 1، گزینه 2 -> 0) -> طبق متن سوال
    const s3 = clinicalOption === 0 ? 2 : (clinicalOption === 1 ? 1 : 0); // **اصلاح:** اگر "اختلال تکلم" گزینه اول است و "همی‌پارزی" گزینه دوم:


    const s3_calc = [2, 1, 0][clinicalOption] || 0;

    // مدت (گزینه 0 -> 0، گزینه 1 -> 1، گزینه 2 -> 2)
    const s4 = durationOption;

    // دیابت (گزینه 0 -> 0، گزینه 1 -> 1)
    const s5 = diabetesOption;

    return s1 + s2 + s3_calc + s4 + s5;
  }, [ageOption, bpOption, clinicalOption, durationOption, diabetesOption]);

  const calculateAbcd2 = () => {
    const { tone, message } = toneForScore(totalScore);
    setToast({
      score: totalScore,
      tone,
      message,
    });
  };

  return {
    ageOption, setAgeOption,
    bpOption, setBpOption,
    clinicalOption, setClinicalOption,
    durationOption, setDurationOption,
    diabetesOption, setDiabetesOption,
    calculateAbcd2,
    toast,
    totalScore,
  };
}
