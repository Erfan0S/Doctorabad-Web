// components/InsuranceHeader/InsuranceHeader.tsx
"use client";

import { useParams } from "next/navigation";
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

export default function InsuranceHeader({ title = "", headerPageType }: InsuranceHeaderProps) {
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

  const backBtnCls =
    "flex h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-lg bg-white shadow-[0_0_5px_rgba(0,0,0,0.1)] transition-transform duration-200 active:scale-95 [&_svg]:h-[30px] [&_svg]:w-[30px] [&_svg]:text-[#333]";

  return (
    <header className="sticky top-0 z-[100] bg-white">
      <div className="flex items-center justify-between bg-green-base py-[7px] ps-5 pe-[10px]">
        <h1 className="m-0 font-black text-white">{title}</h1>
        <div className="flex items-center gap-2">
          {headerPageType !== HeaderType.INSURANCE_DETAILS && (
            <Link
              href={"https://doctorabad.com/mag/myinsurance"}
              target="blank"
            >
              <div className={backBtnCls}>
                <InfoIcon />
              </div>
            </Link>
          )}

          <div
            className={backBtnCls}
            onClick={() => navHistory.goBack(baseUrls.base)}
          >
            <BackIcon></BackIcon>
          </div>
        </div>
      </div>
    </header>
  );
}
