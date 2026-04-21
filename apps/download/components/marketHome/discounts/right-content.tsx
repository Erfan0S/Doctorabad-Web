"use client";
import Image from "next/image";
import Link from "next/link";
import style from "./Discounts.module.scss";
import discountImage from "@/assets/img/shegeftangiz.png";
import { routePath } from "@repo/core/constants/routePath";
import { DiscountCountdown } from "@repo/shared_modules/components";
import { Apps } from "@repo/core/types/general";

type Props = {
  endDate: string;
};

const DiscountRightContent = ({ endDate }: Props) => {
  return (
    <div className={`${style.discountsRight}`}>
      <span>شگفت‌انگیزان</span>
      <Image src={discountImage} alt="شگفت‌انگیزان" width={180} height={180} />
      <DiscountCountdown endDate={endDate} app={Apps.MARKET} />
      <Link href={routePath.amazingProducts}>مشاهده‌همه</Link>
    </div>
  );
};

export default DiscountRightContent;
