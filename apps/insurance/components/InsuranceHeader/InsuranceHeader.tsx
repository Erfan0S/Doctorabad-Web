// components/InsuranceHeader/InsuranceHeader.tsx
"use client";

import { useParams } from "next/navigation";
import styles from "./InsuranceHeader.module.scss";
import BackIcon from "@/assets/svg/back";
import InfoIcon from "@repo/shared_modules/icons/info";

import { HeaderType } from "@/types/insurance";
import { useShareProduct } from "@repo/core/hooks/useShareProduct";
import { useNavigationHistory } from "@repo/core/hooks/useNavigationBack";
import { baseUrls } from "@repo/core/constants/routePath";
import Link from "next/link";

interface InsuranceHeaderProps {
  title?: string;
  headerPageType: HeaderType;
}

export default function InsuranceHeader({ title = "" }: InsuranceHeaderProps) {
  const { id } = useParams();
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

  const { isLoading: shareLoading, shareProduct } = useShareProduct(
    async () => {
      return {
        title: title || "بیمه",
        description: `${title || "بیمه"} را در دکترآباد ببینید: `,
        url: `https://doctorabad.com/insurance/${id}`,
      };
    },
  );

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.lefSideHeader}>
          <Link href={"https://doctorabad.com/mag/myinsurance"} target="blank">
            <div className={styles.backBtn}>
              <InfoIcon />
            </div>
          </Link>
          <div
            className={styles.backBtn}
            onClick={() => navHistory.goBack(baseUrls.base)}
          >
            <BackIcon></BackIcon>
          </div>
        </div>
      </div>
    </header>
  );
}
