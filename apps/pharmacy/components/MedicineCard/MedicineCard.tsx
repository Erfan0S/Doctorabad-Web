// components/MedicineCard/MedicineCard.tsx
"use client";

import { useRouter } from "next/navigation";
import { Medicine } from "@/types/pharmacy";
import styles from "./MedicineCard.module.scss";
import PillsIcon from "@/assets/svg/pillsIcon";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";

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
        {medicine.picture ? (
          <img src={medicine.picture} width={100} height={100} />
        ) : (
          <PillsIcon className={styles.pillsIcon} width={75} height={75} />
        )}
      </div>
      <div className={styles.medicineInfo}>
        <h3 className={styles.medicineNameEn}>{medicine.title_en}</h3>
        <p className={styles.medicineNameFa}>{medicine.title_fa}</p>
        {medicine.shape_coding && Object.keys(medicine.shape_coding).length > 0 ? (
          <div
            className={styles.shapeCoding}
            onClick={(e) => {
              e.stopPropagation();
              modalActions.addModal(ModalTypes.MEDICINE_CODING, { medicine });
            }}
          >
            کدینگ
          </div>
        ) : null}{" "}
      </div>
    </div>
  );
}
