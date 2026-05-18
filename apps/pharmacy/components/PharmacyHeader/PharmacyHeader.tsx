// components/PharmacyHeader/PharmacyHeader.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import styles from "./PharmacyHeader.module.scss";
import BackArrow from "@/assets/svg/backArrow";
import BackIcon from "@/assets/svg/back";
import Heart from "@/assets/svg/heart";
import ShareIcon from "@/assets/svg/share";
import BugIcon from "@/assets/svg/bug";
import { HeaderType } from "@/types/pharmacy";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { modalActions } from "@repo/core/modal/modals";
import { Apps } from "@repo/core/types/general";
import { useFavorite } from "@/hooks/useFavorite";
import { pharmacyApi } from "@/api/Api";
import { useShareProduct } from "@repo/core/hooks/useShareProduct";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { useNavigationHistory } from "@repo/core/hooks/useNavigationBack";


interface PharmacyHeaderProps {
  title?: string;
  headerPageType: HeaderType;
  onBackClick?: () => void;
}

export default function PharmacyHeader({
  title = "",
  headerPageType = HeaderType.OTHERS,
  onBackClick,
}: PharmacyHeaderProps) {
  const router = useRouter();
  const { id } = useParams();
  const medicineId = id ? Number(id) : undefined;
  const navHistory = useNavigationHistory();

  const { data: medicineData } = useQuery({
    queryKey: ["medicine-details", medicineId],
    queryFn: async () => {
      if (!medicineId) throw new Error("No medicine ID");
      const res = await pharmacyApi.getMedicineDetails(medicineId);
      return res.data.data;
    },
    enabled: headerPageType === HeaderType.MEDICINE_DETAILS && !!medicineId,
  });

  const isFavorite = medicineData?.is_favorite ?? false;

  const { toggleFavorite, isLoading } = useFavorite({
    medicineId,
  });

  const toggleReportModal = () => {
    modalActions.addModal(ModalTypes.BUG_REPORT, {
      productId: id,
      app: Apps.PHARMACY,
    });
  };

  const handleFavoriteButton = () => {
    if (medicineId) {
      toggleFavorite(medicineId, isFavorite);
    }
  };

  const { isLoading: shareLoading, shareProduct } = useShareProduct(
    async () => {
      return {
        title: medicineData?.title_fa,
        description: `${medicineData?.title_fa} را در دکترآباد ببینید: `,
        url: `https://doctorabad.com/mp/${id}`,
      };
    },
  );

  const handleShareButton = () => {
    shareProduct();
  };
  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
      return;
    }

    navHistory.goBack();
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.lefSideHeader}>
          {headerPageType === HeaderType.MEDICINE_DETAILS && (
            <>
              <div className={styles.favoriteBtn} onClick={toggleReportModal}>
                <BugIcon />
              </div>
              <div className={styles.favoriteBtn} onClick={handleShareButton}>
                <ShareIcon />
              </div>
            </>
          )}

          {headerPageType !== HeaderType.FAVORITES && (
            <div
              className={`${styles.favoriteBtn} ${isLoading ? styles.loading : ""}`}
              onClick={
                headerPageType === HeaderType.MEDICINE_DETAILS
                  ? handleFavoriteButton
                  : authorizeClientAction(() => router.push("/favorites"))
              }
            >
              <Heart size={32} fill={isFavorite ? "#57d43b" : "none"} />
            </div>
          )}

          <div className={styles.backBtn} onClick={handleBack}>
            <BackIcon></BackIcon>
          </div>
        </div>
      </div>
    </header>
  );
}
