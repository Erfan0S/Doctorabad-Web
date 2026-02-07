// hooks/useMaintenanceFluids.ts
import { useMemo, useState, useCallback } from "react";

type Tone = "green" | "red";

type ToastState = {
  open: boolean;
  tone: Tone;
  title?: string;
  message?: string;
};

export const useMaintenanceFluids = () => {
  const [weight, setWeight] = useState<string>("");

  const [toast, setToast] = useState<ToastState>({
    open: false,
    tone: "green",
  });

  const closeToast = useCallback(() => {
    setToast((prev) => ({ ...prev, open: false }));
  }, []);

  const calculate = useCallback(() => {
    const w = parseFloat(weight);

    if (!weight || isNaN(w) || w <= 0) {
      setToast({
        open: true,
        tone: "red",
        title: "خطا",
        message: "لطفاً وزن را به‌صورت معتبر وارد کنید!",
      });
      return;
    }

    let ratePerHour = 0;

    if (w <= 10) ratePerHour = w * 4;
    else if (w <= 20) ratePerHour = 40 + (w - 10) * 2;
    else ratePerHour = 60 + (w - 20) * 1;

    const totalPerDay = ratePerHour * 24;

    setToast({
      open: true,
      tone: "green",
      title: `Rate: ${ratePerHour.toFixed(1)} mL/hr`,
      message: `Maintenance Fluids`,
    });
  }, [weight]);

  return useMemo(
    () => ({
      weight,
      setWeight,
      toast,
      calculate,
      closeToast,
    }),
    [weight, toast, calculate, closeToast]
  );
};
