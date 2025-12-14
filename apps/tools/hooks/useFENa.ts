import { useState, useCallback, useMemo, useEffect } from "react";

type Tone = "green" | "gray";

type ToastState = {
  value?: string;
  message?: string; // برای نمایش نوع (Type)
  tone: Tone;
};

export const useFENa = () => {
  const [serumNa, setSerumNa] = useState<string>("");
  const [serumCr, setSerumCr] = useState<string>("");
  const [urineNa, setUrineNa] = useState<string>("");
  const [urineCr, setUrineCr] = useState<string>("");
  const [toast, setToast] = useState<ToastState | null>(null);

  const calculate = useCallback(() => {
    const sNa = Number(serumNa);
    const sCr = Number(serumCr);
    const uNa = Number(urineNa);
    const uCr = Number(urineCr);

    if (
      !serumNa || !serumCr || !urineNa || !urineCr ||
      sNa <= 0 || sCr <= 0 || uNa <= 0 || uCr <= 0
    ) {
      setToast({
        tone: "gray",
        message: "لطفاً تمام مقادیر را به‌صورت معتبر وارد کنید!",
      });
      return;
    }

    const numerator = sCr * uNa;
    const denominator = sNa * uCr;
    const fenaValue = 100 * (numerator / denominator);
    
    // حذف اعشار با Math.round
    const rounded = Math.round(fenaValue);

    // تعیین نوع بر اساس جدول
    let typeMessage = "";
    if (fenaValue < 1) {
      typeMessage = "Pre-Renal";
    } else if (fenaValue >= 1 && fenaValue <= 4) { // بازه 1 تا 3 یا 4 درصد معمولا Intrinsic است
       // طبق جدول ارسالی: 1% - 3% Intrinsic و >4% Post-Renal
       // برای پوشش کامل، معمولا بین 1 تا 4 را Intrinsic می‌گیرند یا طبق دقیق جدول عمل می‌کنند.
       // اینجا طبق جدول شما:
       if(fenaValue <= 3) typeMessage = "Intrinsic";
       else typeMessage = "Indeterminate / Post-Renal Possible"; // بین 3 تا 4
    } else if (fenaValue > 4) {
      typeMessage = "Post-Renal";
    } else {
        // برای مقادیر بین 3 تا 4 که در جدول صریح نیست
        typeMessage = "Intrinsic / Post-Renal";
    }
    
    // منطق ساده‌تر طبق جدول ارسالی (بدون فاصله):
    if (fenaValue < 1) typeMessage = "Pre-Renal";
    else if (fenaValue > 4) typeMessage = "Post-Renal";
    else typeMessage = "Intrinsic"; // شامل 1 تا 4

    setToast({
      value: `${rounded}%`,
      tone: "green",
      message: typeMessage,
    });
  }, [serumNa, serumCr, urineNa, urineCr]);

  const reset = useCallback(() => {
    setSerumNa("");
    setSerumCr("");
    setUrineNa("");
    setUrineCr("");
    setToast(null);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  return useMemo(
    () => ({
      serumNa, setSerumNa,
      serumCr, setSerumCr,
      urineNa, setUrineNa,
      urineCr, setUrineCr,
      toast,
      calculate,
      reset,
    }),
    [serumNa, serumCr, urineNa, urineCr, toast, calculate, reset]
  );
};
