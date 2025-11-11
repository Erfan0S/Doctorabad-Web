// components/MedicineCard/MedicineCard.tsx
"use client";

import { useRouter } from "next/navigation";
import { Medicine } from "@/types/pharmacy";
import styles from "./MedicineCard.module.scss";

interface MedicineCardProps {
  medicine: Medicine;
}

export default function MedicineCard({ medicine }: MedicineCardProps) {
  const router = useRouter();

  return (
    <div
      className={styles.medicineCard}
      onClick={() => router.push(`/medicine/${medicine.id}`)}
    >
      <div className={styles.medicineImage}>
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <rect width="80" height="80" rx="8" fill="#F5F5F5"/>
          <path d="M30 35H50M40 25V55M25 40C25 31.7157 31.7157 25 40 25C48.2843 25 55 31.7157 55 40C55 48.2843 48.2843 55 40 55C31.7157 55 25 48.2843 25 40Z" stroke="#999" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      <div className={styles.medicineInfo}>
        <h3 className={styles.medicineNameEn}>
          {medicine.title_en || medicine.title}
        </h3>
        <p className={styles.medicineNameFa}>
          {medicine.title_fa}
        </p>
      </div>
    </div>
  );
}