// components/InsurerCard/InsurerCard.tsx
"use client";

import styles from "./InsurerCard.module.scss";
import { Insurer } from "@/types/insurance";

interface InsurerCardProps {
  insurer: Insurer;
}

export default function InsurerCard({ insurer }: InsurerCardProps) {
  const finalPrice =
    insurer.amazing_price ?? insurer.off_price ?? insurer.main_price;

  return (
    <div className={styles.card}>
      {/* لوگو سمت راست */}
      <div className={styles.logoSection}>
        <div className={styles.logoSection}>
          <img src={insurer.picture} alt={insurer.title} />
        </div>
      </div>

      {/* متن وسط */}
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

      {/* تگ‌ها + دکمه خرید (ستون چپ کارت) */}
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

        <button className={styles.buyButton}>خرید</button>
      </div>
    </div>
  );
}
