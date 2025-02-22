"use client";
import Image from "next/image";
import Link from "next/link";
import Countdown, { CountdownRenderProps } from "react-countdown";
import style from "./Discounts.module.scss";
import discountImage from "@/assets/img/shegeftangiz.png";
import { routePath } from "@repo/core/constants/routePath";

import { useClientComponentInitiated } from "@/hooks/useClientComponentInitiated";

type Props = {
  endDate: string;
};

const DiscountRightContent = ({ endDate }: Props) => {
  const shouldRender = useClientComponentInitiated();

  const renderer = ({
    formatted: { days, hours, minutes, seconds },
  }: CountdownRenderProps) => (
    <div className={style.discountsCountDown}>
      <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
      <span>{seconds}</span>
    </div>
  );

  return (
    <div className={`${style.discountsRight}`}>
      <span>شگفت‌انگیزان</span>
      <Image src={discountImage} alt="شگفت‌انگیزان" width={180} height={180} />
      {shouldRender && (
        <Countdown date={new Date(endDate).getTime()} renderer={renderer} />
      )}
      <Link href={routePath.amazingProducts}>مشاهده‌همه</Link>
    </div>
  );
};

export default DiscountRightContent;
