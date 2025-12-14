import { useState, useCallback, useMemo, useEffect } from "react";

type Tone = "green" | "gray";

type ToastState = {
  value?: string;
  message?: string;
  tone: Tone;
};

export const useMaintenanceFluids = () => {
  const [weight, setWeight] = useState<string>("");
  const [toast, setToast] = useState<ToastState | null>(null);

  const calculate = useCallback(() => {
    const w = parseFloat(weight);

    if (!weight || isNaN(w) || w <= 0) {
      setToast({
        tone: "gray",
        message: "لطفاً وزن را به‌صورت معتبر وارد کنید!",
      });
      return;
    }

    // محاسبه طبق فرمول Holliday-Segar (per hour)
    // 0-10 kg: 4 mL/kg/hr
    // 10-20 kg: 40 + 2 mL/kg/hr for every kg > 10
    // >20 kg: 60 + 1 mL/kg/hr for every kg > 20
    
    let ratePerHour = 0;

    if (w <= 10) {
      ratePerHour = w * 4;
    } else if (w <= 20) {
      ratePerHour = 40 + (w - 10) * 2;
    } else {
      ratePerHour = 60 + (w - 20) * 1;
    }

    // محاسبه مقدار کل در 24 ساعت
    const totalPerDay = ratePerHour * 24;

    // گرد کردن اعداد اعشاری (اگر نیاز بود)
    // معمولا برای سرم ریت صحیح استفاده می‌شود اما اگر وزن اعشاری باشد ریت هم اعشاری می‌شود
    const finalRate = parseFloat(ratePerHour.toFixed(1));
    const finalTotal = parseFloat(totalPerDay.toFixed(1));

    setToast({
      // نمایش دو خطی: مقدار کل روزانه و سرعت ساعتی
      value: `${finalRate} mL/kg/hr`,
      message: `Maintenance Fluids`, 
      tone: "green",
    });
  }, [weight]);

  const reset = useCallback(() => {
    setWeight("");
    setToast(null);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(timer);
  }, [toast]);

  return useMemo(
    () => ({
      weight,
      setWeight,
      toast,
      calculate,
      reset,
    }),
    [weight, toast, calculate, reset]
  );
};
