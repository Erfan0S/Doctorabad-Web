// components/PharmacyHeader/PharmacyHeader.tsx
"use client";

import { useRouter } from "next/navigation";
import styles from "./PharmacyHeader.module.scss";
import BackArrow from "@/assets/svg/backArrow";
import Heart from "@/assets/svg/heart";
import ShareIcon from "@/assets/svg/share";
import BugIcon from "@/assets/svg/bug";
import { HeaderType } from "@/types/pharmacy";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { modalActions } from "@repo/core/modal/modals";
import { Apps } from "@repo/core/types/general";
import { useParams } from "next/navigation";

interface PharmacyHeaderProps {
  title: string;
  headerPageType: HeaderType;
}

export default function PharmacyHeader({
  title,
  headerPageType = HeaderType.OTHERS,
}: PharmacyHeaderProps) {
  const router = useRouter();
  const { id } = useParams();

  const toggleReportModal = () => {
    modalActions.addModal(ModalTypes.BUG_REPORT, {
      productId: Number(id),
      app: Apps.PHARMACY,
    });
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.lefSideHeader}>
          {headerPageType === HeaderType.MEDICINE_DETAILS && (
            <>
              <button
                className={styles.favoriteBtn}
                onClick={toggleReportModal}
              >
                <BugIcon />
              </button>
              <button
                className={styles.favoriteBtn}
                onClick={() => router.push("/favorites")}
              >
                <ShareIcon />
              </button>
            </>
          )}

          <button
            className={styles.favoriteBtn}
            onClick={() => router.push("/favorites")}
          >
            <Heart size={32} strokeWidth={2} />
          </button>
          <button className={styles.backBtn} onClick={() => router.back()}>
            <BackArrow strokeWidth={2}></BackArrow>
          </button>
        </div>
      </div>
    </header>
  );
}
