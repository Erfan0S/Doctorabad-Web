"use client";
import Countdown, { CountdownRenderProps } from "react-countdown";
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
      className={`flex flex-row-reverse items-center justify-center text-center text-[24px] text-white [&>span]:mx-[0.8px] [&>span]:min-w-[30px] [&>span]:rounded-[8px] [&>span]:bg-white [&>span]:text-[16px] [&>span]:font-bold [&>span]:leading-[30px] [&>span]:text-app-base ${app ? app : ""} ${discountStyle ? "!text-app-base [&>span]:!bg-app-base [&>span]:!text-white" : ""} ${className}`}
    >
      <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
      <span>{seconds}</span>
    </div>
  );

  if (!shouldRender) return;

  return <Countdown date={new Date(endDate).getTime()} renderer={renderer} />;
}

export default DiscountCountdown;
