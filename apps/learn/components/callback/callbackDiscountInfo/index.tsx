import Image from 'next/image';
import coinsImage from '@/assets/img/coins.png';
import coinIcon from '@/assets/img/coin.png';

type Props = {
  earnedCoins: number;
  discountCode: string | null;
};

const pClass = 'mb-0 font-semibold text-[#463d89]';

const CallbackDiscountInfo = ({ discountCode, earnedCoins }: Props) => {
  return (
    <div className="text-center leading-[30px] max-lg:mb-3">
      <Image className="max-w-full" src={coinsImage} alt="callbackDiscountInfo" />
      {!!earnedCoins && (
        <>
          <p className={pClass}>
            با این سفارش {earnedCoins} <Image className="max-w-full" width={20} height={20} src={coinIcon} alt="coin" /> گرفتین!
          </p>
          <p className={pClass}>که میتونین تو دکترکلاب ازش استفاده کنین!</p>
        </>
      )}
      {discountCode && <p className={pClass}>کد تخفیف برای سفارش بعدیتون : {discountCode}</p>}
    </div>
  );
};

export default CallbackDiscountInfo;
