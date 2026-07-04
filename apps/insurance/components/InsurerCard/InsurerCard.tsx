// components/InsurerCard/InsurerCard.tsx
"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import styles from "./InsurerCard.module.scss";
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
    <div className={styles.card}>
      <div className={styles.logoSection}>
        <img src={insurer.picture} alt={insurer.title} />
      </div>

      <div className={styles.infoSection}>
        <div className={styles.title}>{insurer.title}</div>
        <div className={styles.branch}>
          {insurer.damage_branch_count} شعبه پرداخت
        </div>
        <ProductPrice
          mainPrice={insurer.main_price}
          offPrice={insurer.off_price}
          className={styles.productPrice}
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

      <div className={styles.actionSection}>
        <div className={styles.badgesRow}>
          {insurer.payment_commitment && (
            <span className={styles.badge}>
              تعهد پرداخت: {insurer.payment_commitment}
            </span>
          )}
          {insurer.need_active_medical_education_card && (
            <span className={`${styles.badge} ${styles.badgeWarning}`}>
              نیاز به کارت نظام پزشکی
            </span>
          )}
        </div>

        <button
          className={styles.buyButton}
          onClick={authorizeClientAction(() => handleBuyClick())}
        >
          خرید
        </button>
      </div>
    </div>
  );
}
