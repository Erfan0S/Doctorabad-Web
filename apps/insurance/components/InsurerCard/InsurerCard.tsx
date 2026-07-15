// components/InsurerCard/InsurerCard.tsx
"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Insurer } from "@/types/insurance";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { ProductPrice } from "@repo/shared_modules/components";

interface InsurerCardProps {
  insurer: Insurer;
  // مقادیر فیلتر که از پرنت پاس داده می‌شوند
  searchParams: {
    field: number | null;
    grade: number | null;
    residency: number | null;
    damageHistory: number | null;
    lastInsurance: number | null;
    lastInsuranceTitle: string | null;
    endDate: string | null;
  };
}

export default function InsurerCard({
  insurer,
  searchParams,
}: InsurerCardProps) {
  const router = useRouter();

  const finalPrice =
    insurer.amazing_price ?? insurer.off_price ?? insurer.main_price;

  const handleBuyClick = () => {
    // Validation
    const { field, grade, residency, damageHistory, lastInsurance, endDate } =
      searchParams;

    if (!field || !grade || !residency || !damageHistory) {
      toast.error("لطفا تمام فیلدهای اطلاعاتی را تکمیل نمایید");
      return;
    }

    // اگر سابقه خسارت "صدور اولیه" (شناسه 1) نباشد، باید بیمه‌گر قبلی و تاریخ اتمام وارد شده باشد
    if (damageHistory !== 1) {
      if (!lastInsurance || !endDate) {
        toast.error("لطفا اطلاعات بیمه‌نامه قبلی را تکمیل نمایید");
        return;
      }
    }

    // ساخت کوئری استرینگ
    const query = new URLSearchParams();

    // 1. اطلاعات بیمه انتخاب شده (برای نمایش در هدر و قیمت)
    query.set("insurer_id", insurer.id.toString());
    query.set("insurer_title", insurer.title);
    query.set("insurer_logo", insurer.picture); // فرض بر اینکه url عکس است
    query.set("price", finalPrice.toString());

    // 2. اطلاعات فیلترهای کاربر (برای استفاده احتمالی در فرم ویرایش)
    if (searchParams.field) query.set("field", searchParams.field.toString());
    if (searchParams.grade) query.set("grade", searchParams.grade.toString());
    if (searchParams.residency)
      query.set("residency", searchParams.residency.toString());
    if (searchParams.damageHistory)
      query.set("damageHistory", searchParams.damageHistory.toString());
    if (searchParams.lastInsurance)
      query.set("lastInsurance", searchParams.lastInsurance.toString());
    if (searchParams.lastInsuranceTitle)
      query.set("lastInsurance_title", searchParams.lastInsuranceTitle);
    if (searchParams.endDate) query.set("endDate", searchParams.endDate);
    // ... سایر فیلدها در صورت نیاز

    // هدایت به صفحه خرید (فرض میکنیم مسیر /buy-insurance است)
    router.push(`/buy-insurance?${query.toString()}`);
  };

  return (
    <div className="flex cursor-pointer items-stretch gap-4 rounded-2xl bg-white p-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-all duration-200 active:scale-[0.98] active:shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
      <div className="flex h-[100px] w-[100px] shrink-0 flex-col items-center justify-center overflow-hidden rounded-xl border border-solid border-[#ccc] p-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
        <img
          src={insurer.picture}
          alt={insurer.title}
          className="block h-full w-full rounded-xl object-cover"
        />
      </div>

      <div className="flex min-h-[100px] min-w-0 flex-1 flex-col justify-between text-start">
        <div className="mb-1 whitespace-normal break-words text-base font-bold text-[#333]">{insurer.title}</div>
        <div className="mb-[6px] whitespace-normal break-words text-[13px] text-[#777]">
          {insurer.damage_branch_count} شعبه پرداخت
        </div>
        <ProductPrice
          mainPrice={insurer.main_price}
          offPrice={insurer.off_price}
          size={15}
        />

        {/* <div className={styles.prices}>
          {insurer.off_price && (
            <div className={styles.mainPrice}>
              {insurer.main_price.toLocaleString("fa-IR")} تومان
            </div>
          )}
          <div className={styles.finalPrice}>
            {finalPrice.toLocaleString("fa-IR")} تومان
          </div>
        </div> */}
      </div>

      <div className="flex w-[100px] shrink-0 flex-col items-end justify-between gap-2">
        <div className="flex flex-col items-start gap-1">
          {insurer.payment_commitment && (
            <span className="w-full whitespace-nowrap rounded-full bg-[#f3f7ff] px-[6px] py-[2px] text-center text-[11px] text-[#333]">
              تعهد پرداخت: {insurer.payment_commitment}
            </span>
          )}
          {insurer.need_active_medical_education_card && (
            <span className="w-full whitespace-nowrap rounded-full bg-[#fff7e6] px-[6px] py-[2px] text-center text-[11px] text-[#c27a00]">
              نیاز به کارت نظام پزشکی
            </span>
          )}
        </div>

        <button
          className="cursor-pointer rounded-xl border-none bg-green-base px-[18px] py-[6px] text-[13px] text-white"
          onClick={authorizeClientAction(() => handleBuyClick())}
        >
          خرید
        </button>
      </div>
    </div>
  );
}
