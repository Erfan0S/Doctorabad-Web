// components/DiseaseCard/DiseaseCard.tsx
"use client";

import { useRouter } from "next/navigation";
import { Disease } from "@/types/clinic";
import styles from "./DiseaseCard.module.scss";
import PillsIcon from "@/assets/svg/pillsIcon";
import Lock from "@/assets/svg/lock";
import { isUserLoggedIn } from "@repo/core/utils/authUtils";
import { getMillisecondsUntilMidnight } from "@/utils/timeUtils";
import { generalAuthorizeState } from "@repo/core/states/generalAuthorizedState";
import { useQuery, useQueryClient } from "@tanstack/react-query";



import { clinicApi } from "@/api/Api";
import { useEffect } from "react";

interface DiseaseCardProps {
  disease: Disease;
}

export default function DiseaseCard({ disease }: DiseaseCardProps) {
  const router = useRouter();
  
  // بررسی وضعیت لاگین بودن کاربر
  const isLoggedIn = generalAuthorizeState((state) => state.isAuthorized);
    const queryClient = useQueryClient();


  const {
    data: userPlans,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-plans-clinic"],
    queryFn: async () => (await clinicApi.getUserPlans()),
    enabled: isLoggedIn, 
    staleTime: getMillisecondsUntilMidnight(),
    gcTime: getMillisecondsUntilMidnight(), 
  });
  
  const isAccessible = () => {
    console.log(userPlans);
    if (userPlans?.data?.data?.length || userPlans?.data?.used_free || disease.is_free) {
      return true;
    }
    return false;
  };

  const handleActionClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    treatmentType: "prescription" | "order" | "both"
  ) => {
    e.stopPropagation();
    const params = new URLSearchParams();
    params.set("treatment", treatmentType);
    router.push(`/disease/${disease.id}?${params.toString()}`);
  };

  useEffect(() => {
    if (!isUserLoggedIn()) {
      queryClient.invalidateQueries({ queryKey: ["user-plans-clinic"]});
    }
  }, [isUserLoggedIn()]);

  return (
    <div
      className={styles.diseaseCard}
      onClick={() => router.push(`/disease/${disease.id}`)}
    >
      <div className={styles.diseaseImage}>
        {disease.picture ? (
          <img src={disease.picture} width={100} height={100} alt={disease.title_en} />
        ) : (
          <PillsIcon className={styles.pillsIcon} width={75} height={75} />
        )}
      </div>

      <div className={styles.diseaseInfo}>
        {/* بخش بالا - قفل */}
        <div className={styles.topSection}>
          {!isAccessible() && <Lock className={styles.lockIcon} />}
        </div>

        {/* بخش وسط - نام دارو */}
        <div className={styles.nameSection}>
          <h3 className={styles.diseaseNameEn}>{disease.title_en}</h3>
          <p className={styles.diseaseNameFa}>{disease.title_fa}</p>
        </div>

        {/* بخش پایین - اکشن‌ها */}
        <div className={styles.bottomSection}>
          {(disease.has_prescription || disease.has_order) && (
            <div className={styles.actions}>
              {disease.has_prescription && !disease.has_order && (
                <button
                  className={styles.actionBtn}
                  onClick={(e) => handleActionClick(e, "prescription")}
                >
                  نسخه و اوردر
                </button>
              )}

              {disease.has_prescription && disease.has_order && (
                <>
                  <button
                    className={styles.actionBtn}
                    onClick={(e) => handleActionClick(e, "prescription")}
                  >
                    نسخه
                  </button>
                  <button
                    className={styles.actionBtn}
                    onClick={(e) => handleActionClick(e, "order")}
                  >
                    اوردر
                  </button>
                </>
              )}

              {!disease.has_prescription && disease.has_order && (
                <button
                  className={styles.actionBtn}
                  onClick={(e) => handleActionClick(e, "order")}
                >
                  اوردر
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
