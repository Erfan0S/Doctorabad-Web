import { useState, useCallback, useMemo } from 'react';

// فقط حالت سبز برای موفقیت و قرمز برای خطا
type Tone = 'green' | 'red';

type MAPStage = {
  tone: Tone;
  message: string;
};

type ToastState = {
  value?: number;
  stage?: MAPStage;
  message?: string;
  tone: Tone;
};

export const useMAP = () => {
  // state های مورد نیاز برای MAP (فشار خون سیستولیک و دیاستولیک)
  const [systolic, setSystolic] = useState<string>('');
  const [diastolic, setDiastolic] = useState<string>('');
  const [toast, setToast] = useState<ToastState | null>(null);

  const calculate = useCallback(() => {
    // تبدیل ورودی‌ها به عدد
    const sysNum = Number(systolic);
    const diaNum = Number(diastolic);

    // بررسی خالی بودن یا معتبر نبودن ورودی‌ها
    if (!systolic || !diastolic || sysNum <= 0 || diaNum <= 0) {
      setToast({
        tone: 'red',
        message: 'لطفاً تمام فیلدها را با مقادیر معتبر پر کنید!',
      });
      return;
    }

    // فرمول MAP: (1/3 * Systolic) + (2/3 * Diastolic)
    // یا فرمول معادل: (Systolic + 2 * Diastolic) / 3
    const mapValue = (sysNum + (2 * diaNum)) / 3;
    const roundedMAP = Math.round(mapValue);

    // تنظیم نتیجه برای نمایش در توست با استایل سبز
    const stage: MAPStage = {
      tone: 'green',
      message: 'فشار متوسط شریانی محاسبه شد.',
    };

    setToast({
      value: roundedMAP,
      stage,
      tone: 'green',
      message: stage.message
    });
  }, [systolic, diastolic]);

  const reset = useCallback(() => {
    setSystolic('');
    setDiastolic('');
    setToast(null);
  }, []);

  return useMemo(() => ({
    systolic, setSystolic,
    diastolic, setDiastolic,
    toast,
    calculate,
    reset
  }), [systolic, diastolic, toast, calculate, reset]);
};
