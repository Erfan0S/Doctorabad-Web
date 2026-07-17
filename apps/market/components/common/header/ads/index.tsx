"use client";
import Countdown, { CountdownRenderProps } from "react-countdown";
import Link from "next/link";
import { useEffect, useReducer } from "react";
import { FestivalInfo } from "@/types/festival";
import { generateFestivalProductListUrl } from "@repo/core/utils/UrlUtils";
import { useClientComponentInitiated } from "@repo/core/hooks/useClientComponentInitiated";

// was Ads.module.scss
const WRAPPER =
  "relative flex flex-row items-center justify-between min-h-[50px] h-auto text-white py-3 ps-[30px] flex-wrap [&_br]:flex-1 max-lg:min-h-[90px] max-lg:pb-[5px] max-lg:pe-[15px] max-lg:ps-[5px]";
const TITLE = "font-semibold text-[19px] max-lg:text-base max-md:text-xs";
const CLOSE =
  "text-[35px] font-semibold cursor-pointer absolute start-0 m-0 max-lg:end-0 max-lg:start-auto";
const INTERACTIVES =
  "flex flex-row justify-start self-center [&_div]:flex [&_div]:items-center max-lg:w-full max-lg:mt-[5px]";
const COUNTDOWN =
  "text-white flex items-center justify-center text-center flex-row-reverse text-2xl";
const COUNT_SPAN =
  "bg-white text-orange min-w-[30px] font-bold rounded-lg text-base leading-[30px] shadow-[0_0_10px_rgba(0,0,0,0.2)] max-md:text-xs max-sm:mx-[3px]";
const BUTTON_LINK =
  "px-7 font-semibold text-sm bg-white rounded-lg text-orange leading-[30px] inline-block shadow-[0_0_10px_rgba(0,0,0,0.2)]";

const Ads: React.FC<NonNullable<FestivalInfo>> = ({
  title,
  expired_at,
  id,
  pic_url,
  button_text,
  show_button,
  show_count_down,
  url,
}) => {
  const shouldRender = useClientComponentInitiated();

  const [hasAds, toggleAds] = useReducer((prev) => !prev, true);
  const renderer = ({
    formatted: { days, hours, minutes, seconds },
  }: CountdownRenderProps) => (
    <div className={COUNTDOWN}>
      <span className={COUNT_SPAN}>{days}</span>:
      <span className={COUNT_SPAN}>{hours}</span>:
      <span className={COUNT_SPAN}>{minutes}</span>:
      <span className={COUNT_SPAN}>{seconds}</span>
    </div>
  );

  if (!hasAds) {
    return null;
  }

  return (
    <section style={{ backgroundImage: `url(${pic_url})` }}>
      <div className="container">
        <div className={WRAPPER}>
          <div className={CLOSE} onClick={toggleAds}>
            ×
          </div>
          <span className={TITLE}>{title}</span>
          <div className={INTERACTIVES}>
            {shouldRender && show_count_down && (
              <Countdown date={expired_at} renderer={renderer} />
            )}
            {show_button && (
              <div className="ms-5">
                <Link
                  className={BUTTON_LINK}
                  href={url || generateFestivalProductListUrl(id)}
                >
                  {button_text || "بزن‌بریم"}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Ads;
