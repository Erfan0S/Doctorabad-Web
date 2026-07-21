import Image from "next/image";
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
    <div className="mb-3 text-center leading-[30px] max-md:mb-3 [&_img]:max-w-full [&_img:first-child]:aspect-square [&_img:first-child]:h-auto [&_p]:mb-0 [&_p]:font-semibold [&_p]:text-[#463d89]">
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
