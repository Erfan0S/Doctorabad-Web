"use client";
import Countdown, { CountdownRenderProps } from "react-countdown";
import style from "./Ads.module.scss";
import Link from "next/link";
import { useEffect, useReducer } from "react";
import { FestivalInfo } from "@/types/festival";
import { generateFestivalProductListUrl } from "@repo/core/utils/UrlUtils";
import { useClientComponentInitiated } from "@/hooks/useClientComponentInitiated";

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
    <div className={style.adsCountDown}>
      <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
      <span>{seconds}</span>
    </div>
  );

  if (!hasAds) {
    return null;
  }

  return (
    <section
      style={{ backgroundImage: `url(${pic_url})` }}
      className={style.ads}
    >
      <div className="container">
        <div className={style.adsWrapper}>
          <div className={style.adsCloseButton} onClick={toggleAds}>
            ×
          </div>
          <span>{title}</span>
          <div className={style.adsInteractives}>
            {shouldRender && show_count_down && (
              <Countdown date={expired_at} renderer={renderer} />
            )}
            {show_button && (
              <div className={style.adsButton}>
                <Link href={url || generateFestivalProductListUrl(id)}>
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
