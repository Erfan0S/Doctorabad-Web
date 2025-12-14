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

// نگاشت امتیاز به درصد ریسک طبق جدول
const riskByScore: Record<number, string> = {
  0: "1.9%",
  1: "2.8%",
  2: "4%",
  3: "5.9%",
  4: "8.5%",
  5: "12.5%",
  6: "18.2%",
};

const toneAndRiskForScore = (score: number): { tone: Tone; message: string } => {
  const risk = riskByScore[score] || "Unknown";
  const message = `ریسک سکته مغزی در هر سال: ${risk}`; // پیام نهایی که در توست نشان داده می‌شود

  // منطق رنگ‌بندی طبق جدول (سبز، زرد، قرمز)
  if (score >= 3) {
    return { tone: "red", message };
  }
  if (score >= 1) {
    return { tone: "yellow", message };
  }
  return { tone: "green", message };
};

export default function useChads2(parameters: Parameter[]) {
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

  const calculateChads2 = () => {
    const { tone, message } = toneAndRiskForScore(totalScore);
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
    calculateChads2,
    toast,
    totalScore,
  };
}
