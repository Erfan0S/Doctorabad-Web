import Image from "next/image";
import style from "./CallbackDiscountInfo.module.scss";
// @ts-ignore
import coinsImage from "@repo/shared_modules/images/coins.png";
// @ts-ignore
import coinIcon from "@repo/shared_modules/images/coin.png";

type Props = {
  earnedCoins: number;
  discountCode: string | null;
};

const CallbackDiscountInfo = ({ discountCode, earnedCoins }: Props) => {
  return (
    <div className={style.callbackDiscountInfo}>
      <Image src={coinsImage} alt="callbackDiscountInfo" />
      {!!earnedCoins && (
        <>
          <p>
            با این سفارش {earnedCoins}{" "}
            <Image width={20} height={20} src={coinIcon} alt="coin" /> گرفتین!
          </p>
          <p>که میتونین تو دکترکلاب ازش استفاده کنین!</p>
        </>
      )}
      {discountCode && <p>کد تخفیف برای سفارش بعدیتون : {discountCode}</p>}
    </div>
  );
};

export default CallbackDiscountInfo;
