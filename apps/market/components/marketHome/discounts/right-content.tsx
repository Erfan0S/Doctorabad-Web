"use client";
import Image from "next/image";
import Link from "next/link";
import discountImage from "@/assets/img/shegeftangiz.png";
import { routePath } from "@repo/core/constants/routePath";
import { DiscountCountdown } from "@repo/shared_modules/components";
import { Apps } from "@repo/core/types/general";

type Props = {
  endDate: string;
};

const DiscountRightContent = ({ endDate }: Props) => {
  return (
    <div className="flex-[0_0_200px] max-w-[200px] ps-5 flex flex-col items-center justify-center max-xl:flex-[0_0_100%] max-xl:max-w-full max-xl:h-full">
      <span className="font-extrabold text-white text-base mb-3">شگفت‌انگیزان</span>
      <Image src={discountImage} alt="شگفت‌انگیزان" width={180} height={180} className="mb-3" />
      <DiscountCountdown endDate={endDate} app={Apps.MARKET} />
      <Link
        href={routePath.amazingProducts}
        className="mt-3 leading-[30px] max-w-[150px] w-full text-white rounded-xl border-2 border-solid border-white flex justify-center text-center"
      >
        مشاهده‌همه
      </Link>
    </div>
  );
};

export default DiscountRightContent;
