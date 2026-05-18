"use client";

import { useRouter, useParams, usePathname } from "next/navigation";
import styles from "./ToolsHeader.module.scss";
import BackArrow from "@/assets/svg/backArrow";
import BackIcon from "@/assets/svg/back";
import Heart from "@/assets/svg/heart";
import ShareIcon from "@/assets/svg/share";
import BugIcon from "@/assets/svg/bug";
import { HeaderType } from "@/types/tools";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { modalActions } from "@repo/core/modal/modals";
import { Apps } from "@repo/core/types/general";
// ایمپورت هوک لوکال
import { useFavorites } from "@/hooks/useFavorites";
import { useShareProduct } from "@repo/core/hooks/useShareProduct";
import { ToolDataType } from "@/types/tools";
import { useNavigationHistory } from "@repo/core/hooks/useNavigationBack";


interface ToolsHeaderProps {
  title?: string;
  headerPageType: HeaderType;
  // برای صفحات ابزار، ما نیاز به شناسه ابزار داریم
  toolData?: ToolDataType;
}

export default function ToolsHeader({
  title = "",
  headerPageType = HeaderType.OTHERS,
  toolData,
}: ToolsHeaderProps) {
  const router = useRouter();
  
  // استفاده از هوک لوکال برای فیوریت
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();
  
  // بررسی وضعیت فیوریت بودن ابزار فعلی (اگر toolId وجود داشته باشد)
  const isFav = toolData?.id ? isFavorite(toolData.id) : false;
    const navHistory = useNavigationHistory();




  const handleFavoriteButton = () => {
    if (toolData?.id) {
      toggleFavorite(toolData.id);
    }
  };

  const { shareProduct } = useShareProduct(
    async () => {
      return {
        title: toolData?.title,
        description: `${toolData?.title} را در دکترآباد ببینید: `,
        url: `https://doctorabad.com/mt/dt/${toolData?.id}`,
        
      };
    }
  );

  const handleShareButton = () => {
    shareProduct();
  };

  // اگر هنوز لوکال استوریج لود نشده، برای جلوگیری از پرش، آیکون دیفالت یا نال نشان دهیم
  // اما اینجا چون فقط رنگ عوض می‌شود، می‌توانیم دیفالت را "خالی" در نظر بگیریم.

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.lefSideHeader}>
            {headerPageType === HeaderType.TOOL_DETAILS && (
            <>
              <div className={styles.favoriteBtn} onClick={handleShareButton}>
                <ShareIcon />
              </div>
            </>
          )}

          {headerPageType !== HeaderType.FAVORITES && (
            <div
              className={styles.favoriteBtn}
              onClick={
                headerPageType === HeaderType.TOOL_DETAILS && toolData?.id
                  ? handleFavoriteButton
                  : () => router.push("/favorites") // رفتن به صفحه لیست فیوریت‌های ابزارها
              }
            >
              <Heart
                size={32}
                // اگر لود شده بود و فیوریت بود سبز، در غیر این صورت خالی
                fill={isLoaded && isFav ? "#57d43b" : "none"}
                // برای حالت لینک به صفحه فیوریت‌ها (وقتی دیتیل نیست) همیشه توخالی یا رنگ دیگری باشد
                // اما طبق کد شما، اگر دیتیل بود وضعیت فیوریت را نشان می‌دهد
              />
            </div>
          )}

          <div className={styles.backBtn} onClick={() => navHistory.goBack()}>
            <BackIcon></BackIcon>
          </div>
        </div>
      </div>
    </header>
  );
}
