import Image from "next/image";
import style from "./ProductSidebarNotice.module.scss";
import coinIcon from "@/assets/img/coin.png";
import giftIcon from "@/assets/img/gift.png";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import { DiscountFestival } from "@/types/discount";
import StarIcon from "@/assets/svg/newIcons/star";

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
    <div className={style.productSidebarNotice}>
      <ul>
        {bonusCoins && (
          <li>
            <Image src={coinIcon} alt="" />
            با خرید این محصول {bonusCoins} سکه دکترکلاب دریافت میکنی!
          </li>
        )}
        {normalDiscount && (
          <li>
            <StarIcon />
            تخفیف و سودت از خرید: {priceFormatter(normalDiscount)} تومن!
          </li>
        )}
        {readyToShipState !== "معمولی" && (
          <li>
            <Image src={giftIcon} alt="" />
            {readyToShipState}
          </li>
        )}
      </ul>
    </div>
  );
};

export default ProductSidebarNotice;
