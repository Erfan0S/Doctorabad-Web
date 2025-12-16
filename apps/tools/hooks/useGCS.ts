import { useMemo, useState } from "react";

type Tone = "red" | "yellow" | "green";

type ToastState = {
  score: number | null;
  tone: Tone;
  message: string;
};

const toneForGCS = (score: number): { tone: Tone; message: string } => {
  if (score >= 13) {
    return { tone: "green", message: "Minor injury" };
  }
  if (score >= 9) {
    return { tone: "yellow", message: "Moderate injury" };
  }
  return { tone: "red", message: "Severe injury" };
};

export default function useGCS() {
  // مقادیر پیش‌فرض null است تا کاربر حتماً انتخاب کند
  const [selectedEye, setSelectedEye] = useState<number | null>(null);
  const [selectedVerbal, setSelectedVerbal] = useState<number | null>(null);
  const [selectedMotor, setSelectedMotor] = useState<number | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  // شرط بررسی "غیرقابل سنجش" بودن (اگر هر کدام -1 باشد)
  const hasNotAssessable = useMemo(
    () =>
      selectedEye === -1 || selectedVerbal === -1 || selectedMotor === -1,
    [selectedEye, selectedVerbal, selectedMotor]
  );

  const totalScore = useMemo(() => {
    // اگر یکی انتخاب نشده باشد یا غیرقابل سنجش باشد، محاسبه معنی ندارد
    if (
      selectedEye === null ||
      selectedVerbal === null ||
      selectedMotor === null ||
      hasNotAssessable
    ) {
      return 0;
    }
    // خود id ها همان امتیاز هستند
    return selectedEye + selectedVerbal + selectedMotor;
  }, [selectedEye, selectedVerbal, selectedMotor, hasNotAssessable]);

  const calculateGCS = () => {
    // ۱. بررسی انتخاب نشدن گزینه‌ها
    if (
      selectedEye === null ||
      selectedVerbal === null ||
      selectedMotor === null
    ) {
      setToast({
        score: null,
        tone: "red",
        message: "لطفاً برای هر سه بخش یک گزینه انتخاب کنید.",
      });
      return;
    }

    // ۲. بررسی حالت غیرقابل سنجش
    if (hasNotAssessable) {
      setToast({
        score: null,
        tone: "red",
        message: "اصلا قابل سنجش نیست!",
      });
      return;
    }

    // ۳. محاسبه و نمایش نتیجه
    const { tone, message } = toneForGCS(totalScore);
    setToast({
      score: totalScore,
      tone,
      message,
    });
  };

  return {
    selectedEye,
    setSelectedEye,
    selectedVerbal,
    setSelectedVerbal,
    selectedMotor,
    setSelectedMotor,
    calculateGCS,
    toast,
  };
}
