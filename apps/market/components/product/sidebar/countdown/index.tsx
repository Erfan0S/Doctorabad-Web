"use client";
import { useClientComponentInitiated } from "@repo/core/hooks/useClientComponentInitiated";
import Countdown, { CountdownRenderProps } from "react-countdown";

// white digit chips on the orange festival banner
const DIGIT_CLASS =
  "mx-1 mb-0.5 block min-w-[26px] rounded-lg bg-white text-center text-sm font-bold leading-[26px] text-orange";

type Props = {
  discountFestivalEndDate: string;
};

const ProductSidebarCountdown = ({ discountFestivalEndDate }: Props) => {
  const shouldRender = useClientComponentInitiated();

  const renderer = ({
    formatted: { days, hours, minutes, seconds },
  }: CountdownRenderProps) => (
    <div className="ms-auto flex flex-row-reverse">
      <div className="text-center">
        <span className={DIGIT_CLASS}>{days}</span>
        <small className="text-white">روز</small>
      </div>
      <div className="text-center">
        <span className={DIGIT_CLASS}>{hours}</span>
        <small className="text-white">ساعت</small>
      </div>
      <div className="text-center">
        <span className={DIGIT_CLASS}>{minutes}</span>
        <small className="text-white">دقیقه</small>
      </div>
      <div className="text-center">
        <span className={DIGIT_CLASS}>{seconds}</span>
        <small className="text-white">ثانیه</small>
      </div>
    </div>
  );

  const endFestivalTime = new Date(discountFestivalEndDate).getTime();
  const now = Date.now();

  if (now > endFestivalTime) return null;

  return (
    <div className="flex items-center rounded-xl bg-orange px-3 py-2 shadow-[0_5px_15px_rgba(0,0,0,0.15)]">
      <span className="text-sm font-semibold text-white">تا پایان جشنواره</span>
      {shouldRender && <Countdown date={endFestivalTime} renderer={renderer} />}
    </div>
  );
};

export default ProductSidebarCountdown;
