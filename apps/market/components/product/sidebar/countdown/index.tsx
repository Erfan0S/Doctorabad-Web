'use client';
import { useClientComponentInitiated } from '@/hooks/useClientComponentInitiated';
import style from './ProductSidebarCountdown.module.scss';
import Countdown, { CountdownRenderProps } from 'react-countdown';

type Props = {
  discountFestivalEndDate: string;
};

const ProductSidebarCountdown = ({ discountFestivalEndDate }: Props) => {
  const shouldRender = useClientComponentInitiated();

  const renderer = ({ formatted: { days, hours, minutes, seconds } }: CountdownRenderProps) => (
    <div className={style.discountsCountDown}>
      <div>
        <span>{days}</span>
        <small>روز</small>
      </div>
      <div>
        <span>{hours}</span>
        <small>ساعت</small>
      </div>
      <div>
        <span>{minutes}</span>
        <small>دقیقه</small>
      </div>
      <div>
        <span>{seconds}</span>
        <small>ثانیه</small>
      </div>
    </div>
  );

  const endFestivalTime = new Date(discountFestivalEndDate).getTime();
  const now = Date.now();

  if (now > endFestivalTime) return null;

  return (
    <div className={style.productSidebarCountdown}>
      <span>تا پایان جشنواره</span>
      {shouldRender && <Countdown date={endFestivalTime} renderer={renderer} />}
    </div>
  );
};

export default ProductSidebarCountdown;
