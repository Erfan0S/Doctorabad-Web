import { priceFormatter } from "@repo/core/utils/priceFormatter";
import { Apps } from "@repo/core/types/general";
import { getDiscountInformation } from "@repo/core/utils/getDiscountInformation";

type Props = {
  mainPrice: number;
  offPrice?: number | null;
  amazingPrice?: number | null;
  app?: Apps;
  className?: string;
  variant?: "primery" | "secondary";
  colorVariant?: "simple" | "app";
  size?: number;
};

function ProductPrice({
  mainPrice: pMainPrice,
  offPrice: pOffPrice,
  amazingPrice,
  app,
  className,
  variant = "primery",
  colorVariant = "app",
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
      className={`flex w-full ${app || ""} ${className || ""} ${variant === "secondary" ? "flex-row" : "flex-col"}`}
    >
      <div className="flex max-w-full flex-row items-center justify-start">
        {offPrice && (
          <span className="font-semibold text-gray line-through [&_small]:ms-[4px]" style={{ fontSize: size ? size - 3 : "auto" }}>
            {priceFormatter(mainPrice)}
            {/* <small>تومن</small> */}
          </span>
        )}
        {discountPercent && (
          <small className="ms-[4px] rounded-[3px] bg-app-base px-[6px] text-[12px] leading-[14px] text-white" style={{ fontSize: size ? size - 4 : "auto" }}>
            ٪{discountPercent}
          </small>
        )}
      </div>
      <div
        className={`flex flex-row items-center justify-start text-[18px] font-semibold leading-[18px] ${colorVariant === "simple" ? "text-gray-dark" : "text-app-base"} ${isFree ? "!justify-center rounded-[5px] bg-[#90ee9057] p-[4px] text-center !text-[darkgreen]" : ""}`}
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
