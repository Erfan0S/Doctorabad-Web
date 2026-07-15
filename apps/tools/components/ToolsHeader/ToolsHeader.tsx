"use client";

import { useRouter } from "next/navigation";
import BackIcon from "@/assets/svg/back";
import Heart from "@/assets/svg/heart";
import ShareIcon from "@/assets/svg/share";
import { HeaderType } from "@/types/tools";

import { useFavorites } from "@/hooks/useFavorites";
import { useShareProduct } from "@repo/core/hooks/useShareProduct";
import { ToolDataType } from "@/types/tools";
import { useNavigationHistory } from "@repo/core/hooks/useNavigationBack";
import {baseUrls} from "@repo/core/constants/routePath";

// دکمه‌های آیکونی سفید هدر (back / favorite / share)
const iconBtnClasses =
  "flex h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-lg border-none bg-white shadow-[0_0_5px_rgba(0,0,0,0.1)] transition-transform duration-200 active:scale-95 [&_svg]:h-[30px] [&_svg]:w-[30px] [&_svg]:text-[#333]";

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
        url: `{{https://doctorabad.com/mt/dt/${toolData?.id}}}`,
        
      };
    }
  );

  const handleShareButton = () => {
    shareProduct();
  };

  // اگر هنوز لوکال استوریج لود نشده، برای جلوگیری از پرش، آیکون دیفالت یا نال نشان دهیم
  // اما اینجا چون فقط رنگ عوض می‌شود، می‌توانیم دیفالت را "خالی" در نظر بگیریم.

  return (
    <header className="sticky top-0 z-[100] bg-white">
      <div className="flex items-center justify-between bg-green-base py-[7px] pl-4 pr-5">
        <h1 className="m-0 font-black text-white">{title}</h1>
        <div className="flex items-center gap-2">
            {headerPageType === HeaderType.TOOL_DETAILS && (
            <>
              <div className={iconBtnClasses} onClick={handleShareButton}>
                <ShareIcon />
              </div>
            </>
          )}

          {headerPageType !== HeaderType.FAVORITES && (
            <div
              className={iconBtnClasses}
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

          <div className={iconBtnClasses} onClick={() => navHistory.goBack(baseUrls.base)}>
            <BackIcon></BackIcon>
          </div>
        </div>
      </div>
    </header>
  );
}
