// components/InsurerCard/InsurerCard.tsx
"use client";

import { useRouter } from "next/navigation";
import styles from "./InsurerCard.module.scss";
import { Insurer } from "@/types/insurance";

interface InsurerCardProps {
  insurer: Insurer;
  // مقادیر فیلتر که از پرنت پاس داده می‌شوند
  searchParams: {
    fields: number[];
    grades: number[];
    residency: number | null;
    damageHistory: number | null;
    lastInsurance: number | null;
    endDate: string | null;
  };
}

export default function InsurerCard({ insurer, searchParams }: InsurerCardProps) {
  const router = useRouter();

  const finalPrice =
    insurer.amazing_price ?? insurer.off_price ?? insurer.main_price;

  const handleBuyClick = () => {
    // ساخت کوئری استرینگ
    const query = new URLSearchParams();

    // 1. اطلاعات بیمه انتخاب شده (برای نمایش در هدر و قیمت)
    query.set("insurer_id", insurer.id.toString());
    query.set("insurer_title", insurer.title);
    query.set("insurer_logo", insurer.picture); // فرض بر اینکه url عکس است
    query.set("price", finalPrice.toString());

    // 2. اطلاعات فیلترهای کاربر (برای استفاده احتمالی در فرم ویرایش)
    if (searchParams.fields.length) query.set("fields", searchParams.fields.join(","));
    if (searchParams.grades.length) query.set("grades", searchParams.grades.join(","));
    if (searchParams.residency) query.set("residency", searchParams.residency.toString());
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

        <div className={styles.prices}>
          {insurer.off_price && (
            <div className={styles.mainPrice}>
              {insurer.main_price.toLocaleString("fa-IR")} تومان
            </div>
          )}
          <div className={styles.finalPrice}>
            {finalPrice.toLocaleString("fa-IR")} تومان
          </div>
        </div>
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

        <button className={styles.buyButton} onClick={handleBuyClick}>
            خرید
        </button>
      </div>
    </div>
  );
}
