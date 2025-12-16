import { useState, useCallback, useMemo } from 'react';

type Tone = 'green' | 'yellow' | 'red';

type BMIStage = {
  tone: Tone;
  message: string;
};

type ToastState = {
  value?: number;
  stage?: BMIStage;
  message?: string;
  tone: Tone;
};

export const useBMI = () => {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [toast, setToast] = useState<ToastState | null>(null);

  const calculate = useCallback(() => {
    const hNum = Number(height);
    const wNum = Number(weight);

    if (!hNum || !wNum || hNum <= 0 || wNum <= 0) {
      setToast({
        tone: 'red',
        message: 'لطفاً قد و وزن را به‌صورت معتبر وارد کنید!',
      });
      return;
    }

    const heightInMeter = hNum >= 10 ? hNum / 100 : hNum; // اگر بر اساس سانتی‌متر بود
    const bmi = wNum / (heightInMeter * heightInMeter);
    const rounded = Number(bmi.toFixed(1));

    let stage: BMIStage;

    if (rounded < 18.5) {
      stage = { tone: 'yellow', message: 'Underweight' };
    } else if (rounded < 25) {
      stage = { tone: 'green', message: 'Normal weight' };
    } else if (rounded < 30) {
      stage = { tone: 'yellow', message: 'Overweight' };
    } else if (rounded < 35) {
      stage = { tone: 'red', message: 'Obesity class I' };
    } else if (rounded < 40) {
      stage = { tone: 'red', message: 'Obesity class II' };
    } else {
      stage = { tone: 'red', message: 'Obesity class III' };
    }
    

    setToast({
      value: rounded,
      stage,
      tone: stage.tone,
      message: stage.message,
    });
  }, [height, weight]);

  const reset = useCallback(() => {
    setHeight('');
    setWeight('');
    setToast(null);
  }, []);

  return useMemo(
    () => ({
      height,
      setHeight,
      weight,
      setWeight,
      toast,
      calculate,
      reset,
    }),
    [height, weight, toast, calculate, reset]
  );
};
