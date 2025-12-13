import { useState, useCallback, useMemo, useEffect } from 'react';

type Gender = 'male' | 'female';
// اضافه کردن 'gray' برای حالت خطا یا خنثی
type Tone = 'green' | 'yellow' | 'orange' | 'red' | 'gray';

type CKDStage = {
  stage: string;
  range: string;
  tone: Tone;
  message: string;
};

type ToastState = {
  value?: number; // اختیاری شد چون در حالت خطا مقدار نداریم
  stage?: CKDStage; // اختیاری
  message?: string; // برای پیام‌های خطای دستی
  tone: Tone;
};

export const useGFR = () => {
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [creatinine, setCreatinine] = useState<string>('');
  const [toast, setToast] = useState<ToastState | null>(null);

  const getCKDStage = useCallback((gfr: number): CKDStage => {
    if (gfr >= 90) return { stage: 'I', range: '≥ 90', tone: 'green', message: 'عملکرد طبیعی کلیه' };
    if (gfr >= 60) return { stage: 'II', range: '60-89', tone: 'green', message: 'کاهش خفیف عملکرد کلیه' };
    if (gfr >= 45) return { stage: 'III a', range: '45-59', tone: 'yellow', message: 'کاهش خفیف تا متوسط عملکرد کلیه' };
    if (gfr >= 30) return { stage: 'III b', range: '30-44', tone: 'orange', message: 'کاهش متوسط تا شدید عملکرد کلیه' };
    if (gfr >= 15) return { stage: 'IV', range: '15-29', tone: 'red', message: 'کاهش شدید عملکرد کلیه' };
    return { stage: 'V', range: '< 15', tone: 'red', message: 'نارسایی کلیه' };
  }, []);

  const calculate = useCallback(() => {
    // تبدیل ورودی‌ها به عدد
    const ageNum = Number(age);
    const weightNum = Number(weight);
    const creatinineNum = Number(creatinine);

    // بررسی خالی بودن یا معتبر نبودن ورودی‌ها
    if (!age || !weight || !creatinine || ageNum <= 0 || weightNum <= 0 || creatinineNum <= 0) {
      setToast({
        tone: 'gray', // رنگ خنثی یا قرمز برای خطا
        message: 'لطفاً تمام فیلدها را با مقادیر معتبر پر کنید!',
      });
      return;
    }

    const genderMultiplier = gender === 'female' ? 0.85 : 1;
    const gfrValue = ((140 - ageNum) * weightNum * genderMultiplier) / (72 * creatinineNum);
    const roundedGFR = Math.round(gfrValue);

    const stage = getCKDStage(roundedGFR);

    setToast({
      value: roundedGFR,
      stage,
      tone: stage.tone, // برای راحتی در کامپوننت
      message: stage.message
    });
  }, [age, weight, creatinine, gender, getCKDStage]);

  const reset = useCallback(() => {
    setAge('');
    setWeight('');
    setCreatinine('');
    setGender('male');
    setToast(null);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  return useMemo(() => ({
    gender, setGender,
    age, setAge,
    weight, setWeight,
    creatinine, setCreatinine,
    toast,
    calculate,
    reset
  }), [gender, age, weight, creatinine, toast, calculate, reset]);
};
