import Image from 'next/image';
import coinsImage from '@/assets/img/coins.png';
import coinIcon from '@/assets/img/coin.png';

type Props = {
  earnedCoins: number;
  discountCode: string | null;
};

const CallbackDiscountInfo = ({ discountCode, earnedCoins }: Props) => {
  return (
    <div className="text-center leading-[30px] max-lg:mb-3 [&_img]:max-w-full [&_p]:mb-0 [&_p]:font-semibold [&_p]:text-[#463d89]">
      <Image src={coinsImage} alt="callbackDiscountInfo" />
      {!!earnedCoins && (
        <>
          <p>
            با این سفارش {earnedCoins} <Image width={20} height={20} src={coinIcon} alt="coin" /> گرفتین!
          </p>
          <p>که میتونین تو دکترکلاب ازش استفاده کنین!</p>
        </>
      )}
      {discountCode && <p>کد تخفیف برای سفارش بعدیتون : {discountCode}</p>}
    </div>
  );
};

export default CallbackDiscountInfo;
