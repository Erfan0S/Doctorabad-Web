import { useEffect, useMemo, useState } from "react";

type Tone = "green" | "yellow" | "red";

type ToastState = {
  score: number;
  tone: Tone;
  message: string;
};

type Parameter = {
  id: number;
  points: number;
};

// تابع تعیین رنگ و پیام بر اساس امتیاز (طبق جدول تصویر)
const toneForScore = (score: number): { tone: Tone; message: string } => {
  if (score >= 5) {
    return {
      tone: "red",
      message: "Very High Risk",
    };
  }
  if (score >= 3) {
    return {
      tone: "yellow", // High Risk (نارنجی نداریم، از زرد استفاده می‌کنیم)
      message: "High Risk",
    };
  }
  if (score === 2) {
    return {
      tone: "yellow", // Moderate Risk
      message: "Moderate Risk",
    };
  }
  if (score === 1) {
    return {
      tone: "green",
      message: "Low Risk",
    };
  }
  // score === 0
  return {
    tone: "green",
    message: "Relatively Low Risk",
  };
};

export default function useHasBled(parameters: Parameter[]) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [toast, setToast] = useState<ToastState | null>(null);

  const toggleParameter = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const totalScore = useMemo(
    () =>
      parameters
        .filter((p) => selectedIds.includes(p.id))
        .reduce((sum, p) => sum + p.points, 0),
    [parameters, selectedIds]
  );

  const calculateHasBled = () => {
    const { tone, message } = toneForScore(totalScore);
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
    selectedIds,
    toggleParameter,
    calculateHasBled,
    toast,
    totalScore,
  };
}
