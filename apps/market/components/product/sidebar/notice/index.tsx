import Image from "next/image";
import coinIcon from "@/assets/img/coin.png";
import giftIcon from "@/assets/img/gift.png";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import { DiscountFestival } from "@/types/discount";
import StarIcon from "@/assets/svg/newIcons/star";

// each notice row: gray text + 18px leading icon
const NOTICE_LI =
  "flex items-center leading-[30px] text-gray [&_img]:me-2 [&_img]:h-[18px] [&_img]:w-[18px] [&_svg]:me-2 [&_svg]:h-[18px] [&_svg]:w-[18px]";

type Props = {
  bonusCoins?: number;
  normalDiscount?: number | null;
  readyToShipState: string;
  festivalDiscount?: DiscountFestival;
};

const ProductSidebarNotice = ({
  readyToShipState,
  bonusCoins,
  normalDiscount,
  festivalDiscount,
}: Props) => {
  return (
    <div className="mb-auto">
      <ul className="m-0 list-none p-0">
        {!!bonusCoins && (
          <li className={NOTICE_LI}>
            <Image src={coinIcon} alt="" />
            با خرید این محصول {bonusCoins} سکه دکترکلاب دریافت میکنی!
          </li>
        )}
        {!!normalDiscount && (
          <li className={NOTICE_LI}>
            <StarIcon />
            تخفیف و سودت از خرید: {priceFormatter(normalDiscount)} تومن!
          </li>
        )}
        {!!readyToShipState && readyToShipState !== "معمولی" && (
          <li className={NOTICE_LI}>
            <Image src={giftIcon} alt="" />
            {readyToShipState}
          </li>
        )}
      </ul>
    </div>
  );
};

export default ProductSidebarNotice;
