import { priceFormatter } from "@repo/core/utils/priceFormatter";
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
  size?: number;
};

function ProductPrice({
  mainPrice: pMainPrice,
  offPrice: pOffPrice,
  amazingPrice,
  app,
  className,
  variant = "primery",
  size,
}: Props) {
  const { discountPercent, mainPrice, offPrice } = getDiscountInformation(
    pMainPrice,
    pOffPrice || undefined,
    amazingPrice || undefined,
  );

  const isFree = !mainPrice && !offPrice;

  return (
    <div
      className={`${style.productPrice} ${style[app || ""]} ${className || ""} ${style[variant] || ""}`}
    >
      <div>
        {offPrice && (
          <span style={{ fontSize: size ? size - 3 : "auto" }}>
            {priceFormatter(mainPrice)}
            {/* <small>تومن</small> */}
          </span>
        )}
        {discountPercent && (
          <small style={{ fontSize: size ? size - 4 : "auto" }}>
            ٪{discountPercent}
          </small>
        )}
      </div>
      <div
        className={isFree && style.free}
        style={{ fontSize: size || "auto" }}
      >
        {isFree ? (
          "رایگان"
        ) : (
          <>
            {priceFormatter(offPrice || mainPrice)}
            <small>تومن</small>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductPrice;
