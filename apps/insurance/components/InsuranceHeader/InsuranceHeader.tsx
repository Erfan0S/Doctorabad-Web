// components/InsuranceHeader/InsuranceHeader.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import styles from "./InsuranceHeader.module.scss";
import BackArrow from "@/assets/svg/backArrow";
import BackIcon from "@/assets/svg/back";

import Heart from "@/assets/svg/heart";
import ShareIcon from "@/assets/svg/share";
import BugIcon from "@/assets/svg/bug";
import { HeaderType } from "@/types/insurance";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { modalActions } from "@repo/core/modal/modals";
import { Apps } from "@repo/core/types/general";
import { useFavorite } from "@/hooks/useFavorite";
import { insuranceApi } from "@/api/Api";
import { useShareProduct } from "@repo/core/hooks/useShareProduct";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { useNavigationHistory } from "@repo/core/hooks/useNavigationBack";

interface InsuranceHeaderProps {
  title?: string;
  headerPageType: HeaderType;
}

export default function InsuranceHeader({
  title = "",
  headerPageType = HeaderType.OTHERS,
}: InsuranceHeaderProps) {
  const router = useRouter();
  const { id } = useParams();
  const insuranceId = id ? Number(id) : undefined;
  const navHistory = useNavigationHistory();

  // برای صفحه جزئیات بیمه، داده را fetch می‌کنیم (در صورت نیاز)
  // فعلاً این بخش غیرفعال است چون API بیمه جزئیات ندارد
  // const { data: insuranceData } = useQuery({
  //   queryKey: ["insurance-details", insuranceId],
  //   queryFn: async () => {
  //     if (!insuranceId) throw new Error("No insurance ID");
  //     const res = await insuranceApi.getInsuranceDetails(insuranceId);
  //     return res.data.data;
  //   },
  //   enabled: headerPageType === HeaderType.INSURANCE_DETAILS && !!insuranceId,
  // });

  // const isFavorite = insuranceData?.is_favorite ?? false;
  const isFavorite = false;

  const { toggleFavorite, isLoading } = useFavorite({
    clinicId: insuranceId,
  });

  const toggleReportModal = () => {
    modalActions.addModal(ModalTypes.BUG_REPORT, {
      productId: id,
      app: Apps.INSURANCE,
    });
  };

  const handleFavoriteButton = () => {
    if (insuranceId) {
      toggleFavorite(insuranceId, isFavorite);
    }
  };

  const { isLoading: shareLoading, shareProduct } = useShareProduct(
    async () => {
      return {
        title: title || "بیمه",
        description: `${title || "بیمه"} را در دکترآباد ببینید: `,
        url: `https://doctorabad.com/insurance/${id}`,
      };
    },
  );

  const handleShareButton = () => {
    shareProduct();
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.lefSideHeader}>
            <div className={styles.backBtn} onClick={() => navHistory.goBack()}>
              <BackIcon></BackIcon>
            </div>
        </div>
      </div>
    </header>
  );
}
