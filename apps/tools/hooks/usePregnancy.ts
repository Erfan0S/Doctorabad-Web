import { useState, useCallback, useMemo, useEffect } from "react";
import moment from "moment-jalaali";

moment.loadPersian({ dialect: "persian-modern" });

type CalculationMode = "lmp" | "usg";
type ToastState = { message: string; tone: "green" | "gray" };

const daysArray = Array.from({ length: 31 }, (_, i) => i + 1);
const monthsArray = [
  "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
];

const currentYear = moment().jYear();
const yearsArray = [currentYear - 1, currentYear];

// هفته‌های سونوگرافی: از ۰ تا ۴۰
const gaWeeksArray = Array.from({ length: 41 }, (_, i) => i); 
const gaDaysArray = Array.from({ length: 7 }, (_, i) => i);

export default function usePregnancy() {
  const [mode, setMode] = useState<CalculationMode>("lmp");

  const [day, setDay] = useState<string>("");
  const [monthIndex, setMonthIndex] = useState<string>(""); 
  const [year, setYear] = useState<string>("");

  const [usgWeeks, setUsgWeeks] = useState<string>("");
  const [usgDays, setUsgDays] = useState<string>("");

  const [toast, setToast] = useState<ToastState | null>(null);

  const todayDate = useMemo(() => moment().format("dddd jD jMMMM jYYYY"), []);

  const calculate = useCallback(() => {
    if (!day || !monthIndex || !year) {
      setToast({ tone: "gray", message: "لطفاً تاریخ را کامل وارد کنید!" });
      return;
    }

    const monthNum = Number(monthIndex) + 1;
    const inputDate = moment(`${year}/${monthNum}/${day}`, "jYYYY/jM/jD");

    if (!inputDate.isValid()) {
      setToast({ tone: "gray", message: "تاریخ نامعتبر است!" });
      return;
    }

    // بررسی اینکه تاریخ وارد شده مربوط به آینده یا خود امروز نباشد
    const today = moment().startOf('day');
    if (inputDate.isSameOrAfter(today)) {
      setToast({ 
        tone: "gray", 
        message: "لطفاً تاریخی قبل از امروز وارد کنید!" 
      });
      return;
    }

    let edd: moment.Moment; 
    let gestationalAgeDays: number; 

    if (mode === "lmp") {
      edd = inputDate.clone().add(280, "days");
      gestationalAgeDays = moment().diff(inputDate, "days");
    } else {
      if (usgWeeks === "" && usgDays === "") {
        setToast({ tone: "gray", message: "سن جنین را انتخاب کنید!" });
        return;
      }

      const w = Number(usgWeeks) || 0;
      const d = Number(usgDays) || 0;
      const ageInDaysAtUsg = w * 7 + d; 

      const conceptionDate = inputDate.clone().subtract(ageInDaysAtUsg, "days");
      
      const daysRemaining = 280 - ageInDaysAtUsg;
      edd = inputDate.clone().add(daysRemaining, "days");

      gestationalAgeDays = moment().diff(conceptionDate, "days");
    }

    // اگر تاریخ زایمان گذشته باشد (سن بارداری خیلی زیاد شود)
    // مثلا بیشتر از 44 هفته (308 روز)
    if (gestationalAgeDays > 308) {
       setToast({ tone: "gray", message: "تاریخ زایمان گذشته است!" });
       return;
    }
    
    // اگر محاسبات منجر به سن منفی شود (محض احتیاط)
    if (gestationalAgeDays < 0) {
      setToast({ tone: "gray", message: "محاسبات نامعتبر (تاریخ آینده)!" });
      return;
    }

    const currentWeeks = Math.floor(gestationalAgeDays / 7);
    const currentDays = gestationalAgeDays % 7;
    const eddString = edd.format("dddd jD jMMMM jYYYY");

    setToast({
      tone: "green",
      message: `سن بارداری: ${currentWeeks} هفته و ${currentDays} روز\nتاریخ زایمان: ${eddString}`,
    });
  }, [mode, day, monthIndex, year, usgWeeks, usgDays]);

  const reset = useCallback(() => {
    setDay("");
    setMonthIndex("");
    setYear("");
    setUsgWeeks("");
    setUsgDays("");
    setToast(null);
  }, []);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  return {
    mode, setMode,
    day, setDay,
    monthIndex, setMonthIndex,
    year, setYear,
    usgWeeks, setUsgWeeks,
    usgDays, setUsgDays,
    calculate,
    toast,
    todayDate,
    reset,
    options: {
      days: daysArray,
      months: monthsArray,
      years: yearsArray,
      gaWeeks: gaWeeksArray,
      gaDays: gaDaysArray
    }
  };
}
