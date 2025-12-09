import { useEffect, useMemo, useState } from "react";

type Tone = "red" | "yellow" | "green";

type ToastState = {
  score: number;
  tone: Tone;
  message: string;
};

type Parameter = {
  id: number;
  points: number;
};

const toneForScore = (score: number): { tone: Tone; message: string } => {
  if (score >= 8) {
    return {
      tone: "red",
      message: "احتمال بالای آپاندیسیت.",
    };
  }

  if (score >= 5) {
    return {
      tone: "yellow",
      message: "احتمال متوسط آپاندیسیت.",
    };
  }

  return {
    tone: "green",
    message: "احتمال ضعیف آپاندیسیت.",
  };
};

export default function useAlvarado(parameters: Parameter[]) {
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

  const calculateAlvarado = () => {
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
    calculateAlvarado,
    toast,
    totalScore,
  };
}
