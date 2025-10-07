"use client";
import Countdown, { CountdownRenderProps } from "react-countdown";
import style from "./style.module.scss";
import { useClientComponentInitiated } from "@repo/core/hooks/useClientComponentInitiated";
import { Apps } from "@repo/core/types/general";

type Props = {
  endDate: string;
  style?: "default" | "secondary";
  app?: Apps;
  className?: string;
};

function DiscountCountdown({
  endDate,
  style: discountStyle,
  app = Apps.BASE,
  className,
}: Props) {
  const shouldRender = useClientComponentInitiated();

  const renderer = ({
    formatted: { days, hours, minutes, seconds },
  }: CountdownRenderProps) => (
    <div
      className={`${style.discountCountdown} ${app ? style[app] : ""} ${discountStyle ? style[discountStyle] : ""} ${className}`}
    >
      <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
      <span>{seconds}</span>
    </div>
  );

  if (!shouldRender) return;

  return <Countdown date={new Date(endDate).getTime()} renderer={renderer} />;
}

export default DiscountCountdown;
