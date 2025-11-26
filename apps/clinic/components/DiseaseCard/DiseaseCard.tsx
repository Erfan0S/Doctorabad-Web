// components/DiseaseCard/DiseaseCard.tsx
"use client";

import { useRouter } from "next/navigation";
import { Disease } from "@/types/clinic";
import styles from "./DiseaseCard.module.scss";
import PillsIcon from "@/assets/svg/pillsIcon";
import Lock from "@/assets/svg/lock";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { useQuery } from "@tanstack/react-query";
import { clinicApi } from "@/api/Api";

interface DiseaseCardProps {
  disease: Disease;
}

export default function DiseaseCard({ disease }: DiseaseCardProps) {
  const router = useRouter();
  const isAccessible = () => {
    if (userPlans?.data || userPlans?.used_free || disease.is_free) {
      return true;
    }
    return false;
  };

  const {
    data: userPlans,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-plans"],
    queryFn: async () => (await clinicApi.getUserPlans()).data.data,
  });

  return (
    <div
      className={styles.diseaseCard}
      onClick={authorizeClientAction(() =>
        router.push(`/disease/${disease.id}`)
      )}
    >
      <div className={styles.diseaseImage}>
        {disease.picture ? (
          <img src={disease.picture} width={100} height={100} />
        ) : (
          <PillsIcon className={styles.pillsIcon} width={75} height={75} />
        )}
      </div>

      <div className={styles.diseaseInfo}>
        {isAccessible() ? null : <Lock className={styles.lockIcon} />}

        <h3 className={styles.diseaseNameEn}>{disease.title_en}</h3>
        <p className={styles.diseaseNameFa}>{disease.title_fa}</p>

        {(disease.has_prescription || disease.has_order) && (
          <div className={styles.actions}>
            {disease.has_prescription && !disease.has_order && (
              <button className={styles.actionBtn}>نسخه و اوردر</button>
            )}

            {disease.has_prescription && disease.has_order && (
              <>
                <button className={styles.actionBtn}>نسخه</button>
                <button className={styles.actionBtn}>اوردر</button>
              </>
            )}

            {!disease.has_prescription && disease.has_order && (
              <button className={styles.actionBtn}>اوردر</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
