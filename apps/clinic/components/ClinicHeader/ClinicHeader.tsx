// components/ClinicHeader/ClinicHeader.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import styles from "./ClinicHeader.module.scss";
import BackArrow from "@/assets/svg/backArrow";
import Heart from "@/assets/svg/heart";
import ShareIcon from "@/assets/svg/share";
import BugIcon from "@/assets/svg/bug";
import { HeaderType } from "@/types/clinic";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { modalActions } from "@repo/core/modal/modals";
import { Apps } from "@repo/core/types/general";
import { useFavorite } from "@/hooks/useFavorite";
import { clinicApi } from "@/api/Api";
import { useShareProduct } from "@repo/core/hooks/useShareProduct";
import {
  authorizeClientAction
} from "@repo/core/utils/authUtils";

interface ClinicHeaderProps {
  title?: string;
  headerPageType: HeaderType;
}

export default function ClinicHeader({
  title = "",
  headerPageType = HeaderType.OTHERS,
}: ClinicHeaderProps) {
  const router = useRouter();
  const { id } = useParams();
  const clinicId = id ? Number(id) : undefined;

  // فقط برای صفحه جزئیات بیماری، داده را fetch می‌کنیم
  const { data: diseaseData } = useQuery({
    queryKey: ["disease-details", clinicId],
    queryFn: async () => {
      if (!clinicId) throw new Error("No disease ID");
      const res = await clinicApi.getDiseaseDetails(clinicId);
      return res.data.data;
    },
    enabled: headerPageType === HeaderType.DISEASE_DETAILS && !!clinicId,
  });

  const isFavorite = diseaseData?.is_favorite ?? false;

  const { toggleFavorite, isLoading } = useFavorite({
    clinicId: clinicId,
  });

  const toggleReportModal = () => {
    modalActions.addModal(ModalTypes.BUG_REPORT, {
      productId: id,
      app: Apps.CLINIC,
    });
  };

  const handleFavoriteButton = () => {
    if (clinicId) {
      toggleFavorite(clinicId, isFavorite);
    }
  };

  const { isLoading: shareLoading, shareProduct } = useShareProduct(
    async () => {
      return {
        title: diseaseData?.title_fa,
        description: `${diseaseData?.title_fa} را در دکترآباد ببینید: `,
        url: `https://doctorabad.com/clinic/${id}`,
      };
    }
  );

  const handleShareButton = () => {
    shareProduct();
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.lefSideHeader}>
          {headerPageType === HeaderType.DISEASE_DETAILS && (
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
                headerPageType === HeaderType.DISEASE_DETAILS
                  ? handleFavoriteButton
                  : authorizeClientAction(() => router.push("/favorites"))
              }
            >
              <Heart
                size={32}
                strokeWidth={2}
                fill={isFavorite ? "#57d43b" : "none"}
              />
            </div>
          )}

          <div className={styles.backBtn} onClick={() => router.back()}>
            <BackArrow strokeWidth={2}></BackArrow>
          </div>
        </div>
      </div>
    </header>
  );
}
