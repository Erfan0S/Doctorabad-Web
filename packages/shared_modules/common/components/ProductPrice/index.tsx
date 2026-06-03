import { priceFormatter } from "@repo/core/utils/priceFormatter";
import React from "react";
import style from "./ProductPrice.module.scss";
import { Apps } from "@repo/core/types/general";
import { getDiscountInformation } from "@repo/core/utils/getDiscountInformation";

type Props = {
  mainPrice: number;
  offPrice?: number | null;
  amazingPrice?: number | null;
  app?: Apps;
  className?: string;
  variant?: "primery" | "secondary";
};

function ProductPrice({
  mainPrice: pMainPrice,
  offPrice: pOffPrice,
  amazingPrice,
  app,
  className,
  variant = "primery",
}: Props) {
  const { discountPercent, mainPrice, offPrice } = getDiscountInformation(
    pMainPrice,
    pOffPrice || undefined,
    amazingPrice || undefined,
  );

  return (
    <div
      className={`${style.productPrice} ${style[app || ""]} ${className || ""} ${style[variant] || ""}`}
    >
      <div>
        {offPrice && (
          <span>
            {priceFormatter(mainPrice)}
            {/* <small>تومن</small> */}
          </span>
        )}
        {discountPercent && <small>٪{discountPercent}</small>}
      </div>
      <div>
        {priceFormatter(offPrice || mainPrice)}
        <small>تومن</small>
      </div>
    </div>
  );
}

export default ProductPrice;
