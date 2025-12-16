import { useMemo, useState } from "react";

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

// تابع تعیین رنگ و پیام طبق جدول تصویر
const toneForScore = (score: number): { tone: Tone; message: string } => {
  if (score >= 3) {
    return {
      tone: "red",
      message: "High probability",
    };
  }
  if (score >= 1) {
    return {
      tone: "yellow", // Moderate
      message: "Moderate probability",
    };
  }
  // score <= 0
  return {
    tone: "green",
    message: "Low probability",
  };
};

export default function useWellsDvt(parameters: Parameter[]) {
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

  const calculateWells = () => {
    const { tone, message } = toneForScore(totalScore);
    setToast({
      score: totalScore,
      tone,
      message,
    });
  };

  return {
    selectedIds,
    toggleParameter,
    calculateWells,
    toast,
    totalScore,
  };
}
