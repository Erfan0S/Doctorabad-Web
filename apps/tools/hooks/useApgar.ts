import { useEffect, useMemo, useState } from "react";

type Tone = "red" | "yellow" | "green";

type ToastState = {
  score: number;
  tone: Tone;
  message: string;
};

const scoreById: Record<number, number> = {
  1: 0,
  2: 1,
  3: 2,
};

const toneForScore = (score: number): { tone: Tone; message: string } => {
  if (score <= 3) {
    return {
      tone: "red",
      message: "بیانگر یک علت پاتولوژیک یا ارست قلبی تنفسی است.",
    };
  }

  if (score <= 6) {
    return {
      tone: "yellow",
      message: "نیاز به مراقبت از نزدیک.",
    };
  }

  return {
    tone: "green",
    message: "نرمال",
  };
};

const safeScore = (id: number | null) => scoreById[id ?? 0] ?? 0;

export default function useApgar() {
  const [selectedHeartRate, setSelectedHeartRate] = useState<number>(1);
  const [selectedBreathing, setSelectedBreathing] = useState<number>(1);
  const [selectedMuscle, setSelectedMuscle] = useState<number>(1);
  const [selectedReflex, setSelectedReflex] = useState<number>(1);
  const [selectedSkinColor, setSelectedSkinColor] = useState<number>(1);
  const [toast, setToast] = useState<ToastState | null>(null);

  const totalScore = useMemo(
    () =>
      safeScore(selectedHeartRate) +
      safeScore(selectedBreathing) +
      safeScore(selectedMuscle) +
      safeScore(selectedReflex) +
      safeScore(selectedSkinColor),
    [
      selectedHeartRate,
      selectedBreathing,
      selectedMuscle,
      selectedReflex,
      selectedSkinColor,
    ]
  );

  const calculateApgar = () => {
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
    selectedHeartRate,
    setSelectedHeartRate,
    selectedBreathing,
    setSelectedBreathing,
    selectedMuscle,
    setSelectedMuscle,
    selectedReflex,
    setSelectedReflex,
    selectedSkinColor,
    setSelectedSkinColor,
    calculateApgar,
    toast,
  };
}
