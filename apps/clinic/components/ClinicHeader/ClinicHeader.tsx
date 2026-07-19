// components/ClinicHeader/ClinicHeader.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import BackArrow from "@/assets/svg/backArrow";
import BackIcon from "@/assets/svg/back";
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
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { useNavigationHistory } from "@repo/core/hooks/useNavigationBack";
import { baseUrls } from "@repo/core/constants/routePath";

// ponytail: shared square icon-button style (old .backBtn/.favoriteBtn were identical)
const ICON_BTN =
  "flex h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-lg border-none bg-white shadow-[0_0_5px_rgba(0,0,0,0.1)] transition-transform duration-200 active:scale-95 [&_svg]:h-[30px] [&_svg]:w-[30px] [&_svg]:text-[#333]";

interface ClinicHeaderProps {
  title?: string;
  headerPageType?: HeaderType; // اضافه کردن علامت سوال اگر در برخی جاها پاس داده نمیشه
  onBackClick?: () => void; // پراپ جدید اضافه شد
}

export default function ClinicHeader({
  title = "",
  headerPageType = HeaderType.OTHERS,
  onBackClick,
}: ClinicHeaderProps) {
  const router = useRouter();
  const { id } = useParams();
  const clinicId = id ? Number(id) : undefined;
  const navHistory = useNavigationHistory();

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
        url: `{{https://doctorabad.com/mc/${id}}}`,
      };
    },
  );

  const handleShareButton = () => {
    shareProduct();
  };

  const handleBack = () => {
    // اگر تابع از پدر فرستاده شده بود (مثل حالت جستجو در صفحه اصلی)، آن را اجرا کن
    if (onBackClick) {
      onBackClick();
      return;
    }

    // در غیر این صورت، رفتار پیش‌فرض (بازگشت به صفحه قبل)
    navHistory.goBack(baseUrls.base);
  };

  return (
    <header className="sticky top-0 z-[100] bg-white">
      <div className="flex items-center justify-between bg-green-base py-[7px] ps-5 pe-4">
        <h1 className="m-0 font-black text-white">{title}</h1>
        <div className="flex items-center gap-2">
          {headerPageType === HeaderType.DISEASE_DETAILS && (
            <>
              <div
                className={ICON_BTN}
                onClick={authorizeClientAction(() => toggleReportModal())}
              >
                <BugIcon />
              </div>
              <div className={ICON_BTN} onClick={handleShareButton}>
                <ShareIcon width={10} height={10} />
              </div>
            </>
          )}

          {headerPageType !== HeaderType.FAVORITES &&
          headerPageType !== HeaderType.CATEGORY ? (
            // ponytail: the old scss-module `loading` modifier resolved to undefined
            // (no .loading class existed), so it was dropped here.
            <div
              className={ICON_BTN}
              onClick={
                headerPageType === HeaderType.DISEASE_DETAILS
                  ? authorizeClientAction(() => handleFavoriteButton())
                  : authorizeClientAction(() => router.push("/favorites"))
              }
            >
              <Heart size={32} fill={isFavorite ? "#57d43b" : "none"} />
            </div>
          ) : null}

          <div className={ICON_BTN} onClick={handleBack}>
            <BackIcon></BackIcon>
          </div>
        </div>
      </div>
    </header>
  );
}
