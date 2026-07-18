// components/PharmacyHeader/PharmacyHeader.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
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
import {baseUrls} from "@repo/core/constants/routePath";

const iconBtnCls =
  "flex h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-lg border-none bg-white shadow-[0_0_5px_rgba(0,0,0,0.1)] transition-transform duration-200 active:scale-95 [&_svg]:h-[30px] [&_svg]:w-[30px] [&_svg]:text-[#333]";

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

    navHistory.goBack(baseUrls.base);
  };

  return (
    <header className="sticky top-0 z-[100] bg-white">
      <div className="flex items-center justify-between bg-green-base py-[7px] ps-5 pe-4">
        <h1 className="m-0 font-black text-white">{title}</h1>
        <div className="flex items-center gap-2">
          {headerPageType === HeaderType.MEDICINE_DETAILS && (
            <>
              <div className={iconBtnCls} onClick={authorizeClientAction (() => toggleReportModal())}>
                <BugIcon />
              </div>
              <div className={iconBtnCls} onClick={handleShareButton}>
                <ShareIcon />
              </div>
            </>
          )}

          {headerPageType !== HeaderType.FAVORITES &&
          headerPageType !== HeaderType.CATEGORY ? (
            <div
              className={iconBtnCls}
              onClick={
                headerPageType === HeaderType.MEDICINE_DETAILS
                  ? authorizeClientAction(() => handleFavoriteButton())
                  : authorizeClientAction(() => router.push("/favorites"))
              }
            >
              <Heart size={32} fill={isFavorite ? "#57d43b" : "none"} />
            </div>
          ) : null}

          <div className={iconBtnCls} onClick={handleBack}>
            <BackIcon></BackIcon>
          </div>
        </div>
      </div>
    </header>
  );
}
